import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import useAuth from '../pages/useAuth';

const Updateblog = () => {
    const { id } = useParams(); 
    const { user } = useAuth();
    const navigate = useNavigate();
    
    
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single(); 

            if (data) {
                setTitle(data.title);
                setContent(data.content);
            }
            setLoading(false);
        };
        if (id) fetchBlog();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const { error } = await supabase
            .from('blogs')
            .update({ title, content }) 
            .eq('id', id); 

        if (!error) navigate('/dashboard');
    };

    if (loading) return <p className="p-8 text-center">Loading Stanza...</p>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border-t-4 border-sky-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Stanza</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea 
                        className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-sky-500 outline-none"
                        value={content}
                        onChange={e => setContent(e.target.value)} 
                    />
                </div>

                <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-sky-500 text-white py-2 rounded-lg font-bold hover:bg-sky-600">
                        Update Blog
                    </button>
                    <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Updateblog;