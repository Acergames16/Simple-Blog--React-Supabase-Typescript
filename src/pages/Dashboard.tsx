import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import supabase from "../lib/supabaseClient";

interface Blog {
  id: string;
  title: string;
  content: string;
}

const Dashboard = () => {
  const { user, loading, handleLogout, navigate } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        const { data, error } = await supabase
          .from('blogs')
          .select('*'); 

        if (error) console.error("error fetching", error.message);
        else setBlogs(data || []);
      }
      fetchBlogs();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this stanza?");
    if (!confirmed) return;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting:", error.message);
    } else {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  if (loading) return <p className="p-10 text-center">loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center p-6 bg-blue-900 shadow-sm sticky top-0 z-10">
        <h2 className="text-xl font-semibold text-white">
          Welcome, <span className="text-white">{user?.email}</span>
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </nav>

      
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">

          <button
            onClick={() => navigate("/create")}
            className="w-48 h-72 border-2 border-dashed bg-blue-900 border-sky-200 rounded-xl flex flex-col items-center justify-center hover:bg-blue-950 active:scale-95 transition-all shadow-sm group"
          >
            <span className="text-5xl text-sky-500 mb-2 group-hover:scale-110 transition-transform">+</span>
            <p className="text-sky-600 font-bold uppercase text-xs tracking-widest">New Blog</p>
          </button>

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="w-48 h-72 bg-gray-300 p-4 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <div className="h-1 bg-sky-500 w-full mb-3 rounded-full"></div>
                <h3 className="text-md font-black text-gray-800 mb-2 uppercase leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-xs italic leading-relaxed line-clamp-6">
                  "{blog.content}"
                </p>
              </div>

              <div className="mt-2 border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={() => navigate(`/edit/${blog.id}`)}
                    className="text-[10px] font-bold text-gray-400 hover:text-sky-600 uppercase"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase"
                  >
                    Delete
                  </button>
                </div>

                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="w-full bg-gray-50 py-2 text-[10px] font-bold text-sky-600 rounded hover:bg-sky-500 hover:text-white transition-all uppercase"
                >
                  View Full Blog
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;