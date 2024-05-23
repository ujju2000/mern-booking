import React from 'react'
import {toast} from 'react-hot-toast';
import { useMutation } from 'react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import * as apiClient from '../api-client.js';
import { useNavigate } from 'react-router-dom';

export default function AddHotel() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn : apiClient.addMyHotel,
    onSuccess : () => {
      toast.success('Hotel saved');
    },
    onError : (error) => {
      toast.error(error);
    }
  });
  
  const handleSave =  (hotelFormData) => {

    mutation.mutate(hotelFormData)
    navigate('/');

  }
  return (
    <div>
      <ManageHotelForm onSave = {handleSave} 
      isLoading = {mutation.isLoading} />
    </div>
  )
}
