export function Wordmark({
  className = "",
  markSize = 28,
  theme = "auto",
}: {
  className?: string;
  markSize?: number;
  theme?: "light" | "dark" | "auto";
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official STALCI Logo Mark */}
      <div 
        className="relative flex items-center justify-center shrink-0"
        style={{ width: markSize + 4, height: markSize + 4 }}
      >
        <img
          src="/stalci-mark.png"
          alt="STALCI Logo"
          width={markSize + 4}
          height={markSize + 4}
          className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col">
        <span className={`font-display text-lg font-black tracking-[0.14em] leading-none ${
          theme === "dark" 
            ? "text-white" 
            : theme === "light" 
            ? "text-slate-950" 
            : "text-inherit"
        }`}>
          STALCI
        </span>
        <span className="text-[9.5px] font-mono font-extrabold uppercase tracking-[0.28em] text-[#9E6229] mt-0.5">
          STUDIO
        </span>
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : "text-left"}`}>
      {/* High-End Bronze Eyebrow Pill */}
      <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border shadow-2xs ${
        isDark 
          ? "bg-[#D89B5B]/15 border-[#D89B5B]/35 text-[#F2CFAB]" 
          : "bg-[#FDF6ED] border-[#EED7BF] text-[#9E6229]"
      }`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#D89B5B] shadow-[0_0_8px_#D89B5B]" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.24em]">
          {eyebrow}
        </span>
      </div>

      {/* Main Section Title */}
      <h2 className={`mt-4 text-3xl font-extrabold sm:text-4xl lg:text-[2.65rem] tracking-tight leading-[1.14] ${
        isDark ? "text-white" : "text-slate-950"
      }`}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`mt-3.5 text-sm sm:text-base leading-relaxed ${
          isDark ? "text-slate-300" : "text-slate-600"
        } ${isCenter ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}

      {/* Luxury Bronze Divider Line */}
      <div className={`mt-5 h-0.5 w-14 rounded-full bg-gradient-to-r from-[#D89B5B] to-[#9E6229] ${isCenter ? "mx-auto" : ""}`} />
    </div>
  );
}
