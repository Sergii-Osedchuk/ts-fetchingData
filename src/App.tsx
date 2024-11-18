import { get } from './util/http.ts';
import { ReactNode, useEffect, useState } from 'react';
import BlogPosts, { BlogPost } from './components/BlogPosts.tsx';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage.tsx';

type RawDataBlogPosts = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts/"
        )) as RawDataBlogPosts[];
        const blogPosts: BlogPost[] = data.map(post => {
          return {
            id: post.id,
            title: post.title,
            text: post.body
          }
        });
        setFetchedPosts(blogPosts)
      } catch (error) {
        setError("Failed to fetch post")
      }
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />
  }

  if (fetchedPosts) {
    content = <BlogPosts posts = {fetchedPosts} />
  }

  if (isFetching) {
    content = <p id='loading-fallback'>Fetching posts...</p>
  }


  return <main>
    <img src={fetchingImg} alt="An image depicting a fetching process" />
    {content}
  </main>;
}

export default App;
