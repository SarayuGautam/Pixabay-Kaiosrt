import React, { useEffect, useState, useContext } from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

import { PageContext, pageActions } from "../../providers/page/Page.provider"; // prettier-ignore
import { handleImageScript } from "../../scripts/events/handle-image.script";
import { SoftkeysContext, softkActions } from '../../providers/softkeys/Softkeys.provider'; // prettier-ignore
import { ImageContext, imageActions } from '../../providers/images/Images.provider'; // prettier-ignore
import { showSnackbar } from "../../scripts/snackbar/snackbar.script";
import "./Image.styles.scss";

const Image = ({ id }) => {
  const [image, setImage] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const { pageDispatch } = useContext(PageContext);
  const { softkDispatch } = useContext(SoftkeysContext);
  const { imageDispatch } = useContext(ImageContext);

  const dispatch = (page, keys) => {
    softkDispatch(softkActions.setkeys(keys));
    pageDispatch(pageActions.setPage(page));
  };

  const goBack = () => {
    imageDispatch(imageActions.initialize());
  };

  useEffect(() => {
    fetchAPi();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchAPi=async()=>{
    console.log(id)
    // if (!navigator.onLine && !localStorage.getItem("image")) {
    //   showSnackbar("You need an active Internet connection");
    // }

    // if (!navigator.onLine && localStorage.getItem("image")) {
    //   setImage(JSON.parse(localStorage.getItem("image")));
    // }
    const imageCache = await caches.open("imagesCache")
    fetch(
        "https://pixabay.com/api/?key=15383924-b55678bf3c204ea5966552481&id=" +
        id
      )
      .then((res) => res.json())
      .then((res) => {
        setImage(res.hits[0]);
        console.log(res.hits[0]);
      })
      .catch((error) => {
        console.log("error loading img", error);
        fetch(
            "https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=15383924-b55678bf3c204ea5966552481&id=" +
            id
          )
          .then((res) => res.json())
          .then((res) => {
            setImage(res.hits[0]);
            console.log(image);
          })
          .catch((error) => {
            const url = localStorage.getItem("cacheURL")
            imageCache.match(url).then(res=>{
              if (res) {
                return res.json();
              } else {
                throw new Error("error")
              }
            }).then(images=>{
              // eslint-disable-next-line eqeqeq
              const image = images.hits.filter(i=>i.id==id);
              if (image&&image.length) {
                setImage(image[0])
              }else{
                throw new Error("no internet!");
              }
            }).catch(err=>{
              console.log("error even with cors", error);
              showSnackbar("Something went wrong...");
            })
          });
      });
    const handleImage = handleImageScript(dispatch, goBack);
    document.addEventListener("keydown", handleImage, false);
    return () =>
      document.removeEventListener("keydown", handleImage, false);
  };
  return (
    <section className="Image">
      {image && (
        <div id="image-container">
          <img
            src={image.previewURL}
            alt={image.tags}
            id="image"
            // effect="blur"
            data-src={image.webformatURL}
            onLoad={() => setIsLoaded(true)}
          />
          {isLoaded && (
            <img
              src="/images/logo_square.png"
              alt="camera"
              id="logo"
            />
          )}
        </div>
      )}
      <section id="ad-section" style={{ transform: "scale(0)" }}>
        <article>
          <div tabIndex="-1" id="ad-container"></div>
          <div className="points-container">
            <span id="score"></span>
            <img src="/images/star.png" alt="star" />
          </div>
          <div className="thanks-container"></div>
          <p id="ad-paraph"></p>
          <div id="choice">
            <span id="ad-left"></span>
            <span id="ad-center"></span>
            <span id="ad-right"></span>
          </div>
        </article>
      </section>
    </section>
  );
};

export default Image;
