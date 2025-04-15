import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#FFF5F3] min-h-screen py-10 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-8 uppercase">
          Về Chúng Tôi
        </h1>

        {/* Hero Section */}
        <div className="container mx-auto mb-12 px-24">
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://s3-alpha-sig.figma.com/img/8495/a719/bf1631e75bc759158d916ac0a674840f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sKGhoth7lPQfnH48S3Lv0l0tMcRDioyDMlabTmqJWN9AsDq1NZqvX9VoSVlAdVRkUeoZryfGzQgixWwLvewQfnNz1zLW74PE3tQFG0DjrD3~tHDVYmovps9vk~4vC4gJ5W3~e-AMpWQ81F2PP8C175SIvbRFhVEpyXVqjQBpcOdcRfmqTpGxA21aBNpB7lCFtJShtj-AQ1oCS3urs0iAti7j~2VoBWvZul3MwiyBioOuNxv69YZWX3TdLQEgPnXHFIVhW3bvvWanzGgdzZh-hrc5Hzayllr1QtnXkQBXGwBV5e821QWIfh-6JfaYMlfBR6jQXqTMd2kKTBcc-h4J~A__")`,
                filter: "brightness(0.7)",
              }}
            ></div>
            <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
              <p className="text-5xl max-w-8xl">
                Chúng tôi tái chế bã cà phê mỗi ngày kể từ năm 2025
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-24 space-y-16">
          {/* Section 1: Hương Thơm Từ Bã Cà Phê */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4 relative">
                Hương Thơm Từ Bã Cà Phê
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-black"></span>
              </h2>
              <p className="text-gray-600 text-sm">
                Được làm từ 100% bã cà phê tự nhiên, hương thơm mang hương vị gần gũi, giúp thư giãn, thanh lọc không khí và tạo không gian thiền định, yên tĩnh. Mùi bã cà phê tự nhiên giúp giảm căng thẳng, giảm tan dư nguồn nguyên liệu tự nhiên, bảo vệ môi trường và mang lại chất lượng cuộc sống.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img
                  src="https://s3-alpha-sig.figma.com/img/569a/f919/8a89c6507e2e89c358ad414ffd848c5f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZvcuKDpKF4tfWiTHIILCVV0Sfta5HV-cejxsiIA7opEIqFjMt27Wzq~W0aNYYiSkyL~EV3UsJyEuKorI~CYwn2O1gBMuo14KO7Q~7xjDbF8mR4U9xDzv25HfXUBg0-SxJ7rItJU4BjwiV7CfUsYPDr0PXxP7lZsbSB7utsgEVxhluYMO4~hTrriyDFWrduEkk3mfChoPWMh1FTkMxhZ-JCvv5rO27zlS~sIVhXBcdqZ2E0sYbjKizti-X8Ab9h8~RcBZ6S9T47346Hp9k~QunCFGl9mvIfdN-5Up1rg6O-Jq6errkkzxz2Ur5Om3adagWvey2~NFSi4eU4TgmXJpQQ__"
                  alt="Hương Thơm Từ Bã Cà Phê"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-yellow-100 opacity-50 rounded-lg transform -rotate-6"></div>
              </div>
            </div>
          </div>

          {/* Section 2: Nghề Nhẫn Tạo Nhang */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4 relative">
                Nghề Nhẫn Tạo Nhang Từ Bã Cà Phê
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-black"></span>
              </h2>
              <p className="text-gray-600 text-sm">
                Mỗi que nhang từ bã cà phê không chỉ là một sản phẩm hương thơm mà còn là một tác phẩm nghệ thuật, kết tinh từ tay nghề, trí tuệ và sự kiên nhẫn của những người thợ lành nghề. Xứ lý nguyên liệu, đế táo nhang que nhang chất lượng cao, vừa đẹp vừa mang lại hương thơm tự nhiên.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img
                  src="https://s3-alpha-sig.figma.com/img/f463/3711/4b830637f889a52cb5ea32de5813239d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XzHuiGMwb86ps8D4a8M2OeOMmjWwaFnDXv6qC7JiLDwxU~XY~83R4qH0ZexngjmF~ujoPZYDPRmIf4aoTmgl24zOpsQ8LPfwCl63KBkxntmMvfMusyhTtuUq612CCkjNK3GEAuqKdRPjH5szjw~0UWtpKCy8bIinyCZhJT~Zy9EfehBKbS11Xz~BQT4jjfQvw08BiALQziB1~ijirqv-xXUggiZwXPSGUUpKHBSIuFta5G~Hev54AgTxm1Nzr7JxCys9KKcrJReTHRACkHYJDF~lcXSN0c7Kd0ppC7k1LUaKgtlcbJO9ZDZDrZGrFedvUfJkYtEzLeJf4N8t9-l4Tg__"
                  alt="Nghề Nhẫn Tạo Nhang"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-yellow-100 opacity-50 rounded-lg transform rotate-6"></div>
              </div>
            </div>
          </div>

          {/* Section 3: Nhang Vòng – Giải Pháp Hương Thơm */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4 relative">
                Nhang Vòng – Giải Pháp Hương Thơm Tự Nhiên, Bền Vững
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-black"></span>
              </h2>
              <p className="text-gray-600 text-sm">
                Nhang vòng là sự kết hợp giữa thiết kế truyền thống và sinh hoạt nghề của người Việt, với mong muốn mang đến một giải pháp an toàn, thân thiện với môi trường, hương thơm tự nhiên để bạn cảm nhận được sự thư giãn, giảm căng thẳng và mang lại hương thơm tự nhiên.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img
                  src="https://s3-alpha-sig.figma.com/img/857c/bfc8/de427d17712f26e69f278ff9729ffe8f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TN9d8l8kmbWXVMN9UQMib2bwl-r2h3ebS9kWLEh96dRqfRV4eN8kIzUAs1grMHauuiiE0Rdl~Xjkwf2rIRi~j-dQTPsXTlxJxHC52wXhWUzxO0Fy900TjtuiYhiEg5vqFIEBRUqtchbe50hpcY3JmrWVqQ-3d2E5vL-bjOMNbwyXbFJ~ECcMs2CKGURejdDUHmk4Yj6qxtOExqToHFhju-s4yg4NZbe0X15zhEr~Fd6dn0fp88rqGookVzUo0mcDKkX0Oi2VA9uPGnI5wjfWHA8xvQadbdq~ysr8rfG9TkRrML-aOgwHk4FPfwL96mRZV4vGduRhNdZY2eSOdcsf2Q__"
                  alt="Nhang Vòng"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-yellow-100 opacity-50 rounded-lg transform -rotate-6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Do Section */}
        <div className="container mx-auto px-24 mt-16">
          <h2 className="text-4xl font-bold text-center mb-8 mt-10">
            Tại Sao Nên Hoạt Động
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="text-center">
              <img
                src="https://s3-alpha-sig.figma.com/img/3149/39d3/321d35cfacaafb371430e28331ce0512?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c-FvpqEAJsLgr2GfbdqS12SQp5BuaDvmPM6wUEsryacn9bDdErEFX1WUrSpZtXhVv~iPMXIYpgMkCqleYROEQyPr4leveGGdbpjzxEVSe7n34CT7bxmPdGB6IdinO4afVdhY7HD4fx43b3NKMLeC1HMR6tIUxHseg6vqrk~8xRlNZOx5FDdXV5imRR-ogZttnRppYrjercsz-JySzrlVdo7RGYb~30vICZxCd7P6tiWqQykWDIedyDvIIC5vWUzCrsXpxSSSIZbHMwwdyF-~z7-NSp0DscIa9WL9YSXpRWOkH0NMko-ue6chItaIyHktS6bLL3kGzJ70AWLZ~Ao0-g__"
                alt="Tác động bền vững"
                className="w-24 h-24 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-2">Tác động bền vững</h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi biến bã cà phê đã qua sử dụng thành sản phẩm thân thiện với môi trường, giúp giảm chất thải và bảo vệ thiên nhiên.
              </p>
            </div>
            {/* Item 2 */}
            <div className="text-center">
              <img
                src="https://s3-alpha-sig.figma.com/img/299e/fad6/9f823cd9db8e7249d47958575a1d9334?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CPZe~qNjEIIqI-cAZDc7g0-I10C~1XNqK6aE6sElQ27VWugNN5VuxxLUV9Ed5ZgUBHogwwnDFLtkuGlWtyjBmktg9CIxp~VMapGPMhy4R~m2NTaGbbrYhYjxSz2db0E0Uc4eVLR57SHGs02ApZU7B6magRe8nxQnbn1iEJlgVQHPB0I-ib10rEFnsF00YC16n8u68AwlVHfttRATXcTIlwY7-tKc5g4rrYiqTOdaQz~m500KBZeDgkfxRKX1bLw6XsatQVYvFa019P1BGP6MYUYi-jrb8YvGuuM-9Kinqhx2VjuneGyRPeHX12eC0ShmESn-gBxYIS~XREWZeNSOKg__"
                alt="Đổi mới thiên nhiên"
                className="w-24 h-24 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-2">Đổi mới thiên nhiên</h3>
              <p className="text-gray-600 text-sm">
                Sản phẩm từ bã cà phê được xử lý tự nhiên, không sử dụng hóa chất, giúp bạn tận hưởng hương thơm tự nhiên, an toàn.
              </p>
            </div>
            {/* Item 3 */}
            <div className="text-center">
              <img
                src="https://s3-alpha-sig.figma.com/img/a058/76fb/852966e59a68f40415f7de310ebd4d64?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qi0BEfUQRKsSAKjGtcuyG6tlHKuWMYzK3pfNCGq5d1WGiqg0ua8fC95gzlArI-XIac7JR~Hd2NwofSHdW5H4fcJWtXsu6HqMrDHBftob95URvAbIsEBnwJYe6cd2MikRiFi7K8rbaQ-PBkod6H5o8q-QUz9bgr5eq1dEvRzTMPpztNb2FTjSG2mFwKz~XTdXCpGFky8jMPpI9WkRnLaUESctjwsR7ty0goAuBePK2DGgaGLgLp3TrHW6tuGb1hCq8zrLS8vaEWH-XqGTtzKK0BTQd7ljWBQbqHnREqe4MDb2jFyaJ60Uaro3JTMXqiCBeZxWcZZFAn2fCwjuz-8Zeg__"
                alt="Cộng đồng & Nhan thức"
                className="w-24 h-24 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-2">Cộng đồng & Nhan thức</h3>
              <p className="text-gray-600 text-sm">
                Thông qua các hoạt động tái chế, chúng tôi góp phần nâng cao ý thức bảo vệ môi trường, khuyến khích lối sống xanh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;