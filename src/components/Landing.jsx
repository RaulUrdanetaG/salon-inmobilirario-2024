/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePrize } from "../hooks/usePrize";

export default function LandingPage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const {
    prize,
    prizeOrder,
    prizeSelection,
    positionStyles,
    selectPrize,
    setVis,
    setPrizeSelection,
  } = usePrize();

  useGSAP(() => {
    gsap.to(".winner", { opacity: 1, delay: 2 });
    gsap.to(".notWinner", { opacity: 1, delay: 4 });
  }, [loaded]);

  function nextScreen() {
    setActiveScreen((prevScreen) => prevScreen + 1);
  }

  function resetFlow() {
    setActiveScreen(0);
    setPrizeSelection(0);
  }

  useEffect(() => {
    if (activeScreen === 0) {
      return;
    } else {
      nextScreen();
    }
  }, [prize]);

  console.log(prize, prizeOrder);

  function renderScreen() {
    switch (activeScreen) {
      case 0:
        return (
          <div
            className="h-full w-full flex justify-center items-center bg-[#e20613] relative"
            onClick={nextScreen}
          >
            <video className="w-full h-full" autoPlay preload="auto">
              <source src="/Portada llaves.mp4" type="video/mp4" />
            </video>
          </div>
        );
      case 1:
        return (
          <div className="relative h-full w-full flex justify-center items-center bg-[#e20613]">
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
            className="h-full w-full flex justify-center items-center bg-[#e20613]"
            onClick={nextScreen}
          >
            <img src="/003.webp" alt="" />
          </div>
        );
      case 3:
        return (
          <div className="relative h-full w-full flex justify-center items-center bg-[#e20613]">
            <img src="/004.webp" alt="" />
            <button
              className="absolute bg-transparent md:tablet0"
              onClick={() => {
                selectPrize(1);
              }}
            />
            <button
              className="absolute bg-transparent md:tablet1"
              onClick={() => {
                selectPrize(2);
              }}
            />
            <button
              className="absolute bg-transparent md:tablet2"
              onClick={() => {
                selectPrize(3);
              }}
            />
            <button
              className="absolute bg-transparent md:tablet3"
              onClick={() => {
                selectPrize(4);
              }}
            />
          </div>
        );
      case 4:
        return (
          <div className="h-full w-full flex justify-center items-center bg-[#e20613] relative">
            <video
              className="w-full h-full"
              autoPlay
              preload="auto"
              onLoadedData={() => setLoaded(true)}
              onEnded={nextScreen}
            >
              <source src={`/Puerta_${prizeSelection}.mp4`} type="video/mp4" />
            </video>
            {prizeOrder.map((prize, i) => (
              <img
                key={i}
                src={
                  prizeSelection - 1 === i ? prize.selected : prize.notSelected
                }
                className={`absolute ${positionStyles(i)} `}
              />
            ))}
          </div>
        );
      case 5:
        return (
          <div className="h-full w-full flex justify-center items-center bg-[#e20613]">
            {/* This div makes the video play for some reason without it the video doesnt play */}
            <div className="w-[500px] h-[500px] hidden"></div>
            <video
              className="w-full h-full"
              autoPlay
              preload="auto"
              onLoadedData={() => setLoaded(false)}
              onEnded={resetFlow}
            >
              <source src={prize.video} type="video/mp4" />
            </video>
          </div>
        );
    }
  }

  return <div className="h-screen w-screen">{renderScreen()}</div>;
}
