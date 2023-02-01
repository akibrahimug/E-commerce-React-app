import React from "react";
import Directory from "../../components/directory/directory.component.js";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Outlet />
      <Directory />
    </>
  );
}

export default Home;
