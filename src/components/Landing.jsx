import { useState } from "react";

const prizes = {
  vis: [
    {
      video: "/vis-1.mp4",
      selected: "bg-red-500",
      notSelected: "bg-green-500",
    },
    {
      video: "/vis-2.mp4",
      selected: "bg-red-500",
      notSelected: "bg-yellow-500",
    },
  ],
  noVis: [
    {
      video: "/no-vis-1.mp4",
      selected: "bg-red-500",
      notSelected: "bg-green-500",
    },
    {
      video: "/no-vis-2.mp4",
      selected: <div></div>,
      notSelected: "bg-yellow-500",
    },
  ],
};

export default function LandingPage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [vis, setVis] = useState(false);
  const [priceSelection, setPriceSelection] = useState(0);
  const [prize, setPrize] = useState();

  function resetFlow() {
    setActiveScreen(0);
    setPriceSelection(0);
  }

  function nextScreen() {
    setActiveScreen((prevScreen) => prevScreen + 1);
  }

  function selectPrice() {
    const randomPrize = Math.floor(Math.random() * 2);
    if (vis) {
      setPrize(prizes.vis[randomPrize]);
    } else {
      setPrize(prizes.noVis[randomPrize]);
    }
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
                nextScreen();
                setVis(true);
              }}
            />
            <button
              className="absolute top-[43%] left-[58%] bg-transparent w-[220px] h-[220px]"
              onClick={nextScreen}
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
              className="absolute md:tablet0"
              onClick={() => {
                setPriceSelection(0);
                selectPrice();
                nextScreen();
              }}
            ></button>
            <button
              className="absolute md:tablet1"
              onClick={() => {
                setPriceSelection(1);
                selectPrice();
                nextScreen();
              }}
            ></button>
            <button
              className="absolute md:tablet2"
              onClick={() => {
                setPriceSelection(2);
                selectPrice();
                nextScreen();
              }}
            ></button>
            <button
              className="absolute md:tablet3"
              onClick={() => {
                setPriceSelection(3);
                selectPrice();
                nextScreen();
              }}
            ></button>
          </div>
        );
      case 4:
        return (
          <div className="h-full w-full flex justify-center items-center bg-[#e30613]">
            <video className="w-full h-full" autoPlay onEnded={nextScreen}>
              <source src={prize.video} type="video/mp4" />
            </video>
          </div>
        );
      case 5:
        return (
          <div
            className="h-full w-full flex justify-center items-center bg-[#e30613]"
            onClick={nextScreen}
          >
            <img src="/005.webp" alt="" />
          </div>
        );
      case 6:
        return (
          <div className="h-full w-full flex justify-center items-center bg-[#e30613]">
            <p>formulario</p>
            <button onClick={resetFlow}>Enviar</button>
          </div>
        );
    }
  }

  return <div className="h-screen w-screen">{renderScreen()}</div>;
}
