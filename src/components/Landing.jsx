import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const prizes = {
  vis: [
    {
      video: "/prizes/vis/1_vis.mp4",
      selected: "/prizes/vis/Ganador mueble.png",
      notSelected: "/prizes/vis/1_mueble de baño.png",
    },
    {
      video: "/prizes/vis/2_vis.mp4",
      selected: "/prizes/vis/Ganador piso.png",
      notSelected: "/prizes/vis/1_piso.png",
    },
  ],
  noVis: [
    {
      video: "/prizes/no-vis/1_Novis.mp4",
      selected: "/prizes/no-vis/1 ganador.png",
      notSelected: "/prizes/no-vis/1.png",
    },
    {
      video: "/prizes/no-vis/2_Novis.mp4",
      selected: "/prizes/no-vis/2 ganador.png",
      notSelected: "/prizes/no-vis/2.png",
    },
  ],
};

export default function LandingPage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [vis, setVis] = useState(false);
  const [prizeSelection, setPrizeSelection] = useState(0);
  const [prize, setPrize] = useState();
  const [prizeOrder, setPrizeOrder] = useState();
  const [tempPrizePos, setTempPrizePos] = useState(null);
  const [loaded, setLoaded] = useState(false);

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

  function resetFlow() {
    setActiveScreen(0);
    setPrizeSelection(0);
  }

  function nextScreen() {
    setActiveScreen((prevScreen) => prevScreen + 1);
  }

  function selectPrize(position) {
    setPrizeSelection(position);

    const randomPrize = Math.floor(Math.random() * 2);
    if (vis) {
      setPrize(prizes.vis[randomPrize]);
    } else {
      setPrize(prizes.noVis[randomPrize]);
    }

    setTempPrizePos(position - 1);
  }

  function positionStyles(i) {
    switch (i) {
      case 0:
        return `w-[10%] left-[10.7%] ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
      case 1:
        return `w-[10%] left-[34.7%] ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
      case 2:
        return `w-[10%] left-[58.4%] ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
      case 3:
        return `w-[10%] left-[82.4%] ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
    }
  }

  function scramblePrizes(prizePos) {
    if (vis) {
      const prizeArray = [
        "/prizes/vis/1_mueble de baño.png",
        "/prizes/vis/1_piso.png",
        "/prizes/vis/1_mueble de baño.png",
        "/prizes/vis/1_piso.png",
      ];

      prizeArray.sort(() => Math.random() - 0.5);

      prizeArray[prizePos] = prize.selected;
      setPrizeOrder(prizeArray);
    } else {
      const prizeArray = [
        "/prizes/no-vis/1.png",
        "/prizes/no-vis/2.png",
        "/prizes/no-vis/1.png",
        "/prizes/no-vis/2.png",
      ];

      prizeArray.sort(() => Math.random() - 0.5);

      prizeArray[prizePos] = prize.selected;
      setPrizeOrder(prizeArray);
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
          <div className="h-full w-full flex justify-center items-center bg-[#e30613]">
            <p>formulario</p>
            <button onClick={resetFlow}>Enviar</button>
          </div>
        );
    }
  }

  return <div className="h-screen w-screen">{renderScreen()}</div>;
}
