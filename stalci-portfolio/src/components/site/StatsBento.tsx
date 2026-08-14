import { motion } from "framer-motion";
import { SectionHeading } from "./Brand";

export function StatsBento() {
  return (
    <section className="relative bg-[#080A10] py-20 sm:py-28 text-white overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        {/* Outer Bento Container */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0B0F17] p-6 sm:p-10 shadow-xl overflow-hidden">
          
          {/* Section Header */}
          <SectionHeading
            tone="dark"
            eyebrow="Proven by Performance & Trust"
            title="The Data Behind the Dominance"
            subtitle="Built on proven expertise, in-house talent, and cross-industry experience, we create reliable digital solutions designed for long-term growth."
          />

          {/* Bento Grid Layout */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 relative z-10">
            
            {/* Card 1: 700+ Projects */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#101622] p-6 flex flex-col justify-between min-h-[150px] hover:border-white/20 transition-colors"
            >
              <div>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  700+
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-300 font-medium leading-relaxed">
                Projects delivered successfully using 50+ technologies
              </p>
            </motion.div>

            {/* Card 2: 120+ In-house Experts */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#101622] p-6 flex flex-col justify-between min-h-[150px] hover:border-white/20 transition-colors"
            >
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                In-house experts with average 4+ years of experience
              </p>
              <div className="mt-3">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  120+
                </span>
              </div>
            </motion.div>

            {/* Card 3: 24Mn+ Downloads */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="sm:col-span-2 lg:col-span-6 rounded-2xl border border-white/10 bg-[#101622] p-6 flex flex-col justify-between min-h-[150px] hover:border-white/20 transition-colors"
            >
              <div>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  24Mn+
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-300 font-medium leading-relaxed">
                App store downloads with 98%+ crash-free users
              </p>
            </motion.div>

            {/* Card 4: 60% AI Specialists */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#101622] p-6 flex flex-col justify-between min-h-[150px] hover:border-white/20 transition-colors"
            >
              <div>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  60%
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-300 font-medium leading-relaxed">
                Senior-level AI specialists and software architects on staff
              </p>
            </motion.div>

            {/* Card 5: 99% Satisfaction */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#101622] p-6 flex flex-col justify-between min-h-[150px] hover:border-white/20 transition-colors"
            >
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Happy clients and 80% recurring business
              </p>
              <div className="mt-3">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  99%
                </span>
              </div>
            </motion.div>

            {/* Card 6: 20+ Industries */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-white/10 bg-[#101622] p-6 flex flex-col justify-between min-h-[150px] hover:border-white/20 transition-colors"
            >
              <div>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  20+
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-300 font-medium leading-relaxed">
                Industries served across 25+ countries
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
