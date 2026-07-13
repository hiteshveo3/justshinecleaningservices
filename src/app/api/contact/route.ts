import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const serviceType = String(form.get("serviceType") || "").trim();
  const area = String(form.get("area") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!name || !email || !phone || !serviceType || !message) {
    return NextResponse.redirect(new URL("/contact?sent=0", request.url), 303);
  }

  const payload = {
    name,
    email,
    phone,
    serviceType,
    area,
    message,
    read: false,
    createdAt: serverTimestamp(),
  };

  if (firebaseEnabled && db) {
    await addDoc(collection(db, "contact_submissions"), payload);
  }

  return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}
