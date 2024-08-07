import { useState } from "react";

const prizes = {
  vis: [
    {
      name: "Muebles",
      video: "/prizes/vis/1_vis.mp4",
      selected: "/prizes/vis/Ganador mueble.png",
      notSelected: "/prizes/vis/mueble.png",
    },
    {
      name: "Piso Laminado",
      video: "/prizes/vis/2_vis.mp4",
      selected: "/prizes/vis/Ganador piso.png",
      notSelected: "/prizes/vis/piso.png",
    },
  ],
  noVis: [
    {
      name: "1% de descuento",
      video: "/prizes/no-vis/1_Novis.mp4",
      selected: "/prizes/no-vis/1 ganador.png",
      notSelected: "/prizes/no-vis/1.png",
    },
    {
      name: "2% de descuento",
      video: "/prizes/no-vis/2_Novis.mp4",
      selected: "/prizes/no-vis/2 ganador.png",
      notSelected: "/prizes/no-vis/2.png",
    },
  ],
};

export function usePrize() {
  const [prizeSelection, setPrizeSelection] = useState(0);
  const [prize, setPrize] = useState();
  const [prizeOrder, setPrizeOrder] = useState();
  const [tempPrizePos, setTempPrizePos] = useState(null);
  const [vis, setVis] = useState(false);

  function selectPrize(prizePos) {
    setPrizeSelection(prizePos);
    if (vis) {
      const prizeArray = [
        prizes.vis[0],
        prizes.vis[1],
        prizes.vis[0],
        prizes.vis[1],
      ];

      prizeArray.sort(() => Math.random() - 0.5);

      setPrize(prizeArray[prizePos - 1]);
      setPrizeOrder(prizeArray);
    } else {
      const prizeArray = [
        prizes.noVis[0],
        prizes.noVis[1],
        prizes.noVis[0],
        prizes.noVis[1],
      ];

      prizeArray.sort(() => Math.random() - 0.5);

      setPrize(prizeArray[prizePos - 1]);
      setPrizeOrder(prizeArray);
    }
  }

  function positionStyles(i) {
    switch (i) {
      case 0:
        return `w-[10%] left-[10.7%] ${vis ? "top-[50%]" : "top-[53%]"} ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
      case 1:
        return `w-[10%] left-[34.7%] ${vis ? "top-[50%]" : "top-[53%]"} ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
      case 2:
        return `w-[10%] left-[58.4%] ${vis ? "top-[50%]" : "top-[53%]"} ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
      case 3:
        return `w-[10%] left-[82.4%] ${vis ? "top-[50%]" : "top-[53%]"} ${
          prizeSelection - 1 === i ? "winner" : "notWinner"
        }`;
    }
  }

  return {
    prizeSelection,
    prize,
    prizeOrder,
    tempPrizePos,
    vis,
    setVis,
    selectPrize,
    setTempPrizePos,
    setPrizeSelection,
    //scramblePrizes,
    positionStyles,
  };
}
