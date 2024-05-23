
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function GuestSection() {
    const {register , formState : {errors}} = useFormContext();
  return (
      <div className = ''>
        <h2 className = 'font-bold text-3xl '>Guests</h2>
        <div className = ' grid grid-cols-2 p-6 gap-5 bg-gray-300 '>
            <label className = 'text-gray-700 text-sm font-semibold '>
                Adults 
                <input className = 'border rounded w-full py-2 px-3 font-normal '
                    type = 'number'
                    min = {1}
                    {...register('adultCount')}
                />
            </label>
            {errors.adultCount?.message && (
                <span className = 'text-red-500 text-sm font-bold '>
                    {errors.adultCount.message}
                </span>
            )

            }

            <label className = 'text-gray-700 text-sm font-semibold '>
                Child 
                <input className = 'border rounded w-full py-2 px-3 font-normal '
                    type = 'number'
                    min = {0}
                    {...register('childCount')}
                />
            </label>

            {errors.childCount?.message && (
                <span className = 'text-red-500 text-sm font-bold '>
                    {errors.childCount.message}
                </span>
            )

            }

        </div>  

    </div>
  )
}
