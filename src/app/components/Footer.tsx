import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  // Coffee product images from Figma
  const galleryImages = [
    "https://s3-alpha-sig.figma.com/img/5c82/2427/c9a3a0c396531ebaa0ea28e64b206232?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Izp5HhVlzToa34ZEjpHMzyswLgT2lOn4FebkGq5A8tlOw-OzPUybQn2WxyV2x6uJh7IsicKH20yPCx4aygmgbm49XfSRRmqfhaDwS4VmJw~dFLnuvQspBoLuvepGMtzOpQWmpXOFx-c13cmXWjQ-jVa5Cn0ZESxUJoTo9tUg6C4FmeGMqEjIATkg35Q-00OrdaTMtIlFdOc9ZH6jX~vRIk7~qWfaQWfwW3Ug3IGFziEcJc3WfQ7Rs7GupMr0qw-m361FgW4n-DMbGmsv3kg-0aQ6t6ilarZ17y-DHfXTVIWRZir1kerXSZk5VpZnmMRN7yGndR0xgSOywAvHnCKimA__",
    "https://s3-alpha-sig.figma.com/img/d987/88e4/4b8fc55447ba7beb5a6d373b432528ef?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=D9DuCy7NOJR48TmMaXV~~OOXZx1CP-PMyXbPm-LRvFkZzBIoHKLLld4rBse96tGJR519IXeznFm5qCnRSCCuOiLi9Oh08R88O5F13KuiP3jP0yADnDsBn4kcsIjC2ad~Y0I~5ruaHmq-d0W9YWjJFWYpW2yvlN19dP0i80ul4uy7SbidZc-Qxj6ePQj~6XBJHHU4ouB6~hvZpf-xD1eDZGfY5UOSzCUi6Qkr5A2TjHM6YDmzj-vPAHiDQLGo55qhjInj6O~2WRxgssjWnKMD436LaJ1TeEhMGz-cZxVOI41UewIq1kMsGpbFMxuX1G16PEZa5LarzfH6lDM9CaQeTQ__",
    "https://s3-alpha-sig.figma.com/img/97a4/3fcd/d7e61ec93b357330de39659acb90bb3b?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IkPrQztPqBNOhltgLC7Wli6j6TXYwf~eGHfIfsyUEr6SIi5vGpKiIc5qA2PChfJ7YiLz6GblJ5JoEZ3AzY-yGLNjHIeYTia3sjkwkrQOU-~GaQbRegNIeO9TgALhaaIw3laIHHWfIFPvYGQafTYLwvezNmIuXDMQVZPsuluTCAs8rvAdXZAQad91aJA9nj8QCbNIcxy1WgdqBUJ7ZNTnWztDkM33XIGNplNutERhQa-EsRWFrxWqeXu31flV2ipdkEY43o6Fll3-mZvsgyT79K~fmWy-vVb7Dfb~PgXbi~KbnMdhSLRi6P-iGPKL1eyTB8RFy6CgnEr9ZMBGDZDT6A__",
    "https://s3-alpha-sig.figma.com/img/7c2e/cbbd/545cc73759b5a5dfd173bbebde7a0584?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ECljzzCKgHrPE90YP2fOOXrBK-Oxzqe5sR7wVpmnnyI~IBQ1FQooXci2SzupS16LsS8K5th85neWQDg6xczfruQkfeOZ1Zyu87YMZKDMCcie8hC6yJBPyp-kanRSFRgiVky8pVMllU10FwfKDQXWHULTSn4ZZx~TSmnsH0UkW2xv6jI7y~w~zwAG~ImgEdp2v6BAi7EUKwnGx~Xn~pCL1IuZctEFeuMaRRmDy1DEkB~aGLg~fwcXkIllajoTTv6o~4L4PJCo0i1iKJDU-bTupjr8CF5M05Gk6kxTj1HJycl7yyXc98iLKUE~BqQ-qQ6ELBO~ihua98tZkQ-te~9alg__",
    "https://s3-alpha-sig.figma.com/img/e50d/821f/f5d82a07c2a1cb7fd68a8499c48057d0?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Gi2P9jGDlUuXDgyEBbEr8tNtxg9nkWWd-I-qRSoTi2yn9plX2bf1am4em414vXM8of5fGnHnkZ-789ltwHa748d1MdOCL~U0wUgkA2cN5txLiT5jYyUVKBLyQblp4XUop0Y-7TnUEGYpRVtwbiBnCoL7hIWGf1YG8K8zmq8KO8Vzcxrff75rpy9rjGAwNUYTqPORk-daHXbo2MTqKO3MawKVe4h-pkydiGaJgWdI260KLe1MipSuFWk3deCZl78iWvycaaC5kWISPgbPYTbYTWan4sXbHcl0h3Eg5Na3LFJYQDNuhKctQ1ghVrClsIhMySHW~SwYTClhonxF1JOdNw__",
    "https://s3-alpha-sig.figma.com/img/50d7/02fe/fe6e9f46adc81f5e95d546cce8d22224?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j8K1PuSiM1dDHP-La8R7rlHL5Tj2bgVacPtbA~rru6bwiwA23g1BVZW3IaIZ2EXtPwTfXhACeUokhd3zc37gibP1hpCmAEN8kSW69MTD7Swn2pnBQ0sP~R4rCF2FkOe8HcB~3CRTBqdyOOfmehn36m~E8pTPwW4L0HGw2UmEGpFandv6rD0uxHMzGukqtwrbjhSUculViPY~WaMz969OZjf7Hvo3ePP-WRWh~XzN8v~duhCYDj19VS6J3nqYSCJbp-eZZqutNUwy2VvXFUFS9PDwZffRKSsnJi9ILSRv4zLxBVVHQ1Elp21Ww8E9~gEYxCW7ZNapw9kIrS3k3aoNKw__"
  ];
  
  // Product names for hover effect
  const productNames = [
    "Nụ Hương Cà Phê",
    "Bột Hương Cà Phê",
    "Hương Cà Phê",
    "Hương Sào Cà Phê",
    "Hương Không Tăm Cà Phê",
    "Nhang Cà Phê"
  ];

  return (
    <footer className="w-full">
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
            <a href="#" className="bg-[#8B7156] text-white p-2 sm:p-3 rounded-full hover:bg-[#6D573D] hover:scale-110 transition-all duration-300">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="bg-[#8B7156] text-white p-2 sm:p-3 rounded-full hover:bg-[#6D573D] hover:scale-110 transition-all duration-300">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="bg-[#8B7156] text-white p-2 sm:p-3 rounded-full hover:bg-[#6D573D] hover:scale-110 transition-all duration-300">
              <FaYoutube size={18} />
            </a>
          </div>
          
          {/* Product images gallery */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <Link 
                to={`/products/${index + 1}`} 
                key={index} 
                className="h-24 sm:h-28 md:h-40 overflow-hidden group relative"
              >
                <img 
                  src={image}
                  alt={productNames[index]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#2D2424]/0 group-hover:bg-[#2D2424]/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs md:text-sm font-medium px-2 py-1 bg-[#8B7156]/80 rounded">
                    {productNames[index]}
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
