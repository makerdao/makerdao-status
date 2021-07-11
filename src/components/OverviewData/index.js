import React from "react";
import { useMainContext } from "../../context/MainContext";

export default function OverviewData() {
  const { state } = useMainContext();
  if (!state) return null;

  const { pauseDelay, esMin } = state;

  return (
    <div style={{ background: "gray", padding: "2rem" }}>
      <div style={{ display: "flex" }}>
        <div>
          <span>
            <h3>Misc</h3>
            <h4>Flap,ESM,End</h4>
          </span>
          <div style={{ display: "flex", alignItems: "center" }}>
            Timelock
            <div>(Pause_delay)</div>
            <h3>{pauseDelay}</h3>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            ES amount
            <div>(ESM_min)</div>
            <h3>{esMin}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
