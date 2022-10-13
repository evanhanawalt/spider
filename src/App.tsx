import { useMemo, useState } from "react";
type Data = { name: string; value: number }[];
function App() {
  const data: Data = [
    { name: "Strength", value: 3 },
    { name: "Intelligence", value: 10 },
    { name: "Charisma", value: 5 },
    { name: "Wisdom", value: 7 },
    { name: "Controversy", value: 8 },
    { name: "Dexterity", value: 7 },
  ];
  const { pointsList, legList } = useMemo(() => {
    const increment = (2 * Math.PI) / data.length;
    let polygonPointsList = [];
    let legList = [];
    for (let rCount = 1; rCount <= 5; rCount++) {
      let radius = 30 * rCount;
      let points = [];
      for (let i = 0; i <= data.length; i++) {
        let angle = increment * i;
        points.push(
          `${radius * Math.sin(angle) + 200},${radius * Math.cos(angle) + 200}`
        );
      }
      polygonPointsList.push(points.join(" "));
    }

    for (let i = 0; i < data.length; i++) {
      let r = 150;
      let angle = increment * i;
      legList.push(
        `200,200  ${r * Math.sin(angle) + 200}, ${r * Math.cos(angle) + 200}`
      );
    }

    return { pointsList: polygonPointsList, legList };
  }, data);

  const { labels, skillPoints } = useMemo(() => {
    const increment = (2 * Math.PI) / data.length;
    let radius = 180;
    let labels = [];
    let skillPoints = [];
    let borderRadius = 150;
    for (let i = 0; i < data.length; i++) {
      let angle = increment * i;
      labels.push({
        x: radius * Math.sin(angle) + 200,
        y: radius * Math.cos(angle) + 200,
        text: data[i].name,
        value: data[i].value,
        angle: angle,
      });
      let magnitude = (data[i].value / 10) * borderRadius;
      skillPoints.push(
        `${magnitude * Math.sin(angle) + 200},${
          magnitude * Math.cos(angle) + 200
        }`
      );
    }
    return { labels, skillPoints: skillPoints.join(" ") };
  }, [data]);

  return (
    <div className="App">
      <svg width={400} height={400}>
        {pointsList.map((value, index) => (
          <polygon
            key={index}
            points={value}
            className="stroke-2 stroke-slate-800 fill-transparent opacity-20"
          ></polygon>
        ))}
        <polygon
          points={skillPoints}
          className="stroke-2 stroke-black fill-cyan-600 opacity-20"
        ></polygon>
        {labels.map((value, index) => (
          <text
            key={index}
            x={value.x}
            y={value.y}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {value.text}
          </text>
        ))}
        {legList.map((value, index) => (
          <polygon
            key={index}
            points={value}
            className="stroke-2 stroke-slate-800 fill-transparent opacity-20"
          ></polygon>
        ))}
      </svg>
    </div>
  );
}

export default App;
