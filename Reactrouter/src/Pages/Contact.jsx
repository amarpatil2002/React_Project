export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Contact Us</h2>

        <label className="block mb-2 text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your name"
        />

        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your email"
        />

        <label className="block mb-2 text-gray-700">Message</label>
        <textarea
          rows="4"
          className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Write your message..."
        />

        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}
