import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { productService } from "../../../../services/productService";
import { Product } from "../../../../models/product";

const FeaturedProductsSection = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts(3);
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const handleProductClick = (productId: number | string | null | undefined) => {
    if (productId) {
      navigate(`/product-detail?id=${productId}`);
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
          <div className="mx-0 md:mx-6 text-center">
            Loading featured products...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-0 md:mx-6">
          <div className="flex justify-center mb-12">
            <div className="text-center relative">
              <h2 className="text-3xl font-bold text-[#2D2424] mb-6">SẢN PHẨM NỔI BẬT</h2>
              <img 
                src="https://s3-alpha-sig.figma.com/img/0eeb/ea18/fec1c45cfb3c69d5b49e5640529ef4cb?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kFZMNTt0enaGlEbVTFMnBzfCLaXNJtmDYMp6SymMm-0Otx2MfZwwMtnv0b6KkWdOFo2eTjEiZjOwBndk4SKhM5BmN78ScLwfdagYxRem36l-xDG95f9HRrDp9920c6oyU~GoOCwb-uRimkLxHnBlhsmqjm8dODg7jIXaE5tsVhPpXfPvAC~4P6NfwaWDu1xreZ4fgzFDu4lc-0KYmtWZuPiDKmkJYpAulhPhReiLFI6ZBPmZdah3zRdMjI8eRdUFX9iQP~TS~0v99ZDVssZ4OcJQm1G~NOTpA3g4iICvaLU2eH4Yl3vQoNsWi-rtV~-0Nsx~PkzDX-1l3y7-9fo~Xw__"
                alt="Star decoration" 
                className="absolute -top-6 -right-10 w-8 h-8"
              />
            </div>
          </div>

          <div className="mb-12 max-w-3xl mx-auto text-center">
            <p className="text-gray-700">
              EcoBrewCycle là quy trình cà phê thơm ngon, sạch và trách nhiệm với môi trường. Thụ quân tái sử dụng các phế phẩm từ lý trình chế biến không bỏ chất, tận dụng mọng lại hương thơm nhu mịn, giúp thư giãn và giảm căng thẳng, cho sự khâng phí trong nên xanh đẹp, phổi bạn thoát mảt cỏn tắm đều là sống xanh.
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white flex flex-col items-center">
                <div className="w-full h-64 overflow-hidden mb-4">
                  <img
                    src={product.image || ""}
                    alt={product.title || "Product Image"}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-[#2D2424] mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 text-center px-2 mb-4">
                  {product.description}
                </p>
                
                <Button 
                  className="border-[#8B7156] text-[#8B7156] hover:text-[#8B7156] bg-transparent hover:bg-transparent"
                  onClick={() => handleProductClick(product.id)}
                >
                  Chi Tiết
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection; 