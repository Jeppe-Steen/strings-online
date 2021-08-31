import { useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

const Cart = () => {
    const {url} = useRouteMatch();
    const passedBReadcrum = url.replace('/', '');

    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBReadcrum} />
            <ProductNav />
            <section className={`content`}>

            </section>
        </main>
    )
}

export { Cart };