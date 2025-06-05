import { FaEnvelope, FaPhoneAlt, FaHeadphones } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10" data-testid="footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 bg-sky-400 rounded-full" />
            <span className="font-bold text-xl tracking-tight">TICKET BOOKING</span>
          </div>
          <p className="text-sm text-gray-400">© 2024 Booking Mongolia. All Rights Reserved.</p>
        </div>
        <div className="flex-1 text-gray-300">
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Contact Information</h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-white mt-1" />
              <div>
                <p className="text-sm">Email</p>
                <p className="text-white text-sm font-medium">support@ticketinbooking.mn</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-white mt-1" />
              <div>
                <p className="text-sm">Phone</p>
                <p className="text-white text-sm font-medium">+976 (11) 123–4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaHeadphones className="text-white mt-1" />
              <div>
                <p className="text-sm">Customer Support</p>
                <p className="text-white text-sm font-medium">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
