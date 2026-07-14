"use client";

import { useEffect, useState } from "react";
import type { Service } from "@/lib/content";

type FormState = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  area: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", phone: "", serviceType: "", area: "", message: "" };
const storageKey = "just-shine-contact-form";

export function ContactForm({ services }: { services: Service[] }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        try {
          setForm({ ...initialState, ...JSON.parse(saved) });
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
    });
  }, []);

  const update = (field: keyof FormState, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    if (!started) {
      setStarted(true);
      window.gtag?.("event", "contact_form_started", { field });
    }
  };

  return (
    <form
      className="card grid gap-4 bg-[#f7fff0] p-5 sm:p-6"
      action="/api/contact"
      method="post"
      onSubmit={() => {
        setLoading(true);
        window.localStorage.removeItem(storageKey);
        window.gtag?.("event", "contact_form_submitted", { service: form.serviceType || "unknown" });
      }}
    >
      <label className="grid gap-1.5 text-sm font-medium text-emerald-950">
        Name
        <input className="min-h-12 rounded-lg border border-emerald-950/10 bg-white p-3 font-normal text-slate-800" name="name" placeholder="Your name" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} required />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-emerald-950">
        Email
        <input className="min-h-12 rounded-lg border border-emerald-950/10 bg-white p-3 font-normal text-slate-800" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-emerald-950">
        Phone
        <input className="min-h-12 rounded-lg border border-emerald-950/10 bg-white p-3 font-normal text-slate-800" name="phone" type="tel" inputMode="tel" placeholder="+971 55 223 2850" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} required />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-emerald-950">
        Service type
        <select className="min-h-12 rounded-lg border border-emerald-950/10 bg-white p-3 font-normal text-slate-800" name="serviceType" value={form.serviceType} onChange={(event) => update("serviceType", event.target.value)} required>
          <option value="">Choose a service</option>
          {services.map((service) => <option key={service.slug}>{service.name}</option>)}
          <option>Other</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-emerald-950">
        Address / Area
        <input className="min-h-12 rounded-lg border border-emerald-950/10 bg-white p-3 font-normal text-slate-800" name="area" placeholder="Al Reem, Khalifa City, Al Danah..." autoComplete="street-address" value={form.area} onChange={(event) => update("area", event.target.value)} />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-emerald-950">
        Message
        <textarea className="min-h-32 rounded-lg border border-emerald-950/10 bg-white p-3 font-normal text-slate-800" name="message" placeholder="Property size, preferred date/time, special requests, photos if available..." value={form.message} onChange={(event) => update("message", event.target.value)} required />
      </label>
      <button className="btn-primary disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={loading}>{loading ? "Sending..." : "Get free quote"}</button>
    </form>
  );
}
