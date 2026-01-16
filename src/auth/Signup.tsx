import { useState } from 'react';
import supabase from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const[email, setEmail] =useState("");
    const[password, setPassword] =useState("");
    const[error, setError]=useState("");
    const[loading, setLoading]=useState(false);
    const navigate =useNavigate();

    const handleSignUp =async(e: React.FormEvent)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

        const{data,error:authError} = await supabase.auth.signUp({email,password});

        setLoading(false);

        if(authError) return setError(authError.message);
        if (data && data.user) {
        console.log("Signup Success " + data.user.email);
        navigate('/dashboard');
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            React Supabase Blog Signup
            </h2>
            
            {error && <p>{error}</p>}

            <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-4">

                <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />

                <input 
                    type="password" 
                    placeholder="Enter your Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />

                <button type='submit' className='bg-blue-700'>{loading?"Please  wait":"Sign Up"}</button>
                
                <p className="text-gray-600 text-sm mt-4 ">
                    Already have an account?{" "}
                    <span 
                    onClick={() => navigate('/login')} 
                    className="text-blue-600 font-semibold cursor-pointer hover:underline hover:text-blue-700 transition-colors"
                    >
                    Sign in here!
                    </span>
                </p>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Signup