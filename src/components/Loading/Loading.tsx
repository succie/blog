import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="Loading">
      <FontAwesomeIcon icon={faSpinner} size="9x" spin />
    </div>
  );
};

export default Loading;
