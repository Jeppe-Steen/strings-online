import { useContext, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

import {AppContext} from '../../Context/ContextProvider';

const Admin = () => {
    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '')
    const history = useHistory();

    const {loginData} = useContext(AppContext);

    useEffect(() => {
        if(!loginData.user_id) {
            history.push('/');
        }
    }, [loginData])

    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBreadcrum} />
            <ProductNav />
            <section className={`content`}>
            </section>
        </main>
    )
}

export { Admin };