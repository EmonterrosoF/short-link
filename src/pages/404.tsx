import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className=" flex min-h-screen  justify-center bg-gradient-to-b from-[#0b070d]  to-[#270038] text-center md:p-5">
      <div className="my-10 ">
        <h1 className=" bg-gradient-to-r from-[#4ca5ff] to-[hsl(280,100%,70%)] bg-clip-text pb-10 text-6xl font-extrabold  text-transparent sm:text-8xl md:text-9xl">
          404
        </h1>
        <button className=" rounded-lg bg-[#4ca5ff] py-2 px-4 font-bold text-white hover:scale-105 hover:bg-blue-400 md:py-3 md:px-5 md:text-lg">
          <Link href={"/"}>Regresar al Inicio</Link>
        </button>
      </div>
    </div>
  );
};

export default notFound;
