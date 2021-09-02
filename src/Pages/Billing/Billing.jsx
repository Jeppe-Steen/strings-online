import { useContext, useEffect, useState } from "react";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";
import { AppContext } from "../../Context/ContextProvider";
import { doFetch } from "../../Helpers/Fetching";

import Style from './Billing.module.scss';

const Billing = () => {

    const {loginData} = useContext(AppContext);
    const [order, setOrder] = useState({});

    const getOrder = async () => {
        const url = `https://api.mediehuset.net/stringsonline/orders`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'GET', null, key);

        let orders = [];

        const getOrderDetails = async (order) => {
            const url = `https://api.mediehuset.net/stringsonline/orders/${order.id}`;
            const key = loginData.access_token;
            const response = await doFetch(url, 'GET', null, key);

            for (let line of response.order.orderlines) {
                orders.push(line);
            }

            return response.order;
        }

        getOrderDetails(response[response.length - 1]);

        setTimeout(() => {
            setOrder({
                id: response[response.length - 1].id,
                orders: orders,
                total: response[response.length - 1].total,
            })
        }, [500])
    }

    useEffect(() => {
        getOrder();
        console.log(order);
    }, [])



    return (
        <main className={`content_container`}>
            <Breadcrum route="" />
            <ProductNav />
            <section className={`${Style.billing} content`}>
                <article className={Style.billing_section}>
                    <header className={Style.billing_header}>
                        <h1>Tak for din bestilling</h1>
                    </header>
                    <ul className={Style.billing_list}>
                        <li className={Style.billing_listItem}>
                            <p className={Style.first}>Ordre nr.</p>
                            <p className={`${Style.color_green} ${Style.second}`}>{order.id}</p>
                        </li>
                        {order.orders && order.orders.map((item, index) => {
                            return (
                                <li key={index} className={Style.billing_listItem}>
                                    <p className={Style.first}>Produkt</p>
                                    <p className={`${Style.color_green} ${Style.second}`}>{item.name}</p>
                                    <p className={Style.third}>{item.quantity} stk.</p>
                                    <p className={Style.fourth}>DKK {item.price}</p>
                                </li>
                            )
                        })}
                        <li className={Style.billing_listItem}>
                            <p className={Style.first}>Moms</p>
                            <p className={Style.fourth}>DKK {parseInt(order.total) * (0.25)}</p>
                        </li>
                        <li className={Style.billing_listItem}>
                            <p className={Style.first}>I alt</p>
                            <p className={Style.fourth}>DKK {order.total}</p>
                        </li>
                    </ul>
                </article>
                <article className={Style.billing_sectionTwo}>
                </article>
            </section>
        </main>
    )
}

export { Billing };