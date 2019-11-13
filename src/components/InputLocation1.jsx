import * as React from "react";

function InputLocation1(props) {
  const [location1, setLocation1] = React.useState("");

  return (
    <input
      placeholder={location1}
      onChange={e => {
        setLocation1(e.target.value);
      }}
    />
  );
}

export default InputLocation1;
