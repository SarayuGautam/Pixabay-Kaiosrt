import React from "react";
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

export default function OtherAppComponent({ isOpen, onClosed }) {
  return (
    <div>
      <Modal
        isOpen={isOpen ?? false}
        onRequestClose={onClosed}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="clippedHead">
          <div className="clippedHeadText">Try some other apps</div>
        </div>
        <div>
          <div className="list-group">
            {apps.map((app) => {
              return (
                <div
                  className="list-group-item list-group-item-action"
                  tabIndex="1"
                  data-appId="1"
                  key={app.storeAppName}>
                  <div className=" imageApp ">
                    <div className="appImg">
                      <img src={app.image} alt="appImage"></img>
                      <div>
                        <small className="appCategory">{app.category}</small>
                        <small className="appName">{app.title}</small>
                      </div>
                    </div>
                    <div className="getDownload">
                      <img
                        className="download"
                        src="/images/download.png"
                        alt="download"></img>
                      <small>Get</small>
                    </div>
                  </div>
                  <small className="description">Description</small>
                  <small className="des-text">{app.description} </small>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}
