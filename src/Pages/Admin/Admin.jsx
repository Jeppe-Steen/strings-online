import { useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

const Admin = () => {
    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '')

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