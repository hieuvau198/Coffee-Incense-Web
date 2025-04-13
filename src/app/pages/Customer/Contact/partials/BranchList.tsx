import React, { useState } from "react";

const branches = [
  {
    name: "TRỤ SỞ HỒ CHÍ MINH",
    address: "198 Phan Văn Trị, P.10, Quận Gò Vấp, TP.HCM",
    phone: "(028) 73 081 888",
    email: "sales@datviettour.com.vn",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7837.476213749855!2d106.675859!3d10.831343!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752901d4d984db%3A0xcf52c7b1c2f0d0f8!2zxJDhuqV0IFZp4buHdCBUb3Vy!5e0!3m2!1svi!2sus!4v1744187870791!5m2!1svi!2sus",
  },
  {
    name: "CHI NHÁNH HÀ NỘI",
    address: "74 Khúc Thừa Dụ, P. Dịch Vọng, Cầu Giấy",
    phone: "(024) 73 081 888",
    email: "vphanoi@datviettour.com.vn",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3723.9745824!2d105.79262!3d21.033703!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab486694bd15%3A0xbaec0a51124e8012!2zNTEgUC4gS2jDumMgVGjhu6thIEThu6UsIEThu4tjaCBW4buNbmcsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2sus!4v1744187959038!5m2!1sen!2sus",
  },
  {
    name: "CHI NHÁNH ĐÀ NẴNG",
    address: "102 Tố Hữu, Q. Cẩm Lệ, TP. Đà Nẵng",
    phone: "(0236) 73 01 888",
    email: "vpdanang@datviettour.com.vn",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3834.123456789!2d108.206543!3d16.059876!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c33b9f2b5d%3A0x123456789abcdef0!2zMTAyIFThu5UgSOG7iywgQ8O0bSBM4buHLCDEkMOgIE7hurVuZw!5e0!3m2!1svi!2sus!4v1744188000000!5m2!1svi!2sus",
  },
  {
    name: "CHI NHÁNH CẦN THƠ",
    address: "45 Võ Văn Tần, Q. Ninh Kiều, TP. Cần Thơ",
    phone: "(0292) 73 01 888",
    email: "vpcantho@datviettour.com.vn",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3928.841518!2d105.781732!3d10.029933!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a088213443c3b7%3A0x123456789abcdef1!2zNDUgVsW9IFbEgk4gVMOibiwgTmluaCBLaeG7gXUsIEPhuq1uIFRo4buN!5e0!3m2!1svi!2sus!4v1744188100000!5m2!1svi!2sus",
  },
];

interface BranchListProps {
  onSelect: (mapUrl: string) => void;
}

const BranchList = ({ onSelect }: BranchListProps) => {
  // State để theo dõi chi nhánh được chọn
  const [selectedBranch, setSelectedBranch] = useState<string | null>(branches[0].mapUrl);

  // Hàm xử lý khi chọn chi nhánh
  const handleSelect = (mapUrl: string) => {
    setSelectedBranch(mapUrl);
    onSelect(mapUrl);
  };

  return (
    <div className="space-y-4 pr-2 max-h-[460px] overflow-y-auto custom-scrollbar">
      {branches.map((branch, idx) => (
        <div
          key={idx}
          className={`bg-white rounded-lg border transition-all duration-300 ${
            selectedBranch === branch.mapUrl
              ? "border-green-500 shadow-md shadow-green-100"
              : "border-gray-200 hover:border-green-300 hover:shadow-sm"
          }`}
          onClick={() => handleSelect(branch.mapUrl)}
        >
          <div className="p-4 cursor-pointer relative">
            {selectedBranch === branch.mapUrl && (
              <div className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedBranch === branch.mapUrl ? "bg-green-100" : "bg-gray-100"
                }`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${selectedBranch === branch.mapUrl ? "text-green-600" : "text-gray-500"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${
                  selectedBranch === branch.mapUrl ? "text-green-600" : "text-gray-700"
                }`}>
                  {branch.name}
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center text-gray-600">
                    <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {branch.address}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {branch.phone}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {branch.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchList;