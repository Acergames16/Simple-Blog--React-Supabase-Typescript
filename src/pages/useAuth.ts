import  { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import type{ User } from '@supabase/supabase-js';

const useAuth = () => {

const navigate =useNavigate();
const [user,setUser] =useState<User | null> (null);
const [loading, setLoading] = useState(true);

const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/signup');
};

useEffect(()=>{

    const fetchUser = async ()=>{
        const { data: { user } } = await supabase.auth.getUser(); 
        if (!user) navigate('/signup');
        else setUser(user) ; 

        setLoading(false);
        };
    fetchUser();
},[navigate])

  return {user,loading, handleLogout,navigate}
}

 export default useAuth