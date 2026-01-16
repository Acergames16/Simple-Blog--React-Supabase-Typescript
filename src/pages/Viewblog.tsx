import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

interface Blog {
  title: string;
  content: string;
}

const Viewblog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await supabase
        .from('blogs')
        .select('title, content')
        .eq('id', id)
        .single();

      if (data) setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center p-10 text-gray-400">Loading stanza...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-sky-500 mb-6 hover:underline flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        <article className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {blog.title}
          </h1>
          
          {/* whitespace-pre-wrap keeps your line breaks/paragraphs intact */}
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default Viewblog;