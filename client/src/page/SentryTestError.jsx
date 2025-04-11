import React from "react";

function SentryTestError() {
  return (
    <button
      onClick={() => {
        throw new Error("This is your first error!");
      }}
    >
      Break the world
    </button>
  );
}

export default SentryTestError;
