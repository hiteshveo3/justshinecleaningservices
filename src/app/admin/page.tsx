"use client";

import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, firebaseEnabled } from "@/lib/firebase";

type Row = Record<string, unknown> & { id: string; title?: string; name?: string; email?: string; serviceType?: string };

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Row[]>([]);
  const [posts, setPosts] = useState<Row[]>([]);
  const [leads, setLeads] = useState<Row[]>([]);

  async function login(formData: FormData) {
    setError("");
    if (!firebaseEnabled || !auth || !db) return setError("Add Firebase environment variables to enable admin login.");
    try {
      await signInWithEmailAndPassword(auth, String(formData.get("email")), String(formData.get("password")));
      setSignedIn(true);
      await refresh();
    } catch {
      setError("Could not sign in with those credentials.");
    }
  }

  async function refresh() {
    const database = db;
    if (!database) return;
    const read = async (name: string) => (await getDocs(collection(database, name))).docs.map((item) => ({ id: item.id, ...item.data() }));
    setServices(await read("services"));
    setPosts(await read("blog_posts"));
    setLeads(await read("contact_submissions"));
  }

  async function saveService(formData: FormData) {
    if (!db) return;
    const slug = String(formData.get("slug"));
    await setDoc(doc(db, "services", slug), {
      name: String(formData.get("name")),
      slug,
      description: String(formData.get("description")),
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      active: true,
      images: [],
      highlights: String(formData.get("highlights")).split(",").map((item) => item.trim()).filter(Boolean),
    });
    await refresh();
  }

  async function savePost(formData: FormData) {
    if (!db) return;
    await addDoc(collection(db, "blog_posts"), {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      excerpt: String(formData.get("excerpt")),
      content: String(formData.get("content")),
      author: "Just Shine Cleaning Services Team",
      publishedAt: serverTimestamp(),
      tags: [],
    });
    await refresh();
  }

  async function remove(collectionName: string, id: string) {
    if (!db) return;
    await deleteDoc(doc(db, collectionName, id));
    await refresh();
  }

  return (
    <section className="section bg-lime-50">
      <div className="container">
        <p className="eyebrow">Admin CMS</p>
        <h1 className="mt-4 text-4xl font-semibold text-emerald-950">Manage services, blog posts, and leads</h1>
        {!signedIn ? (
          <form action={login} className="card mt-8 grid max-w-md gap-4 p-6">
            <input className="rounded border p-3" name="email" type="email" placeholder="Admin email" required />
            <input className="rounded border p-3" name="password" type="password" placeholder="Password" required />
            <button className="btn-primary" type="submit">Login</button>
            {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
          </form>
        ) : (
          <div className="mt-8 grid gap-6">
            <form action={saveService} className="card grid gap-3 p-5 md:grid-cols-2">
              <h2 className="text-xl font-medium text-emerald-950 md:col-span-2">Service CRUD</h2>
              <input className="rounded border p-3" name="name" placeholder="Service name" required />
              <input className="rounded border p-3" name="slug" placeholder="service-slug" required />
              <input className="rounded border p-3 md:col-span-2" name="description" placeholder="Description" required />
              <input className="rounded border p-3" name="price" type="number" placeholder="AED price" required />
              <input className="rounded border p-3" name="duration" type="number" placeholder="Hours" required />
              <input className="rounded border p-3 md:col-span-2" name="highlights" placeholder="Comma separated highlights" />
              <button className="btn-primary md:col-span-2" type="submit">Save service</button>
              {services.map((item) => <AdminRow key={item.id} row={item} onDelete={() => remove("services", item.id)} />)}
            </form>
            <form action={savePost} className="card grid gap-3 p-5">
              <h2 className="text-xl font-medium text-emerald-950">Blog posts</h2>
              <input className="rounded border p-3" name="title" placeholder="Title" required />
              <input className="rounded border p-3" name="slug" placeholder="post-slug" required />
              <input className="rounded border p-3" name="excerpt" placeholder="Excerpt" required />
              <textarea className="min-h-28 rounded border p-3" name="content" placeholder="HTML content" required />
              <button className="btn-primary" type="submit">Publish post</button>
              {posts.map((item) => <AdminRow key={item.id} row={item} onDelete={() => remove("blog_posts", item.id)} />)}
            </form>
            <div className="card grid gap-3 p-5">
              <h2 className="text-xl font-medium text-emerald-950">Contact submissions</h2>
              {leads.map((item) => <AdminRow key={item.id} row={{ ...item, name: `${item.name || "Lead"} - ${item.serviceType || ""}` }} onDelete={() => remove("contact_submissions", item.id)} />)}
            </div>
            <button className="btn-secondary" onClick={() => { if (auth) signOut(auth); setSignedIn(false); }}>Sign out</button>
          </div>
        )}
      </div>
    </section>
  );
}

function AdminRow({ row, onDelete }: { row: Row; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded border bg-white p-3 md:col-span-2">
      <span className="text-sm font-normal text-slate-800">{row.name || row.title || row.email || row.id}</span>
      <button className="rounded bg-red-50 px-3 py-2 text-sm font-medium text-red-700" type="button" onClick={onDelete}>Delete</button>
    </div>
  );
}
