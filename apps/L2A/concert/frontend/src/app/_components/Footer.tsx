// components/Footer.tsx

import { FaEnvelope, FaPhoneAlt, FaHeadphones } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo + Copyright */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 bg-sky-400 rounded-full inline-block" />
            <span className="font-bold text-xl">TICKET BOOKING</span>
          </div>
          <p className="text-gray-400">© 2024 Booking Mongolia. All Rights Reserved.</p>
        </div>

        {/* Contact Info */}
        <div className="text-gray-400 w-full md:w-auto">
          <h3 className="text-lg mb-4 text-center md:text-left">Contact Information</h3>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Email */}
            <div className="flex items-start gap-2">
              <FaEnvelope className="text-white mt-1" />
              <div>
                <p>Email:</p>
                <p className="text-white">support@ticketinbooking.mn</p>
              </div>
            </div>
            {/* Phone */}
            <div className="flex items-start gap-2">
              <FaPhoneAlt className="text-white mt-1" />
              <div>
                <p>Phone:</p>
                <p className="text-white">+976 (11) 123–4567</p>
              </div>
            </div>
            {/* Support */}
            <div className="flex items-start gap-2">
              <FaHeadphones className="text-white mt-1" />
              <div>
                <p>Customer Support:</p>
                <p className="text-white">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
