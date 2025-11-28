import React, { useEffect, useState } from "react";

function CaptchGenerate() {
  const [captchaSize, setCaptchSize] = useState(8);
  const [captach, setCaptch] = useState();
  const [numbersAllow, setNumbersAllow] = useState(false);
  const [symbolAllow, setSymbolAllow] = useState(false);

  const generateCaptch = () => {
    let charCaptcha = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllow) str += "0123456789";
    if (symbolAllow) str += "!@#$%^&*()_";
    // console.log(numbersAllow);
    for (let i = 0; i < captchaSize; i++) {
      const randomNum = Math.floor(Math.random() * str.length);
      charCaptcha += str[randomNum];
    }
    // console.log(charCaptcha);
    setCaptch(charCaptcha);
  };

  useEffect(() => {
    generateCaptch();
  }, [captchaSize, numbersAllow, symbolAllow]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Generate Captcha</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          className="border-2 border-gray-300 p-2 w-full rounded-lg text-lg tracking-widest font-mono text-center"
          value={captach || ""}
          readOnly
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(captach || "");
            alert("Captcha copied! 👍");
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          Copy
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="font-medium">Length ({captchaSize})</label>
        <input
          type="range"
          min={5}
          max={25}
          value={captchaSize}
          onChange={(e) => setCaptchSize(Number(e.target.value))}
          className="w-48 accent-blue-600"
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id="numbers"
          checked={numbersAllow}
          onChange={(e) => setNumbersAllow((prev) => !prev)}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="numbers" className="text-gray-700">
          Include Numbers
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="symbols"
          checked={symbolAllow}
          onChange={() => setSymbolAllow((prev) => !prev)}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="symbols" className="text-gray-700">
          Include Symbols
        </label>
      </div>
    </div>
  );
}

export default CaptchGenerate;
