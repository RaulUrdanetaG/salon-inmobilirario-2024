/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePrize } from "../hooks/usePrize";
import Form from "./form";

export default function LandingPage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const {
    prize,
    prizeOrder,
    prizeSelection,
    tempPrizePos,
    scramblePrizes,
    positionStyles,
    selectPrize,
    setVis,
    setTempPrizePos,
    setPrizeSelection,
  } = usePrize();

  useGSAP(() => {
    gsap.to(".winner", { opacity: 1, delay: 2 });
    gsap.to(".notWinner", { opacity: 1, delay: 4 });
  }, [loaded]);

  useEffect(() => {
    if (tempPrizePos !== null) {
      scramblePrizes(tempPrizePos);
      nextScreen();
      setTempPrizePos(null); // Reset tempPrizePos after handling
    }
  }, [prize]);

  function nextScreen() {
    setActiveScreen((prevScreen) => prevScreen + 1);
  }

  function resetFlow() {
    setActiveScreen(0);
    setPrizeSelection(0);
  }

  function renderScreen() {
    switch (activeScreen) {
      case 0:
        return (
          <div
            className="h-full w-full flex justify-center items-center bg-[#e30613]"
            onClick={nextScreen}
          >
            <img src="/001.webp" alt="" />
          </div>
        );
      case 1:
        return (
          <div className="relative h-full w-full flex justify-center items-center bg-[#e30613]">
            <img src="/002.webp" alt="" />
            <button
              className="absolute top-[43%] left-[23%] bg-transparent w-[220px] h-[220px]"
              onClick={() => {
                setVis(true);
                nextScreen();
              }}
            />
            <button
              className="absolute top-[43%] left-[58%] bg-transparent w-[220px] h-[220px]"
              onClick={() => {
                setVis(false);
                nextScreen();
              }}
            />
          </div>
        );
      case 2:
        return (
          <div
            className="h-full w-full flex justify-center items-center bg-[#e30613]"
            onClick={nextScreen}
          >
            <img src="/003.webp" alt="" />
          </div>
        );
      case 3:
        return (
          <div className="relative h-full w-full flex justify-center items-center bg-[#e30613]">
            <img src="/004.webp" alt="" />
            <button
              className="absolute bg-transparent md:tablet0"
              onClick={() => {
                selectPrize(1);
              }}
            ></button>
            <button
              className="absolute bg-transparent md:tablet1"
              onClick={() => {
                selectPrize(2);
              }}
            ></button>
            <button
              className="absolute bg-transparent md:tablet2"
              onClick={() => {
                selectPrize(3);
              }}
            ></button>
            <button
              className="absolute bg-transparent md:tablet3"
              onClick={() => {
                selectPrize(4);
              }}
            ></button>
          </div>
        );
      case 4:
        return (
          <div className="h-full w-full flex justify-center items-center bg-[#e30613] relative">
            <video
              className="w-full h-full"
              autoPlay
              muted
              onLoadedData={() => setLoaded(true)}
              onEnded={nextScreen}
            >
              <source src={`/Puerta_${prizeSelection}.mp4`} type="video/mp4" />
            </video>
            {prizeOrder.map((prize, i) => (
              <img
                key={i}
                src={prize}
                className={`absolute top-1/2 ${positionStyles(i)} `}
              />
            ))}
          </div>
        );
      case 5:
        return (
          <div className="h-full w-full flex justify-center items-center bg-[#e30613]">
            {/* This div makes the video play for some reason without it the video doesnt play */}
            <div className="w-[500px] h-[500px] hidden"></div>
            <video
              className="w-full h-full"
              autoPlay
              muted
              onLoadedData={() => setLoaded(false)}
              onEnded={nextScreen}
            >
              <source src={prize.video} type="video/mp4" />
            </video>
          </div>
        );
      case 6:
        return (
          <div className="h-full w-full flex flex-col justify-center items-center bg-[#e30613]">
            <Form resetFlow={resetFlow} prize={prize.name} />
          </div>
        );
    }
  }

  return <div className="h-screen w-screen">{renderScreen()}</div>;
}
