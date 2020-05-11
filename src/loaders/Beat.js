import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
const Beat = () => {
  return (
    <BeatLoader
      size={50}
      css={`
        margin: 0 auto;
        width: 12em;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
      `}
      color={"#f4ebb2"}
      loading={true}
    />
  );
};

export default Beat;
