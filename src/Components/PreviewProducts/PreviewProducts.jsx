import Style from './PreviewProducts.module.scss';

const PreviewProducts = (props) => {
    const dataObject = props.data;
    return (
        <figure className={Style.previewProducts}>
            <img src={dataObject.image_fullpath} alt={dataObject.name} />
            <figcaption>
                <span className={Style.previewProducts_info}>
                    <h2>{dataObject.name}</h2>
                    <p>{dataObject.description_short}</p>
                    <p>Læs mere...</p>
                </span>
                <span className={Style.previewProducts_buttons}>
                    <p className={Style.price}>pris: DKK {dataObject.price}</p>
                    <button className={Style.add}>Læg i kurv</button>
                    <p className={Style.count}>{dataObject.stock} på lager</p>
                </span>
            </figcaption>
        </figure>
    )
}

export {PreviewProducts};