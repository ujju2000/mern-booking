
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register` , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify(formData)
    })
    const responseBody = await response.json();
    
    if(!response.ok){
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const signIn = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method : 'POST',
        credentials : "include",
        body : JSON.stringify(formData),
        headers: {'Content-Type' : 'application/json'}
    })

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody);
    }
    return responseBody;
}

export const validateToken = async () => {

    const response = await fetch(`${API_BASE_URL}/api/auth/validateToken` , {
        credentials : "include"
    });

    if(!response.ok) {
        throw new Error('Token invalid');
    }

    return response.json();
}

export const signOut = async () => {
    
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials : 'include',
        method : 'POST'
    });

    if(!response.ok) {
        throw new Error('Error during sign out');
    }
}

export const addMyHotel = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotel/`, {
        method : 'POST',
        credentials : 'include',
        body : formData,            
    })
    const res = await response.json();
    if(!response.ok) {
        throw new Error('Failed to add hotel');
    }
    return res;
}

