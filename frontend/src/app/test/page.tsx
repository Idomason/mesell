"use client";

import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "set":
      return { ...state, count: action.payload };
    case "step":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const initialState = { count: 0, step: 1 };
const date = new Date("12-01-2026");

export default function Test() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10">
      Count: {Number(count || step)}
      <div>
        <input
          className="block"
          type="range"
          min={0}
          max={10}
          onChange={(e) => dispatch({ type: "step", payload: +e.target.value })}
        />
      </div>
      <div className="w-full max-w-sm flex items-center justify-between">
        <button
          className="inline-block h-8 w-8 rounded-full text-white bg-amber-500 border border-gray-200 shadow font-medium"
          onClick={() => dispatch({ type: "dec" })}
        >
          -
        </button>
        <input
          className="inline-block p-2 ring ring-gray-200 rounded-sm outline-offset-2 outline-gray-300"
          type="text"
          value={count}
          onChange={(event) =>
            dispatch({ type: "set", payload: Number(event.target.value) })
          }
        />
        <button
          className="inline-block h-8 w-8 rounded-full text-white bg-amber-500 border border-gray-200 shadow font-medium"
          onClick={() => dispatch({ type: "inc" })}
        >
          +
        </button>
      </div>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <span>{date.toDateString()}</span>
    </div>
  );
}
