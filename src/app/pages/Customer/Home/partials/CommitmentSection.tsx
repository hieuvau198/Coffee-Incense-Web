const CommitmentSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-0 md:mx-6">
          <h2 className="text-3xl font-bold text-[#2D2424] mb-10">
            CAM KẾT CỦA CHÚNG TÔI
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left content */}
            <div className="w-full lg:w-3/5 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi cam kết <strong>tái sử dụng bã cà phê</strong> thông qua các phương pháp bền vững. Chúng tôi tin rằng sự tận tâm của chúng tôi <strong>sẽ vạch nhiệm tuệ về môi trường</strong>, khi nó trở thành một công cụ <strong>nâng tầm ý thức</strong> của cộng đồng về việc tái sử dụng vật liệu thải ra, tận dụng một cách thông minh, <strong>chất lượng cao</strong>.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Bằng cách tận dụng các sản phẩm làm từ cà phê bỏ đi quý giá khách hàng góp phần cùng chúng tôi <strong>hạn khẩn tư tuần hoàn</strong> giúp giảm thiệu chất thải và thúc đẩy nền kinh tế tuần hoàn. Cùng nhau, chúng ta có thể tạo ra tác động tích cực trong bảo vệ môi trường.
              </p>
            </div>

            {/* Right illustration */}
            <div className="w-full lg:w-2/5">
              <img
                src="https://s3-alpha-sig.figma.com/img/f4d5/2a13/8a7d28c6331552c3c806c7a50d7a20e5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=skDlbYmArQhhsTgYFtBGi7pbvfVL1F9ZmUmeJ1fZ-xYcfmS6IZQL5EHQ7a3tX0pvlUmwPfQDTaaqK606qBShWKpeJyy55pp~dLBpQ3nEVhVxmIQlVwkfORS4qZ-JzsmryWsKVPsGaBTFQbMh-YR3Bjg2PsWvggquTIq9lAFYB3AvBPBEcs-eY-qn1iHDFA6UQKpKYxTXAJL~Nl0fHVjAUQBZGJm81Zh0F1jTu~EgbotgB1n4QA30dLVsfyXg0iRt6nDc-E36zMWnepTvMsHmgpyyvhuTUtSj4fkh9teKh4y3DcVq54Fknh58Y-m~FNzCWEyRM8l-D-KAvRrdgW58Gw__"
                alt="Sustainability commitment"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection; 