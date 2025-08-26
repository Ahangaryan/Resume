"use client";
import { useEffect, useState } from "react";
import { fetchPosts, fetchCustomFields } from "../services/wordpress";


type WordpressPost = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
};

type PostWithAcf = WordpressPost & { acf?: Record<string, any> };

  const [posts, setPosts] = useState<PostWithAcf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then(async (data) => {
        // برای هر پست، کاستوم فیلدها را هم دریافت کن
        const postsWithAcf = await Promise.all(
          data.map(async (post: WordpressPost) => {
            try {
              const full = await fetchCustomFields(post.id);
              return { ...post, acf: full.acf };
            } catch {
              return { ...post };
            }
          })
        );
        setPosts(postsWithAcf);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (!posts.length) return <div>No posts found.</div>;

  return (
    <div>
      <h2>Latest WordPress Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{marginBottom: 24}}>
            <strong>{post.title?.rendered}</strong>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || "" }} />
            {/* نمایش کاستوم فیلدها */}
            {post.acf && (
              <div style={{marginTop:8, fontSize:13, background:'#f8f8f8', padding:8, borderRadius:6}}>
                <b>Custom Fields:</b>
                <pre style={{margin:0, fontSize:12, background:'none', padding:0}}>{JSON.stringify(post.acf, null, 2)}</pre>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
