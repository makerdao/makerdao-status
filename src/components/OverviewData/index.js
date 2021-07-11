import React from "react";
import { useMainContext } from "../../context/MainContext";
import DataBlockOverview from "../DataBlockOverview";



export default function OverviewData() {
  const { state } = useMainContext();


  if (!state||!state.pauseDelay||!state.esmMin||!state.endWait) return null;
  
  
  const MiscBlock = {
    blockTitle: "Misc",
    blockSubtitle: "(Flap,ESM,End)",
    blockData: [
      {
        mainLabel: "Timelock",
        secondaryLabel: "(Pause_delay)",
        valueCell: state.pauseDelay,
      },
      {
        mainLabel: "ES Amount",
        secondaryLabel: "(ESM_min)",
        valueCell: state.esmMin,
      },
      {
        mainLabel: "ES Delay",
        secondaryLabel: "(End_wait)",
        valueCell: state.endWait,
      },
    ],
  };

  return (
    <div style={{ background: "#aaa", padding: "1rem" }}>
      <div style={{ display: "flex" }}>
        <DataBlockOverview data={MiscBlock} />
      </div>
    </div>
  );
}
