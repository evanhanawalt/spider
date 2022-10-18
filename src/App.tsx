import { useMemo, useState } from "react";
import RadarChart from "./RadarChart";
type Data = { name: string; value: number }[];
function App() {
  const dataList = useMemo(() => {
    let dataList = [];
    for (let i = 0; i < 20; i++) {
      dataList.push([
        { name: "Strength", value: Math.floor(Math.random() * 10) },
        { name: "Intelligence", value: Math.floor(Math.random() * 10) },
        { name: "Charisma", value: Math.floor(Math.random() * 10) },
        { name: "Wisdom", value: Math.floor(Math.random() * 10) },
        { name: "Cringe", value: Math.floor(Math.random() * 10) },
        { name: "Dexterity", value: Math.floor(Math.random() * 10) },
      ]);
    }
    return dataList;
  }, []);
  return (
    <div className="App">
      {dataList.map((data, key) => (
        <>
          <p>Chart {key}</p>
          <RadarChart data={data} />
        </>
      ))}
    </div>
  );
}

export default App;
