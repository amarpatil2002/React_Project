import React from "react";
import { X, User, Building, Calendar, Book, Edit2, Trash2 } from "lucide-react";

const BookDetails = ({ book, onBack, onEdit, onDelete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <X size={20} />
          Back to Inventory
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl opacity-90">by {book.author}</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <User className="text-indigo-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Author</p>
                  <p className="text-lg text-gray-800">{book.author}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="text-indigo-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Publisher</p>
                  <p className="text-lg text-gray-800">{book.publisher}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-indigo-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Published Date
                  </p>
                  <p className="text-lg text-gray-800">
                    {new Date(book.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Book className="text-indigo-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">ISBN</p>
                  <p className="text-lg text-gray-800">{book.isbn}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Pages</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {book.pages}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Genre</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {book.genre}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${book.price}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">In Stock</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {book.stock}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {book.description}
              </p>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button
                onClick={() => onEdit(book)}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Edit2 size={18} />
                Edit Book
              </button>
              <button
                onClick={() => onDelete(book.id)}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
