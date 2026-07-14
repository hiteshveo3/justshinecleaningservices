"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const path = `${pathname}${window.location.search}`;
    window.gtag?.("event", "page_view", { page_path: path });

    if (pathname.startsWith("/services/")) {
      window.gtag?.("event", "service_page_view", {
        service: pathname.split("/").filter(Boolean).pop(),
        page_path: path,
      });
    }
  }, [pathname]);

  return null;
}
