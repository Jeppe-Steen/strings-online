import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [shoppingcart, setShoppingcart] = useState([]);
    const [loginData, setLoginData] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);


    return (
        <AppContext.Provider
        value={{
            shoppingcart,
            setShoppingcart,
            loginData,
            setLoginData,
            totalPrice,
            setTotalPrice
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };