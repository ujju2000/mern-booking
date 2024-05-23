
import React from 'react'
import {useForm} from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client.js';
import { toast } from 'react-hot-toast'; 
    
export default function SignIn() {
    const {register , formState : {errors} , handleSubmit} = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn : apiClient.signIn,
        onSuccess : async () => {
            await queryClient.invalidateQueries('validateToken');
            toast.success('Sign In Successfully');
            navigate('/');
        },
        onError : async (error) => {
            toast.error(error.message);
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })
  return (
    <form className = 'container py-10 flex flex-col justify-around'
    action="" onSubmit = {onSubmit}>
        <h2 className = 'text-3xl font-bold '>Sign In</h2>

            <label className = 'text-gray-700 text-sm font-bold ' htmlFor="">
                Email 
                <input type = "email" className = 'border rounded w-full py-1 px-2 font-normal ' 
                    {...register('email' , {required : "Email is required"})}
                />
                {
                    errors.email && (<span className = 'text-red-500 '>{errors.email.message} *</span>)
                }
            </label>

            <label className = 'text-gray-700 text-sm font-bold ' htmlFor="">
                Password
                <input type = "password" className = 'border rounded w-full py-1 px-2 font-normal ' 
                    {...register('password' ,{required : "Password is required"})}
                />
                {
                    errors.password && (<span className = 'text-red-500 '>{errors.password.message}</span>)
                }
            </label>
            
            <span className = 'flex items-center justify-between'>
                <span className = 'text-sm underline '>
                    Not Registered? <Link to  ='/register'>
                        Create an Account here.
                    </Link>
                </span>
                <button 
                type = "submit" className = 'float-right bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 '>
                    Login
                </button>
            </span>


    </form>
  )
}
