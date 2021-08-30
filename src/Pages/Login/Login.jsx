import { useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { FormValidate } from "../../Components/FormValidate_login/FormValidate_login";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

import Style from './Login.module.scss';

const Login = () => {
    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '');

    const formFields = [
        {width: 'fullWidth', name: 'Brugernavn', required: true, type: 'text', message: null},
        {width: 'fullWidth', name: 'Kodeord', required: true, type: 'password', message: null},
    ]


    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBreadcrum} />
            <ProductNav />
            <section className={`${Style.login} content`}>
                <h1>Login</h1>
                <p>Indtast brugernavn og adgangskode for at logge på</p>
                <FormValidate inputs={formFields} />
            </section>
        </main>
    )
}

export { Login };