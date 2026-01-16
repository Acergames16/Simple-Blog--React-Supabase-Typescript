
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import supabase from '../lib/supabaseClient';

const Login = () => {
    const navigate =useNavigate();
    const[email, setEmail] =useState("");
    const[password, setPassword] =useState("");
    const[error, setError]=useState("");
    const[loading, setLoading]=useState(false);

    const handleSignIn =async(e: React.FormEvent)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

       const{data,error:authError} = await supabase.auth.signInWithPassword({email,password});

       setLoading(false);

       if(authError) return setError(authError.message);

       if (data && data.user) {
        console.log("Login Success " + data.user.email);
        navigate('/dashboard');
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            React Supabase Blog Sign In
            </h2>
            {error && <p className='text-center text-red-800 text-sm mb-3' >{error}</p>}
             
            <form onSubmit={handleSignIn}>
            <div className="flex flex-col gap-4">

                <input 
                    required
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />

                <input 
                    required
                    type="password" 
                    placeholder="Enter your Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                
                 <button type='submit'className='bg-blue-700'>{loading?"Please  wait":"Sign In"}</button>
                 <p className="text-gray-600 text-sm mt-4">
                    Dont have an account yet?{" "}
                    <span 
                    onClick={() => navigate('/signup')} 
                    className="text-blue-600 font-semibold cursor-pointer hover:underline hover:text-blue-700 transition-colors"
                    >
                    Sign up now!
                    </span>
                </p>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Login