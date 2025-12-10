import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const items = ["Apple", "Banana", "Jackfruit", "Kiwi", "Pineapple"];

  const filterItem = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

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
            <li>{item}</li>
        </ul>
      ))}
    </>
  );
};

export default SearchBar;
