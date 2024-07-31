import { useState } from "react";

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
  };
}
