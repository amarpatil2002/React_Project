import React, { useEffect, useState } from "react";

function GithubData() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("https://api.github.com/users/amarpatil2002")
      //   'https://github.com/amarpatil2002'   
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-2xl max-w-sm mx-auto">
        <img
          src={data.avatar_url}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />

        <h2 className="text-xl font-bold mt-4 text-gray-800">
          {data.name || data.login}
        </h2>

        <p className="text-gray-500">@{data.login}</p>

        <div className="mt-4 flex gap-4 text-sm text-gray-700">
          <span>👥 Followers: {data.followers}</span>
          <span>🔄 Following: {data.following}</span>
        </div>

        <a
          href={data.html_url}
          target="_blank"
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Visit Profile 🚀
        </a>
      </div>
    </>
  );
}

export default GithubData;
