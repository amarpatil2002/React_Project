import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, BookOpen, Edit2, Settings } from "lucide-react";
import { BookContext } from "../context/BookContext";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleBook } = useContext(BookContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getSingleBook(id);

      if (res?.success) {
        setBook(res.data);
      } else {
        throw new Error("Invalid server response");
      }
    } catch (err) {
      setError(err.message || "Failed to load book");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Book not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 sm:gap-2 text-indigo-600 font-medium mb-4 sm:mb-6 hover:underline group"
        >
          <ArrowLeft
            size={16}
            className="sm:size-5 md:size-6 group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm sm:text-base md:text-lg">Back to list</span>
        </button>

        {/* Book Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {book.title}
            </h1>
            <p className="text-indigo-100 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
              by {book.author}
            </p>
          </div>

          {/* Book Details */}
          <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                  Genre
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  {book.genre}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                  ISBN
                </p>
                <p className="text-sm sm:text-base md:text-lg font-mono text-gray-900">
                  {book.isbn}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                  Pages
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  {book.pages}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                  Price
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-green-600">
                  ${parseFloat(book.price).toFixed(2)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                  Stock
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm sm:text-base md:text-lg font-semibold ${
                      book.stock > 20
                        ? "text-green-600"
                        : book.stock > 10
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {book.stock}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      book.stock > 20
                        ? "bg-green-100 text-green-800"
                        : book.stock > 10
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.stock > 20
                      ? "High"
                      : book.stock > 10
                        ? "Medium"
                        : "Low"}
                  </span>
                </div>
              </div>

              {book.publisher && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                    Publisher
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                    {book.publisher}
                  </p>
                </div>
              )}

              {book.publishedDate && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                    Published Date
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                    {new Date(book.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Description & Stats Section - Equal columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <BookOpen
                    size={18}
                    className="sm:size-5 md:size-6 text-indigo-600"
                  />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Description
                  </h2>
                </div>
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                    {book.description || "No description available."}
                  </p>
                </div>
              </div>

              {/* Book Stats */}
              <div className="bg-indigo-50 rounded-xl p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-indigo-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="sm:size-5" />
                  Book Stats
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-indigo-700">
                      Status
                    </span>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        book.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.stock > 0 ? "Available" : "Out of Stock"}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-indigo-700">
                      Category
                    </span>
                    <span className="text-sm sm:text-base font-medium text-indigo-900">
                      {book.genre}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-indigo-700">
                      ISBN
                    </span>
                    <span className="text-sm sm:text-base font-medium text-indigo-900 font-mono">
                      {book.isbn}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                >
                  View All Books
                </button>
                <button
                  onClick={() => navigate("/inventory")}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium"
                >
                  Manage Inventory
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:hidden z-10">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-3 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium"
            >
              Back
            </button>
            <button
              onClick={() => navigate("/inventory")}
              className="flex-1 px-3 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium"
            >
              Inventory
            </button>
          </div>
        </div>

        {/* Content padding for mobile bottom nav */}
        <div className="h-16 sm:h-0"></div>
      </div>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-3">
    <p className="text-xs uppercase text-gray-500 font-medium">{label}</p>
    <p className="text-gray-800 font-semibold mt-1">{value}</p>
  </div>
);

export default BookDetails;
