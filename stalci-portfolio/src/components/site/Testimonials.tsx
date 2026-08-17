"use client";

import { useState } from "react";
import { Star, CheckCircle2, X, MessageSquarePlus, Quote, ArrowRight, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTestimonials, submitFeedback } from "@/lib/api";
import { BadgePill } from "./Brand";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  image: string;
  rating: number;
  highlight: string;
  quote: string;
}

const clientReviews: TestimonialItem[] = [
  {
    id: "michelle-lester",
    name: "Michelle Lester",
    role: "Operations Director",
    company: "Primally Nourished",
    location: "United States",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    highlight: "5K+ Paid Subscribers Growth",
    quote:
      "STALCI has met every request we have given them. The team is working on our current project with recent technologies and provides great value for their work which has resulted into 5K+ paid subscribers within a short period.",
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Meridian Financial",
    location: "United Kingdom",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    highlight: "300% System Throughput Acceleration",
    quote:
      "STALCI engineered a scalable, zero-downtime lending architecture in four months. System throughput accelerated by 300% with absolutely zero audit discrepancies, allowing our team to pass SOC 2 compliance effortlessly.",
  },
  {
    id: "daniel-reyes",
    name: "Daniel Reyes",
    role: "VP of Engineering",
    company: "CareLoop Health",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    highlight: "Sub-15ms Private Semantic RAG",
    quote:
      "The STALCI sovereign AI division deployed an ultra-fast private RAG vector engine atop our clinical records, achieving sub-15ms semantic retrieval while satisfying all HIPAA and board-level data governance mandates.",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Head of Platform Architecture",
    company: "Loomex Retail",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    highlight: "38% Cloud Infrastructure Savings",
    quote:
      "Their dedicated multi-cloud pod optimized our AWS EKS Kubernetes clusters, reducing infrastructure expenses by 38% and accelerating deployment cadence from monthly releases to continuous daily delivery.",
  },
];

export function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const qc = useQueryClient();

  const { data: apiTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  const displayList: TestimonialItem[] =
    apiTestimonials && apiTestimonials.length > 0
      ? apiTestimonials.map((t: any, idx: number) => ({
          id: String(t.id || idx),
          name: t.clientName || t.name,
          role: t.role || "Executive Partner",
          company: t.company || "Enterprise Partner",
          location: t.location || "Global",
          image: t.avatarUrl || clientReviews[idx % clientReviews.length].image,
          rating: t.rating || 5,
          highlight: t.highlight || "Verified Production Impact",
          quote: t.quote || t.comments,
        }))
      : clientReviews;

  const feedbackMutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      setSubmitted(true);
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;
    feedbackMutation.mutate({
      name: name.trim() || "Anonymous Partner",
      rating: userRating,
      comments: comments.trim(),
    });
  };

  return (
    <section id="testimonials" className="relative bg-[#FFFFFF] py-16 sm:py-24 text-zinc-950 border-t border-zinc-200/90 overflow-hidden isolate">
      {/* Subtle Dot Mesh Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Section Header ─── */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="text-[10.5px] sm:text-[11.5px] font-mono text-zinc-950 font-semibold">
                Client Proof &amp; Verification
              </span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight leading-[1.18]">
            Trusted by Leaders Shipping at Scale
          </h2>

          <p className="text-xs sm:text-[13.5px] text-zinc-600 font-normal leading-relaxed max-w-xl mx-auto">
            Real feedback and measurable engineering outcomes from high-growth startups and global enterprises.
          </p>
        </div>

        {/* ─── 4-Card Structured Grid Layout with Vibrant Yellow Stars ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {displayList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="relative rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] hover:bg-white p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-zinc-300 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Top Row: Vibrant Gold/Yellow Stars + Impact Highlight Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  {/* Vibrant Gold Yellow Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= item.rating
                            ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                            : "text-zinc-200 fill-zinc-200"
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-bold font-mono text-zinc-900">
                      5.0
                    </span>
                  </div>

                  {/* Impact Highlight Badge */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>{item.highlight}</span>
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-[13.5px] text-zinc-700 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Bottom Executive Signature Strip */}
              <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-zinc-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-zinc-950 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-normal">
                      {item.role} &bull; <span className="font-semibold text-zinc-800">{item.company}</span>
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-[10.5px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-xs">
                  {item.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Bottom CTA to Submit Feedback ─── */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setModalOpen(true);
              setSubmitted(false);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-[#FAFAFC] hover:bg-zinc-100 text-zinc-900 text-xs font-semibold px-5 py-2.5 transition-all shadow-2xs cursor-pointer"
          >
            <MessageSquarePlus className="h-3.5 w-3.5 text-zinc-700" />
            <span>Share Your Experience</span>
          </button>
        </div>

      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-zinc-950">Review Received</h3>
                <p className="text-xs text-zinc-600">Thank you for your feedback. Our architectural team reviews all verified partner entries.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-950 font-display">Submit Verified Review</h3>
                  <p className="text-xs text-zinc-500">Your feedback helps shape our enterprise engineering roadmap.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-950">Your Name &amp; Title</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan, VP of Product"
                    className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] px-3.5 py-2 text-xs text-zinc-950 outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-950">Rating</label>
                  <div className="flex gap-1.5 pt-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star className={`h-5 w-5 ${star <= userRating ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" : "text-zinc-200 fill-zinc-200"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-950">Project Review &amp; Impact</label>
                  <textarea
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required
                    placeholder="Describe the speed, engineering quality, and ROI achieved..."
                    className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] p-3 text-xs text-zinc-950 outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={feedbackMutation.isPending}
                  className="w-full rounded-full bg-black py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {feedbackMutation.isPending ? "Submitting..." : "Publish Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
