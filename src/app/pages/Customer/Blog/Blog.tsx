import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Hành Trình Biến Bã Cà Phê Thành Hương",
    description:
      "Bã cà phê, vốn bị bỏ đi sau pha, thực ra là một nguồn tài nguyên quý giá cho hương thơm. ",
    image: "https://s3-alpha-sig.figma.com/img/fd75/21d2/d4de91d6d5b9db8392087a7cdba8de5d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NmLbamGvuwkDcVzGuaD9E2vrwr~HU1emGsruzlUcek76hMGxjlQ7lpIlD4kunGMExHjGH43pA6bCiK8QSIK9LmSIRsnvElIbRQh~tGirYzg7dAVi1ipz~7QQICj833mFOp9Ph~FJA1idZoPNUc~FS4uzNAQP2kbx5EQttYHUZ-zYCfgpkAOugvwUq0Ry~54D0CH-QZhAa3-PvY3-~v-GQtQdUSwhTgcWabxGSxZyqdGpZM1iAhO-d-HxqT~E1IfMyVWhrQrbIwovI72bovzH~6~1r5aDKPM9DOpkjzxFRpq9CnPf6BKAPtR-ZwWHRyWjtgHpoqKzFSjwf-yd0DqMXA__",
    date: "06/04/2025",
  },
  {
    id: 2,
    title: "Giải Pháp Tự Nhiên Cho Không Gian Sống",
    description:
      "Hương thơm từ bã cà phê mang đến cảm giác dễ chịu, là lựa chọn lý tưởng để thanh lọc không khí trong nhà mà không cần hóa chất.",
    image: "https://s3-alpha-sig.figma.com/img/f463/3711/4b830637f889a52cb5ea32de5813239d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XzHuiGMwb86ps8D4a8M2OeOMmjWwaFnDXv6qC7JiLDwxU~XY~83R4qH0ZexngjmF~ujoPZYDPRmIf4aoTmgl24zOpsQ8LPfwCl63KBkxntmMvfMusyhTtuUq612CCkjNK3GEAuqKdRPjH5szjw~0UWtpKCy8bIinyCZhJT~Zy9EfehBKbS11Xz~BQT4jjfQvw08BiALQziB1~ijirqv-xXUggiZwXPSGUUpKHBSIuFta5G~Hev54AgTxm1Nzr7JxCys9KKcrJReTHRACkHYJDF~lcXSN0c7Kd0ppC7k1LUaKgtlcbJO9ZDZDrZGrFedvUfJkYtEzLeJf4N8t9-l4Tg__",
    date: "06/04/2025",
  },
  {
    id: 3,
    title: "Bước Đơn Giản Để Bảo Vệ Sức Khỏe",
    description:
      "Hít thở hương cà phê không chỉ thư giãn mà còn giúp tinh thần tỉnh táo và dễ chịu mỗi ngày.",
    image: "https://s3-alpha-sig.figma.com/img/857c/bfc8/de427d17712f26e69f278ff9729ffe8f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TN9d8l8kmbWXVMN9UQMib2bwl-r2h3ebS9kWLEh96dRqfRV4eN8kIzUAs1grMHauuiiE0Rdl~Xjkwf2rIRi~j-dQTPsXTlxJxHC52wXhWUzxO0Fy900TjtuiYhiEg5vqFIEBRUqtchbe50hpcY3JmrWVqQ-3d2E5vL-bjOMNbwyXbFJ~ECcMs2CKGURejdDUHmk4Yj6qxtOExqToHFhju-s4yg4NZbe0X15zhEr~Fd6dn0fp88rqGookVzUo0mcDKkX0Oi2VA9uPGnI5wjfWHA8xvQadbdq~ysr8rfG9TkRrML-aOgwHk4FPfwL96mRZV4vGduRhNdZY2eSOdcsf2Q__",
    date: "06/04/2025",
  },
  {
    id: 4,
    title: "Thư Giãn Với Hương Nhang Từ Bã Cà Phê",
    description:
      "Tận dụng bã cà phê để làm hương nhang là một cách vừa thân thiện với môi trường vừa mang lại trải nghiệm thư giãn độc đáo.",
    image: "https://s3-alpha-sig.figma.com/img/569a/f919/8a89c6507e2e89c358ad414ffd848c5f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZvcuKDpKF4tfWiTHIILCVV0Sfta5HV-cejxsiIA7opEIqFjMt27Wzq~W0aNYYiSkyL~EV3UsJyEuKorI~CYwn2O1gBMuo14KO7Q~7xjDbF8mR4U9xDzv25HfXUBg0-SxJ7rItJU4BjwiV7CfUsYPDr0PXxP7lZsbSB7utsgEVxhluYMO4~hTrriyDFWrduEkk3mfChoPWMh1FTkMxhZ-JCvv5rO27zlS~sIVhXBcdqZ2E0sYbjKizti-X8Ab9h8~RcBZ6S9T47346Hp9k~QunCFGl9mvIfdN-5Up1rg6O-Jq6errkkzxz2Ur5Om3adagWvey2~NFSi4eU4TgmXJpQQ__",
    date: "06/04/2025",
  },
];

const Blog: React.FC = () => {
  return (
    <div className="bg-[#FFF5F3] min-h-screen py-10 px-4 pt-10">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8 uppercase">
          Blog của chúng tôi
        </h1>

        {/* Hero Section with Background Image */}
        <div className="container mx-auto mb-12 px-24">
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://i.postimg.cc/7ZSNt3cV/image-89.png")`,
                filter: "brightness(0.7)",
              }}
            ></div>
            <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
              <p className="text-5xl max-w-8xl">
                Khám phá những câu chuyện thú vị về hành trình tái chế bã cà phê!
              </p>
            </div>
          </div>
        </div>

        {/* Blog list */}
        <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row gap-4"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-56 h-40 object-cover rounded-t-md md:rounded-none md:rounded-l-md"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm">{post.description}</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">Hoanvngoc • {post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;