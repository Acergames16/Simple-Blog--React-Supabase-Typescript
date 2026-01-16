import React, { useState } from 'react'
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

const Createblog = () => {
    const[title,setTitle]=useState("");
    const[detail,setDetail] =useState("");
    const{user}=useAuth();
    const navigate =useNavigate();

    const handleCreate =async(e:React.FormEvent)=>{
        e.preventDefault();

        if( !user || !title || !detail ) return alert("Please fill in all the keys")
        
        const{error}=await supabase
        .from('blogs')
        .insert([
            {
                title:title,
                content:detail,
                user_id:user.id
        }
    ]);
    if(error){
        console.error("Error in saving the blog:", error.message);
    }else{
        navigate('/dashboard');
    }



        
    }
    const handleCancel =()=>{
        navigate('/dashboard');
    }


  return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form onSubmit={handleCreate} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">New Stanza</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                        type="text"
                        placeholder="Give it a name..."
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                    <textarea 
                        className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-sky-500 outline-none"
                        placeholder="Write your stanza here..."
                        value={detail}
                        onChange={e => setDetail(e.target.value)} 
                    />
                </div>

                <div className="flex gap-3">
                    <button 
                        type="submit"
                        className="flex-1 bg-sky-500 text-white py-2 rounded-lg font-bold hover:bg-sky-600 transition-colors"
                    >
                        Post Stanza
                    </button>
                    <button 
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
  )
}

export default Createblog
