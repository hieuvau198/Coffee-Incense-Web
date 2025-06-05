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
        <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
          <div className="mx-0 md:mx-6 text-center">
            Loading featured products...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="mx-0 md:mx-6">
          <div className="flex justify-center mb-12">
            <div className="text-center relative">
              <h2 className="text-4xl font-bold text-[#2D2424] mb-0">SẢN PHẨM NỔI BẬT</h2>
              <img 
                src="https://i.postimg.cc/MTyQ3Cy9/image-81.png"
                alt="Star decoration" 
                className="absolute -top-16 -right-16 w-16"
              />
            </div>
          </div>

          <div className="mb-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-700">
              EcoBrewCycle là quy trình cà phê thơm ngon, sạch và trách nhiệm với môi trường. Thụ quân tái sử dụng các phế phẩm từ lý trình chế biến không bỏ chất, tận dụng mọng lại hương thơm nhu mịn, giúp thư giãn và giảm căng thẳng, cho sự khâng phí trong nên xanh đẹp, phổi bạn thoát mảt cỏn tắm đều là sống xanh.
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white flex flex-col items-center rounded-2xl shadow-md py-6 px-4">
                <div className="w-full h-[396px] flex items-center justify-center mb-4 rounded-2xl shadow-lg bg-white overflow-hidden">
                  <img
                    src={product.image || ""}
                    alt={product.title || "Product Image"}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
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