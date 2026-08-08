import { useState } from "react";

type Props = {
  name: string;
  slug: string;
  size?: number;
  className?: string;
};

/**
 * Renders a locally hosted brand logo (public/icons/<slug>.svg).
 * Shows a skeleton while loading and a lettered fallback if the asset fails.
 */
export function TechIcon({ name, slug, size = 24, className = "" }: Props) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const box = { width: size, height: size };

  if (state === "error") {
    return (
      <span
        style={box}
        aria-label={`${name} logo`}
        role="img"
        className={`inline-flex shrink-0 items-center justify-center rounded-md border border-copper/30 bg-copper/10 text-[0.6rem] font-bold uppercase text-copper ${className}`}
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <span style={box} className={`relative inline-block shrink-0 ${className}`}>
      {state === "loading" ? (
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse rounded-md bg-white/10"
        />
      ) : null}
      <img
        src={`/icons/${slug}.svg`}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
        style={box}
        className={
          "object-contain transition-opacity duration-300 " +
          (state === "ready" ? "opacity-100" : "opacity-0")
        }
      />
    </span>
  );
}
