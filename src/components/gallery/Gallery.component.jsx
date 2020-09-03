import React, { useContext, useEffect } from "react";
import Masonry from "react-masonry-css";
// import LazyLoad from "react-lazyload";
// import { CSSTransitionGroup } from "react-transition-group";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component"; // prettier-ignore
import "react-lazy-load-image-component/src/effects/blur.css";

import { handleKeys } from "../../scripts/events/handle-gallery.script";
import { ImageContext, imageActions } from "../../providers/images/Images.provider"; // prettier-ignore
import { PageContext, pageActions } from '../../providers/page/Page.provider'; // prettier-ignore
import { SoftkeysContext, softkActions } from '../../providers/softkeys/Softkeys.provider'; // prettier-ignore
import "./Gallery.styles.scss";

const Gallery = ({ images, scrollPosition }) => {
  const { imageDispatch } = useContext(ImageContext);
  const { pageDispatch } = useContext(PageContext);
  const { softkDispatch } = useContext(SoftkeysContext);
  // const [effect, setEffect] = useState("fade");

  const loadMore = () => {
    imageDispatch(imageActions.loadMore());
  };

  // dispatch function for handleKey
  const dispatch = (id) => {
    pageDispatch(pageActions.setPage(id));

    softkDispatch(
      softkActions.setkeys({
        left: "Back",
        center: "Save",
        right: "AD",
      })
    );
  };

  function handleScroll() {
    if (
      window.scrollY + window.innerHeight + 300 >=
      document.documentElement.scrollHeight
    ) {
      loadMore();

      window.removeEventListener("scroll", handleScroll, false);

      setTimeout(() => {
        window.addEventListener("scroll", handleScroll, false);
      }, 1000);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);

    return () =>
      window.removeEventListener("scroll", handleScroll, false);
    // eslint-disable-next-line
  }, []);

  return (
    <Masonry
      breakpointCols={2}
      className="animated Gallery"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((imageData) => (
        <button
          className="home-nav"
          key={imageData.myid ? imageData.myid : imageData.id}
          onKeyUp={(event) =>
            handleKeys(event, imageData.id, dispatch)
          }
        >
          <LazyLoadImage
            src={imageData.previewURL}
            alt={imageData.tags}
            effect="blur"
            scrollPosition={scrollPosition}
            threshold={200}
            // onLoad={() => setEffect("fade-enter")}
          />
        </button>
      ))}
    </Masonry>
  );
};

export default trackWindowScroll(Gallery);
