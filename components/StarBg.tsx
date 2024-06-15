"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";

const StarBg = () => {
  return (
    <div className="h-screen fixed w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full   absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFBF00"
        />
      </div>
    </div>
  );
};

export default StarBg;
