import React from "react";
import Navbar from "../Component/pdpCompoenent";
import PdpComponent from "../Component/Navbar";
import { useParams } from "react-router";

const Pdp = () => {
  const { productId } = useParams();

  return (
    <>
      <Navbar />
      <PdpComponent id={productId} />
    </>
  );
};

export default Pdp;