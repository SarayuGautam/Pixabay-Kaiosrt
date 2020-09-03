import { showSnackbar } from "../snackbar/snackbar.script";
import { getNewAd } from "../../scripts/kaiad/kaiads.min";

export function handleImageScript(dispatch, goBack) {
  function handleImage(event) {
    switch (event.key) {
      case "Enter": //SoftRight
        if (event.target === document.querySelector(".adItem"))
          return;

        window.scrollTo(0, 0);

        adSection.adPopup();
        break;

      case "SoftLeft":
        goBack();

        dispatch("home", {
          left: "Tab Left",
          center: "Search",
          right: "Tab Right",
        });
        break;

      case "SoftRight":
        const ad = document.querySelector(".adItem");

        if (!ad) return;

        ad.focus();

        ad.dispatchEvent(
          new KeyboardEvent("keydown", {
            bubbles: true,
            cancelBubble: true,
            cancelable: true,
            defaultPrevented: true,
            key: "Enter",
            keyCode: 13,
            which: 13,
          })
        );

        ad.blur();
        break;

      default:
        break;
    }
  }

  const adSection = (function () {
    const adSection = document.getElementById("ad-section");
    const score = document.getElementById("score");
    const adParaph = document.getElementById("ad-paraph");
    const adleft = document.getElementById("ad-left");
    const adcenter = document.getElementById("ad-center");
    const adright = document.getElementById("ad-right");
    const ad = document.querySelector(".adItem");
    const pointsContainer = document.querySelector(
      ".points-container"
    );
    const thanksContainer = document.querySelector(
      ".thanks-container"
    );
    getNewAd("ad-container");
    getNewAd("ad-container2");

    function adPopup() {
      adSection.style.transform = "scale(1)";
      pointsContainer.style.display = "flex";
      adSection.children[0].style.display = "block";

      score.innerHTML = "New Image! ";

      adleft.innerHTML = "Back";
      adcenter.innerHTML = "";
      adright.innerHTML = "Yes";

      adParaph.innerHTML = `Do you want to download this image?
        You will need to watch an ad`;

      document.addEventListener("keydown", handleAd, false);
      document.removeEventListener("keydown", handleImage, false);
    }

    function closePopup() {
      adSection.children[0].style.display = "block";
      adSection.style.transform = "scale(0)";

      score.innerHTML = "";
      adcenter.innerHTML = "";
      adright.innerHTML = "";
      adleft.innerHTML = "";
      adParaph.innerHTML = "";
      thanksContainer.innerHTML = "";
    }

    function handleAd(event) {
      switch (event.key) {
        case "SoftLeft": //softleft
          closePopup();

          document.addEventListener("keydown", handleImage, false);
          document.removeEventListener("keydown", handleAd, false);
          break;
        case "SoftRight": //softright
          if (!ad) return;

          ad.focus();

          ad.dispatchEvent(
            new KeyboardEvent("keydown", {
              bubbles: true,
              cancelBubble: true,
              cancelable: true,
              defaultPrevented: true,
              key: "Enter",
              keyCode: 13,
              which: 13,
            })
          );

          ad.blur();

          pointsContainer.style.display = "none";

          thanksContainer.innerHTML =
            '<img src="/images/rocket.png" alt="rocket"><span>Thanks</span>';

          adParaph.innerHTML =
            '<img src="/images/heart.png" alt="heart" /> The image will be downloaded <img src="/images/heart.png" alt="heart" />';

          adleft.innerHTML = "";
          adright.innerHTML = "";
          adcenter.innerHTML = "Continue";

          document.addEventListener("keydown", handleAcept, false);
          document.removeEventListener("keydown", handleAd, false);
          break;

        default:
          break;
      }
    }

    function handleAcept(event) {
      if (event.key === "Enter") {
        try {
          const img = new Image();

          img.crossOrigin = "Anonymous";

          // CORS proxy due to innapropiate origin
          img.src =
            // "https://cors-anywhere.herokuapp.com/" +
            document.getElementById("image").dataset.src;

          img.onload = function () {
            const canvas = document.createElement("canvas");
            const link = document.createElement("a");

            //giving properties to canvas
            canvas.width = img.width;
            canvas.height = img.height;

            // printing the img into the canvas
            canvas.getContext("2d").drawImage(img, 0, 0);

            // giving properties to link for preparing to download
            link.download = "img-stock" + Date.now().toString();
            link.href = canvas.toDataURL("image/png");

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            showSnackbar("Image Saved");
          };
        } catch (error) {
          showSnackbar("There was something wrong");

          console.error(error);
        }

        closePopup();

        document.addEventListener("keydown", handleImage, false);
        document.removeEventListener("keydown", handleAcept, false);
      }
    }

    return {
      adPopup,
    };
  })();

  return handleImage;
}
