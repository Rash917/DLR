import { useEffect, useState } from "react";
import { TearsheetNarrow } from "@carbon/ibm-products";
import "./App.scss";
import { Dropdown, DropdownSkeleton } from "@carbon/react";
import "@carbon/charts/styles.css";
import { MeterChart } from "@carbon/charts-react";
import "@carbon/styles/css/styles.css";
import { SkeletonText } from "@carbon/react";
import { TextInput } from "@carbon/react";
import ModalWindow from "./ModalWindow";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

function LastReported({ modal, setModal }) {
  const regex = /^[0-9\b]+$/;
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(false);
  const checkInput = (e) => {
    setInput(e.target.value);

    if (regex.test(e.target.value) === false) {
      // setError("Please enter a number");
      setInvalid(true);
    } else {
      // setError("");
      setInvalid(false);
      return true;
    }
  };

  let [loading, setLoading] = useState(false);
  let [select, setSelect] = useState();
  let [drop, setDrop] = useState(false);
  let [selected, setSelected] = useState([
    { label: "BYOD", id: 0, checked: true },
    { label: "Employee owned", id: 1, checked: true },
    { label: "Corporate owned", id: 2, checked: false },
    { label: "Corporate third party", id: 3, checked: false },
    { label: "Corporate shared", id: 4, checked: false },
  ]);
  let [list, setList] = useState([
    { id: 0, group: "BYOD", value: 37, checked: true },
    { id: 1, group: "Employee owned", value: 56, checked: true },
    { id: 2, group: "Corporate owned", value: 22, checked: false },
    { id: 3, group: "Corporate third party", value: 72, checked: false },
    { id: 4, group: "Corporate shared", value: 91, checked: false },
  ]);

  useEffect(() => {
    console.log(
      "Loading: ",
      list.filter((item) => item.checked)
    );
    setTimeout(() => {
      setLoading(true);
      console.log("Loading completed");
    }, 3000);
  }, []);

  useEffect(() => {
    if (select === "Custom") {
      console.log("Inside if");
    }
  }, [select]);

  useEffect(() => {
    console.log(
      list.filter((item) => item.checked && item),
      "list"
    );
  }, [list]);

  const handleClick = () => {
    setSelected(
      selected.map((item, index) => ({ ...item, checked: list[index].checked }))
    );
    setModal(!modal);
  };

  function handleChange(e) {
    console.log("Inside HandleChange");
    setSelect(e.selectedItem.label);
    if (e.selectedItem.label === "Custom") {
      console.log(".");
      setDrop(true);
    } else {
      console.log("u");
      setDrop(false);
    }
  }

  const handleSubmit = (e) => {
    console.log("Inside Handle Submit");
    setList(
      list.map((item, index) => ({ ...item, checked: selected[index].checked }))
    );
    setModal(!modal);
  };

  const option = [
    { id: "1", label: "1 day ago" },
    { id: "2", label: "7 days ago" },
    { id: "3", label: "30 days ago" },
    { id: "4", label: "Custom" },
  ];

  const option1 = [
    { id: "1", label: "Days ago" },
    { id: "2", label: "Weeks ago" },
    { id: "3", label: "Months ago" },
  ];

  const options = {
    toolbar: {
      enabled: false,
    },
    meter: {
      height: "10px",
    },
    height: "100px",
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className="box-1">
        {modal && (
          <TearsheetNarrow
            open
            actions={[
              {
                kind: "secondary",
                label: "Cancel",
                onClick: handleClick,
              },
              { kind: "primary", label: "save", onClick: handleSubmit },
            ]}
          >
            <div>
              <ModalWindow
                selected={selected}
                setSelected={setSelected}
                // onSave={handleSubmit}
              />
            </div>
          </TearsheetNarrow>
        )}
        {loading ? (
          // <Theme theme="g10">
          <div data-testid="dropDown" className="dd" style={{ width: "180px" }}>
            <Dropdown
              className="drop"
              id="default"
              label={option[0].label}
              items={option}
              onChange={(e) => handleChange(e)}
              size="sm"
            />
          </div>
        ) : (
          // </Theme>
          <div
            data-testid="dropSkeleton"
            className="dropskeleton"
            // style={{ width: "180px", color: "whitesmoke" }}
          >
            <DropdownSkeleton />
          </div>
        )}

        {drop && (
          <div className="custom">
            <TextInput
              id="test2"
              // placeholder="Enter number"
              style={{
                // width: "80%",
                backgroundColor: "#eeeeee",
                marginLeft: "5px",
              }}
              invalidText="Enter a number"
              invalid={invalid}
              size="sm"
              pattern="/^[0-9\b]+$/"
              onChange={(e) => checkInput(e)}
            />
            {/* <h6 style={{ color: "red", marginLeft: "16px", fontSize: "12px" }}>
              {error}
            </h6> */}

            <Dropdown
              className="drop1"
              // id="default"
              label={option1[0].label}
              items={option1}
              size="sm"
            />
          </div>
        )}
      </div>

      {list
        .filter((item) => item.checked === true)
        .map((listItem) => {
          return loading ? (
            <div
              style={{
                borderBottom: "1px",
                borderTop: "1px solid lightgray",
                padding: "20px 20px 20px 15px",
                color: "#002D9C",
              }}
              data-testid="meterchart"
            >
              <MeterChart
                data={[{ group: listItem.group, value: listItem.value }]}
                options={options}
                defaultStrokeColor={true}
              ></MeterChart>
              {/* <ProgressBar
            key={index}
            label={data[index].group}
            value={data[index].perValue}
          /> */}
            </div>
          ) : (
            <div
              style={{
                padding: "22px",
              }}
              data-testid="skeletonText"
            >
              <SkeletonText />
            </div>
          );
        })}
    </div>
  );
}

export default LastReported;
