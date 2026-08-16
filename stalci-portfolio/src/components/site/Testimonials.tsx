"use client";

import { useState } from "react";
import { Quote, Star, CheckCircle2, X, Play, MessageSquarePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTestimonials, submitFeedback } from "@/lib/api";
import { BadgePill } from "./Brand";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  image: string;
  hasVideo?: boolean;
}

const clientDiaries: TestimonialItem[] = [
  {
    id: "michelle-lester",
    name: "Michelle Lester",
    role: "Operation Manager",
    company: "Primally Nourished",
    location: "USA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    hasVideo: true,
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
    hasVideo: false,
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
    hasVideo: true,
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
    hasVideo: false,
    quote:
      "Their dedicated multi-cloud pod optimized our AWS EKS Kubernetes clusters, reducing infrastructure expenses by 38% and accelerating deployment cadence from monthly releases to continuous daily delivery.",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const qc = useQueryClient();

  const { data: apiTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  const testimonialsList: TestimonialItem[] =
    apiTestimonials && apiTestimonials.length > 0
      ? apiTestimonials.map((t: any) => ({
          id: String(t.id),
          name: t.clientName,
          role: t.role || "Executive",
          company: t.company || "Enterprise Client",
          location: "Global",
          image: t.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
          hasVideo: false,
          quote: t.quote,
        }))
      : clientDiaries;

  const activeClient = testimonialsList[activeIndex] || testimonialsList[0];

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
      rating,
      comments: comments.trim(),
    });
  };

  return (
    <section id="testimonials" className="relative bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Standardized Header Section (Reference Match) ─── */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-zinc-950">Client Diaries</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-[32px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            Client <span className="font-extrabold text-black">Testimonials</span>
          </h2>

          <p className="text-xs sm:text-[13px] text-zinc-600 font-normal leading-relaxed max-w-xl mx-auto">
            Don't take our word for it. Here's what the founders and operators we've worked with have to say.
          </p>
        </div>

        {/* ─── Main Interactive Carousel Layout with Wider Spacing ─── */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Vertical Interactive Avatar Stack */}
          <div className="md:col-span-4 flex md:flex-col items-center justify-center gap-3">
            {clientDiaries.map((client, idx) => {
              const isActive = activeIndex === idx;

              return (
                <motion.button
                  key={client.id}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-24 h-24 sm:w-28 sm:h-28 ring-2 ring-zinc-950 ring-offset-2 shadow-lg"
                      : "w-12 h-12 sm:w-14 sm:h-14 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 border border-zinc-200"
                  }`}
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="h-full w-full object-cover object-center"
                  />
                  {isActive && client.hasVideo && (
                    <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-mono font-bold text-zinc-950 backdrop-blur-xs shadow-xs">
                        <Play className="h-2.5 w-2.5 fill-black" /> Play Video
                      </span>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: Large Featured Testimonial Card */}
          <div className="md:col-span-8">
            <div className="relative rounded-3xl border border-zinc-200/90 bg-[#F8FAFC] p-8 sm:p-12 shadow-sm flex flex-col justify-between min-h-[260px] overflow-hidden">
              
              {/* Giant Decorative Subtle SVG Quote Mark */}
              <div 
                className="absolute right-6 bottom-4 text-zinc-200/60 pointer-events-none select-none -z-0"
                aria-hidden
              >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" opacity="0.4">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote Content with Smooth Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClient.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 relative z-10"
                >
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-800 font-normal">
                    "{activeClient.quote}"
                  </p>

                  <div className="pt-4 border-t border-zinc-200/80">
                    <h4 className="font-display text-sm sm:text-base font-bold text-zinc-950">
                      {activeClient.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 font-normal mt-0.5">
                      {activeClient.role} @ {activeClient.company} - {activeClient.location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Bottom CTA to Submit Feedback */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setModalOpen(true);
              setSubmitted(false);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900 text-xs font-semibold px-5 py-2 transition-all shadow-2xs cursor-pointer"
          >
            <MessageSquarePlus className="h-3.5 w-3.5 text-zinc-500" />
            <span>Share Your Enterprise Experience</span>
          </button>
        </div>

      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-1 text-zinc-400 hover:text-zinc-950"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-zinc-950">Thank You</h3>
                <p className="text-xs text-zinc-600">Your review has been submitted for editorial moderation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-950">Submit Client Review</h3>
                  <p className="text-xs text-zinc-500">Your feedback helps shape our engineering roadmap.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-950">Your Name & Title</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan, Head of Engineering"
                    className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] px-3.5 py-2 text-xs text-zinc-950 outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-950">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star className={`h-4 w-4 ${star <= rating ? "text-amber-500 fill-amber-500" : "text-zinc-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-950">Review & Outcomes</label>
                  <textarea
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required
                    placeholder="Describe the speed, architecture quality, and business impact..."
                    className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] p-3 text-xs text-zinc-950 outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={feedbackMutation.isPending}
                  className="w-full rounded-full bg-black py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {feedbackMutation.isPending ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
