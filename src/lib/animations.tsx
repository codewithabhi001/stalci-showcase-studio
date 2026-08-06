import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      x = 0,
      opacity = 0,
      duration = 1,
      delay = 0,
      ease = "power3.out",
      start = "top 85%",
    } = options;

    gsap.fromTo(
      el,
      { y, x, opacity },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

export function useStaggerReveal(
  options: {
    stagger?: number;
    y?: number;
    duration?: number;
    ease?: string;
    start?: string;
    childSelector?: string;
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      stagger = 0.1,
      y = 50,
      duration = 0.8,
      ease = "power3.out",
      start = "top 85%",
      childSelector,
    } = options;

    let children: Element[] | NodeListOf<Element>;
    if (childSelector) {
      // Prepend :scope if selector starts with >
      const sel = childSelector.startsWith(">") ? `:scope ${childSelector}` : childSelector;
      children = el.querySelectorAll(sel);
    } else {
      children = Array.from(el.children);
    }

    gsap.fromTo(
      children,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [speed]);

  return ref;
}

export function useCountUp(
  end: number,
  options: { duration?: number; start?: string; suffix?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { duration = 2, start = "top 80%" } = options;
    const counter = { val: 0 };

    gsap.to(counter, {
      val: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = Math.floor(counter.val).toString() + (options.suffix || "");
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [end]);

  return ref;
}

export function useLineReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
