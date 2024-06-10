import { useEffect, useState } from "react";

function Slider() {
  const [value, setValue] = useState(50);

  useEffect(() => {
    const tooltip = document.getElementById("tooltip");
    const maxValue = document.getElementById("slider").getAttribute("max");
    const val = document.getElementById("slider").getAttribute(value);
    const center = (value / maxValue) * 100 + "%";

    if (tooltip) {
      tooltip.style.left = center;
    }
  });

  // useEffect(() => {
  //   const allRanges = document.querySelectorAll(".range-wrap");
  //   allRanges.forEach((wrap) => {
  //     const range = wrap.querySelector(".range");
  //     const bubble = wrap.querySelector(".bubble");
  //
  //     range.addEventListener("input", () => {
  //       setBubble(range, bubble);
  //     });
  //     setBubble(range, bubble);
  //   });
  //
  //   function setBubble(range, bubble) {
  //     const val = range.value;
  //     const min = range.min ? range.min : 0;
  //     const max = range.max ? range.max : 100;
  //     const newVal = Number(((val - min) * 100) / (max - min));
  //     bubble.innerHTML = val;
  //
  //     bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  //   }
  // });

  return (
    <>
      <div className="range-wrap relative flex h-[24px] w-full items-center">
        <input
          className="range relative flex w-full"
          aria-valuemin={0}
          type="range"
          min="0"
          max="100"
          value={value}
          id="slider"
          onChange={({ target: { value: radius } }) => {
            setValue(radius);
          }}
        />
        <div id="progress"></div>
        <div
          id="tooltip"
          className="bubble absolute top-[-40px] left-1/2 flex h-[38px] w-[32px] -translate-x-1/2 items-center justify-center rounded-full bg-purple-400 align-middle text-body-medium text-white"
        >
          {value}
        </div>
      </div>
    </>
  );
}

export { Slider };
