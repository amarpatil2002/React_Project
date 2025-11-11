import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleCount = (data) => {
    if (data === "inc" && count < 10) {
      // console.log(count);
      setCount(count + 1);
    } else if (data === "dec" && count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <div className="m-2">
        <h2>Counter Function</h2>
        <button
          onClick={() => handleCount("dec")}
          className="bg-blue-600 px-2 rounded m-2 text-white "
        >
          -
        </button>
        {count}
        <button
          onClick={() => handleCount("inc")}
          className="bg-blue-600 px-2 rounded m-2 text-white "
        >
          +
        </button>
      </div>
    </>
  );
};

export default Counter;
