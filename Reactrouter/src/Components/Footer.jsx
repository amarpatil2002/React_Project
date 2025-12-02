import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="font-bold text-xl text-white mb-3">MyLogo</h2>
          <p className="text-sm">A creative approach to bring ideas to life.</p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Contact</h3>
          <p className="text-sm">Email: support@example.com</p>
          <p className="text-sm">Phone: +91 9876543210</p>
        </div>
      </div>

      <p className="text-center text-xs pt-6 border-t border-gray-800 mt-10">
        © {new Date().getFullYear()} MyWebsite — All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
