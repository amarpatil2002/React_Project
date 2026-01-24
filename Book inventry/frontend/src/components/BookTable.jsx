import {
  Edit2,
  Trash2,
  Book,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const BookTable = ({ books, onEdit, onDelete }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      {/* Desktop/Tablet View (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full">
            <thead className="bg-linear-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium">
                  Title
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium">
                  Author
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium hidden lg:table-cell">
                  Genre
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium">
                  ISBN
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium">
                  Pages
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium">
                  Price
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium">
                  Stock
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-sm lg:text-base font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {books.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 lg:px-6 py-8 sm:py-10 lg:py-12 text-center text-gray-500"
                  >
                    <Book className="mx-auto mb-3 text-gray-400" size={32} />
                    <p className="text-sm lg:text-base">No books found</p>
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr
                    key={book._id || book.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div
                        className="font-medium text-gray-900 text-sm lg:text-base max-w-30 lg:max-w-45 xl:max-w-xs truncate"
                        title={book.title}
                      >
                        {book.title}
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div
                        className="text-gray-700 text-sm lg:text-base max-w-25 lg:max-w-37.5 truncate"
                        title={book.author}
                      >
                        {book.author}
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4 hidden lg:table-cell">
                      <span className="px-2 lg:px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs lg:text-sm font-medium">
                        {book.genre}
                      </span>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div
                        className="font-mono text-gray-600 text-xs lg:text-sm max-w-20 lg:max-w-none truncate"
                        title={book.isbn}
                      >
                        {book.isbn}
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 text-sm lg:text-base">
                      {book.pages}
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-semibold text-gray-900 text-sm lg:text-base">
                      ${parseFloat(book.price).toFixed(2)}
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span
                        className={`inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium ${
                          book.stock > 20
                            ? "bg-green-100 text-green-800"
                            : book.stock > 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.stock}
                      </span>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                      <div className="flex justify-center gap-1 lg:gap-2">
                        <button
                          onClick={() => onEdit(book)}
                          className="p-1.5 lg:p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit book"
                          aria-label={`Edit ${book.title}`}
                        >
                          <Edit2 size={16} className="lg:size-5" />
                        </button>

                        <button
                          onClick={() => onDelete(book._id || book.id)}
                          className="p-1.5 lg:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete book"
                          aria-label={`Delete ${book.title}`}
                        >
                          <Trash2 size={16} className="lg:size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View (shown only on mobile) */}
      <div className="md:hidden">
        {books.length === 0 ? (
          <div className="px-4 py-10 text-center text-gray-500">
            <Book className="mx-auto mb-3 text-gray-400" size={32} />
            <p className="text-base">No books found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {books.map((book) => (
              <div
                key={book._id || book.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Book Header - Always visible */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="font-semibold text-gray-900 text-sm line-clamp-2 pr-2"
                        title={book.title}
                      >
                        {book.title}
                      </h3>
                      <button
                        onClick={() => toggleRow(book._id || book.id)}
                        className="text-gray-500 hover:text-gray-700 shrink-0 p-1"
                        aria-label={
                          expandedRow === book._id
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        {expandedRow === book._id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-600 font-medium">
                        {book.author}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                        {book.genre}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">ISBN:</span> {book.isbn}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Pages:</span>{" "}
                          {book.pages}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-gray-900 text-sm">
                          ${parseFloat(book.price).toFixed(2)}
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            book.stock > 20
                              ? "bg-green-100 text-green-800"
                              : book.stock > 10
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          Stock: {book.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details - Shown when row is expanded */}
                {expandedRow === (book._id || book.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">
                          Description
                        </h4>
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {book.description || "No description available"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">
                            Publisher
                          </h4>
                          <p className="text-sm text-gray-700">
                            {book.publisher || "N/A"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">
                            Published
                          </h4>
                          <p className="text-sm text-gray-700">
                            {book.publishedDate
                              ? new Date(
                                  book.publishedDate,
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            onEdit(book);
                            setExpandedRow(null);
                          }}
                          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            onDelete(book._id || book.id);
                            setExpandedRow(null);
                          }}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions - Always visible on mobile */}
                {expandedRow !== (book._id || book.id) && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onEdit(book)}
                      className="flex-1 px-3 py-1.5 border border-indigo-600 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(book._id || book.id)}
                      className="flex-1 px-3 py-1.5 border border-red-600 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table Footer - Shows on all screens */}
      {books.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing <span className="font-semibold">{books.length}</span>{" "}
              books
            </p>
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="hidden sm:inline">
                Scroll horizontally for more details
              </span>
              <span className="sm:hidden">Tap to expand details</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTable;
