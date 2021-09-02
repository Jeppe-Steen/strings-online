import { useHistory, useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";
import { AppContext } from "../../Context/ContextProvider";
import { useContext, useEffect, useState } from "react";

import { CartItem } from "../../Components/CartItem/CartItem";

import Style from './Cart.module.scss';
import { doFetch } from "../../Helpers/Fetching";

const Cart = () => {
    const {url} = useRouteMatch();
    const passedBReadcrum = url.replace('/', '');
    const history = useHistory();

    const [userShoppingcart, setUserShoppingcart] = useState([]);

    const {shoppingcart, setShoppingcart, totalPrice, setTotalPrice, loginData} = useContext(AppContext)

    const getUser_shoppingcart = async () => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'GET', null, key);
        setUserShoppingcart(response);
    }

    // removing items from card when pressing buttom
    const removeItems_fromUser = async () => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'DELETE', null, key)
        return response;
    }
    
    // if there is items in the cart before login, the items will be added after login
    const addItemTo_userCart = async (id, count) => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        let formData = new FormData();
            formData.append('product_id', id);
            formData.append('quantity', count);
        const key = loginData.access_token;
        const response = await doFetch(url, 'POST', formData, key);
        return response;
    }

    const handleRemoveAll = () => {
        setTotalPrice(0)
        setShoppingcart([]);

        if(loginData.user_id) {
            removeItems_fromUser();
        }
    }

    const handleBuy = () => {
        if(!loginData.user_id) {
            if(shoppingcart.length) {
                history.push('/login');
            }
        } else {
            if(shoppingcart.length) {
                history.push('/køb');
            }
        }
        
    }

    useEffect(() => {
        if(!shoppingcart.length && loginData.user_id) {
            removeItems_fromUser();
        }

    }, [shoppingcart, totalPrice]);

    useEffect(() => {
        if(loginData.user_id) {
            getUser_shoppingcart();
            if(userShoppingcart.length <= 0) {
                shoppingcart.forEach(item => {
                    addItemTo_userCart(item.id, 1);
                }) 
            }
        }
    }, [loginData])

    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBReadcrum} />
            <ProductNav />
            <section className={`${Style.cart} content`}>
                {shoppingcart.length ? shoppingcart.map((items, index) => {
                    return(
                        <CartItem key={index} place={index} data={items} />
                    )
                }): null}

                <div className={Style.totalPrice}>
                    <p className={Style.price_title}>beløb:</p>
                    <span className={Style.price_span}>
                        <p>DKK {totalPrice}</p>
                        <p>prisen er inkl. moms</p>
                    </span>
                    <button onClick={handleRemoveAll} className={Style.removeItems}>RYD</button>
                </div>

                <button onClick={handleBuy} className={Style.buy}>Til kassen</button>
            </section>
        </main>
    )
}

export { Cart };