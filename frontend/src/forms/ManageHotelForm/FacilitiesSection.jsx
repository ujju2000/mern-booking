
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { hotelFacilities } from '../../config/hotel-options-config'

export default function FacilitiesSection() {
    const {register , formState : {errors}} = useFormContext();
  return (  
    <div>
        <h2 className = 'text-center text-2xl font-bold mb-3 '>Facilities</h2>
        <div className = 'grid grid-cols-5 gap-5 '>
        {
            hotelFacilities.map((facility, index)  => (
                <label key = {index} className = 'flex text-sm gap-1 text-gray-700 '>
                    <input type ='checkbox' 
                        value = {facility}
                        {...register('facilities', {
                            validate : (facilities) => {
                                if(facilities && facilities.length > 0) {
                                    return true;
                                }
                                else {
                                    return "At least one facility is required"
                                }
                            }
                        })
                        }
                    />
                    <span>{facility}</span> 
                </label>
            ))
        }
        </div>
        {
            errors.facilities && (
                <span className = 'text-red-500 text-sm font-bold'>
                    {errors.facilities.message}
                </span>
            )       
        }
    </div>  
  )
}
