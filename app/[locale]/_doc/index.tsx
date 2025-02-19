import React from "react";
import Hero from "./hero";
import { Header } from "./components/header/header";

type Props = {};

function DocPage({}: Props) {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

export default DocPage;
