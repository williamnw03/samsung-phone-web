import "../style/all-card.css"

const CardProduct = ({name, image, slug, openCard}) => {

    return (
            <div className="each-product blur">

                <div className="img-details">
                    <div className="img-details-product">
                        <img src={image} alt={`Image of ${name}`} />
                        <button onClick={() => openCard(slug)}>Details</button>
                    </div>
                </div>

                <div className="name-product">
                    <p>{name}</p>
                </div>
                
            </div>
    )

}

export default CardProduct