import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa"; // Replaced FaTwitter with FaTiktok
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";
import { products } from "src/mocks/product";
import type { Product } from "src/app/models/product";

const Footer = () => {
  // Giữ ảnh cũ, link và tên lấy từ sản phẩm thật
  const galleryImages = [
    "https://i.postimg.cc/MT2W5rpZ/4.jpg",
    "https://i.postimg.cc/Y0ttKGFJ/5.jpg",
    "https://i.postimg.cc/wMFg6qc3/6.jpg",
    "https://i.postimg.cc/X77ns545/7.jpg",
    "https://i.postimg.cc/hPyc6Gt5/8.jpg",
    "https://i.postimg.cc/9QsVXNTP/9.jpg"
  ];
  const galleryProducts = products.slice(0, 6);

  return (
    <footer className="w-full">
      <div className="w-full h-1 bg-[#8B7156] mx-auto"></div>
      {/* Follow us section */}
      <div className="bg-[#FFF5F3] py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#2D2424] mb-2">Follow us @EBC</h2>
          <p className="text-[#2D2424] mb-2">Cùng chúng tôi lan tỏa lối sống xanh!</p>
          <p className="text-[#2D2424] mb-4 max-w-3xl mx-auto text-sm">
            Chúng tôi tin rằng mỗi hành động nhỏ đều có thể tạo nên sự thay đổi lớn. Hãy
            đồng hành cùng chúng tôi trên hành trình biến bã cà phê thành những sản phẩm
            thân thiện với môi trường, góp phần bảo vệ hành tinh xanh.
          </p>
          <p className="text-[#2D2424] mb-6 max-w-3xl mx-auto text-sm">
            Theo dõi chúng tôi để cập nhật những ý tưởng tái chế mới nhất và cùng nhau tạo
            nên tương lai bền vững!
          </p>
          
          {/* Social media icons */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-8">
            <a href="#" className="bg-[#8B7156] text-white p-2 sm:p-3 rounded-full hover:bg-[#6D573D] hover:scale-110 transition-all duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61556699531934" className="bg-[#8B7156] text-white p-2 sm:p-3 rounded-full hover:bg-[#6D573D] hover:scale-110 transition-all duration-300">
              <FaFacebookF size={18} />
            </a>
            <a href="https://www.tiktok.com/@ecobrewcycle?_t=ZS-8wyAKWXl1Ue&_r=1&fbclid=IwY2xjawKv91dleHRuA2FlbQIxMABicmlkETF0WThpN3ZISmhGSUJRNGFQAR4TDB4ZI9K1rYOxvEb6HkIAItmBgdyaljvyUZbx_YLFqmDmBczVWvqS36Gqzw_aem_hnZUbaA-embblRreK21iVA" className="bg-[#8B7156] text-white p-2 sm:p-3 rounded-full hover:bg-[#6D573D] hover:scale-110 transition-all duration-300">
              <FaTiktok size={18} />
            </a>
            <a href="#" className="bg-[#8B7156] text-white p-2 sm:p-3 rounded-full hover:bg-[#6D573D] hover:scale-110 transition-all duration-300">
              <FaYoutube size={18} />
            </a>
          </div>
          
          {/* Product images gallery */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 max-w-6xl mx-auto">
            {galleryImages.map((image: string, index: number) => (
              <Link 
                to={`/product-detail?id=${galleryProducts[index]?.id}`} 
                key={index} 
                className="h-24 sm:h-28 md:h-40 overflow-hidden group relative"
              >
                <img 
                  src={image}
                  alt={galleryProducts[index]?.title || ''}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#2D2424]/0 group-hover:bg-[#2D2424]/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs md:text-sm font-medium px-2 py-1 bg-[#8B7156]/80 rounded">
                    {galleryProducts[index]?.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer with navigation and contact */}
      <div className="bg-[#8B7156] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
          {/* Logo and tagline */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-4xl md:text-5xl font-serif mb-2">EBC</div>
            <p className="text-sm text-white/80">THE SECOND LIFE OF COFFEE</p>
          </div>
          
          {/* Navigation links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <div>
              <Link to="/" className="block py-1 hover:text-[#E3D5C8] transition-colors">Home</Link>
              <Link to="/about-us" className="block py-1 hover:text-[#E3D5C8] transition-colors">About Us</Link>
              <Link to="/products" className="block py-1 hover:text-[#E3D5C8] transition-colors">Products</Link>
              <Link to="/blog" className="block py-1 hover:text-[#E3D5C8] transition-colors">Blog</Link>
              <Link to="/contact-us" className="block py-1 hover:text-[#E3D5C8] transition-colors">Contact</Link>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">CONTACT</h3>
              <div className="flex items-center gap-2 text-sm mb-2">
                <MdEmail />
                <span>infoEBC7024@fpt.edu.vn</span>
              </div>
              <p className="text-sm">
                Designed & Built by EBC
              </p>
            </div>
            
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <h3 className="font-medium mb-2">NEWSLETTER</h3>
              <p className="text-sm mb-3">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex flex-col sm:flex-row">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-3 py-2 bg-[#7A624A] text-white placeholder-white/60 border border-[#9A8269] focus:outline-none flex-grow mb-2 sm:mb-0"
                />
                <button className="bg-[#E3D5C8] text-[#2D2424] px-4 py-2 font-medium hover:bg-white transition-colors sm:ml-1">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright bar */}
      <div className="bg-[#6D573D] text-white/80 text-sm py-3 px-4 text-center">
        <p>© {new Date().getFullYear()} EcoBrew Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;