"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAssets,
  createAsset,
  updateAsset,
  assignAsset,
  returnAsset,
  deleteAsset,
  fetchEmployees,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import {
  Laptop,
  Plus,
  UserCheck,
  RotateCcw,
  Trash2,
  Monitor,
  Key,
  Smartphone,
  Cpu,
  Pencil,
} from "lucide-react";

export default function AssetsPage() {
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any | null>(null);
  const [assigningAsset, setAssigningAsset] = useState<any | null>(null);
  const [selectedEmpId, setSelectedEmpId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    assetType: "Laptop",
    serialNumber: "",
    condition: "EXCELLENT",
    cost: 0,
    notes: "",
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets", statusFilter],
    queryFn: () => fetchAssets(statusFilter),
  });

  const createMut = useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Asset added to inventory");
      setIsCreateOpen(false);
    },
  });

  const updateAssetMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateAsset(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      toast.success("Asset hardware details updated");
      setEditingAsset(null);
    },
  });

  const assignMut = useMutation({
    mutationFn: ({ id, employeeId }: { id: number; employeeId: number }) =>
      assignAsset(id, employeeId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Asset assigned to employee");
      setAssigningAsset(null);
    },
  });

  const returnMut = useMutation({
    mutationFn: returnAsset,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      qc.invalidateQueries({ queryKey: ["hr-dashboard"] });
      toast.success("Asset returned to available pool");
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      toast.success("Asset removed");
    },
  });

  const getAssetIcon = (type: string) => {
    if (type === "Laptop") return Laptop;
    if (type === "Monitor") return Monitor;
    if (type === "Security Card") return Key;
    if (type === "Mobile") return Smartphone;
    return Cpu;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="eyebrow text-copper">Hardware & IT Inventory</span>
          <h1 className="text-2xl font-bold text-ink tracking-tight mt-0.5">
            Company Assets & Equipment Tracking
          </h1>
          <p className="text-xs text-muted mt-1">
            Maintain workstation hardware, security tokens, monitors, serial numbers, and employee custody.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="bg-copper text-[#080A0F] font-bold text-xs gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Add Asset to Inventory
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {["ALL", "AVAILABLE", "ASSIGNED", "IN_REPAIR"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === st
                ? "bg-copper text-[#080A0F] shadow-sm"
                : "bg-surface border border-line text-muted hover:text-ink"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">Loading hardware inventory...</div>
        ) : assets.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-muted">No assets found.</div>
        ) : (
          assets.map((asset: any) => {
            const Icon = getAssetIcon(asset.assetType);
            return (
              <div
                key={asset.id}
                className="rounded-2xl border border-line bg-surface p-5 space-y-4 hover:border-copper/60 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-xl bg-surface-2 text-copper">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge tone={asset.status === "ASSIGNED" ? "success" : asset.status === "AVAILABLE" ? "info" : "neutral"}>
                      {asset.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-ink">{asset.name}</h3>
                    <p className="text-[11px] font-mono text-muted">Serial: {asset.serialNumber}</p>
                  </div>

                  <div className="text-xs text-muted space-y-1 pt-2 border-t border-line">
                    <div>Condition: <strong className="text-ink">{asset.condition}</strong></div>
                    {asset.cost && <div>Value: <strong className="font-mono text-ink">${asset.cost?.toLocaleString()}</strong></div>}
                    {asset.assignedTo && (
                      <div className="text-emerald-400 font-semibold pt-1">
                        Assigned to: {asset.assignedTo.name} ({asset.assignedTo.employeeCode})
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-line flex items-center justify-between gap-2">
                  {asset.status === "AVAILABLE" ? (
                    <div className="flex items-center gap-2 w-full">
                      <Button
                        onClick={() => setAssigningAsset(asset)}
                        className="h-8 text-xs font-bold bg-copper text-[#080A0F] gap-1 flex-1"
                      >
                        <UserCheck className="h-3.5 w-3.5" /> Assign to Employee
                      </Button>
                      <button
                        onClick={() => setEditingAsset(asset)}
                        className="p-2 rounded-lg border border-line text-muted hover:text-ink cursor-pointer h-8 w-8 flex items-center justify-center"
                        title="Edit Asset Details"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => returnMut.mutate(asset.id)}
                          className="px-3 py-1.5 rounded-lg border border-line bg-canvas hover:bg-surface-2 text-xs font-bold text-ink cursor-pointer flex items-center gap-1"
                        >
                          <RotateCcw className="h-3 w-3" /> Return Asset
                        </button>
                        <button
                          onClick={() => setEditingAsset(asset)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-ink cursor-pointer"
                          title="Edit Asset Details"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => deleteMut.mutate(asset.id)}
                        className="p-1.5 text-muted hover:text-red-600 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Assign Modal Drawer */}
      <Drawer
        open={!!assigningAsset}
        onClose={() => setAssigningAsset(null)}
        title={`Assign Asset: ${assigningAsset?.name}`}
        description="Select employee recipient for hardware assignment."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setAssigningAsset(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                assigningAsset &&
                assignMut.mutate({ id: assigningAsset.id, employeeId: Number(selectedEmpId) })
              }
              disabled={assignMut.isPending || !selectedEmpId}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Confirm Assignment
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <label className="text-xs font-bold text-ink block mb-1">Select Employee *</label>
          <select
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            className="field"
          >
            <option value="">-- Choose Employee --</option>
            {employees.map((e: any) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.employeeCode} - {e.department?.name})
              </option>
            ))}
          </select>
        </div>
      </Drawer>

      {/* Create Asset Drawer */}
      <Drawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Hardware Asset to Pool"
        description="Catalog new laptops, monitors, or security tokens."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                createMut.mutate(formData);
              }}
              disabled={createMut.isPending || !formData.name || !formData.serialNumber}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Add Asset
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink block mb-1">Asset Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Asset Category</label>
              <select
                value={formData.assetType}
                onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
                className="field"
              >
                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Security Card">Security Card / Key</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Serial Number *</label>
              <input
                type="text"
                required
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                className="field font-mono"
              />
            </div>
          </div>
        </form>
      </Drawer>

      {/* Edit Asset Drawer */}
      <Drawer
        open={!!editingAsset}
        onClose={() => setEditingAsset(null)}
        title={`Edit Hardware Asset: ${editingAsset?.name}`}
        description="Update serial number, asset category, physical condition, and notes."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditingAsset(null)}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                editingAsset && updateAssetMut.mutate({ id: editingAsset.id, data: editingAsset });
              }}
              disabled={updateAssetMut.isPending || !editingAsset?.name}
              className="bg-copper text-[#080A0F] font-bold"
            >
              Save Asset Updates
            </Button>
          </div>
        }
      >
        {editingAsset && (
          <form className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink block mb-1">Asset Name *</label>
              <input
                type="text"
                value={editingAsset.name || ""}
                onChange={(e) => setEditingAsset({ ...editingAsset, name: e.target.value })}
                className="field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Asset Category</label>
                <select
                  value={editingAsset.assetType || "Laptop"}
                  onChange={(e) => setEditingAsset({ ...editingAsset, assetType: e.target.value })}
                  className="field"
                >
                  <option value="Laptop">Laptop</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Security Card">Security Card / Key</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Serial Number *</label>
                <input
                  type="text"
                  value={editingAsset.serialNumber || ""}
                  onChange={(e) => setEditingAsset({ ...editingAsset, serialNumber: e.target.value })}
                  className="field font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Physical Condition</label>
                <select
                  value={editingAsset.condition || "EXCELLENT"}
                  onChange={(e) => setEditingAsset({ ...editingAsset, condition: e.target.value })}
                  className="field"
                >
                  <option value="EXCELLENT">Excellent (Like New)</option>
                  <option value="GOOD">Good (Minor Wear)</option>
                  <option value="FAIR">Fair (Needs Service)</option>
                  <option value="DAMAGED">Damaged / Retired</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Procurement Cost ($ USD)</label>
                <input
                  type="number"
                  value={editingAsset.cost || 0}
                  onChange={(e) => setEditingAsset({ ...editingAsset, cost: Number(e.target.value) })}
                  className="field font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-ink block mb-1">Asset Notes & Custody Remarks</label>
              <textarea
                rows={3}
                value={editingAsset.notes || ""}
                onChange={(e) => setEditingAsset({ ...editingAsset, notes: e.target.value })}
                className="field"
              />
            </div>
          </form>
        )}
      </Drawer>
    </div>
  );
}
