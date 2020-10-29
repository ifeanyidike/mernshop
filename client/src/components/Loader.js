import React from "react";
import { Spinner } from "react-bootstrap";
import "../styles/Loader.css";

const Loader = () => {
  return (
    <Spinner animation='border' role='status' className='spinner'>
      <span className='sr-only'>Loading</span>
    </Spinner>
  );
};

export default Loader;
