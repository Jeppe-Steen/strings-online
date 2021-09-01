import { useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";
import { AppContext } from "../../Context/ContextProvider";
import { useContext, useEffect } from "react";

import { CartItem } from "../../Components/CartItem/CartItem";

import Style from './Cart.module.scss';
import { doFetch } from "../../Helpers/Fetching";

const Cart = () => {
    const {url} = useRouteMatch();
    const passedBReadcrum = url.replace('/', '');

    const {shoppingcart, setShoppingcart, totalPrice, setTotalPrice, loginData} = useContext(AppContext)

    const removeListFromUser = async () => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'DELETE', null, key)
        return response;
    }

    const handleRemoveAll = () => {
        setTotalPrice(0)
        setShoppingcart([]);

        if(loginData.user_id) {
            removeListFromUser();
        }
    }

    const handleBuy = () => {
        window.location = '/køb';
    }

    const getList = async () => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'GET', null, key);
        console.log(response);
    } 

    useEffect(() => {
        getList();

        if(!shoppingcart.length && loginData.user_id) {
            removeListFromUser();
        }

    }, [shoppingcart, totalPrice]);

    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBReadcrum} />
            <ProductNav />
            <section className={`${Style.cart} content`}>
                {shoppingcart ? shoppingcart.map((items, index) => {
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