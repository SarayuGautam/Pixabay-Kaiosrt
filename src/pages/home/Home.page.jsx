// import React, { useEffect, useState, useContext } from "react"; // prettier-ignore
// import Search from "react-search-bar";
// // import { forceCheck } from "react-lazyload";
// import Gallery from "../../components/gallery/Gallery.component";
// import Tabset from "../../components/tabset/Tabset.component";
// import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner.component";

// import { ImageContext, imageActions } from "../../providers/images/Images.provider"; // prettier-ignore
// import { SoftkeysContext, softkActions } from '../../providers/softkeys/Softkeys.provider'; // prettier-ignore

// import { getNewAd, getFullAd } from "../../scripts/kaiad/kaiads.min";
// import { homeScript } from "../../scripts/events/handle-home.script";
// import { showSnackbar } from "../../scripts/snackbar/snackbar.script";

import "./Home.styles.scss";

// let apiReqCount = 0;

// function Home() {
//   const { imageState, imageDispatch } = useContext(ImageContext);
//   const [images, setImages] = useState([]);
//   const [loadedImg, setLoadedImg] = useState({});
//   const { softkDispatch } = useContext(SoftkeysContext);

//   useEffect(() => {
//     // verifyingConnection();

//     getNewAd("ad-container2");
//     getNewAd("ad-container3");

//     const handleHome = homeScript(dispatch);

//     document.addEventListener("keydown", handleHome, false);

//     return () =>
//       document.removeEventListener("keydown", handleHome, false);
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       window.scrollBy(0, 1);
//     }, 2000);
//     // if it was fetched then don't fetch it
//     if (imageState.myid in loadedImg) {
//       // if it is new gallery then clear the images
//       if (/[1]$/.test(imageState.myid)) {
//         setImages(loadedImg[imageState.myid]);

//         // setTimeout(() => {
//         //   // lazy load check
//         //   forceCheck();
//         // }, 2000);

//         // return forceCheck();
//         return;
//       }

//       // adding a number to the id in order to make it unique in all the app
//       const changedId = loadedImg[imageState.myid].forEach((img) => {
//         img.myid =
//           img.id + imageState.myid[imageState.myid.length - 1];
//         return img;
//       });

//       setImages((prev) => [...prev, ...changedId]);

//       // setTimeout(() => {
//       //   // lazy load check after 2s
//       //   forceCheck();
//       // }, 2000);

//       // // lazy load check
//       // return forceCheck();
//       return;
//     }

//     fetchApi(imageState);
//     // eslint-disable-next-line
//   }, [imageState]);

//   useEffect(() => {
//     // every time the app taps
//     if (images.length <= 20) {
//       const column1 = document.querySelector(
//         ".my-masonry-grid_column"
//       );

//       if (column1) {
//         if (column1.children[0]) {
//           column1.children[0].focus();
//           softkDispatch(
//             softkActions.setkeys({
//               left: "Tab Left",
//               center: "Select",
//               right: "Tab Right",
//             })
//           );
//           window.scrollTo(0, 0);
//         }
//       }
//     }
//     // eslint-disable-next-line
//   }, [images]);

//   const dispatch = (keys) => {
//     softkDispatch(softkActions.setkeys(keys));
//   };

//   const handleSearch = (query) => {
//     query.trim().toLowerCase();

//     imageDispatch(imageActions.search(query));
//   };

//   // const verifyingConnection = () => {
//   //   if (!navigator.onLine) {
//   //     showSnackbar("You need an active Internet connection");
//   //   }
//   // };

//   const apiURL =
//     "https://pixabay.com/api/?key=15383924-b55678bf3c204ea5966552481";

//   const fetchApi = async(options) => {
//     apiReqCount++;

//     if (apiReqCount % 5 === 0) getFullAd();

//     let url = apiURL;
//     const imagesCache = await caches.open("imagesCache")

//     Object.entries(options).forEach(([key, value]) => {
//       // escaping the property myid which is used for storage
//       if (key === "myid") return;

//       // escaping the prop without value
//       if (!value) return;

//       url += `&${key}=${value}`;
//     });
//     localStorage.setItem("cacheURL", url);
//     return fetch(url)
//       .then((res) => res.json())
//       .then((res) => {
//         setLoadedImg({ [options.myid]: res.hits, ...loadedImg });

//         // if it is new gallery then clear the images

//         if (/[1]$/.test(imageState.myid)) {
//           setImages(res.hits);
//           imagesCache.add(url)
//           return;
//         }

//         const changed = res.hits.map((img) => {
//           img.myid =
//             img.id + imageState.myid[imageState.myid.length - 1];

//           return img;
//         });

//         setImages((prev) => [...prev, ...changed]);

//         // setTimeout(() => {
//         //   // lazy load check
//         //   forceCheck();
//         // }, 2000);

//         // forceCheck();
//       })
//       .catch((error) => {
//         imagesCache.match(url).then(res => {
//           if(res){
//             return res.json();
//           }else{
//             throw new Error("error")
//           }
//         }).then(images => {
//           console.log("SERVED FROM CACHE")
//           return setImages(images.hits);
//         }).catch(err=>console.log("No internet!"));
//       });
//   };

//   return (
//     <main className="Home">
//       <div className="search-container">
//         <Search
//           autoFocus
//           onChange={() => { }}
//           onSearch={handleSearch}
//           onClear={() => { }}
//           suggestions={[]} //component prop bugged
//           renderSearchButton
//           placeholder="Search images"
//         />
//       </div>

//       <Tabset />
//       <Gallery images={images} />
//       <LoadingSpinner />
//     </main>
//   );
// }

// export default Home;

import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const apps = JSON.parse(localStorage.getItem("apps"));
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("body");

function Home() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div class="clippedHead">
          <div class="clippedHeadText">Try some other apps</div>
        </div>
        <div>
          <div class="list-group">
            {apps.map((app) => {
              return (
                <div
                  class="list-group-item list-group-item-action"
                  tabIndex="1"
                  data-appId="1">
                  <div class=" imageApp ">
                    <div class="appImg">
                      <img src={app.image} alt="appImage"></img>
                      <div>
                        <small class="appCategory">{app.category}</small>
                        <small class="appName">{app.title}</small>
                      </div>
                    </div>
                    <div class="getDownload">
                      <img
                        class="download"
                        src="/images/download.png"
                        alt="download"></img>
                      <small>Get</small>
                    </div>
                  </div>
                  <small class="description">Description</small>
                  <small class="des-text">{app.description} </small>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
