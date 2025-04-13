import React, { useState } from "react";
import ContactForm from "./partials/ContactForm";
import BranchList from "./partials/BranchList";
import ContactMessage from "./partials/ContactMessage";
import GoogleMap from "./partials/GoogleMap";

const Contact = () => {
  const [mapUrl, setMapUrl] = useState(
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7837.476213749855!2d106.675859!3d10.831343!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752901d4d984db%3A0xcf52c7b1c2f0d0f8!2zxJDhuqV0IFZp4buHdCBUb3Vy!5e0!3m2!1svi!2sus!4v1744187870791!5m2!1svi!2sus"
  );

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Liên Hệ Với Chúng Tôi</h1>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Các Chi Nhánh</h2>
              <BranchList onSelect={(url) => setMapUrl(url)} />
            </div>
            <div className="h-[500px] md:h-auto">
              <GoogleMap mapUrl={mapUrl} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center p-6 md:p-8">
              <ContactMessage />
            </div>
            <div className="p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
