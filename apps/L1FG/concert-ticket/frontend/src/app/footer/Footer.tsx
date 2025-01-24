import { Mail, Phone, Headphones } from 'lucide-react';

export const Footerr = () => {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#00B7F4]" />
              <span className="text-[#FAFAFA] text-lg font-medium">TICKET BOOKING</span>
            </div>
            <p className="text-[#D3D3D3] text-sm opacity-60">© 2024 Booking Mongolia. All Rights Reserved.</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[#D3D3D3] opacity-60 font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D3D3D3] mt-1" />
                <div className="flex flex-col gap-1">
                  <span className="text-[#D3D3D3] opacity-60 text-sm">Email:</span>
                  <span className="text-[#D3D3D3] opacity-60 text-sm">support@ticketinbooking.mn</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D3D3D3] mt-1" />
                <div className="flex flex-col gap-1">
                  <span className="text-[#D3D3D3] opacity-60 text-sm">Phone:</span>
                  <span className="text-[#D3D3D3] opacity-60 text-sm">+976 (11) 123-4567</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Headphones className="w-5 h-5 text-[#D3D3D3] mt-1" />
                <div className="flex flex-col gap-1">
                  <span className="text-[#D3D3D3] opacity-60 text-sm">Customer Support:</span>
                  <span className="text-[#D3D3D3] opacity-60 text-sm">Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footerr;
