export function homeScript(dispatch) {
  // module design pattern

  function checkFocused() {
    if (
      document.activeElement ===
      document.querySelector(".react-search-bar__input")
    ) {
      dispatch({
        left: "Tab Left",
        center: "Search",
        right: "Tab Right",
      });
      window.scrollTo({
        top: 0,
        left: 0,
        scroll: "smooth",
      });
    } else if (
      document.activeElement === document.querySelector(".adItem")
    ) {
      dispatch({ left: "AD", center: "", right: "" });
      window.scrollTo({
        top: 0,
        left: 0,
        scroll: "smooth",
      });
    } else
      dispatch({
        left: "Tab Left",
        center: "Select",
        right: "Tab Right",
      });
  }

  function handleHome(event) {
    switch (event.key) {
      case "ArrowUp":
        setTimeout(() => {
          checkFocused();
        }, 100);
        // forceCheck();
        break;

      // case "SoftLeft": // softleft
      //   setImages([]);
      //   break;

      // case "SoftRight": // softright
      //   // document.querySelector(".react-search-bar__input").focus();
      //   // dispatch({ left: "", center: "Search", right: "" });
      //   setImages([]);
      //   break;

      case "ArrowDown":
        setTimeout(() => {
          checkFocused();
        }, 100);
        // forceCheck();
        break;

      default:
        break;
    }
  }

  return handleHome;
}
