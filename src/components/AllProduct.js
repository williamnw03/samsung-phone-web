import { useEffect, useState } from "react"
import "../style/all-card.css"
import CardProduct from "./CardProduct"
import DetailsCard from "./DetailsCard"
import samsung1Img from "../img/samsung1.jpg"

const AllProduct = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const [productData, setProductData] = useState("");
    const [detailsData, setDetailsData] = useState({
        phone_name: "",
        dimension: "",
        release_date: "",
        os: "",
        storage: "",
        image: "",
        slug: ""
    })
    const [cancelFetch, setCancelFetch] = useState(() => {
        return () =>  false
    })

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [errorDC, setErrorDC] = useState(false);
    
    useEffect(() => {
        const abortCards = new AbortController()
        const fetching = async () => {
            
            try {
                const resp = await fetch("https://api-mobilespecs.azharimm.site/v2/brands/samsung-phones-9", {signal: abortCards.signal})

                if(!resp.ok) throw new Error("Something went wrong")

                const data = await resp.json()
                
                const phones = data.data.phones.map(e => {
                    return {
                        name: e.phone_name,
                        image: e.image,
                        slug: e.slug
                    }
                })
    
                setProductData((prev) => phones)
                setLoading(false)
                setError(false)

            } catch(err) {
                if(err.message = "Failed to fetch"){
                    console.log("Fallback API error")
                    const phones = Array(20).fill({
                        name: "This is Samsung Phone",
                        image: samsung1Img,
                        slug: "samsung1"
                    })
                    setProductData((prev) => phones)
                    setLoading(false)
                    setError(false)
                    return false
                }

                if(err.name !== "AbortError") {
                    setError(true)
                    setLoading(false)
                    setProductData((prev) => "")
                }
            }
        }

        fetching()

        return () => abortCards.abort()
    }, [])

    const openCard = (slug) => {

        setDetailsData(() => {
            return {
                phone_name: "",
                dimension: "",
                release_date: "",
                os: "",
                storage: "",
                image: "",
                slug: ""
            }
        })

        const cancelFetch = new AbortController()
        
        const getDetails = async () => {

            setCancelFetch(() => () => cancelFetch.abort())
            try {
                
                const resp = await fetch(`https://api-mobilespecs.azharimm.site/v2/${slug}`, {signal: cancelFetch.signal})

                if(!resp.ok) throw new Error("Something went wrong")
    
                const data = await resp.json()
    
    
                setDetailsData((prev) => {
                    return {
                        phone_name: data.data.phone_name,
                        dimension: data.data.dimension,
                        release_date: data.data.release_date,
                        os: data.data.os,
                        storage: data.data.storage,
                        image: data.data.thumbnail,
                        slug: slug
                    }
                    
                })

                setErrorDC(false)

            } catch(err) {
                if(err.message = "Failed to fetch"){
                    console.log("Fallback API error 2")
                    setErrorDC(false)
                    setDetailsData((prev) => {
                        return {
                            phone_name: "Samsung Phone 1",
                            dimension: "Sed porttitor convallis mauris, ac.",
                            release_date: "Nulla molestie lorem a augue.",
                            os: "Nullam at pretium diam. Nam.",
                            storage: "Quisque maximus in eros ut.",
                            image: samsung1Img,
                            slug: "samsung1"
                        }
                        
                    })
                    return false
                }

                if(err.name !== "AbortError") setErrorDC(true)
                
            }


        }

        getDetails()

        const card = document.querySelector("div.card-details")
        card.classList.add("card-muncul")

        document.querySelector("html").classList.add("hidden")
        document.body.classList.add("hidden")

        const blurEl = document.querySelectorAll(".blur")

        blurEl.forEach(e => {
            e.classList.add("blur-muncul")
        })

        const darkBg = document.querySelector("div.dark-bg")
        darkBg.classList.add("gelap-muncul")
    }

    return (
        <div className="loading-notfound">
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Something went wrong</p>}

            <main className="all-product">

                {productData && productData.map((e, i) => {
                    return <CardProduct key={i+1} name={e.name} image={e.image} slug={e.slug} openCard={openCard}/>
                })}

                <DetailsCard phone_name={detailsData.phone_name} dimension={detailsData.dimension} release_date={detailsData.dimension} os={detailsData.os} storage={detailsData.storage} image={detailsData.image} slug={detailsData.slug} setDetailsData={setDetailsData} cancelFetch={cancelFetch} errorDC={errorDC}/>
            </main>
        </div>
    )

}

export default AllProduct