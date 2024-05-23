import { cookieStorageManager } from '@chakra-ui/react';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { HotelDetailSection } from './DetailSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import Images from './Images';
import TypeSection from './TypeSection';
export default function ManageHotelForm({onSave , isLoading}) {
    const formMethods = useForm();
    const {handleSubmit} = formMethods;
 
    const onSubmit =  handleSubmit(formDataJson => {
        
        const formData = new FormData();
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }
        
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

        formData.append('reason' ,'bhsdk ye aa kyu nahi rha');
        onSave(formData);
    });


  return (
      <FormProvider {...formMethods} >
          <form className = 'flex flex-col gap-5 py-5' onSubmit = {onSubmit}>    
             <HotelDetailSection /> 
             <TypeSection  />
             <FacilitiesSection />
             <GuestSection />
             <Images />

            <span className = 'flex justify-end '>
                <button disabled = {isLoading}
                type = 'submit' className = 'bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500'>
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </span>
          </form>
      </FormProvider>
  )
}


