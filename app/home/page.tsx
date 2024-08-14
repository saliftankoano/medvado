import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import CardsBoard from "../components/CardsBoard";

export default function Home() {
  return (
    <>
      <div className="container">
        <NavBar />
        <div className="app-container flex w-screen h-[85vh]">
          <SideBar />
          <CardsBoard />
        </div>
      </div>
    </>
  );
}
