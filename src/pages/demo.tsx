import { useState } from "react";

type Coordinate = [number, number];

export default function Demo() {
  const [hover, setHover] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [coord, setCoord] = useState<Coordinate>([0, 0]);

  function calculateCoordinate(
    boxX: number,
    boxY: number,
    clientX: number,
    clientY: number
  ): Coordinate {}

  return (
    <div className="p-32">
      Drag element in box below:
      {hover && " hover"}
      <div className="py-4"></div>
      <div
        className="relative w-128 h-72 bg-black rounded"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseMove={(e) =>
          mouseDown &&
          hover &&
          setCoord(calculateCoordinate(e.clientX, e.clientY))
        }
      >
        <div
          className="bg-blue-400 absolute px-4 py-2 rounded-full border-blue-600 border-4"
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          style={{ top: coord[0], left: coord[1] }}
        >
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
}
