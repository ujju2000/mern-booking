import {useForm} from 'react-hook-form';
import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client.js';
import {useAppContext} from '../context/AppContext.jsx';
import { toast } from 'react-hot-toast';
import { useNavigate  } from 'react-router-dom';

export default function Register() {
    const { register , watch , handleSubmit, formState : {errors}} = useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isLoggedIn} = useAppContext();
    const mutation = useMutation({
        mutationFn : apiClient.register,
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            toast.success('Registration successfull!');
            navigate('/');
        }, 
        onError: async (error) => {
            toast.error(error.message);
        }
    })  

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    
  return (
    <form className = 'w-full flex flex-col gap-5 ' onSubmit = {onSubmit}>
        <h2 className = 'text-3xl font-bold py-3 '>Create an Account</h2>
        
        <div className = 'flex flex-col md:flex-row gap-5'>
            <label className = 'text-gray-700 text-sm font-bold flex-1 ' htmlFor="">
                First Name 
                <input 
                className = 'border rounded w-full py-1 px-2 font-normal ' 
                    {...register("firstName" , {required : "This feild is required"}) }
                />
                {
                    errors.firstName && (<span className = 'text-red-500 '>{errors.firstName.message}</span>)
                }
            </label>

            <label className = 'text-gray-700 text-sm font-bold flex-1 ' htmlFor="">
                Last Name 
                <input className = 'border rounded w-full py-1 px-2 font-normal ' 
                    {...register('lastName')}
                />
                {
                    errors.lastName && (<span className = 'text-red-500 '>{errors.lastName.message}</span>)
                }
            </label>

        </div>
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
                    {...register('password' ,{required : "Password is required" , minLength : {value : 6 ,message : 'Password must be of 6 length'}})}
                />
                {
                    errors.password && (<span className = 'text-red-500 '>{errors.password.message}</span>)
                }
            </label>

            <label className = 'text-gray-700 text-sm font-bold ' htmlFor="">
                Confirm Password
                <input type = "password" className = 'border rounded w-full py-1 px-2 font-normal ' 
                    {...register('confirmPassword' , {
                        validate : (val) => {
                            if(!val) {
                                return "This field is required"
                            }else if(watch("password") !== val) {
                                return "Your password don't match"
                            } 
                        }
                    })}
                
                />
                {
                    errors.confirmPassword && (<span className = 'text-red-500 '>{errors.confirmPassword.message}</span>)
                }
            </label>

            <span>
                <button 
                type = "submit" className = 'float-right bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 '>
                    Create Account
                </button>
            </span>
    </form> 
  )
}
