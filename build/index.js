let lastSelected = null;

function nav(step) {
  const searchBar = document.querySelector(
    ".react-search-bar__input"
  );
  const ad = document.querySelector(".adItem");

  let focusedHTML = document.activeElement;

  if (!focusedHTML || focusedHTML.tagName === "BODY") {
    if (lastSelected) {
      lastSelected.focus();
    } else searchBar.focus();
    focusedHTML = document.activeElement;
  }

  const { x, y, height, width } = focusedHTML.getBoundingClientRect();

  switch (step) {
    case "up":
      try {
        // fixing bug of first nav go up to search
        const [column1, column2] = document.querySelectorAll(
          ".my-masonry-grid_column"
        );

        // if the focused is the search bar
        if (focusedHTML === searchBar) {
          if (ad) {
            ad.focus();
            lastSelected = ad;
          }
        }

        // if the focused is the top image of either column
        else if (
          focusedHTML === column1.firstChild ||
          focusedHTML === column2.firstChild
        ) {
          searchBar.focus();
          window.scrollTo({
            x: 0,
            y: 0,
            scroll: "smooth"
          });
          lastSelected = searchBar;
        }
        // if the focused is not any of the above then:
        else {
          let upEle = document.elementFromPoint(x + 3, y - 6);

          // attemp to get the upper image again
          if (!Boolean(upEle) || upEle.tagName !== "BUTTON") {
            window.scrollBy(0, -40);
            upEle = document.elementFromPoint(x + 3, y - 6);
          }

          if (!Boolean(upEle) || upEle.tagName !== "BUTTON") {
            window.scrollBy(0, -60);
            upEle = document.elementFromPoint(x + 3, y - 6);
          }

          if (!Boolean(upEle) || upEle.tagName !== "BUTTON") break;

          const { y: upHeight } = upEle.getBoundingClientRect();

          window.scrollTo(0, upHeight + window.scrollY - 120);

          upEle.focus();
          lastSelected = upEle;
          document.removeEventListener("keydown", handleHome2, false);
          setTimeout(() => {
            document.addEventListener("keydown", handleHome2, false);
          }, 300)
        }
      } catch (error) {
        console.error(error);
      }

      break;

    case "down":
      try {
        // if searchbar is focused, focus the first image
        if (focusedHTML === searchBar) {
          if (document.querySelector(".my-masonry-grid_column"))
            document
              .querySelector(".my-masonry-grid_column")
              .firstChild.focus();
        } else if (focusedHTML === ad) {
          searchBar.focus();
        } else {
          let downEle = document.elementFromPoint(
            x + 3,
            y + height + 6
          );

          // attemp to get the downer image again
          if (!Boolean(downEle) || downEle.tagName !== "BUTTON") {
            window.scrollBy(0, 40);
            downEle = document.elementFromPoint(
              x + 3,
              y + height + 6
            );
          }

          if (!Boolean(downEle) || downEle.tagName !== "BUTTON") {
            window.scrollBy(0, 60);
            downEle = document.elementFromPoint(
              x + 3,
              y + height + 6
            );
          }

          if (!Boolean(downEle) || downEle.tagName !== "BUTTON")
            break;

          const { y: downHeight } = downEle.getBoundingClientRect();

          window.scrollTo(0, downHeight + window.scrollY - 120);

          downEle.focus();
          lastSelected = downEle;
          
          document.removeEventListener("keydown", handleHome2, false);
          setTimeout(() => {
            document.addEventListener("keydown", handleHome2, false);
          }, 300)
        }
      } catch (error) {
        console.error(error);
      }
      break;

    case "left":
      if (focusedHTML === searchBar) break;

      let leftEle = document.elementFromPoint(
        x - 10,
        y + 3 + height / 2
      );

      if (!leftEle || leftEle.tagName !== "BUTTON")
        leftEle = document.elementFromPoint(x - 10, y + 3);
      // second attemp to get the image

      if (!leftEle || leftEle.tagName !== "BUTTON")
        leftEle = document.elementFromPoint(x - 10, y + height);
      // third attemp to get the image

      if (!leftEle) break;

      const { y: leftEleTop } = leftEle.getBoundingClientRect();

      window.scrollTo(0, leftEleTop + window.scrollY - 120);

      leftEle.focus();

      lastSelected = leftEle;
      break;

    case "right":
      if (focusedHTML === searchBar) break;

      let rightEle = document.elementFromPoint(
        x + 10 + width,
        y + 3 + height / 2
      );

      if (!rightEle || rightEle.tagName !== "BUTTON")
        rightEle = document.elementFromPoint(x + 10 + width, y + 3);
      // second attemp to get the image

      if (!rightEle || rightEle.tagName !== "BUTTON")
        rightEle = document.elementFromPoint(
          x + 10 + width,
          y + height
        );
      // third attemp to get the image

      if (!rightEle) break;

      const { y: rightEleTop } = rightEle.getBoundingClientRect();

      window.scrollTo(0, rightEleTop + window.scrollY - 120);

      rightEle.focus();

      lastSelected = rightEle;
      break;

    default:
      break;
  }
}

function handleHome2(event) {
  switch (event.key) {
    case "ArrowUp":
      nav("up");
      break;

    case "ArrowDown":
      nav("down");
      break;

    case "ArrowLeft":
      nav("left");
      break;

    case "ArrowRight":
      nav("right");
      break;

    default:
      break;
  }
}

document.addEventListener("keydown", handleHome2, false);
