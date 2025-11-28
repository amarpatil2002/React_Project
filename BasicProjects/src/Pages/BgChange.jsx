import { useState } from "react";

const BgChange = () => {
  const [color, setColor] = useState("black");

  return (
    <>
      <div  style={{ backgroundColor: color,height:"100vh"}}>
        <div className="flex flex-col py-2 items-center justify-center gap-4">
          <h2 className="text-2xl text-black font-bold" >Background Changer</h2>
          <div className="flex gap-2">
            <button
              className="bg-green-500 w-20 rounded-xl px-2 py-1 cursor-pointer"
              onClick={() => setColor("green")}
            >
              Green
            </button>
            <button
              className="bg-red-500 w-20 rounded-xl px-2 py-1 cursor-pointer"
              onClick={() => setColor("red")}
            >
              Red
            </button>
            <button
              className="bg-yellow-500 w-20 rounded-xl px-2 py-1 cursor-pointer"
              onClick={() => setColor("yellow")}
            >
              Yellow
            </button>
                        <button
              className="bg-blue-500 w-20 text-white rounded-xl px-2 py-1 cursor-pointer"
              onClick={() => setColor("white")}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BgChange;
