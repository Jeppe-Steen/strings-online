import { useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";
import { AppContext } from "../../Context/ContextProvider";
import { useContext, useState } from "react";

import { CartItem } from "../../Components/CartItem/CartItem";

import Style from './Cart.module.scss';

const Cart = () => {
    const {url} = useRouteMatch();
    const passedBReadcrum = url.replace('/', '');

    const {shoppingcart, setShoppingcart, totalPrice} = useContext(AppContext)

    const handleRemove = () => {
        setShoppingcart([]);
    }

    const handleBuy = () => {
        window.location = '/køb';
    }

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
                    <button onClick={handleRemove} className={Style.removeItems}>RYD</button>
                </div>

                <button onClick={handleBuy} className={Style.buy}>Til kassen</button>
            </section>
        </main>
    )
}

export { Cart };