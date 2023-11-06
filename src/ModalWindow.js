import React, { useState } from "react";
import { Checkbox } from "@carbon/react";

function ModalWindow({ selected, setSelected }) {
  // const data = [
  //   { label: "BYOD", id: 0 },
  //   { label: "Employee owned", id: 1 },
  //   { label: "Corporate owned", id: 2 },
  //   { label: "Corporate third party", id: 3 },
  //   { label: "Corporate shared", id: 4 },
  // ];

  // const handleChange = (e, index) => {
  //   console.log(e.target.id, "val");
  //   const id = e.target.id;
  //   const value = selected[id].label;
  //   console.log(value);
  //   const activeData = document.getElementById(index).checked;
  //   console.log(activeData, "activeData");
  //   if (activeData === true) {
  //     setSelected((oldData) => [...oldData, value]);
  //   } else {
  //     setSelected(selected.filter((values) => values !== value));
  //   }

  //   // console.log(selected.filter((values) => values !== value));
  // };

  const handleChange = (e, i) => {
    setSelected(
      selected.map((item) =>
        item.id == i ? { ...item, checked: !item.checked } : item
      )
    );
  };

  console.log(selected);
  return (
    <div style={{ padding: "15px" }}>
      <h3>Configure Widget</h3>
      <p style={{ margin: "15px 0px 32px 0px" }}>
        Select the enrolment modes of the devices for which you would like to
        view inactive status.
      </p>

      <fieldset className="cds--fieldset">
        <legend className="cds--label">Enrolment Modes</legend>
        {selected.map((item, i) => (
          <div>
            <Checkbox
              labelText={item.label}
              id={i}
              onChange={(e) => handleChange(e, i)}
              checked={item.checked}
            />
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export default ModalWindow;
