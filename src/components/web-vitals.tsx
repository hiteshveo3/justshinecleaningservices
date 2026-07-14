"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    window.gtag?.("event", "web_vitals", {
      event_category: "Web Vitals",
      event_label: metric.id,
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: "rating" in metric ? metric.rating : undefined,
      non_interaction: true,
    });
  });

  return null;
}
