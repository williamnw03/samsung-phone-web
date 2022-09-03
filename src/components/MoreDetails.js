import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/more-details.css"

const MoreDetails = () => {

    const { type } = useParams()

    const [moreDetails, setMoreDetails] = useState("")
    const [imageProduct, setImageProduct] = useState("")
    const [nameProduct, setNameProduct] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        const abortMoreDetails = new AbortController()

        const fetchData = async () => {

            try {
                const resp = await fetch(`https://api-mobilespecs.azharimm.site/v2/${type}`, {signal: abortMoreDetails.signal})

                if(!resp.ok) throw new Error("Something went wrong")

                const data = await resp.json()
    
                setMoreDetails(() => data.data.specifications)
                setImageProduct(() => data.data.thumbnail)
                setNameProduct(() => data.data.phone_name)
                setError(false)
            } catch(err) {
                
                if(err.name !== "AbortError") {
                    
                    setError(true)
                    setMoreDetails(() => "")
                    setImageProduct(() => "")
                    setNameProduct(() => "")
                
                }
            }
        }

        fetchData()

        return () => abortMoreDetails.abort()
    }, [])

    return (
        <>
            <div className="wrapper-details-table">
                <main className="details-table">


                    <div className="image-product-details-table">
                        {imageProduct ? <img src={imageProduct} alt="Product Image" /> : <div className="loading-image-MoreDetails"></div>}
                    </div>

                    {nameProduct ? <h1>{nameProduct}</h1> : <h1 className="loading-MoreDetails">Loading...</h1>}

                    {error && <div className="error-more-details">
                        <p>Something went wrong</p>
                    </div>}

                    <div className="all-details-table">

                        {moreDetails && moreDetails.map((e, i) => {

                            return (
                                <div className="each-details-table" key={i}>
                                    <h2 className="details-subtitle">{e.title}</h2>
                                    <table>
                                        <tbody>

                                            {e.specs.map((e, i) => {
    
                                                return (
                                                <tr key={i}>
                                                    <td>{e.key}</td>
                                                    <td>
                                                        {e.val.length > 1 ? <ul className="val-ul">{e.val.map((e, i) => <li key={i}><span>{e}</span></li>)}
                                                        </ul> : e.val}
                                                    </td>
                                                </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )

                        })}

                    </div>
                
                </main>
            </div>
        </>
    )

}

export default MoreDetails;