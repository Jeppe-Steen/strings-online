import { createContext, useEffect, useState } from "react";
import {doFetch} from '../Helpers/Fetching';

const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [ shoppingcart, setShoppingcart ] = useState([]);
    const [ loginData, setLoginData ] = useState({});
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ selectedProduct, setSelectedProduct ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState({});
    const [ selectedSubcategory, setSelectedSubcategory ] = useState({});


    const removeShoppingcard_whenLoggingIn = async () => {
        const url = `https://api.mediehuset.net/stringsonline/ratings/{{id}}`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'DELETE', null, key)
        return response;
    } 

    // setting loginData id sessionStorage has them
    const settingLoginData = () => {
        const data = JSON.parse(sessionStorage.getItem('token'));
        if(!loginData.user_id) {
            if(data && data.user_id) {
                setLoginData(data);
            }
        }
        if(loginData.user_id) {
            removeShoppingcard_whenLoggingIn();
        }
    };

    useEffect(() => {
        settingLoginData();
    }, [loginData]);

    return (
        <AppContext.Provider
        value={{
            shoppingcart,
            setShoppingcart,
            loginData,
            setLoginData,
            totalPrice,
            setTotalPrice,
            selectedProduct,
            setSelectedProduct,
            selectedCategory,
            setSelectedCategory,
            selectedSubcategory,
            setSelectedSubcategory,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };