import { createContext ,useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../api-client.js';

const showToast = (toastMessage) => {
    console.log(toastMessage)
}

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const {isError} = useQuery("validateToken" , apiClient.validateToken);
    
    return (
        <AppContext.Provider value = {{
            showToast ,
            isLoggedIn : !isError
        }}>
            {children}
        </AppContext.Provider>
    )    
};

export const useAppContext = () => {
    const context =  useContext(AppContext);
    return context;
}

