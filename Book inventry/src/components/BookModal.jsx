import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import * as Yup from "yup";

const bookSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Book title is required")
    .min(2, "Title must be at least 2 characters"),

  author: Yup.string()
    .trim()
    .required("Author is required")
    .min(2, "Author name must be at least 2 characters"),

  isbn: Yup.string().trim().required("ISBN is required"),

  publishedDate: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("Published date is required")
    .max(new Date(), "Published date cannot be in the future"),

  publisher: Yup.string().trim().required("Publisher is required"),

  pages: Yup.number()
    .typeError("Pages must be a number")
    .required("Number of pages is required")
    .integer("Pages must be an integer")
    .positive("Pages must be greater than 0"),

  genre: Yup.string().trim().required("Genre is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),

  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock quantity is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

const BookModal = ({ mode, initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
    publisher: "",
    pages: "",
    genre: "",
    description: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookSchema.validate(formData, { abortEarly: false });

      const submissionData = {
        ...formData,
        pages: parseInt(formData.pages),
        price: parseFloat(formData.price).toFixed(2),
        stock: parseInt(formData.stock),
      };

      onSubmit(submissionData);
    } catch (validationError) {
      const formattedErrors = {};

      if (validationError.inner) {
        validationError.inner.forEach((err) => {
          if (!formattedErrors[err.path]) {
            formattedErrors[err.path] = err.message;
          }
        });
      }

      setErrors(formattedErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {mode === "add" ? "Add New Book" : "Edit Book"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.author ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ISBN *
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.isbn ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter ISBN"
              />
              {errors.isbn && (
                <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Published Date *
              </label>
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.publishedDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.publishedDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.publishedDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publisher *
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.publisher ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter publisher"
              />
              {errors.publisher && (
                <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages *
              </label>
              <input
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.pages ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter number of pages"
                min="1"
              />
              {errors.pages && (
                <p className="text-red-500 text-sm mt-1">{errors.pages}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre *
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.genre ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter genre"
              />
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter price"
                step="0.01"
                min="0"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter stock quantity"
                min="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter book description (minimum 10 characters)"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              {mode === "add" ? "Add Book" : "Update Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
