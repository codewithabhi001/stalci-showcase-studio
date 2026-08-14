import { useState } from "react";
import { Quote, Star, CheckCircle2, X, Send, MessageSquarePlus } from "lucide-react";
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
    <section className="relative overflow-hidden bg-[#F8FAFC] py-24 sm:py-32 text-slate-900 border-t border-slate-200">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 z-10">
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
            className="self-start md:self-auto shrink-0 inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-[#9E6229] text-white text-xs sm:text-sm font-bold px-6 py-3 transition-all shadow-sm cursor-pointer"
          >
            <MessageSquarePlus className="h-4 w-4" />
            <span>Share Client Review</span>
          </button>
        </div>

        <div ref={staggerRef} className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-xl"
            >
              <div>
                <div className="flex gap-1 text-[#D89B5B] mb-4">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#D89B5B] text-[#D89B5B]" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-[#D89B5B]/40 mb-3" />
                <p className="text-sm leading-relaxed text-slate-700 italic">"{t.quote}"</p>
              </div>

              <div className="mt-7 pt-5 border-t border-slate-100">
                <p className="text-sm font-bold text-slate-950">{t.name}</p>
                <p className="text-xs text-[#9E6229] mt-0.5 font-bold font-mono">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div
            data-lenis-prevent
            className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-pop max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-950 bg-slate-100 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-950">Thank You for Your Feedback!</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your review has been securely transmitted to the STALCI Executive Pod. We appreciate your strategic partnership.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-6 rounded-xl bg-slate-900 text-white text-xs font-bold px-6 py-2.5 shadow-sm cursor-pointer hover:bg-[#9E6229] transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#9E6229]">
                    Client Partner Review
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mt-0.5">Submit Project Feedback</h3>
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-mono">Rating (1 to 5 Stars)</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating
                              ? "fill-[#D89B5B] text-[#D89B5B]"
                              : "fill-slate-100 text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-mono font-bold text-slate-700">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name & Title / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins (CTO, TechCorp)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#D89B5B] shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Feedback / Experience *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your experience working with the STALCI engineering squad..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#D89B5B] resize-none shadow-2xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={feedbackMutation.isPending}
                    className="w-full rounded-xl bg-slate-900 hover:bg-[#9E6229] text-white font-bold py-3 text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {feedbackMutation.isPending ? "Submitting Review..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
