import { Product, ProductCategory } from "../app/models/product";

export const products: Product[] = [
  {
    id: 1,
    title: "Hương Cà Phê",
    description: "Hương thơm thư giãn, thanh lọc không khí, mang đến gợi ấn dễ chịu",
    image: "https://i.imgur.com/pLQ8DLH.jpg",
    category: "incense",
    fullDescription: "Hương Cà Phê mang đến cho bạn trải nghiệm thư giãn độc đáo với hương thơm đặc trưng của cà phê Việt Nam. Sản phẩm được làm từ nguyên liệu tự nhiên, giúp thanh lọc không khí và tạo không gian ấm cúng cho ngôi nhà của bạn.",
    specifications: {
      "Xuất xứ": "Việt Nam",
      "Thành phần": "Cà phê nguyên chất, hương liệu tự nhiên",
      "Đóng gói": "Hộp 20 nén",
      "Thời gian sử dụng": "Khoảng 30 phút mỗi nén"
    },
    price: 150000,
    stock: 100,
    featured: true
  },
  {
    id: 2,
    title: "Nụ Hương Cà Phê",
    description: "Tỏa không gian thư thái, thư mãi dụ mùi, giúp giữ hương thơm lâu",
    image: "https://i.imgur.com/fPOPz3t.jpg",
    category: "incense",
    fullDescription: "Nụ Hương Cà Phê được thiết kế đặc biệt để tỏa hương thơm nhẹ nhàng, tinh tế trong không gian sống. Sản phẩm giúp thư giãn tinh thần, tạo cảm giác an yên và giữ hương thơm lâu dài.",
    specifications: {
      "Xuất xứ": "Việt Nam",
      "Thành phần": "Cà phê nguyên chất, hương liệu tự nhiên",
      "Đóng gói": "Hộp 15 nụ hương",
      "Thời gian sử dụng": "Khoảng 45 phút mỗi nụ"
    },
    price: 180000,
    stock: 85,
    featured: true
  },
  {
    id: 3,
    title: "Nhang Vòng Cà Phê",
    description: "Hương thơm dễm khi mở hộp gần tam, bày trí hương thơm lâu dài",
    image: "https://i.imgur.com/JVSQjyY.jpg",
    category: "incense",
    fullDescription: "Nhang Vòng Cà Phê là sản phẩm nhang hình tròn đặc biệt, dễ dàng đặt trong các không gian nhỏ và tỏa hương thơm đều khắp phòng. Sản phẩm này lý tưởng cho việc thư giãn, thiền định hoặc tạo bầu không khí ấm cúng.",
    specifications: {
      "Xuất xứ": "Việt Nam",
      "Thành phần": "Cà phê nguyên chất, hương liệu tự nhiên",
      "Đóng gói": "Hộp 10 vòng",
      "Thời gian sử dụng": "Khoảng 3-4 giờ mỗi vòng"
    },
    price: 220000,
    stock: 70,
    featured: true
  },
  {
    id: 4,
    title: "Hương Sào Cà Phê",
    description: "Hình sự sạch, không tạp chất, mùi hương không gây tồn, nhỏ nhẹ xóa bỏ mùi",
    image: "https://i.imgur.com/8PEjg9g.jpg",
    category: "incense",
    fullDescription: "Hương Sào Cà Phê là loại hương đặc biệt được làm từ cà phê nguyên chất, được thiết kế để treo hoặc đặt trong không gian. Sản phẩm có khả năng khử mùi hiệu quả và tạo không khí dễ chịu trong phòng.",
    specifications: {
      "Xuất xứ": "Việt Nam",
      "Thành phần": "Cà phê nguyên chất, hương liệu tự nhiên",
      "Đóng gói": "Hộp 5 sào",
      "Thời gian sử dụng": "Khoảng 1-2 tuần mỗi sào"
    },
    price: 195000,
    stock: 55,
    featured: false
  },
  {
    id: 5,
    title: "Hương Không Tăm Cà Phê",
    description: "Giúp không gian thoải mái, trồng mùi tàn anh, đem không gian sống",
    image: "https://i.imgur.com/qWEp4Y3.jpg",
    category: "incense",
    fullDescription: "Hương Không Tăm Cà Phê là sản phẩm hương không khói độc đáo, giúp không gian luôn thơm mát mà không gây ám mùi. Đây là lựa chọn tuyệt vời cho những người thích hương thơm cà phê nhưng lại nhạy cảm với khói.",
    specifications: {
      "Xuất xứ": "Việt Nam",
      "Thành phần": "Cà phê nguyên chất, tinh dầu tự nhiên",
      "Đóng gói": "Lọ 50ml",
      "Thời gian sử dụng": "Khoảng 1-2 tháng"
    },
    price: 250000,
    stock: 40,
    featured: false
  },
  {
    id: 6,
    title: "Bột Hương Cà Phê",
    description: "Bột hương có thể đem sử dụng được đa công năng, kết hợp với nguyên liệu khác",
    image: "https://i.imgur.com/wl64zJ5.jpg",
    category: "powder",
    fullDescription: "Bột Hương Cà Phê là dạng bột mịn từ hạt cà phê được chế biến đặc biệt để sử dụng trong nhiều mục đích khác nhau như làm hương thơm, nguyên liệu làm đẹp, hoặc kết hợp với các sản phẩm khác để tạo ra các mùi hương độc đáo.",
    specifications: {
      "Xuất xứ": "Việt Nam",
      "Thành phần": "100% bột cà phê tinh chế",
      "Đóng gói": "Hũ 100g",
      "Hạn sử dụng": "12 tháng kể từ ngày sản xuất"
    },
    price: 120000,
    stock: 120,
    featured: false
  }
];

export const productCategories: ProductCategory[] = [
  {
    id: "incense",
    name: "Nhang hương",
    description: "Các sản phẩm nhang và hương cà phê tự nhiên"
  },
  {
    id: "powder",
    name: "Bột hương",
    description: "Bột hương cà phê nguyên chất"
  },
  {
    id: "accessories",
    name: "Phụ kiện",
    description: "Đế đốt hương, kệ trưng bày và các phụ kiện khác"
  }
];