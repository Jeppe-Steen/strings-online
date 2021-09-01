import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [ shoppingcart, setShoppingcart ] = useState([]);
    const [ loginData, setLoginData ] = useState({});
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ selectedProduct, setSelectedProduct ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState('');
    const [ selectedSubcategory, setSelectedSubcategory ] = useState('');


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