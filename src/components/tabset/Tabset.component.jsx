import React, { useEffect, useState, useContext, Fragment } from "react"; // prettier-ignore
import { ImageContext, imageActions } from "../../providers/images/Images.provider"; // prettier-ignore
import { SoftkeysContext, softkActions } from '../../providers/softkeys/Softkeys.provider'; // prettier-ignore
import { getTags } from "../../utils/firebase/firebase.utils";

import { tabsetScript } from "../../scripts/events/handle-tabset.script";

import "./Tabset.styles.scss";

const Tabset = () => {
  const { imageDispatch } = useContext(ImageContext);
  const [tabsArray] = useState(["popular", "latest"]);
  const [tagsArray, setTagsArray] = useState([]);
  const { softkDispatch } = useContext(SoftkeysContext);

  function dispatch(tab) {
    imageDispatch(imageActions.selectTab(tab));
  }

  const dispatchSoftK = keys => {
    softkDispatch(softkActions.setkeys(keys));
  };

  // passing the dispatch function to the event
  const handleTabset = tabsetScript(dispatch, dispatchSoftK);

  useEffect(() => {
    document.addEventListener("keydown", handleTabset, false);

    getTags().then(array => setTagsArray(array));

    return () =>
      document.removeEventListener("keydown", handleTabset, false);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="Tabset">
      {tabsArray.map((tab, idx) => (
        <Fragment key={idx}>
          <input
            type="radio"
            name="tabset"
            id={"tab" + idx}
            data-tab={tab}
            defaultChecked={idx === 0 && true}
          />
          <label htmlFor={"tab" + idx}>{tab}</label>
        </Fragment>
      ))}
      {tagsArray.length
        ? tagsArray.map((tag, idx) => (
            <Fragment key={idx}>
              <input
                type="radio"
                name="tabset"
                id={"tag" + idx}
                data-tag={tag}
              />
              <label htmlFor={"tag" + idx}>#{tag}</label>
            </Fragment>
          ))
        : null}
    </section>
  );
};

export default Tabset;
