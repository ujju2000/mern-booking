import { hotelTypes } from "../../config/hotel-options-config";

import React from 'react'
import { useFormContext } from "react-hook-form";

export default function TypeSection() {
    const {register , formState : {errors} , watch } = useFormContext()

    const typeWatch = watch("type");

  return (
    <div>
        <h2 className = 'text-2xl font-bold mb-2 '>Types</h2>

        <div className = 'grid grid-cols-5 gap-2'>
            {
                hotelTypes.map((type,index) => (

                    <label key = {index} className = {
                        typeWatch === type ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2  "
                        : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 "
                    }>
                        <input type = 'radio' 
                            className="hidden"
                            value = {type}
                            {...register('type' , {
                                required : 'This field is required'
                            })}
                        />
                        <span>{type}</span>
                    </label>
                ))
            }
            
        </div>
        {
            errors.type && (
                <span className = 'text-red-500 text-sm font-bold'>
                    {errors.type.message}
                </span>
            )       
        }
    </div>
  )
}
