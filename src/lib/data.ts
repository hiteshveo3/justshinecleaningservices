import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase";
import { posts, services, type BlogPost, type Service } from "./content";

export async function getServices(): Promise<Service[]> {
  if (!firebaseEnabled || !db) return services;
  const snapshot = await getDocs(query(collection(db, "services"), where("active", "==", true)));
  return snapshot.docs.map((doc) => ({ id: doc.id, slug: doc.id, ...doc.data() }) as Service);
}

export async function getService(slug: string) {
  const all = await getServices();
  return all.find((service) => service.slug === slug || service.id === slug);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!firebaseEnabled || !db) return posts;
  const snapshot = await getDocs(query(collection(db, "blog_posts"), orderBy("publishedAt", "desc")));
  return snapshot.docs.map((doc) => ({ id: doc.id, slug: doc.id, ...doc.data() }) as BlogPost);
}
