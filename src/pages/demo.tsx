import { useState } from "react";

export default function Demo() {
  const [hover, setHover] = useState(false);

  return (
    <div className="p-32">
      Drag element in box below:
      <div className="py-4"></div>
      <svg
        width="500"
        height="200"
        style={{ backgroundColor: "black" }}
        onMouseMove={(e) => {
          console.log(e.movementX);
        }}
      >
        <circle
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          cx="50"
          cy="50"
          r="30"
          stroke="green"
          stroke-width="4"
          fill="yellow"
        />
      </svg>
    </div>
  );
}
