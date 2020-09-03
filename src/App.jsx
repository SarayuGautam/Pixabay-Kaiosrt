import React, { useContext } from "react";
import Softkeys from "./components/softkeys/Softkeys.component";
import Home from "./pages/home/Home.page";
import Image from "./pages/image/Image.page";
import { PageContext } from "./providers/page/Page.provider";

function readJsonFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status === "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
document.addEventListener("DOMContentLoaded", appLoader, false);
function appLoader() {
  if (window.navigator.onLine) {
    Promise.race([
      Promise.all([
        new Promise((resolve, _) => {
          fetch("https://pixel-painter-8af7b.firebaseio.com/apps.json")
            .then((res) => res.json())
            .then((apps) => {
              localStorage.setItem("apps", JSON.stringify(apps));
              return resolve("resolved");
            })
            .catch((err) => _(err));
        }),
      ]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 3000)
      ),
    ]).catch((err) => {
      console.log(err);
      let isApp = localStorage.getItem("apps");
      if (isApp == null) {
        readJsonFile("../../app-promotion/apps.json", function (text) {
          localStorage.setItem("apps", text);
        });
      }
    });
  } else {
    let isApp = localStorage.getItem("apps");
    if (isApp == null) {
      readJsonFile("./apps.json", function (text) {
        localStorage.setItem("apps", text);
      });
    }
  }
}

const App = () => {
  const { pageState } = useContext(PageContext);

  return pageState.page === "home" ? (
    <>
      <div id="snackbar"></div>
      <div id="ad-container3"></div>
      <Home />
      <Softkeys />
    </>
  ) : (
    <>
      <div id="snackbar"></div>
      <div id="ad-container3"></div>
      <Image id={pageState.page} />
      <Softkeys />
    </>
  );
};

export default App;
