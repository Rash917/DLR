import React from "react";
import { useState } from "react";
import "./App.scss";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { ProductiveCard } from "@carbon/ibm-products";
import { SettingsAdjust16 } from "@carbon/icons-react";
import Lastreported from "./LastReported";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

function App() {
  let [modal, setModal] = useState(false);

  const handleIconClick = () => {
    console.log("Show has been set true");
    setModal(true);
  };

  const defaultProps = {
    title: "Device Last Reported",
    children: <Lastreported modal={modal} setModal={setModal}></Lastreported>,
    actionIcons: [
      {
        icon: SettingsAdjust16,
        onClick: () => {
          handleIconClick();
        },
      },
    ],
  };

  return (
    <div className="main">
      <ProductiveCard
        {...defaultProps}
        style={{ width: "20%", backgroundColor: "lightgray", margin: "5%" }}
      />
    </div>
  );
}

export default App;
