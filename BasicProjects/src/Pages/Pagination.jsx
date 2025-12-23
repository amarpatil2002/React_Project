import { useEffect, useState } from "react";
import './Common.css'

function Pagination() {
  const [products, setProducts] = useState([]);
  const [perPageProducts, setPerPageProducts] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastProductIndex = perPageProducts * currentPage;
  const firstProductIndex = lastProductIndex - perPageProducts;
  const currentItems = products.slice(firstProductIndex,lastProductIndex)
  const totalPages = Math.ceil(products.length/perPageProducts)
//   console.log(totalPages);

  const fetchData = async () => {
    const jsonRes = await fetch("https://dummyjson.com/products?limit=0");
    const res = await jsonRes.json();
    console.log(res);
    setProducts(res.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev-1,1))
  }

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev+1,totalPages))
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

return (
  <div className="flex flex-col items-center gap-4">
    <h2 className="text-xl font-semibold">Pagination</h2>

    <table className="border border-gray-400 border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2">Name</th>
          <th className="border border-gray-400 px-4 py-2">Brand</th>
          <th className="border border-gray-400 px-4 py-2">Price</th>
        </tr>
      </thead>

      <tbody>
        {currentItems.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border border-gray-400 px-4 py-2">
              {item.title}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {item.brand}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              ₹{item.price}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div>
        <button onClick={handlePrev} disabled={currentPage===1} >Prev</button>
        <span className="px-2" >
        {
            Array.from({length:totalPages} , (_,index) => {
                return <button className={currentPage === index+1?"active px-2":"px-2"} onClick={() => handlePagination(index+1)}>{index+1}</button>
            })
        }
        </span>
        <button onClick={handleNext} disabled={currentPage===totalPages} >Next</button>
    </div>

  </div>
);

}

export default Pagination;
