import { get } from './util/http.ts';
import { ReactNode, useEffect, useState } from 'react';
import BlogPosts, { BlogPost } from './components/BlogPosts.tsx';
import fetchingImg from './assets/data-fetching.png';

type RawDataBlogPosts = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    async function fetchPosts() {
      const data = (await get("https://jsonplaceholder.typicode.com/posts/")) as RawDataBlogPosts[];

      const blogPosts: BlogPost[] = data.map(post => {
        return {
          id: post.id,
          title: post.title,
          text: post.body
        }
      })
      setFetchedPosts(blogPosts)
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (fetchedPosts) {
    content = <BlogPosts posts = {fetchedPosts} />
  }


  return <main>
    <img src={fetchingImg} alt="An image depicting a fetching process" />
    {content}
  </main>;
}

export default App;
