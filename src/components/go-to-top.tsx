"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";

export function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-[10.75rem] right-4 z-50 grid size-11 place-items-center rounded-full bg-emerald-950 text-white shadow-lg ring-1 ring-white/30 transition md:bottom-6 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      type="button"
      aria-label="Go to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <HugeiconsIcon icon={ArrowUp01Icon} className="icon" size={20} color="currentColor" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
