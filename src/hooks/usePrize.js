import { useState } from "react";

const prizes = {
  vis: [
    {
      name: "Muebles",
      video: "/prizes/vis/1_vis.mp4",
      selected: "/prizes/vis/Ganador mueble.png",
      notSelected: "/prizes/vis/1_mueble de baño.png",
    },
    {
      name: "Piso Laminado",
      video: "/prizes/vis/2_vis.mp4",
      selected: "/prizes/vis/Ganador piso.png",
      notSelected: "/prizes/vis/1_piso.png",
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

  return {
    prizeSelection,
    prize,
    prizeOrder,
    tempPrizePos,
    setVis,
    selectPrize,
    setTempPrizePos,
    setPrizeSelection,
    scramblePrizes,
    positionStyles,
  };
}
