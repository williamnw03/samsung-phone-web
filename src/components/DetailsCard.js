import "../style/details-card.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

const DetailsCard = ({
  phone_name,
  dimension,
  release_date,
  os,
  storage,
  image,
  slug,
  setDetailsData,
  cancelFetch,
  errorDC,
}) => {
  const closeCard = () => {
    const card = document.querySelector("div.card-details");
    card.classList.remove("card-muncul");

    document.querySelector("html").classList.remove("hidden");
    document.body.classList.remove("hidden");

    const blurEl = document.querySelectorAll(".blur");

    blurEl.forEach((e) => {
      e.classList.remove("blur-muncul");
    });

    const darkBg = document.querySelector("div.dark-bg");
    darkBg.classList.remove("gelap-muncul");

    cancelFetch();

    setDetailsData(() => {
      return {
        phone_name: "",
        dimension: "",
        release_date: "",
        os: "",
        storage: "",
        image: "",
        slug: "",
      };
    });
  };

  const noBlur = () => {
    const blurEl = document.querySelectorAll(".blur");

    blurEl.forEach((e) => {
      e.classList.remove("blur-muncul");
    });

    document.body.classList.remove("hidden");
  };

  return (
    <div className="card-details">
      <div className="wrapper">
        <div className="close-card" onClick={closeCard}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </div>

        <div className="product-img">
          {image ? (
            <img src={image} alt="Product" />
          ) : (
            <div className="image-loading"></div>
          )}
        </div>

        <div className="details-text">
          {phone_name ? (
            <h2>{phone_name}</h2>
          ) : (
            <h2 className="info-loading">Loading...</h2>
          )}

          <div className="release-data">
            <h3>Release Date</h3>
            {release_date ? (
              <p>{release_date}</p>
            ) : (
              <p className="info-loading">Loading...</p>
            )}
          </div>

          <div className="operating-system">
            <h3>Operating System</h3>
            {os ? <p>{os}</p> : <p className="info-loading">Loading...</p>}
          </div>

          <div className="storage">
            <h3>Storage</h3>
            {storage ? (
              <p>{storage}</p>
            ) : (
              <p className="info-loading">Loading...</p>
            )}
          </div>

          <div className="dimension">
            <h3>Dimension</h3>
            {dimension ? (
              <p>{dimension}</p>
            ) : (
              <p className="info-loading">Loading...</p>
            )}
          </div>

          {phone_name && (
            <Link
              to={`/details/${slug}`}
              className="more-details-button"
              onClick={noBlur}
            >
              More Details
            </Link>
          )}
        </div>

        {errorDC && (
          <div className="error-details-card">
            <p>Something went wrong</p>
          </div>
        )}

        {errorDC && <div className="error-dark-screen"></div>}
      </div>
    </div>
  );
};

export default DetailsCard;
