// گرفتن لیست سرویس‌ها از پست تایپ service
export async function fetchServices() {
  const res = await fetch("https://panel.ahangaryan.ir/wp-json/wp/v2/service?per_page=100&_embed=true");
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

// گرفتن محتوای هر سرویس با id
export async function fetchServiceById(id: number) {
  const res = await fetch(`https://panel.ahangaryan.ir/wp-json/wp/v2/service/${id}?_embed=true`);
  if (!res.ok) throw new Error("Failed to fetch service by id");
  return res.json();
}
// گرفتن فیلدهای ACF از options
export async function fetchAcfOptions() {
  const res = await fetch("https://panel.ahangaryan.ir/wp-json/acf/v2/options/");
  if (!res.ok) throw new Error("Failed to fetch ACF options");
  return res.json();
}
// WordPress API base URL
export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://panel.ahangaryan.ir/wp-json/wp/v2";

// آدرس ریشه برای اطلاعات عمومی سایت
export const WORDPRESS_API_ROOT = "https://panel.ahangaryan.ir/wp-json/";

// Fetch posts from WordPress
export async function fetchPosts() {
  const res = await fetch(`${WORDPRESS_API_URL}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Response is not valid JSON. Check your WordPress API URL.');
  }
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  const posts = await res.json();
  return posts[0] || null;
}

// Fetch custom fields (ACF)
export async function fetchCustomFields(postId: number) {
  const res = await fetch(`${WORDPRESS_API_URL}/posts/${postId}`);
  if (!res.ok) throw new Error('Failed to fetch custom fields');
  return res.json();
}

// گرفتن اطلاعات عمومی سایت (Site Title, Tagline)
export async function fetchSiteInfo() {
  const res = await fetch(WORDPRESS_API_ROOT);
  if (!res.ok) throw new Error('Failed to fetch site info');
  return res.json();
}
