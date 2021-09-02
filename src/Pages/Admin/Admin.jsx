import { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

import {AppContext} from '../../Context/ContextProvider';
import { doFetch } from "../../Helpers/Fetching";

import Style from './Admin.module.scss';

const Admin = () => {
    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '')
    const history = useHistory();

    const {loginData} = useContext(AppContext);
    const [orders, setOrders] = useState([]);

    const getData = async () => {
        const url = `https://api.mediehuset.net/stringsonline/orders`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'GET', null, key);
        setOrders(response);
    }

    useEffect(() => {
        if(!loginData.user_id) {
            history.push('/');
        }
        getData();
    }, [loginData, orders])

    const handleClock = (time) => {
        let test = new Date(time * 1000);
            let date = test.getDate();
            let month = test.getMonth();
            let year = test.getFullYear();

            let setMonth;

            switch(month) {
                default:
                    break;
                case 0:
                    setMonth = 'Januar';
                    break;
                case 1:
                    setMonth = 'Febuar';
                    break;
                case 2:
                    setMonth = 'Marts';
                    break;
                case 3:
                    setMonth = 'April';
                    break;
                case 4:
                    setMonth = 'Maj';
                    break;
                case 5:
                    setMonth = 'Juni';
                    break;
                case 6:
                    setMonth = 'Juli';
                    break;
                case 7:
                    setMonth = 'August';
                    break;
                case 8:
                    setMonth = 'September';
                    break;
                case 9:
                    setMonth = 'Oktober';
                    break;
                case 10:
                    setMonth = 'November';
                    break;
                case 11:
                    setMonth = 'December';
                    break;
            }

        return `${date} ${setMonth} ${year}`;
    } 

    const deleteItem = async (id) => {
        const url = `https://api.mediehuset.net/stringsonline/orders/${id}`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'DELETE', null, key)
        return response;
    }
    const handleDelete = () => {
        orders.forEach(orders => {
            deleteItem(orders.id);
        })

        getData();
    }

    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBreadcrum} />
            <ProductNav />
            <section className={`content`}>
                {orders.length && orders.map((order, index) => {
                    const test = handleClock(order.created);
                    return (
                        <div key={index} className={Style.orders}>
                            <p className={Style.date}>{test}</p>
                            <p className={Style.price}>DKK {order.total}</p>
                            <p className={Style.id}>Ordrenr. <strong>{order.id}</strong></p>
                        </div>
                    )
                })}
                <button onClick={handleDelete} className={Style.delete}>Slet hele listen</button>
            </section>
        </main>
    )
}

export { Admin };