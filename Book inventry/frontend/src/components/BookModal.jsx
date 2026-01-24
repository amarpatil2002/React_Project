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
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // Format date for input field (YYYY-MM-DD)
      const formattedData = {
        ...initialData,
        publishedDate: initialData.publishedDate
          ? new Date(initialData.publishedDate).toISOString().split("T")[0]
          : "",
      };
      setFormData(formattedData);
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
    if (submitting) return;

    try {
      setSubmitting(true);
      setErrors({});

      await bookSchema.validate(formData, { abortEarly: false });

      const submissionData = {
        ...formData,
        pages: Number(formData.pages),
        price: Number(parseFloat(formData.price).toFixed(2)),
        stock: Number(formData.stock),
      };

      await onSubmit(submissionData);
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-3 md:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-2 sm:mx-4 my-4 sm:my-6 md:my-8">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-4 sm:p-5 md:p-6 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {mode === "add" ? "Add New Book" : "Edit Book"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 sm:p-2 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X size={20} className="sm:size-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-3 sm:p-4 md:p-6 max-h-[65vh] sm:max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {/* Book Title - Full width */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Grid for medium screens and up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Author */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.author ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.author}
                  </p>
                )}
              </div>

              {/* ISBN */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.isbn ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter ISBN"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.isbn}
                  </p>
                )}
              </div>

              {/* Published Date */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Published Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.publishedDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.publishedDate && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.publishedDate}
                  </p>
                )}
              </div>

              {/* Publisher */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Publisher <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.publisher ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter publisher"
                />
                {errors.publisher && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.publisher}
                  </p>
                )}
              </div>

              {/* Pages */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Number of Pages <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.pages ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter pages"
                  min="1"
                />
                {errors.pages && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.pages}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.genre ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter genre"
                />
                {errors.genre && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.genre}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter stock"
                  min="0"
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>

            {/* Description - Full width */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter book description (minimum 10 characters)"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters required
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`flex-1 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                submitting
                  ? "bg-indigo-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
                  Saving...
                </span>
              ) : mode === "add" ? (
                "Add Book"
              ) : (
                "Update Book"
              )}
            </button>
          </div>

          {/* Required Fields Note */}
          <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center">
            Fields marked with <span className="text-red-500">*</span> are
            required
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
