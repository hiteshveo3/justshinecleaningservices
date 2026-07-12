import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";

export async function POST(request: Request) {
  const form = await request.formData();
  const payload = {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    phone: String(form.get("phone") || ""),
    serviceType: String(form.get("serviceType") || ""),
    message: String(form.get("message") || ""),
    read: false,
    createdAt: serverTimestamp(),
  };

  if (firebaseEnabled && db) {
    await addDoc(collection(db, "contact_submissions"), payload);
  }

  return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}
