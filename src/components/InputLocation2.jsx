import * as React from "react";

function InputLocation2(props) {
  const [location2, setLocation2] = React.useState("");

  return (
    <div>
      <input
        placeholder={location2}
        onChange={e => {
          setLocation2(e.target.value);
        }}
      />
    </div>
  );
}

export default InputLocation2;
