export function tabsetScript(dispatch, dispatchSoftK) {
  let selection = 0;

  function nav(step) {
    const navs = Array.from(
      document.querySelectorAll('.Tabset > input[type="radio"]')
    );
    const galleryNode = document.querySelector(".Gallery");
    const tabsetNode = document.querySelector(".Tabset");

    selection += step;

    //Adding animation of scrolling right and left
    window.scrollTo(0, 0);
    if (step === 1) {
      galleryNode.classList.add("bounceOutLeft");

      setTimeout(() => {
        galleryNode.classList.remove("bounceOutLeft");
        galleryNode.classList.add("bounceInRight");

        setTimeout(() => {
          galleryNode.classList.remove("bounceInRight");
        }, 500);
      }, 500);
    } else {
      galleryNode.classList.add("bounceOutRight");

      setTimeout(() => {
        galleryNode.classList.remove("bounceOutRight");
        galleryNode.classList.add("bounceInLeft");

        setTimeout(() => {
          galleryNode.classList.remove("bounceInLeft");
        }, 500);
      }, 500);
    }

    //avoiding selection overflow
    if (selection > navs.length - 1) selection = 0;
    else if (selection < 0) selection = navs.length - 1;

    // checking the input
    navs[selection].checked = true;

    // scrolling the tabset to the checked one
    const inputRect = navs[
      selection
    ].nextElementSibling.getBoundingClientRect();

    tabsetNode.scrollTo(inputRect.x, 0);

    const tab = navs[selection].dataset.tab;
    const tag = navs[selection].dataset.tag;
    // setting a new tab state
    if (tab) dispatch({ order: tab, myid: tab + "1", q: "" });
    else dispatch({ q: tag, myid: tag + "1", order: "latest" });
  }

  function handleTabset(event) {
    const ad = document.querySelector(".adItem");
    const searchBar = document.querySelector(
      ".react-search-bar__input"
    );

    if (document.activeElement === ad) {
      if (event.key !== "SoftLeft") return;

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
      return;
    }

    // if (document.activeElement === searchBar) {
    //   if (event.key === "SoftLeft") return;
    //   if (event.key === "SoftRight") return;
    // }

    switch (event.key) {
      case "SoftLeft": // SoftLeft
        nav(-1);
        searchBar.focus();
        dispatchSoftK({
          left: "Tab Left",
          center: "Search",
          right: "Tab Right",
        });
        break;

      case "SoftRight": // SoftRight
        nav(1);
        searchBar.focus();
        dispatchSoftK({
          left: "Tab Left",
          center: "Search",
          right: "Tab Right",
        });
        break;

      default:
        break;
    }
  }

  return handleTabset;
}
