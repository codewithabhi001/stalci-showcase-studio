import { useState } from "react";
import { Quote, Star, CheckCircle2, X, MessageSquarePlus } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTestimonials, submitFeedback } from "@/lib/api";

const staticTestimonials = [
  {
    quote:
      "STALCI engineered a scalable, mission-critical lending architecture in six months. System throughput accelerated by 300% with absolutely zero audit discrepancies, ensuring uncompromised compliance.",
    name: "Amara Osei",
    role: "Chief Technology Officer, Meridian Finance",
    rating: 5,
  },
  {
    quote:
      "The STALCI AI division deployed a production-grade RAG engine atop our clinical data lakes, achieving exceptional performance while satisfying our stringent board-level data governance mandates.",
    name: "Daniel Reyes",
    role: "VP of Engineering, CareLoop Health",
    rating: 5,
  },
  {
    quote:
      "Their elite cloud transformation pod optimized our AWS infrastructure, reducing total cost of ownership by 38% and accelerating deployment frequency from monthly cycles to continuous daily delivery.",
    name: "Priya Nair",
    role: "Head of Platform Architecture, Loomex Retail",
    rating: 5,
  },
];

export function Testimonials() {
  const headerRef = useScrollReveal();
  const staggerRef = useStaggerReveal();
  const qc = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: apiTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

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

  const testimonials: { quote: string; name: string; role: string; rating: number }[] =
    apiTestimonials && apiTestimonials.length > 0
      ? apiTestimonials.map((t: any) => ({
          quote: t.quote,
          name: t.clientName,
          role: t.company || t.role || "Client Partner",
          rating: t.rating || 5,
        }))
      : staticTestimonials;

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 text-slate-900 border-t border-slate-200/80">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Client Success & Feedback"
            title="Trusted For Mission-Critical Systems"
            subtitle="Strategic partnerships, highly measurable outcomes, and elite engineering teams driving digital transformation."
            tone="light"
            align="left"
          />

          <button
            onClick={() => {
              setModalOpen(true);
              setSubmitted(false);
            }}
            className="self-start md:self-auto shrink-0 inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="h-3.5 w-3.5" />
            Share Client Review
          </button>
        </div>

        <div ref={staggerRef} className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 sm:p-6 transition-all duration-200 hover:border-slate-400 hover:shadow-xs"
            >
              <div>
                <div className="flex gap-1 text-slate-400 mb-3">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-slate-700 text-slate-700" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-slate-300 mb-2" />
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">"{t.quote}"</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200">
                <p className="text-xs sm:text-sm font-bold text-slate-900">{t.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            data-lenis-prevent
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-950">Thank You for Your Feedback!</h3>
                <p className="mt-1.5 text-xs text-slate-600">
                  Your review has been securely transmitted to the STALCI team.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-5 rounded-full bg-slate-900 text-white text-xs font-semibold px-5 py-2 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Client Review</span>
                  <h3 className="text-base font-bold text-slate-950 mt-0.5">Submit Project Feedback</h3>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-900 block mb-1">Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= rating
                              ? "fill-slate-800 text-slate-800"
                              : "fill-slate-100 text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-900 block mb-1">Your Name & Company</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Carter, CTO at Acorn Corp"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-900 block mb-1">Feedback</label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share your experience working with STALCI..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-slate-900"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={feedbackMutation.isPending}
                  className="w-full rounded-full bg-slate-900 text-white text-xs font-semibold py-2.5 hover:bg-slate-800 transition-colors cursor-pointer"
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
