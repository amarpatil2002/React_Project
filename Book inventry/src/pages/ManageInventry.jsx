import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import BookTable from "../components/BookTable";
import BookModal from "../components/BookModal";

const ManageInventry = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const fetchBooks = async () => {
    setLoading(true);
    const data = []; // API call later
    setBooks(data);
    setFilteredBooks(data);
    setLoading(false);
  };

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

  const handleSubmit = (formData) => {
    if (modalMode === "add") {
      setBooks((prev) => [...prev, { ...formData, id: Date.now() }]);
    } else {
      setBooks((prev) =>
        prev.map((b) => (b.id === formData.id ? formData : b)),
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Book Inventory</h1>
          <p className="text-gray-600">Add, edit, and manage books</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Book
          </button>
        </div>

        <BookTable
          books={filteredBooks}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        <div className="mt-4 text-sm text-gray-600">
          Total books:{" "}
          <span className="font-semibold">{filteredBooks.length}</span>
        </div>
      </div>

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

export default ManageInventry;
