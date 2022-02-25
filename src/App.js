import { useLayoutEffect, useRef, useState } from "react";

export default function App() {
  let [count, setCount] = useState(5);
  let [key, setKey] = useState(0);

  return (
    <div className="p-8">
      <div className="space-x-2">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="border border-zinc-300 px-2 py-1 active:bg-zinc-100"
        >
          Add
        </button>
        <button
          onClick={() => setCount((c) => (c > 0 ? c - 1 : 0))}
          className="border border-zinc-300 px-2 py-1 active:bg-zinc-100"
        >
          Remove
        </button>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="border border-zinc-300 px-2 py-1 active:bg-zinc-100"
        >
          Rerender
        </button>
      </div>

      <div className="mt-4 space-y-6">
        {[...Array(count).keys()].map((el, i) => (
          <Spinner key={`${i}-${key}`} />
        ))}
      </div>
    </div>
  );
}

let stashedTime;

function Spinner() {
  let ref = useRef();

  useLayoutEffect(() => {
    let spinAnimations = document
      .getAnimations()
      .filter((animation) => animation.animationName === "spin");

    let myAnimation = spinAnimations.find(
      (animation) => animation.effect.target === ref.current
    );

    // If we're the first spinner, use stashedTime
    if (spinAnimations.indexOf(myAnimation) === 0 && stashedTime) {
      myAnimation.currentTime = stashedTime;

      // If we're not, sync our time with the first spinner's
    } else if (spinAnimations.indexOf(myAnimation) > 0) {
      myAnimation.currentTime = spinAnimations[0].currentTime;
    }

    return () => {
      // Stash our time if we're the final spinner to be removed
      if (spinAnimations.indexOf(myAnimation) === 0) {
        stashedTime = myAnimation.currentTime;
      }
    };
  }, []);

  return (
    <svg
      className="mx-auto text-sky-400 w-10 h-10"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm0-4.5c5.799 0 10.5-4.701 10.5-10.5S20.799 4.5 15 4.5 4.5 9.201 4.5 15 9.201 25.5 15 25.5z"
        fill="currentColor"
        className="text-opacity-20 text-sky-400"
      ></path>
      <path
        d="M15 0C6.716 0 0 6.716 0 15h4.5C4.5 9.201 9.201 4.5 15 4.5V0z"
        fill="currentColor"
        ref={ref}
        className="text-sky-400 animate-spin origin-center"
      />
    </svg>
  );
}
