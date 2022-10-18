import React, { useMemo } from "react";
export type RadarChartProps = {
  width?: number;
  data: { name: string; value: number }[];
};
export default function ({ width = 400, data }: RadarChartProps) {
  const { concentricPolygons, skillAxes, labels, skillPoints } = useMemo(() => {
    const increment = (2 * Math.PI) / data.length;
    const halfWidth = width / 2;
    let concentricPolygons = [];
    let skillAxes = [];
    let labels = [];
    let skillPoints = [];
    const labelradius = Math.round(halfWidth * 0.9);
    const chartRadius = Math.round(halfWidth * 0.75);
    const innerRadiusGap = Math.round(halfWidth * 0.15);
    // Create concentric polygons
    for (let rCount = 1; rCount <= 5; rCount++) {
      let currentRadius = innerRadiusGap * rCount;
      let points = [];
      for (let i = 0; i <= data.length; i++) {
        let angle = increment * i;
        points.push(
          `${currentRadius * Math.sin(angle) + halfWidth},${
            currentRadius * Math.cos(angle) + halfWidth
          }`
        );
      }
      concentricPolygons.push(points.join(" "));
    }

    // create "leg" axes
    for (let i = 0; i < data.length; i++) {
      let angle = increment * i;
      skillAxes.push(
        `${halfWidth},${halfWidth}  ${
          chartRadius * Math.sin(angle) + halfWidth
        }, ${chartRadius * Math.cos(angle) + halfWidth}`
      );
    }

    // create labels, and skill polygon
    for (let i = 0; i < data.length; i++) {
      let angle = increment * i;
      labels.push({
        x: labelradius * Math.sin(angle) + halfWidth,
        y: labelradius * Math.cos(angle) + halfWidth,
        text: data[i].name,
        value: data[i].value,
        angle: angle,
      });
      let magnitude = (data[i].value / 10) * chartRadius;
      skillPoints.push(
        `${magnitude * Math.sin(angle) + halfWidth},${
          magnitude * Math.cos(angle) + halfWidth
        }`
      );
    }

    return {
      concentricPolygons,
      skillAxes,
      labels,
      skillPoints: skillPoints.join(" "),
    };
  }, data);

  return (
    <svg width={width} height={width}>
      {concentricPolygons.map((value, index) => (
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
      {skillAxes.map((value, index) => (
        <polygon
          key={index}
          points={value}
          className="stroke-2 stroke-slate-800 fill-transparent opacity-20"
        ></polygon>
      ))}
    </svg>
  );
}
