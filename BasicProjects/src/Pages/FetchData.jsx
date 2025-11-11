import axios from "axios";
import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState([]);

  const apiData = "https://jsonplaceholder.typicode.com/todos";

  // fetch data using fetch() built in function
  //   const fetchData = () => {
  //     fetch(apiData)
  //       .then((res) => res.json())
  //       .then((result) => setData(result))
  //       .catch((error) => console.log(error));
  //   };

  // fetch data using axios
  const fetchData = async () => {
    try {
      const res = await axios.get(apiData);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3>Fetch Data from API</h3>
      {data.map((item) => (
        <ul className="flex gap-2" key={item.id}>
          <li>{item.id}</li>
          <li>{item.title}</li>
        </ul>
      ))}
    </>
  );
};

export default FetchData;
