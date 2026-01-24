import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Book, Settings, Search, X } from "lucide-react";
import { BookContext } from "../context/BookContext";

function LandingPages() {
  const { getAllBooks } = useContext(BookContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  // Use ref for debouncing
  const timeoutRef = useRef(null);

  // Debounced search effect
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      loadBooks();
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [page, searchTerm]);

  const loadBooks = async () => {
    try {
      if (searchTerm) {
        setSearching(true);
      } else {
        setLoading(true);
      }
      setError("");

      console.log("Loading books with search:", searchTerm);

      const res = await getAllBooks({
        page,
        limit,
        search: searchTerm,
      });

      if (res?.success) {
        setBooks(res.data || []);
        setTotalPages(res.pagination?.totalPages || 1);
        setTotalBooks(res.pagination?.totalBooks || 0);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(err.message || "Failed to load books");
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    setPage(1); // Reset to page 1 when searching
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setPage(1);
    setSearchTerm("");
  };

  // Show loading state
  if (loading && books.length === 0 && !searchTerm) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Books Collection
            </h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              Discover, search, and explore books from our curated inventory
            </p>
          </div>

          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white
                     px-6 py-3 rounded-xl hover:bg-indigo-700
                     transition-all shadow-md hover:shadow-lg font-semibold"
          >
            <Settings size={18} />
            Manage Inventory
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white p-5 rounded-2xl shadow-lg mb-10">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by title, author, or genre…"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition text-gray-800"
            />

            {searching && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-b-2 border-indigo-600 rounded-full" />
              </div>
            )}

            {searchTerm && !searching && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2
                         text-gray-400 hover:text-gray-700 transition"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600 flex justify-between">
              <span>
                Found{" "}
                <strong className="text-indigo-600">{books.length}</strong>{" "}
                result{books.length !== 1 && "s"} for "
                <strong>{searchTerm}</strong>"
              </span>
              <button
                onClick={clearSearch}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Books */}
        {books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <Link
                  key={book._id}
                  to={`/books/${book._id}`}
                  state={book}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl
                           transition-all duration-300 p-6 text-center
                           hover:-translate-y-1"
                >
                  <div
                    className="mx-auto mb-5 w-16 h-16 flex items-center justify-center
                             rounded-full bg-indigo-100 text-indigo-600
                             group-hover:bg-indigo-600 group-hover:text-white
                             transition-all"
                  >
                    <Book size={28} />
                  </div>

                  <h2 className="font-semibold text-lg text-gray-900 line-clamp-2">
                    {book.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                    {book.author}
                  </p>

                  {book.genre && (
                    <span
                      className="inline-block mt-4 px-3 py-1 text-xs
                                   rounded-full bg-gray-100 text-gray-600"
                    >
                      {book.genre}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                            gap-4 mt-12 pt-6 border-t border-gray-200"
              >
                <p className="text-sm text-gray-600">
                  Showing <strong>{books.length}</strong> of{" "}
                  <strong>{totalBooks}</strong> · Page <strong>{page}</strong>{" "}
                  of <strong>{totalPages}</strong>
                </p>

                <div className="flex gap-3">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className={`px-4 py-2 rounded-xl border font-medium transition
                    ${
                      page === 1
                        ? "text-gray-400 border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    ← Previous
                  </button>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className={`px-4 py-2 rounded-xl border font-medium transition
                    ${
                      page === totalPages
                        ? "text-gray-400 border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow p-14 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-5">
              <Book size={28} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {searchTerm ? "No results found" : "No books available"}
            </h3>
            <p className="text-gray-600 mt-2">
              {searchTerm
                ? `Nothing matched "${searchTerm}"`
                : "Start by adding books to your inventory"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPages;
