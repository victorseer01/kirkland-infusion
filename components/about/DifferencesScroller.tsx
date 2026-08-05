"use client";

import { useEffect, useRef, useState } from "react";

type Item = { title: string; body: string };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);

function Card({ item, index }: { item: Item; index: number }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-grey-200 bg-white p-9 shadow-xl sm:p-12">
      <span className="font-display text-6xl leading-none text-primary/15">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-6 font-display text-2xl text-primary-dark sm:text-4xl">
        {item.title}
      </h3>
      <p className="mt-5 text-pretty text-base leading-relaxed text-grey-700 sm:text-lg">
        {item.body}
      </p>
    </article>
  );
}

// The "What makes us different" cards. On large screens (with motion allowed)
// the section pins and cards slide in from the right and stack to the left as
// the user scrolls; once the last card lands, normal page scroll resumes.
// Touch/small screens get a native horizontal swipe; reduced-motion users get a
// plain responsive grid.
export function DifferencesScroller({ items }: { items: readonly Item[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<"grid" | "interactive">("grid");

  const n = items.length;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () =>
      setMode(desktop.matches && !reduced.matches ? "interactive" : "grid");
    sync();
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (mode !== "interactive") return;
    const el = outerRef.current;
    if (!el) return;

    let raf = 0;
    let running = false;

    // Read the true scroll position and map it to progress. Deriving progress
    // from position (not scroll deltas) means it tracks any direction, speed,
    // or inertial/momentum scroll — so reversing scroll unwinds the deck just
    // as smoothly as scrolling forward stacks it.
    const update = () => {
      const node = outerRef.current;
      if (!node) return;
      const distance = node.offsetHeight - window.innerHeight;
      const scrolled = clamp(-node.getBoundingClientRect().top, 0, distance);
      setProgress(distance > 0 ? scrolled / distance : 0);
    };

    // While the deck is anywhere near the viewport, sync every animation frame
    // so momentum scrolling and quick direction changes never leave the cards
    // in a stale position.
    const loop = () => {
      update();
      raf = running ? requestAnimationFrame(loop) : 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            raf = requestAnimationFrame(loop);
          }
        } else if (running) {
          running = false;
          cancelAnimationFrame(raf);
          update(); // settle on the correct end state
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);

    update();
    window.addEventListener("resize", update);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [mode]);

  // Reduced motion / SSR default: a plain responsive grid, always readable.
  if (mode === "grid") {
    return (
      <>
        <div className="container-prose hidden gap-6 lg:grid lg:grid-cols-3">
          {items.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:hidden">
          {items.map((item, i) => (
            <div key={item.title} className="w-[86vw] max-w-md shrink-0 snap-center">
              <Card item={item} index={i} />
            </div>
          ))}
        </div>
      </>
    );
  }

  const active = Math.min(n, Math.floor(progress * (n - 1)) + 1);

  return (
    <>
      {/* Touch fallback for the rare narrow-but-interactive case */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:hidden">
        {items.map((item, i) => (
          <div key={item.title} className="w-[85vw] max-w-sm shrink-0 snap-center">
            <Card item={item} index={i} />
          </div>
        ))}
      </div>

      {/* Pinned, scroll-driven stacking deck (large screens) */}
      <div
        ref={outerRef}
        className="relative hidden lg:block"
        style={{ height: `${(n - 1) * 90 + 30}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-[100rem]">
            {items.map((item, i) => {
              const li = easeOut(clamp(progress * (n - 1) - (i - 1)));
              const x = `calc(6vw + ${i * 30}px + ${(1 - li) * 112}vw)`;
              return (
                <div
                  key={item.title}
                  className="absolute left-0 top-1/2 h-[min(74vh,620px)] w-[min(86vw,900px)] will-change-transform"
                  style={{
                    transform: `translate(${x}, -50%)`,
                    zIndex: i,
                    opacity: clamp(li * 6),
                  }}
                >
                  <Card item={item} index={i} />
                </div>
              );
            })}

            <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto flex max-w-xs items-center gap-3 px-6">
              <span className="font-display text-sm text-primary">
                {String(active).padStart(2, "0")}
              </span>
              <span className="h-0.5 flex-1 overflow-hidden rounded-full bg-grey-200">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${progress * 100}%` }}
                />
              </span>
              <span className="font-display text-sm text-grey-400">
                {String(n).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
