// src\mocks\product.ts
import { Product, ProductCategory } from "../app/models/product";

export const products: Product[] = [
  {
    id: 1,
    title: "Hương Cà Phê",
    description: "Hương thơm thư giãn, thanh lọc không khí, mang đến gợi ấn dễ chịu",
    image: "https://s3-alpha-sig.figma.com/img/0cc8/9137/080d68ea426bc0017e5960253a3c1e40?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mTTNp0NzDv9AJpwVt6SctdwZSdLX2mN5OYm0AEseQ1Qq0XpSHR7yDZwxOY7Zqbb~pesXX-7tHqc7RrNtZ~ULUyCn6YU6LCQe3SH9h6USBklrQUEI7kGxyZhjggj33cuOTlVVguZ1H-Rxb0MBgzqufnZ7ID84lfQDVCvi0tf4pSJHXPKmS3~cGCXsHc04G2kE~ry4ewqxNu49NKikb3CjTvheKX-iopGA7BHpyQI3p0bPV333u5bn0WNanzIgGXLzOFP6Z4oaSrZ7vZcZ0vobWa7BrMzRJdrMbilX79smzo1blD37Qp4M0igJs-NwWaKxgTodRcftxXzggvLLt0motQ__",
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
    image: "https://s3-alpha-sig.figma.com/img/0c64/55ad/fdd285b6682a3748d5c0b6fb8b5f9c0d?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DKM-6lmk~Vhc66rvBrh2A9y7OwBxu-mQV0bIUk7HaXHH~o8jFz7c5m6IJSai70ys6U-KiYDGm86O106J-~BWK7GpBkR7oWA1inuq9gSYEZNa6O5aWN1g36PeNvZ1pUhCkt3fGJZD7bMshVyUcR320ATLxDykgtcYTACDkasTpN2BwthxMubhXXSJoqYMeA0iCRMzmnyqJ47egsYIukG7Q2ezEnq76-SwKXwqn1KVEyltiLojZaIXtkNZiIiJVc-LLCjGyBjM0hDMx2H7ErT5BIJHc6zjNRV407rxeR3W4mjPVt9KKaE4spkIDtFFWWJ2SSQhMyRl2giM5kc1EdJsHg__",
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
    image: "https://s3-alpha-sig.figma.com/img/a3e5/9d9d/b8fde31f56bd69812d051bae9398be9c?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NxSu~xhlm0dRxyEEXT7bHV1eO4cGCnt83TR6-JlpjdW3KJZGq7IUweSEH2ppmi6QijSGDnUGbzOPy40xjKCGKE4YUZ2c7a0HgVghZqc60bfXRLpazPk-rmhVtt1l3ZBQLil~5cnFbXtDZ8EUDpGFXJEQMG7FFOQvsL9955CL74kZz7b73nCis5QPAIPXZKDnWJNdS3VykXQTblpBs4FlAu4dclYahM7tyJMaqUYkRA39sPsojHWdfg2s676cqDo3StCYx6ttytJZS8eN~T9sajhUajUaOc6ay80C-s31Bhlck7Rs3OPc-qNbu8s7IMDq7tzc11hbxT~GsVGE0R64ig__",
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
    image: "https://s3-alpha-sig.figma.com/img/88ce/e11c/741d187d1fe17dc355665781e4b81828?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=E5-OC8v6K6cZDOa8HwKuZMDTdnyRm-xOXDNPX6whuX0ydxo44JyT674FF5Qzs6qbLOdH0ZGH~cqmHe9k~nOdTJYBQjoF2CJta5BdYiF9Yj7GMEJgEsh7CEs1n~K2zCx9sXwtVyloBqgaXjdVoSyuTmjOqGBWkqyvXBWonmWx3IdWYK5R4OF-hOZ3ZATS7UBak3vzZgdYAOJ1QJimtBq-SH9cQHT9u34m1C1pT5vUpblEXp8j5FoaUxcLig2STWGMf2d9HQjI~xB5TwhCvKuu7qzLduautiVhysf8ec9bA6iffGJ4trCKteXwv6m7VgjCiNJ2lC7fxIgsVe4vwJoyDg__",
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
    image: "https://s3-alpha-sig.figma.com/img/7915/1277/94b25fd2b885d75dc910212612acdcf4?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Sox9yQjILC0ehtNOQUbPryPQJw8iYMJz0whFdJMqPAVbVZaH6LrbMllskBJpGa~GVs0PhvZu5Fbm~CoW8hWdHbtW~S774e5DFIobfV0ybaVNW8ySkgToo2lMFPOkrf4eE5xUQIkda~7-7u7LPlspOleh4wbDOKZTeJIwl~ee0F9XxNLRZ3zTiZ8hgdjwkzjIcWk2nMXdhsqh9xyjW7ZSlSaa27aWXLNRPtLcno5CSN2FwWsMbA9Xh9ZGP~cKmWv-nN7JuUjKPoQ7mmHvS72mcAk2Ynr9Om5cSP05vtGUDHNyzaixuMDd5zwz87~SfZgbHhGLZPsFFZQEZvKDq0B58w__",
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
    image: "https://s3-alpha-sig.figma.com/img/8220/e6c7/b1a8c58a117061c8987133a3f0594262?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QfSVdJjktbPkDX80AvMdmr0I8JuXcS47Jq-5syVB3-dKlzM9BhfFgPE~~lsUCbFk1sgWWY6RTzzXmd8tx55chEgFXKHXYP0mrUi869AfVeF6cZ2y9Xu13vlAQ8Q5Ge1IcmILpja-CM8MZYUH~yN1QDosXDUuZMoz1GIgrTcjFalZ85lPtbUc25Hzw8CYSSuC~9FNSeO5MmZMe25hjGPcqrhnKn2bIjVpJcxdCToFwnFj5si6Lcdk3c5tt~sH7LM9jmqm7GWa28e9ws-~T-NO9d2anpEax9OcPSxHB5KmLHrSDzPqn6YOEXB976GaiSEPkcVLxVcA-~7xmqZ1bbYD3Q__",
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