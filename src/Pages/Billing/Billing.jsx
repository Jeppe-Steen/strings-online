import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

const Billing = () => {
    return (
        <main className={`content_container`}>
            <Breadcrum route="" />
            <ProductNav />
            <section className={`content`}>
            </section>
        </main>
    )
}

export { Billing };