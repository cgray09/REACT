import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => (
  // Dimmer gives it a black background so we can see the spinner 
  <Dimmer active> 
    <Loader size="huge" content={"Preparing Chat..."} />
  </Dimmer>
);

export default Spinner;
