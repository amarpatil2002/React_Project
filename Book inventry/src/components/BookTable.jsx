import { Edit2, Trash2, Book } from "lucide-react";

const BookTable = ({ books, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto max-h-[600px]">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Author</th>
              <th className="px-6 py-4 text-left">Genre</th>
              <th className="px-6 py-4 text-left">ISBN</th>
              <th className="px-6 py-4 text-left">Pages</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {books.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <Book className="mx-auto mb-3 text-gray-400" size={40} />
                  No books found
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {book.genre}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-sm">{book.isbn}</td>
                  <td className="px-6 py-4">{book.pages}</td>
                  <td className="px-6 py-4 font-semibold">${book.price}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        book.stock > 20
                          ? "bg-green-100 text-green-700"
                          : book.stock > 10
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(book)}
                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(book.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={18} />
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
  );
};

export default BookTable;
