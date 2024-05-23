
import React from 'react'
import { useFormContext } from 'react-hook-form';

export default function Images() {
    const {register , formState : {errors}} = useFormContext();
  return (
    <div>
        <h2 className = 'text-3xl font-bold mb-3'>Images</h2>

        <div className = 'border rounded p-4 flex flex-col gap-4 '>
            <input type = 'file' 
                multiple 
                accept = "image/*"
                className = 'w-full text-gray-700 font-normal'
                name = "imageFiles"
                {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength = imageFiles.length;
                        if(totalLength === 0) {
                            return  "At least one image added"
                        }
                        if(totalLength > 6) {
                            return  "Total number of imags cannot be more than 6"
                        }
                        return true;    
                    }
                })}
            />
        </div>

        {errors.imageFile && (
            <span className = 'text-red-500 text-sm font-bold '>
                {errors.imageFiles.message}
            </span>
        )}

    </div>  
  )
}



// {...register('imageFiles',  {
//     validate : (imageFile) => {
//         const totalLength = imageFile.length;

//         if(totalLength === 0)  {
//             return  "At least one image should be added";
//         }
//         if(totalLength > 6) {
//             return "Total number of images cannot be more than 6";
//         }
//         return true;
//     }
// })}