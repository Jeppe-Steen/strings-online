import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

const Products = () => {
    return (
        <main className={`content_container`}>
            <Breadcrum route="" />
            <ProductNav />
            <section className={`content`}>
            </section>
        </main>
    )
}

export { Products };