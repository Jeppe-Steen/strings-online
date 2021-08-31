import Style from './PreviewFrontpage.module.scss';

const PreviewFrontpage = (props) => {
    const product = props.object;
    
    return (
        <figure className={Style.previewFrontpage}>
            <img src={product.image_fullpath} alt={product.name} />
            <figcaption>
                <h3>{product.name}</h3>
                <p>{product.description_short} læs mere..</p>
                <span>
                    <p>Pris: {product.price}</p>
                    <button>Læg i kurv</button>
                </span>
            </figcaption>
        </figure>
    )
}

export { PreviewFrontpage };