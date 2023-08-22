import React from "react";
import { Spinner, Center } from "native-base";

const Loader = () => {
  return (
    <Center style={{ height: "100%" }}>
      <Spinner size="lg" />
    </Center>
  );
};

export default Loader;
