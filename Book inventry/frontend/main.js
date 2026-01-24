import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Book, Calendar, User, Building } from 'lucide-react';

const App = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publishedDate: '',
        publisher: '',
        pages: '',
        genre: '',
        description: '',
        price: '',
        stock: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchTerm, books]);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://freetestapi.com/api/v1/books');
            const data = await response.json();

            const enrichedData = data.map((book, index) => ({
                id: book.id || index + 1,
                title: book.title || 'Unknown Title',
                author: book.author || 'Unknown Author',
                isbn: book.isbn || `ISBN-${Math.random().toString(36).substr(2, 9)}`,
                publishedDate: book.publication_year ? `${book.publication_year}-01-01` : '2020-01-01',
                publisher: book.publisher || 'Independent Publisher',
                pages: book.page_count || Math.floor(Math.random() * 500) + 100,
                genre: book.genre?.[0] || 'Fiction',
                description: book.description || 'A captivating story that will keep you engaged from start to finish.',
                price: (Math.random() * 30 + 10).toFixed(2),
                stock: Math.floor(Math.random() * 50) + 5
            }));

            setBooks(enrichedData);
            setFilteredBooks(enrichedData);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author name is required';
        }

        if (!formData.isbn.trim()) {
            newErrors.isbn = 'ISBN is required';
        } else if (!/^[A-Z0-9-]{10,17}$/i.test(formData.isbn.replace(/[-\s]/g, ''))) {
            newErrors.isbn = 'Invalid ISBN format';
        }

        if (!formData.publishedDate) {
            newErrors.publishedDate = 'Published date is required';
        }

        if (!formData.publisher.trim()) {
            newErrors.publisher = 'Publisher is required';
        }

        if (!formData.pages) {
            newErrors.pages = 'Number of pages is required';
        } else if (isNaN(formData.pages) || parseInt(formData.pages) <= 0) {
            newErrors.pages = 'Pages must be a positive number';
        }

        if (!formData.genre.trim()) {
            newErrors.genre = 'Genre is required';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number';
        }

        if (!formData.stock) {
            newErrors.stock = 'Stock quantity is required';
        } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
            newErrors.stock = 'Stock must be a non-negative number';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const openModal = (mode, book = null) => {
        setModalMode(mode);
        if (mode === 'edit' && book) {
            setFormData(book);
        } else {
            setFormData({
                title: '',
                author: '',
                isbn: '',
                publishedDate: '',
                publisher: '',
                pages: '',
                genre: '',
                description: '',
                price: '',
                stock: ''
            });
        }
        setErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({
            title: '',
            author: '',
            isbn: '',
            publishedDate: '',
            publisher: '',
            pages: '',
            genre: '',
            description: '',
            price: '',
            stock: ''
        });
        setErrors({});
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        if (modalMode === 'add') {
            const newBook = {
                ...formData,
                id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
                pages: parseInt(formData.pages),
                price: parseFloat(formData.price).toFixed(2),
                stock: parseInt(formData.stock)
            };
            setBooks(prev => [...prev, newBook]);
        } else {
            setBooks(prev => prev.map(book =>
                book.id === formData.id
                    ? {
                        ...formData,
                        pages: parseInt(formData.pages),
                        price: parseFloat(formData.price).toFixed(2),
                        stock: parseInt(formData.stock)
                    }
                    : book
            ));
        }

        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            setBooks(prev => prev.filter(book => book.id !== id));
        }
    };

    const viewBookDetails = (book) => {
        setSelectedBook(book);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700">Loading books...</p>
                </div>
            </div>
        );
    }

    if (selectedBook) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => setSelectedBook(null)}
                        className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                        <X size={20} />
                        Back to Inventory
                    </button>

                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                            <h1 className="text-4xl font-bold mb-2">{selectedBook.title}</h1>
                            <p className="text-xl opacity-90">by {selectedBook.author}</p>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <User className="text-indigo-600 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Author</p>
                                        <p className="text-lg text-gray-800">{selectedBook.author}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Building className="text-indigo-600 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Publisher</p>
                                        <p className="text-lg text-gray-800">{selectedBook.publisher}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="text-indigo-600 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Published Date</p>
                                        <p className="text-lg text-gray-800">
                                            {new Date(selectedBook.publishedDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Book className="text-indigo-600 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">ISBN</p>
                                        <p className="text-lg text-gray-800">{selectedBook.isbn}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Pages</p>
                                        <p className="text-2xl font-bold text-indigo-600">{selectedBook.pages}</p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Genre</p>
                                        <p className="text-lg font-semibold text-purple-600">{selectedBook.genre}</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Price</p>
                                        <p className="text-2xl font-bold text-green-600">${selectedBook.price}</p>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">In Stock</p>
                                        <p className="text-2xl font-bold text-blue-600">{selectedBook.stock}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">{selectedBook.description}</p>
                            </div>

                            <div className="flex gap-4 pt-6 border-t">
                                <button
                                    onClick={() => {
                                        openModal('edit', selectedBook);
                                        setSelectedBook(null);
                                    }}
                                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <Edit2 size={18} />
                                    Edit Book
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(selectedBook.id);
                                        setSelectedBook(null);
                                    }}
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
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-5xl font-bold text-gray-800 mb-2">Book Inventory Management</h1>
                    <p className="text-gray-600 text-lg">Manage your book collection with ease</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title, author, or genre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            onClick={() => openModal('add')}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus size={20} />
                            Add New Book
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="max-h-[600px] overflow-y-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Title</th>
                                        <th className="px-6 py-4 text-left font-semibold">Author</th>
                                        <th className="px-6 py-4 text-left font-semibold">Genre</th>
                                        <th className="px-6 py-4 text-left font-semibold">ISBN</th>
                                        <th className="px-6 py-4 text-left font-semibold">Pages</th>
                                        <th className="px-6 py-4 text-left font-semibold">Price</th>
                                        <th className="px-6 py-4 text-left font-semibold">Stock</th>
                                        <th className="px-6 py-4 text-center font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredBooks.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                                <Book className="mx-auto mb-3 text-gray-400" size={48} />
                                                <p className="text-lg">No books found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredBooks.map((book) => (
                                            <tr
                                                key={book.id}
                                                className="hover:bg-indigo-50 transition-colors cursor-pointer"
                                                onClick={() => viewBookDetails(book)}
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-800">{book.title}</td>
                                                <td className="px-6 py-4 text-gray-600">{book.author}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                                        {book.genre}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 font-mono text-sm">{book.isbn}</td>
                                                <td className="px-6 py-4 text-gray-600">{book.pages}</td>
                                                <td className="px-6 py-4 text-gray-800 font-semibold">${book.price}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${book.stock > 20 ? 'bg-green-100 text-green-700' :
                                                        book.stock > 10 ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {book.stock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => openModal('edit', book)}
                                                            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(book.id)}
                                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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
                </div>

                <div className="mt-6 text-center text-gray-600">
                    <p>Total Books: <span className="font-bold text-indigo-600">{filteredBooks.length}</span></p>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white">
                                    {modalMode === 'add' ? 'Add New Book' : 'Edit Book'}
                                </h2>
                                <button
                                    onClick={closeModal}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.title ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter book title"
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.author ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter author name"
                                    />
                                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.isbn ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter ISBN"
                                    />
                                    {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.publishedDate ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.publishedDate && <p className="text-red-500 text-sm mt-1">{errors.publishedDate}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.publisher ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter publisher"
                                    />
                                    {errors.publisher && <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.pages ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter number of pages"
                                        min="1"
                                    />
                                    {errors.pages && <p className="text-red-500 text-sm mt-1">{errors.pages}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.genre ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter genre"
                                    />
                                    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.price ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter price"
                                        step="0.01"
                                        min="0"
                                    />
                                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.stock ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter stock quantity"
                                        min="0"
                                    />
                                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
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
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter book description (minimum 10 characters)"
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    {modalMode === 'add' ? 'Add Book' : 'Update Book'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;