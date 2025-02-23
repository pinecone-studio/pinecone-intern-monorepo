import { Mail, Phone, Headphones } from 'lucide-react';

export const Footerr = () => {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B] ">
      <div className="flex justify-center items-start gap-12 py-24 px-12">
        <div className="w-[1334px] h-[72px] flex justify-between items-center px-12">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#00B7F4]" />
              <span className="text-[#FAFAFA] text-lg">TICKET BOOKING</span>
            </div>
            <div className="">
              <p className="text-[#D3D3D3] opacity-60 text-sm">© 2024 Booking Mongolia. All Rights Reserved.</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-[#D3D3D3]  opacity-60  mb-2">Contact Information</div>
            <div className="flex gap-12">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#D3D3D3]" />
                <div className="flex gap-1 flex-col">
                  <span className="text-[#D3D3D3]  opacity-60  text-sm">Email:</span>
                  <span className="text-[#D3D3D3]  opacity-60  text-sm">support@ticketinbooking.mn</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#D3D3D3]" />
                <div className="flex gap-1 flex-col">
                  <span className="text-[#D3D3D3]  opacity-60  text-sm">Phone:</span>
                  <span className="text-[#D3D3D3]  opacity-60  text-sm">+976 (11) 123-4567</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-[#D3D3D3]" />
                <div className="flex gap-1 flex-col">
                  <span className="text-[#D3D3D3]  opacity-60  text-sm">Customer Support:</span>
                  <span className="text-[#D3D3D3]  opacity-60  text-sm">Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
