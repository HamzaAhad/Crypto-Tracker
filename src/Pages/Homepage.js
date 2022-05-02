import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
export default function Homepage() {
  return (
    <>
      {/* creating a banner component */}
      <Banner />
      <CoinsTable />
    </>
  );
}
