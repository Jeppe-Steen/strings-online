import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [ shoppingcart, setShoppingcart ] = useState([]);
    const [ loginData, setLoginData ] = useState({});
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ selectedProduct, setSelectedProduct ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState('');
    const [ selectedSubcategory, setSelectedSubcategory ] = useState('');

    // setting loginData id sessionStorage has them
    const settingLoginData = () => {
        const data = JSON.parse(sessionStorage.getItem('token'));
        if(data && data.user_id) {
            setLoginData(data);
        } else {
            return;
        }
    };

    useEffect(() => {
        settingLoginData();
    }, []);


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
            setSelectedSubcategory
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };