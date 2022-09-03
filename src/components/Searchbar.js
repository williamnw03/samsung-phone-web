import { useEffect, useState } from "react"
import "../style/searchbar.css"

const Searchbar = () => {

    const [searchInput, setSearchInput] = useState("")
    const inputChange = (ev) => setSearchInput(ev.target.value)

    const [notFound, setNotFound] = useState(false);


    useEffect(() => {
        const allProduct = document.querySelectorAll("div.each-product div.name-product p")
        const container = document.querySelector("div.loading-notfound")
        const error = document.querySelector("div.loading-notfound p.error")
    
        const loadingCheck = document.querySelector("div.loading-notfound p.loading")
    
        let count = 0;
    
    
        if(!error && !loadingCheck) {
            
            allProduct.forEach(e => {
                const nameProduct = e.textContent.toLowerCase()
        
                if(nameProduct.includes(searchInput.toLowerCase())) {
                    e.parentElement.parentElement.style.display = "block"
                } else {
                    e.parentElement.parentElement.style.display = "none"
                    count++
                }
            });
        
            if(container){
                if(count === allProduct.length) {
                    setNotFound(true)
                } else {
                    setNotFound(false)
                }
            } 
        }
    }, [searchInput])





    return (
        <div className="search-bar-container blur">
            <input type="text" className="search-bar" placeholder="Search here..." onChange={(ev) => inputChange(ev)} value={searchInput}/>
            {notFound && <p className="empty">Not Found</p>}
        </div>
    )

}

export default Searchbar