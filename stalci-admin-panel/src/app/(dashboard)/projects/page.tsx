"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProjects,
  fetchClients,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import {
  FolderKanban,
  Plus,
  Search,
  ExternalLink,
  GitBranch,
  Star,
  Edit2,
  Trash2,
  Building,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    fullDescription: "",
    category: "Cloud & Platform",
    clientId: "",
    services: "Cloud Engineering, AI & Agentic Systems",
    technologies: "Go, Rust, Kubernetes, React",
    startDate: "",
    endDate: "",
    deadline: "",
    budget: 50000,
    status: "IN_PROGRESS",
    priority: "HIGH",
    progress: 50,
    featured: true,
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    metrics: JSON.stringify([
      { label: "Performance", value: "+300%" },
      { label: "Uptime", value: "99.99%" },
    ]),
    clientFeedback: "",
  });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => {
      const payload = {
        ...data,
        services: typeof data.services === "string" ? data.services.split(",").map((s: string) => s.trim()) : data.services,
        technologies: typeof data.technologies === "string" ? data.technologies.split(",").map((s: string) => s.trim()) : data.technologies,
      };
      return createProject(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Project created successfully");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to create project"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => {
      const payload = {
        ...data,
        services: typeof data.services === "string" ? data.services.split(",").map((s: string) => s.trim()) : data.services,
        technologies: typeof data.technologies === "string" ? data.technologies.split(",").map((s: string) => s.trim()) : data.technologies,
      };
      return updateProject(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated");
      setIsFormOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update project"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Project deleted");
      setDeletingProjectId(null);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to delete project"),
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: ({ id, featured }: { id: number; featured: boolean }) =>
      updateProject(id, { featured }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Featured status updated");
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      fullDescription: "",
      category: "Cloud & Platform",
      clientId: "",
      services: "Cloud Engineering, AI & Agentic Systems",
      technologies: "Go, Rust, Kubernetes, React",
      startDate: "",
      endDate: "",
      deadline: "",
      budget: 50000,
      status: "IN_PROGRESS",
      priority: "HIGH",
      progress: 50,
      featured: true,
      imageUrl: "",
      liveUrl: "",
      githubUrl: "",
      metrics: JSON.stringify([
        { label: "Performance", value: "+300%" },
        { label: "Uptime", value: "99.99%" },
      ]),
      clientFeedback: "",
    });
    setEditingProject(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditingProject(p);

    let parsedServices = "";
    if (typeof p.services === "string") {
      try {
        const arr = JSON.parse(p.services);
        parsedServices = Array.isArray(arr) ? arr.join(", ") : p.services;
      } catch {
        parsedServices = p.services;
      }
    } else if (Array.isArray(p.services)) {
      parsedServices = p.services.join(", ");
    }

    let parsedTech = "";
    if (typeof p.technologies === "string") {
      try {
        const arr = JSON.parse(p.technologies);
        parsedTech = Array.isArray(arr) ? arr.join(", ") : p.technologies;
      } catch {
        parsedTech = p.technologies;
      }
    } else if (Array.isArray(p.technologies)) {
      parsedTech = p.technologies.join(", ");
    }

    setFormData({
      title: p.title || "",
      slug: p.slug || "",
      description: p.description || "",
      fullDescription: p.fullDescription || "",
      category: p.category || "Cloud & Platform",
      clientId: p.clientId ? String(p.clientId) : "",
      services: parsedServices,
      technologies: parsedTech,
      startDate: p.startDate ? new Date(p.startDate).toISOString().slice(0, 10) : "",
      endDate: p.endDate ? new Date(p.endDate).toISOString().slice(0, 10) : "",
      deadline: p.deadline ? new Date(p.deadline).toISOString().slice(0, 10) : "",
      budget: p.budget || 0,
      status: p.status || "IN_PROGRESS",
      priority: p.priority || "HIGH",
      progress: p.progress || 0,
      featured: Boolean(p.featured),
      imageUrl: p.imageUrl || "",
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      metrics: typeof p.metrics === "string" ? p.metrics : JSON.stringify(p.metrics || []),
      clientFeedback: p.clientFeedback || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Project title and description are required");
      return;
    }
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredProjects = projects.filter((p: any) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.client?.company && p.client.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    "All",
    "AI & Machine Learning",
    "Cloud & Platform",
    "Custom Software",
    "Cyber Security",
    "Enterprise SaaS",
    "Web & Mobile",
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Engineering & Delivery</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">Projects Pipeline</h1>
          <p className="mt-1 text-sm text-muted">
            Track client engagements, milestone progress, budgets, and portfolio showcase status.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Create New Project
        </Button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search projects, client or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="field pl-9"
          />
        </div>

        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                categoryFilter === cat
                  ? "bg-ink text-white"
                  : "bg-surface border border-line text-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-line bg-surface shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-line text-muted uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-5 py-3.5">Project & Client</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Delivery Progress</th>
                <th className="px-5 py-3.5">Budget</th>
                <th className="px-5 py-3.5">Status & Priority</th>
                <th className="px-5 py-3.5">Featured</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredProjects.map((p: any) => {
                let techList: string[] = [];
                try {
                  techList = typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies || [];
                } catch {
                  techList = [];
                }

                return (
                  <tr key={p.id} className="hover:bg-canvas/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="h-10 w-10 rounded-xl object-cover border border-line shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-xl bg-copper-wash text-copper-deep font-bold flex items-center justify-center border border-copper/20 shrink-0">
                            <FolderKanban className="h-5 w-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-ink text-sm flex items-center gap-1.5">
                            {p.title}
                          </div>
                          <div className="text-muted text-[11px] flex items-center gap-1 mt-0.5">
                            <Building className="h-3 w-3" />
                            {p.client?.company || p.client?.name || "Direct Engagement"}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {techList.slice(0, 3).map((t: string) => (
                              <span
                                key={t}
                                className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-canvas border border-line text-muted"
                              >
                                {t}
                              </span>
                            ))}
                            {techList.length > 3 && (
                              <span className="text-[9px] text-muted self-center">
                                +{techList.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-canvas border border-line text-ink">
                        {p.category}
                      </span>
                    </td>

                    <td className="px-5 py-4 w-44">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium text-ink">
                          <span>{p.progress}%</span>
                          <span className="text-[10px] text-muted">{p.progress === 100 ? "Complete" : "In Flight"}</span>
                        </div>
                        <div className="w-full bg-line rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              p.progress === 100 ? "bg-emerald-500" : "bg-copper"
                            }`}
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-ink text-sm">
                        ${Number(p.budget || 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <Badge
                          tone={
                            p.status === "COMPLETED"
                              ? "success"
                              : p.status === "IN_PROGRESS"
                              ? "info"
                              : p.status === "REVIEW"
                              ? "warn"
                              : "neutral"
                          }
                        >
                          {p.status}
                        </Badge>
                        <div className="text-[10px] text-muted font-medium">
                          Priority: <span className="font-semibold text-ink">{p.priority}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          toggleFeaturedMutation.mutate({ id: p.id, featured: !p.featured })
                        }
                        className={`p-1.5 rounded-lg border transition-colors ${
                          p.featured
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                            : "border-line text-muted hover:text-ink"
                        }`}
                        title={p.featured ? "Featured on Landing Page" : "Click to feature"}
                      >
                        <Star className={`h-4 w-4 ${p.featured ? "fill-amber-500" : ""}`} />
                      </button>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-line text-muted hover:text-copper hover:bg-copper-wash transition-colors"
                            title="Open live URL"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-line text-muted hover:text-ink hover:bg-canvas transition-colors"
                            title="Open GitHub"
                          >
                            <GitBranch className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-ink hover:bg-canvas transition-colors"
                          title="Edit project"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingProjectId(p.id)}
                          className="p-1.5 rounded-lg border border-line text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProjects.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No projects found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Form Drawer */}
      <Drawer
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProject ? "Edit Project Details" : "Create New Project"}
        width="w-full max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. StalciOps Cloud Platform"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Client Account</label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="field"
              >
                <option value="">-- Independent / Direct Project --</option>
                {clients.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.company ? `${c.company} (${c.name})` : c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="field"
              >
                {categories.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Total Budget ($)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Short Summary (Hero / Card) *</label>
            <textarea
              rows={2}
              required
              placeholder="Brief 1-2 sentence description of what was built and the main impact..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="field resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Full Case Study / Architecture Narrative</label>
            <textarea
              rows={4}
              placeholder="Detailed explanation of the technical problem, architectural solution, and engineering outcomes..."
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="field resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Delivery Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="field"
              >
                <option value="PLANNING">PLANNING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="REVIEW">REVIEW</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="ON_HOLD">ON_HOLD</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="field"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-ink">Progress: {formData.progress}%</label>
              <span className="text-[11px] text-muted">{formData.progress === 100 ? "Complete" : "Ongoing"}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              className="w-full accent-copper cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Technologies (comma-separated)</label>
              <input
                type="text"
                placeholder="Go, Rust, Kubernetes, React"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Service Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="Cloud Engineering, AI Systems"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Cover Image URL</label>
              <input
                type="text"
                placeholder="/projects/apnisabha-preview.jpg or https://..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Live Demo URL</label>
              <input
                type="text"
                placeholder="https://app.demo.com or /demo"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink block mb-1">GitHub URL</label>
              <input
                type="text"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink block mb-1">Key Impact Metrics (JSON array)</label>
            <textarea
              rows={2}
              placeholder='[{"label": "Cloud Cost", "value": "-38%"}, {"label": "Latency", "value": "4.2ms"}]'
              value={formData.metrics}
              onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
              className="field font-mono text-xs resize-none"
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-canvas border border-line">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 accent-copper rounded"
            />
            <label htmlFor="featuredCheck" className="text-xs font-semibold text-ink cursor-pointer">
              Feature this project on the public landing page portfolio showcase
            </label>
          </div>

          <div className="pt-4 border-t border-line flex justify-end gap-2.5">
            <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingProject ? "Save Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </Drawer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingProjectId}
        onClose={() => setDeletingProjectId(null)}
        onConfirm={() => deletingProjectId && deleteMutation.mutate(deletingProjectId)}
        title="Delete Project"
        description="Are you sure you want to delete this project from the database? This action cannot be undone."
        confirmText="Yes, Delete Project"
        danger
      />
    </div>
  );
}
