import { useEffect, useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [apiData, setApiData] = useState([]);

  // const items = ["Apple", "Banana", "Jackfruit", "Kiwi", "Pineapple"];

  const filterItem = apiData.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => setApiData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Search bar using React</h2>
      <input
        className="border-2"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filterItem.map((item, i) => (
        <ul key={i}>
          <li>{item.title}</li>
        </ul>
      ))}
    </>
  );
};

export default SearchBar;
