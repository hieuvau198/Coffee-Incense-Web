const OrganicSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="mx-0 md:mx-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left image */}
            <div className="w-full lg:w-1/2">
                <img
                  src="https://i.postimg.cc/Bvj33zCs/14.jpg"
                  alt="Ground coffee beans"
                  className="w-[550px] h-auto object-cover rounded-lg shadow-lg mx-auto"
                />
            </div>

            {/* Right content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-[#8B7156] font-medium">100% TỰ CHẾ TỪ BÃ CÀ PHÊ</span>
                <img 
                  src="https://i.postimg.cc/1zbQ3KWF/image-82.png" 
                  alt="Leaf icon" 
                  className="h-16 w-16"
                />
              </div>

              <h2 className="text-3xl font-bold text-[#2D2424]">
                CÓ NGUỒN GỐC CÓ TRÁCH NHIỆM, TỰ NHIÊN VÀ AN TOÀN.
              </h2>

              <p className="text-gray-700 leading-relaxed">
                Chúng tôi sản chế cà phê một cách bền vững và có trách nhiệm.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Bã cà phê có quá trình sử dụng không phải là rác thải, chúng có công dụng độc đáo. Chúng tôi đã nghiên cứu để đưa bã cà phê vào sử dụng chúng thành <strong>các sản phẩm hoàn thiện với mùi thơm nhẹ nhàng, tự nhiên lâu hương, không tàn</strong> v.v...
              </p>

              <p className="text-gray-700 leading-relaxed">
                Chúng tôi xin cam kết, sản phẩm hoàn thiện được xử lý và chế biến thông qua quá trình khử vị đắng trong bã cà phê để tạo ra mùi thơm dễ chịu. Với chất lượng cao, sản xuất tại Việt Nam, sản phẩm là <strong>tự nhiên, không có hóa chất độc hại,</strong> giúp phân hủy nhanh chất thải do tính tự nhiên, không gây ô nhiễm môi trường sau khi sử dụng. Tự tin sử dụng trong không gian công sở, tư gia, giảm điều mùi, nâng cao cảm nhân về sản phẩm cà phê tốt chứ chúng không gí <strong>trí thực sự cho môi trường và công đồng.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganicSection; 