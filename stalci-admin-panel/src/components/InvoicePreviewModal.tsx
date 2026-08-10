"use client";
import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Printer,
  X,
  Layers,
  Send,
  Copy,
  Download,
  Building,
  CheckCircle2,
  FileCheck2,
  Edit3,
  Sliders,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";

interface InvoicePreviewModalProps {
  invoice: any;
  templates?: any[];
  open: boolean;
  onClose: () => void;
}

export function InvoicePreviewModal({
  invoice: initialInvoice,
  templates = [],
  open,
  onClose,
}: InvoicePreviewModalProps) {
  const [selectedTemplateSlug, setSelectedTemplateSlug] = useState<string>(
    initialInvoice?.template?.slug || "modern-clean"
  );
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [stampColor, setStampColor] = useState<"gold" | "blue" | "emerald" | "crimson">("gold");
  const [signatoryName, setSignatoryName] = useState("Abhishek Kumar");
  const [signatoryTitle, setSignatoryTitle] = useState("Founder & Managing Director");

  // Editable invoice state
  const [invoice, setInvoice] = useState<any>(initialInvoice || {});
  const scrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    fetch("/api/cms/config")
      .then((r) => r.json())
      .then((cfg) => {
        if (cfg?.companySignatoryName) setSignatoryName(cfg.companySignatoryName);
        if (cfg?.companySignatoryTitle) setSignatoryTitle(cfg.companySignatoryTitle);
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    if (initialInvoice) {
      setInvoice({
        ...initialInvoice,
        client: initialInvoice.client || {
          name: "Elena Rostova",
          company: "Apex Global Logistics",
          email: "elena@apexlogistics.de",
          address: "Friedrichstraße 68, 10117 Berlin, Germany",
          phone: "+49 30 901820",
        },
        items:
          initialInvoice.items && initialInvoice.items.length > 0
            ? initialInvoice.items
            : [
                {
                  description: "Distributed Telemetry Engine & Multi-Cloud Observability",
                  quantity: 1,
                  unitPrice: initialInvoice.total || 57120,
                  amount: initialInvoice.total || 57120,
                },
              ],
        notes:
          initialInvoice.notes ||
          "Payment settled via international SWIFT wire transfer within 30 days. IP ownership transfers upon final settlement.",
        paymentDetails:
          initialInvoice.paymentDetails ||
          "SWIFT: COBADEFFXXX • IBAN: DE89 3704 0044 0532 0130 00 • Silicon Valley Bank",
      });
    }
  }, [initialInvoice]);

  if (!open || !invoice) return null;

  const client = invoice.client || {};
  const items = invoice.items || [];
  const currencySymbol =
    invoice.currency === "EUR" ? "€" : invoice.currency === "GBP" ? "£" : "$";

  // Re-calculate totals dynamically
  const subtotal = items.reduce(
    (acc: number, it: any) => acc + Number(it.amount || it.quantity * it.unitPrice || 0),
    0
  );
  const taxRate = Number(invoice.taxRate ?? 10);
  const discount = Number(invoice.discount ?? 0);
  const taxAmount = ((subtotal - discount) * taxRate) / 100;
  const total = subtotal - discount + taxAmount;

  // Dedicated Print Function
  const handlePrint = () => {
    const printElement = document.getElementById("invoice-printable-document");
    if (!printElement) {
      window.print();
      return;
    }

    const printWindow = window.open("", "_blank", "width=960,height=1100");
    if (!printWindow) {
      toast.error("Please allow popups to print invoices directly.");
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Invoice ${invoice.invoiceNumber || "STALCI"} — Official Statement</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,700&family=Caveat:wght@700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 12mm;
            }
            body {
              font-family: 'Inter', -apple-system, sans-serif;
              background-color: #ffffff !important;
              color: #0f172a !important;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-wrapper {
              width: 100%;
              max-width: 840px;
              margin: 0 auto;
              padding: 10px;
            }
            .sig-font {
              font-family: 'Caveat', cursive, serif;
            }
          </style>
        </head>
        <body>
          <div class="print-wrapper">
            ${printElement.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.focus();
              setTimeout(function() {
                window.print();
                window.close();
              }, 350);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/invoices?view=${invoice.invoiceNumber || invoice.id}`;
    navigator.clipboard.writeText(link);
    toast.success("Invoice link copied to clipboard!");
  };

  const handleSendToClient = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.invoiceNumber} from STALCI Technologies`);
    const body = encodeURIComponent(
      `Dear ${client.name || client.company},\n\nPlease find attached the billing statement for invoice ${
        invoice.invoiceNumber
      } with a total due of ${currencySymbol}${Number(total).toLocaleString()} ${
        invoice.currency || "USD"
      }.\n\nIssue Date: ${new Date(invoice.issueDate || Date.now()).toLocaleDateString()}\nDue Date: ${new Date(
        invoice.dueDate || Date.now()
      ).toLocaleDateString()}\n\nPayment Wire Reference:\n${
        invoice.paymentDetails
      }\n\nThank you for your enterprise partnership with STALCI.\n\nBest regards,\n${signatoryName}\n${signatoryTitle}\nSTALCI Global Technologies Inc.`
    );

    window.open(`mailto:${client.email || ""}?subject=${subject}&body=${body}`, "_blank");
    toast.success("Email client opened with invoice details!");
  };

  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...items,
        {
          description: "New Engineering Service / Milestone",
          quantity: 1,
          unitPrice: 5000,
          amount: 5000,
        },
      ],
    });
  };

  const handleRemoveItem = (idx: number) => {
    setInvoice({
      ...invoice,
      items: items.filter((_: any, i: number) => i !== idx),
    });
  };

  const handleItemChange = (idx: number, field: string, value: any) => {
    const next = [...items];
    next[idx][field] = value;
    if (field === "quantity" || field === "unitPrice") {
      next[idx].amount = Number(next[idx].quantity || 1) * Number(next[idx].unitPrice || 0);
    }
    setInvoice({ ...invoice, items: next });
  };

  // Official STALCI Sovereign Company Logo SVG
  const StalciBrandLogo = ({ isDark = false }: { isDark?: boolean }) => (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-900/40 border border-amber-500/50 flex items-center justify-center p-2 shadow-sm shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <linearGradient id="invSovereignLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5C082" />
              <stop offset="50%" stopColor="#D89B5B" />
              <stop offset="100%" stopColor="#9E6229" />
            </linearGradient>
          </defs>
          <path d="M 60 22 L 88 38 L 74 46 L 46 30 Z" fill="url(#invSovereignLogo)" />
          <path d="M 32 46 L 74 46 L 88 54 L 46 70 L 32 62 Z" fill="url(#invSovereignLogo)" opacity="0.95" />
          <path d="M 46 70 L 74 86 L 60 98 L 32 82 Z" fill="url(#invSovereignLogo)" />
          <polygon points="60,48 70,60 60,72 50,60" fill="#FFFFFF" />
        </svg>
      </div>
      <div>
        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          STALCI
        </h1>
        <p className="text-[9.5px] uppercase font-bold tracking-[0.24em] text-amber-700">
          Global Technology & Cloud Systems
        </p>
      </div>
    </div>
  );

  // Official Stamp Seal Component with Selectable Colors
  const StampSeal = () => {
    const stampStyles = {
      gold: "border-amber-600/80 bg-amber-500/10 text-amber-900 text-amber-800",
      blue: "border-blue-700/80 bg-blue-600/10 text-blue-950 text-blue-800",
      emerald: "border-emerald-700/80 bg-emerald-600/10 text-emerald-950 text-emerald-800",
      crimson: "border-red-700/80 bg-red-600/10 text-red-950 text-red-800",
    };

    return (
      <div className="flex items-center gap-4">
        <div
          className={`relative flex items-center justify-center h-28 w-28 rounded-full border-2 border-dashed p-1.5 select-none rotate-[-6deg] shadow-xs ${
            stampStyles[stampColor]
          }`}
        >
          <div className="h-full w-full rounded-full border border-current/40 flex flex-col items-center justify-center p-1.5 text-center">
            <span className="text-[7px] font-extrabold uppercase tracking-widest leading-none">
              ★ STALCI GLOBAL ★
            </span>
            <span className="text-[9.5px] font-black tracking-wider my-0.5">
              CERTIFIED
            </span>
            <span className="text-[6.5px] font-bold tracking-tight leading-none">
              OFFICIAL FINANCIAL SEAL
            </span>
            <span className="text-[6px] font-mono opacity-80 mt-0.5">
              AUTH ID: ST-{invoice.invoiceNumber || "2026"}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 space-y-0.5">
          <p className="font-bold text-slate-800 flex items-center gap-1">
            <FileCheck2 className="h-3.5 w-3.5 text-emerald-600" /> Duly Authorized Financial Instrument
          </p>
          <p>STALCI Global Technologies Inc.</p>
          <p className="font-mono text-[10px]">Tax ID: US-EIN-94-3829104</p>
        </div>
      </div>
    );
  };

  // Abhishek Kumar Official Signature
  const SignatureSection = ({ isDark = false }: { isDark?: boolean }) => (
    <div className="text-right space-y-1 sm:min-w-[200px]">
      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
        Authorized Signatory
      </span>
      <div
        className={`text-2xl sm:text-3xl font-bold tracking-wide italic select-none py-1 ${
          isDark ? "text-amber-400" : "text-slate-900"
        }`}
        style={{ fontFamily: "'Caveat', 'Playfair Display', cursive, serif" }}
      >
        {signatoryName}
      </div>
      <div className={`h-0.5 w-36 ml-auto my-1 ${isDark ? "bg-amber-500/60" : "bg-slate-900/80"}`} />
      <p className={`text-xs font-bold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
        {signatoryName}
      </p>
      <p className={`text-[10.5px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        {signatoryTitle}
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        onWheel={(e) => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop += e.deltaY;
          }
        }}
        className="relative w-full max-w-5xl bg-canvas rounded-2xl shadow-2xl border border-line flex flex-col h-[94vh] max-h-[94vh] overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-line bg-surface shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-copper/20 text-copper flex items-center justify-center font-bold text-xs border border-copper/30">
              INV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-ink">{invoice.invoiceNumber || "INV-SAMPLE"}</h3>
                <Badge
                  tone={
                    invoice.status === "PAID"
                      ? "success"
                      : invoice.status === "SENT"
                      ? "info"
                      : invoice.status === "OVERDUE"
                      ? "danger"
                      : "neutral"
                  }
                >
                  {invoice.status || "DRAFT"}
                </Badge>
              </div>
              <p className="text-[11px] text-muted truncate max-w-xs">{client.company || client.name}</p>
            </div>
          </div>

          {/* Controls & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Interactive Editor Toggle */}
            <button
              onClick={() => setIsEditorMode(!isEditorMode)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isEditorMode
                  ? "border-copper bg-copper text-slate-950 font-bold shadow-xs"
                  : "border-line bg-canvas text-ink hover:border-copper/40"
              }`}
            >
              {isEditorMode ? <Eye className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5 text-copper" />}
              <span>{isEditorMode ? "Preview Mode" : "Edit Live"}</span>
            </button>

            {/* Template Switcher */}
            <div className="flex items-center gap-1.5 bg-canvas px-2.5 py-1 rounded-xl border border-line">
              <Layers className="h-3.5 w-3.5 text-copper" />
              <span className="text-[11px] font-semibold text-muted hidden sm:inline">Template:</span>
              <select
                value={selectedTemplateSlug}
                onChange={(e) => setSelectedTemplateSlug(e.target.value)}
                className="bg-transparent text-xs font-bold text-ink outline-none cursor-pointer"
              >
                <option value="modern-clean">Modern Clean</option>
                <option value="minimalist-slate">Minimalist Slate</option>
                <option value="corporate-navy">Corporate Navy</option>
                <option value="luxury-obsidian-gold">Luxury Obsidian Gold</option>
              </select>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl border border-line bg-canvas text-xs font-semibold text-ink hover:border-copper/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy client link"
            >
              <Copy className="h-3.5 w-3.5 text-copper" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>

            <button
              onClick={handleSendToClient}
              className="px-3 py-1.5 rounded-xl bg-copper/15 border border-copper/30 text-copper-deep text-xs font-bold hover:bg-copper/25 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Send to client via email"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Invoice</span>
            </button>

            <Button
              onClick={handlePrint}
              className="text-xs gap-1.5 bg-ink text-white hover:bg-ink/90 shadow-sm cursor-pointer font-bold"
            >
              <Printer className="h-3.5 w-3.5" /> Print / PDF
            </Button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-line text-muted hover:text-ink hover:bg-canvas transition-colors ml-1 cursor-pointer"
              title="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Live Invoice Customizer Bar (Shown in Editor Mode) */}
        {isEditorMode && (
          <div className="bg-surface-2 border-b border-line px-6 py-3 shrink-0 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="font-bold text-ink block mb-0.5 text-[11px]">Stamp Color:</label>
                <div className="flex items-center gap-1.5">
                  {(["gold", "blue", "emerald", "crimson"] as const).map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setStampColor(col)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                        stampColor === col
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-surface text-muted border border-line"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-ink block mb-0.5 text-[11px]">Signatory Name:</label>
                <input
                  type="text"
                  value={signatoryName}
                  onChange={(e) => setSignatoryName(e.target.value)}
                  className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-0.5 text-[11px]">Tax Rate (%):</label>
                <input
                  type="number"
                  value={invoice.taxRate ?? 10}
                  onChange={(e) => setInvoice({ ...invoice, taxRate: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink font-mono"
                />
              </div>
            </div>

            <Button onClick={handleAddItem} className="text-xs gap-1.5 bg-copper text-slate-950 font-bold">
              <Plus className="h-3.5 w-3.5" /> Add Line Item
            </Button>
          </div>
        )}

        {/* Scrollable Printable Invoice Content */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto scrollable-y p-4 sm:p-8 bg-[#F1F3F7] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div
            id="invoice-printable-document"
            className="print-target bg-white text-slate-900 mx-auto max-w-4xl rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12 transition-all"
          >
            {/* --- TEMPLATE 1: MODERN CLEAN --- */}
            {selectedTemplateSlug === "modern-clean" && (
              <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
                  <div>
                    <StalciBrandLogo />
                    <div className="mt-4 text-xs text-slate-500 space-y-0.5">
                      <p>550 Howard Street, Suite 400</p>
                      <p>San Francisco, CA 94105, USA</p>
                      <p>Tax ID: US-EIN-94-3829104 • billing@stalci.com</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-amber-50 text-amber-800 border border-amber-200">
                      {invoice.status || "PENDING"}
                    </span>
                    <h2 className="mt-2 text-xl font-mono font-bold text-slate-900">
                      {invoice.invoiceNumber || "INV-2026-001"}
                    </h2>
                    <div className="mt-2 text-xs text-slate-500 space-y-1 font-mono">
                      <p>
                        Issue Date:{" "}
                        <span className="text-slate-900 font-semibold">
                          {new Date(invoice.issueDate || Date.now()).toLocaleDateString()}
                        </span>
                      </p>
                      <p>
                        Due Date:{" "}
                        <span className="text-amber-700 font-semibold">
                          {new Date(invoice.dueDate || Date.now()).toLocaleDateString()}
                        </span>
                      </p>
                      {invoice.project?.title && (
                        <p className="text-[11px] text-slate-600">Project: {invoice.project.title}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billed To Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block mb-1">
                      Billed To
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{client.name}</h4>
                    {client.company && (
                      <p className="text-xs font-semibold text-slate-700">{client.company}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">{client.address || "Client Address On File"}</p>
                    <p className="text-xs text-slate-500">{client.email}</p>
                    {client.phone && <p className="text-xs text-slate-500">{client.phone}</p>}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block mb-1">
                      Payment Terms & Wire Reference
                    </span>
                    <p className="text-xs text-slate-700 font-semibold">Net 30 Calendar Days</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Currency:{" "}
                      <span className="font-mono font-bold text-slate-900">{invoice.currency || "USD"}</span>
                    </p>
                    <p className="text-xs text-slate-600 mt-1 font-mono text-[11px]">
                      {invoice.paymentDetails}
                    </p>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b-2 border-slate-900 text-slate-900 uppercase tracking-wider text-[10px] font-bold">
                        <th className="py-3 px-2">Description / Scope of Work</th>
                        <th className="py-3 px-2 text-center w-20">Qty</th>
                        <th className="py-3 px-2 text-right w-28">Rate ({currencySymbol})</th>
                        <th className="py-3 px-2 text-right w-28">Amount ({currencySymbol})</th>
                        {isEditorMode && <th className="py-3 px-2 text-center w-12">Action</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {items.map((it: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-4 px-2 font-medium text-slate-800">
                            {isEditorMode ? (
                              <input
                                type="text"
                                value={it.description}
                                onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                                className="w-full rounded border border-line px-2 py-1 text-xs"
                              />
                            ) : (
                              it.description
                            )}
                          </td>
                          <td className="py-4 px-2 text-center font-mono text-slate-600">
                            {isEditorMode ? (
                              <input
                                type="number"
                                value={it.quantity}
                                onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                                className="w-14 rounded border border-line px-1 py-1 text-xs text-center font-mono"
                              />
                            ) : (
                              it.quantity
                            )}
                          </td>
                          <td className="py-4 px-2 text-right font-mono text-slate-600">
                            {isEditorMode ? (
                              <input
                                type="number"
                                value={it.unitPrice}
                                onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                                className="w-24 rounded border border-line px-1 py-1 text-xs text-right font-mono"
                              />
                            ) : (
                              Number(it.unitPrice).toLocaleString()
                            )}
                          </td>
                          <td className="py-4 px-2 text-right font-mono font-bold text-slate-900">
                            {Number(it.amount || it.quantity * it.unitPrice).toLocaleString()}
                          </td>
                          {isEditorMode && (
                            <td className="py-4 px-2 text-center">
                              <button
                                onClick={() => handleRemoveItem(idx)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals Summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500 max-w-sm space-y-2">
                    <div>
                      <span className="font-bold text-slate-700 block">Payment Notes:</span>
                      <p>{invoice.notes}</p>
                    </div>
                  </div>

                  <div className="w-full sm:w-72 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {currencySymbol}
                        {Number(subtotal).toLocaleString()}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span className="font-mono font-semibold">
                          -{currencySymbol}
                          {Number(discount).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {taxAmount > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Tax ({taxRate}%)</span>
                        <span className="font-mono font-semibold text-slate-900">
                          +{currencySymbol}
                          {Number(taxAmount).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t-2 border-slate-900 text-base font-bold text-slate-900">
                      <span>Total Due</span>
                      <span className="font-mono text-amber-700 font-extrabold">
                        {currencySymbol}
                        {Number(total).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stamp Seal & Signature */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200 mt-8">
                  <StampSeal />
                  <SignatureSection />
                </div>
              </div>
            )}

            {/* --- TEMPLATE 2: MINIMALIST SLATE --- */}
            {selectedTemplateSlug === "minimalist-slate" && (
              <div className="space-y-8 font-sans">
                <div className="flex justify-between items-start border-b border-slate-900 pb-6">
                  <div>
                    <StalciBrandLogo />
                    <p className="text-xs text-slate-500 font-mono mt-3">INVOICE #{invoice.invoiceNumber}</p>
                  </div>
                  <div className="text-right text-xs space-y-0.5 font-mono">
                    <p className="font-bold text-slate-900 uppercase tracking-widest">{invoice.status}</p>
                    <p className="text-slate-500">
                      Date: {new Date(invoice.issueDate || Date.now()).toLocaleDateString()}
                    </p>
                    <p className="text-slate-500">
                      Due: {new Date(invoice.dueDate || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Billed To</span>
                    <p className="font-bold text-slate-900 mt-1">{client.company || client.name}</p>
                    <p className="text-slate-600">{client.name}</p>
                    <p className="text-slate-500">{client.email}</p>
                    <p className="text-slate-500">{client.address}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Issuer</span>
                    <p className="font-bold text-slate-900 mt-1">STALCI Technologies Inc.</p>
                    <p className="text-slate-500">550 Howard St, San Francisco, CA</p>
                    <p className="text-slate-500">billing@stalci.com</p>
                  </div>
                </div>

                <table className="w-full text-left text-xs border-y border-slate-200">
                  <thead>
                    <tr className="text-slate-400 uppercase text-[9px] tracking-widest">
                      <th className="py-2.5">Item Description</th>
                      <th className="py-2.5 text-center">Qty</th>
                      <th className="py-2.5 text-right">Price</th>
                      <th className="py-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it: any, idx: number) => (
                      <tr key={idx}>
                        <td className="py-3 font-medium text-slate-900">{it.description}</td>
                        <td className="py-3 text-center">{it.quantity}</td>
                        <td className="py-3 text-right font-mono">
                          {currencySymbol}
                          {Number(it.unitPrice).toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-mono font-bold text-slate-900">
                          {currencySymbol}
                          {Number(it.amount || it.quantity * it.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end text-xs">
                  <div className="w-64 space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-mono">
                        {currencySymbol}
                        {Number(subtotal).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-900">
                      <span>Total Amount</span>
                      <span className="font-mono">
                        {currencySymbol}
                        {Number(total).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200 mt-8">
                  <StampSeal />
                  <SignatureSection />
                </div>
              </div>
            )}

            {/* --- TEMPLATE 3: CORPORATE NAVY --- */}
            {selectedTemplateSlug === "corporate-navy" && (
              <div className="space-y-6">
                <div className="bg-slate-900 text-white -m-8 sm:-m-12 p-8 sm:p-10 mb-8 rounded-t-2xl flex justify-between items-center">
                  <StalciBrandLogo isDark />
                  <div className="text-right">
                    <span className="text-xs uppercase font-mono tracking-widest text-blue-300">
                      STATEMENT OF ACCOUNT
                    </span>
                    <h2 className="text-xl font-bold font-mono">{invoice.invoiceNumber}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-bold text-slate-900">Client / Account:</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{client.name}</p>
                    <p className="text-slate-600">{client.company}</p>
                    <p className="text-slate-500">{client.email}</p>
                  </div>
                  <div className="text-right font-mono">
                    <p>Issue Date: {new Date(invoice.issueDate || Date.now()).toLocaleDateString()}</p>
                    <p className="font-bold text-amber-700">
                      Due Date: {new Date(invoice.dueDate || Date.now()).toLocaleDateString()}
                    </p>
                    <p>Status: {invoice.status}</p>
                  </div>
                </div>

                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Service / Milestone</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Rate</th>
                      <th className="py-2.5 px-3 text-right">Total ({currencySymbol})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {items.map((it: any, idx: number) => (
                      <tr key={idx}>
                        <td className="py-3 px-3 font-medium text-slate-900">{it.description}</td>
                        <td className="py-3 px-3 text-center">{it.quantity}</td>
                        <td className="py-3 px-3 text-right font-mono">
                          {Number(it.unitPrice).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold">
                          {Number(it.amount || it.quantity * it.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <div className="w-64 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-base text-slate-900 border-t-2 border-slate-900 pt-2">
                      <span>Total Balance:</span>
                      <span className="font-mono text-amber-700">
                        {currencySymbol}
                        {Number(total).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200 mt-8">
                  <StampSeal />
                  <SignatureSection />
                </div>
              </div>
            )}

            {/* --- TEMPLATE 4: LUXURY GOLD & OBSIDIAN --- */}
            {selectedTemplateSlug === "luxury-obsidian-gold" && (
              <div className="space-y-8 bg-slate-950 text-white -m-8 sm:-m-12 p-8 sm:p-12 rounded-2xl border border-amber-500/30">
                <div className="flex justify-between items-start border-b border-amber-500/20 pb-8">
                  <div>
                    <StalciBrandLogo isDark />
                    <p className="text-xs text-slate-400 mt-4">
                      550 Howard St, Suite 400, San Francisco • billing@stalci.com
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {invoice.status || "CONFIRMED"}
                    </span>
                    <h2 className="text-xl font-mono font-bold text-white mt-2">
                      {invoice.invoiceNumber}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      Due: {new Date(invoice.dueDate || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 bg-slate-900/60 p-5 rounded-xl border border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400/80">Client Partner</span>
                    <p className="text-sm font-bold text-white mt-1">{client.name}</p>
                    <p className="text-slate-300">{client.company}</p>
                    <p className="text-slate-400">{client.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400/80">Wire Transfer Settlement</span>
                    <p className="text-slate-300 mt-1 font-mono text-[11px]">
                      {invoice.paymentDetails}
                    </p>
                  </div>
                </div>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-amber-500/30 text-amber-400 uppercase text-[10px] tracking-wider">
                      <th className="py-3">Deliverable / Scope</th>
                      <th className="py-3 text-center">Qty</th>
                      <th className="py-3 text-right">Rate</th>
                      <th className="py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {items.map((it: any, idx: number) => (
                      <tr key={idx}>
                        <td className="py-3.5 text-slate-200">{it.description}</td>
                        <td className="py-3.5 text-center text-slate-400">{it.quantity}</td>
                        <td className="py-3.5 text-right font-mono text-slate-300">
                          {currencySymbol}
                          {Number(it.unitPrice).toLocaleString()}
                        </td>
                        <td className="py-3.5 text-right font-mono font-bold text-white">
                          {currencySymbol}
                          {Number(it.amount || it.quantity * it.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end pt-4 border-t border-amber-500/20">
                  <div className="w-72 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-base text-white border-t border-amber-500/40 pt-3">
                      <span>Total Payable:</span>
                      <span className="font-mono text-amber-400 font-extrabold">
                        {currencySymbol}
                        {Number(total).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-amber-500/20 mt-8">
                  <StampSeal />
                  <SignatureSection isDark />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
