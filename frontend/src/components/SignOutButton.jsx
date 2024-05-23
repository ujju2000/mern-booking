import { useMutation } from 'react-query';
import * as apiClient from '../api-client.js';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useQueryClient} from 'react-query';
export default function SignOutButton() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn : apiClient.signOut,
        onSuccess : async () => {
            await queryClient.invalidateQueries('validateToken');
            toast.success('Logout successfully')
            navigate('/');
        },
        onError : async (error) => {
            toast.error(error.message);
        }
    });

    const handleClick = () => {
       mutation.mutate()
    }
  return (
    <button onClick = {handleClick} className="text-blue-600 ox-3 font-bold bg-white p-3 hover:bg-gray-100 ">
      Sign Out
    </button>
  );
};
