import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { Search, Plus, ArrowLeft } from "lucide-react";
import BookTable from "../components/BookTable";
import BookModal from "../components/BookModal";
import { BookContext } from "../context/BookContext";
import { Link } from "react-router-dom";

const ManageInventory = () => {
  const { getAllBooks, addNewBook, updateBook, deleteBook } =
    useContext(BookContext);

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  // Use ref for debouncing
  const timeoutRef = useRef(null);

  // Fetch books when page or searchTerm changes
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debouncing
    timeoutRef.current = setTimeout(() => {
      fetchBooks();
    }, 300);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [page, searchTerm]);

  const fetchBooks = useCallback(async () => {
    try {
      setError("");

      if (searchTerm) {
        setSearching(true);
      } else if (books.length === 0) {
        setLoading(true);
      }

      const res = await getAllBooks({
        page,
        limit,
        search: searchTerm,
      });

      if (!res?.success) {
        throw new Error(res?.message || "Invalid response");
      }

      setBooks(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotalBooks(res.pagination?.totalBooks || 0);
    } catch (err) {
      setError(err.message || "Failed to load books");
      setBooks([]);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }, [page, limit, searchTerm, getAllBooks]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setEditBook(null);
    setShowModal(true);
  };

  const openEditModal = (book) => {
    setModalMode("edit");
    setEditBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditBook(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === "add") {
        await addNewBook(formData);
      } else {
        await updateBook(editBook._id, formData);
      }
      closeModal();
      fetchBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  const handleSearchChange = (e) => {
    setPage(1);
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setPage(1);
    setSearchTerm("");
  };

  if (loading && books.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                Book Inventory
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                Add, edit, and manage books
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 sm:gap-2 text-indigo-600 hover:underline font-medium text-sm sm:text-base self-start sm:self-center"
            >
              <ArrowLeft size={14} className="sm:size-4 md:size-5" />
              <span className="hidden sm:inline">Back to Collection</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>

        {/* Search and Add Button Section */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {searching && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-indigo-600 rounded-full" />
                </div>
              )}
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Add Book Button */}
            <button
              onClick={openAddModal}
              className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 hover:bg-indigo-700 text-sm sm:text-base whitespace-nowrap"
            >
              <Plus size={16} className="sm:size-4" />
              <span className="hidden sm:inline">Add Book</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          {/* Search Hint for Mobile */}
          {!searchTerm && (
            <p className="text-xs text-gray-500 mt-2 sm:hidden">
              Search by title, author, or ISBN
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4">
            <p className="font-medium text-sm sm:text-base">Error: {error}</p>
            <button
              onClick={fetchBooks}
              className="mt-1 text-xs sm:text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Book Table */}
        <div className="mb-4 sm:mb-6">
          <BookTable
            books={books}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </div>

        {/* No Results Message */}
        {searchTerm && books.length === 0 && !searching && (
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center mb-4 sm:mb-6">
            <p className="text-gray-600 text-sm sm:text-base">
              No books found for "
              <span className="font-medium">{searchTerm}</span>"
            </p>
            <button
              onClick={clearSearch}
              className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm sm:text-base"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          {/* Results Count */}
          <div className="text-xs sm:text-sm text-gray-600">
            <p className="sm:hidden">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>
            <p className="hidden sm:block">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {books.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">{totalBooks}</span>{" "}
              books · Page{" "}
              <span className="font-semibold text-gray-800">{page}</span> of{" "}
              <span className="font-semibold text-gray-800">{totalPages}</span>
            </p>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border text-xs sm:text-sm font-medium transition flex-1 sm:flex-none text-center ${
                page === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-50"
                  : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              }`}
            >
              ← <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            {/* Page Numbers for Desktop/Tablet */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                if (pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 rounded-md text-sm font-medium ${
                        page === pageNum
                          ? "bg-indigo-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}

              {totalPages > 5 && page < totalPages - 2 && (
                <>
                  <span className="text-gray-400">...</span>
                  <button
                    onClick={() => setPage(totalPages)}
                    className="w-8 h-8 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border text-xs sm:text-sm font-medium transition flex-1 sm:flex-none text-center ${
                page === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-50"
                  : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span> →
            </button>
          </div>
        </div>

        {/* Mobile Page Info */}
        <div className="sm:hidden text-center mt-2">
          <p className="text-xs text-gray-500">
            {books.length} of {totalBooks} books
          </p>
        </div>

        {/* Add Book Button for Mobile (Floating) */}
        <button
          onClick={openAddModal}
          className="fixed bottom-6 right-6 sm:hidden z-40 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
          aria-label="Add book"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <BookModal
          mode={modalMode}
          initialData={editBook}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ManageInventory;
