import React from "react";

interface GoogleMapProps {
  mapUrl: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ mapUrl }) => {
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden shadow-md">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-100 animate-pulse"></div>
      <iframe
        title="Google Map"
        src={mapUrl}
        width="100%"
        height="100%"
        className="relative z-10 border-0"
        style={{ minHeight: "500px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute top-4 left-4 z-20 bg-white shadow-lg rounded-lg py-2 px-3">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-800">Đất Việt Tour</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
