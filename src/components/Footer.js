import React from "react";
import "../style/footer.css"

const Footer = () => {

    return (

        <footer className="footer blur">
            <div className="source-api">
                <p>API from</p>
                
                <a href="https://phonewise.onrender.com/api/search?q=samsung">https://phonewise.onrender.com/api/search?q=samsung</a>
                <a href="https://github.com/azharimm/phone-specs-api">https://github.com/azharimm/phone-specs-api</a>
            </div>

            <p className="madeby">Website made by William Nurdin Wijaya</p>
        </footer>

    )

}

export default Footer