export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content?: string;
  image: string;
  date: string;
  author?: string;
  readTime?: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Hành Trình Biến Bã Cà Phê Thành Hương",
    description: "Bã cà phê, vốn bị bỏ đi sau pha, thực ra là một nguồn tài nguyên quý giá cho hương thơm.",
    content: `
      <p>Bã cà phê, thường được coi là phế phẩm sau khi pha chế, thực chất lại chứa đựng những tiềm năng vô cùng to lớn. Trong hành trình tìm kiếm những giải pháp thân thiện với môi trường, việc tái chế bã cà phê thành hương nhang không chỉ là một ý tưởng sáng tạo mà còn là bước đi quan trọng hướng tới sự phát triển bền vững.</p>
      
      <h3>Tại sao bã cà phê lại phù hợp để làm hương?</h3>
      <p>Bã cà phê có những đặc tính tự nhiên rất lý tưởng cho việc tạo hương:</p>
      <ul>
        <li><strong>Hương thơm tự nhiên:</strong> Mùi cà phê đặc trưng mang lại cảm giác thư giãn, tỉnh táo</li>
        <li><strong>Khả năng hấp thụ:</strong> Bã cà phê có khả năng hấp thụ và giữ hương rất tốt</li>
        <li><strong>Cháy đều:</strong> Khi khô, bã cà phê cháy đều và lâu, thích hợp làm nhang</li>
        <li><strong>An toàn:</strong> Hoàn toàn tự nhiên, không chứa hóa chất độc hại</li>
      </ul>
      
      <h3>Quy trình chế biến bã cà phê thành hương nhang</h3>
      <p>Quá trình biến đổi bã cà phê thành những que nhang thơm ngát trải qua nhiều bước cẩn thận:</p>
      <ol>
        <li><strong>Thu gom và sơ chế:</strong> Bã cà phê được thu gom từ các quán cà phê, làm sạch và loại bỏ tạp chất</li>
        <li><strong>Sấy khô:</strong> Sử dụng nhiệt độ phù hợp để sấy khô hoàn toàn, đảm bảo chất lượng</li>
        <li><strong>Nghiền mịn:</strong> Bã cà phê được nghiền thành bột mịn, dễ dàng tạo hình</li>
        <li><strong>Pha trộn:</strong> Kết hợp với các thành phần tự nhiên khác như bột gỗ, tinh dầu thiên nhiên</li>
        <li><strong>Tạo hình:</strong> Ép thành các que nhang hoặc hình dạng mong muốn</li>
        <li><strong>Sấy khô cuối:</strong> Sấy khô lần cuối để đảm bảo độ bền và chất lượng</li>
      </ol>
      
      <h3>Lợi ích của hương nhang từ bã cà phê</h3>
      <p>Sản phẩm này mang lại nhiều lợi ích đáng kể:</p>
      <ul>
        <li><strong>Thân thiện môi trường:</strong> Giảm thiểu lượng rác thải, tái chế tài nguyên</li>
        <li><strong>Hương thơm đặc biệt:</strong> Mùi cà phê nhẹ nhàng, không gây khó chịu</li>
        <li><strong>Tính kinh tế:</strong> Chi phí sản xuất thấp, giá thành hợp lý</li>
        <li><strong>Sức khỏe:</strong> Không chứa hóa chất độc hại, an toàn cho sức khỏe</li>
      </ul>
      
      <p>Việc biến bã cà phê thành hương nhang không chỉ là một giải pháp tái chế thông minh mà còn tạo ra những sản phẩm có giá trị, đóng góp vào việc bảo vệ môi trường và phát triển kinh tế bền vững.</p>
    `,
    image: "https://i.postimg.cc/brsfbx8x/21.jpg",
    date: "06/04/2025",
    author: "Hoanvngoc",
    readTime: "5 phút đọc",
    tags: ["Tái chế", "Môi trường", "Cà phê", "Hương nhang"]
  },
  {
    id: 2,
    title: "Giải Pháp Tự Nhiên Cho Không Gian Sống",
    description: "Hương thơm từ bã cà phê mang đến cảm giác dễ chịu, là lựa chọn lý tưởng để thanh lọc không khí trong nhà mà không cần hóa chất.",
    content: `
      <p>Trong thời đại hiện đại, việc tạo ra một không gian sống trong lành và thơm tho đang trở thành mối quan tâm hàng đầu của nhiều gia đình. Hương nhang từ bã cà phê xuất hiện như một giải pháp tự nhiên, hiệu quả và an toàn cho ngôi nhà của bạn.</p>
      
      <h3>Tại sao nên chọn hương tự nhiên?</h3>
      <p>Các sản phẩm hương thơm thương mại thường chứa nhiều hóa chất tổng hợp có thể gây hại cho sức khỏe. Trong khi đó, hương nhang từ bã cà phê mang lại:</p>
      <ul>
        <li>Hương thơm tự nhiên, nhẹ nhàng</li>
        <li>Không chứa hóa chất độc hại</li>
        <li>Thân thiện với môi trường</li>
        <li>Phù hợp cho mọi lứa tuổi</li>
      </ul>
      
      <h3>Cách sử dụng hiệu quả trong không gian sống</h3>
      <p>Để tận dụng tối đa lợi ích của hương nhang bã cà phê, bạn có thể:</p>
      <ul>
        <li><strong>Phòng khách:</strong> Đặt ở góc phòng để tạo không gian thư giãn</li>
        <li><strong>Phòng ngủ:</strong> Sử dụng trước khi đi ngủ để có giấc ngủ ngon</li>
        <li><strong>Phòng làm việc:</strong> Giúp tăng cường sự tập trung và sáng tạo</li>
        <li><strong>Phòng tắm:</strong> Khử mùi tự nhiên và tạo hương thơm dễ chịu</li>
      </ul>
    `,
    image: "https://i.postimg.cc/SNYpxfgq/22.jpg",
    date: "06/04/2025",
    author: "Hoanvngoc",
    readTime: "4 phút đọc",
    tags: ["Không gian sống", "Tự nhiên", "Sức khỏe", "Tinh dầu"]
  },
  {
    id: 3,
    title: "Bước Đơn Giản Để Bảo Vệ Sức Khỏe",
    description: "Hít thở hương cà phê không chỉ thư giãn mà còn giúp tinh thần tỉnh táo và dễ chịu mỗi ngày.",
    content: `
      <p>Nghiên cứu khoa học đã chứng minh rằng hương cà phê có tác động tích cực đến sức khỏe tinh thần và thể chất. Việc sử dụng hương nhang từ bã cà phê không chỉ mang lại cảm giác thư giãn mà còn đóng vai trò quan trọng trong việc bảo vệ sức khỏe hàng ngày.</p>
      
      <h3>Lợi ích của hương cà phê đối với sức khỏe</h3>
      <p>Hương thơm của cà phê có những tác động tích cực sau:</p>
      <ul>
        <li><strong>Giảm stress:</strong> Mùi cà phê giúp giảm cortisol, hormone gây stress</li>
        <li><strong>Tăng cường trí nhớ:</strong> Kích thích não bộ, cải thiện khả năng ghi nhớ</li>
        <li><strong>Cải thiện tâm trạng:</strong> Tăng cường serotonin, hormone hạnh phúc</li>
        <li><strong>Tăng sự tập trung:</strong> Giúp duy trì sự tỉnh táo và chú ý</li>
      </ul>
      
      <h3>Cách thực hiện đơn giản hàng ngày</h3>
      <p>Để tận dụng lợi ích này, bạn có thể:</p>
      <ol>
        <li><strong>Buổi sáng:</strong> Thắp nhang cà phê khi thức dậy để bắt đầu ngày mới</li>
        <li><strong>Giờ làm việc:</strong> Sử dụng trong phòng làm việc để tăng hiệu suất</li>
        <li><strong>Buổi tối:</strong> Thư giãn với hương nhang trước khi đi ngủ</li>
        <li><strong>Khi căng thẳng:</strong> Sử dụng để giảm stress và lo âu</li>
      </ol>
    `,
    image: "https://i.postimg.cc/kMpmCpFf/23.jpg",
    date: "06/04/2025",
    author: "Hoanvngoc",
    readTime: "3 phút đọc",
    tags: ["Sức khỏe", "Thư giãn", "Tinh thần", "Wellness"]
  },
  {
    id: 4,
    title: "Thư Giãn Với Hương Nhang Từ Bã Cà Phê",
    description: "Tận dụng bã cà phê để làm hương nhang là một cách vừa thân thiện với môi trường vừa mang lại trải nghiệm thư giãn độc đáo.",
    content: `
      <p>Trong nhịp sống hiện đại đầy căng thẳng, việc tìm kiếm những giây phút thư giãn trở nên quan trọng hơn bao giờ hết. Hương nhang từ bã cà phê không chỉ mang lại trải nghiệm thư giãn độc đáo mà còn thể hiện lối sống bền vững, gần gũi với thiên nhiên.</p>
      
      <h3>Nghệ thuật thư giãn với hương nhang</h3>
      <p>Thư giãn với hương nhang không chỉ đơn thuần là thắp nhang và ngồi yên. Đây là một nghệ thuật tinh tế:</p>
      <ul>
        <li><strong>Tạo không gian:</strong> Chọn góc yên tĩnh, ánh sáng vừa phải</li>
        <li><strong>Thời gian phù hợp:</strong> Buổi sáng sớm hoặc tối muộn là lý tưởng</li>
        <li><strong>Tư thế thư giãn:</strong> Ngồi thoải mái, thở đều và sâu</li>
        <li><strong>Tập trung:</strong> Tập trung vào hương thơm và cảm giác hiện tại</li>
      </ul>
      
      <h3>Lợi ích của hương nhang bã cà phê</h3>
      <p>So với các loại hương nhang truyền thống, hương nhang từ bã cà phê có những ưu điểm đặc biệt:</p>
      <ul>
        <li><strong>Hương thơm quen thuộc:</strong> Mùi cà phê gần gũi, không gây khó chịu</li>
        <li><strong>Thời gian cháy lâu:</strong> Bã cà phê cháy đều và lâu hơn</li>
        <li><strong>Không khói độc:</strong> Hoàn toàn tự nhiên, an toàn cho sức khỏe</li>
        <li><strong>Tái chế:</strong> Góp phần bảo vệ môi trường</li>
      </ul>
      
      <h3>Cách tạo ra những phút giây thư giãn hoàn hảo</h3>
      <p>Để có trải nghiệm thư giãn tốt nhất:</p>
      <ol>
        <li>Chọn thời điểm yên tĩnh trong ngày</li>
        <li>Thắp nhang và để trong lư hương phù hợp</li>
        <li>Ngồi hoặc nằm ở tư thế thoải mái</li>
        <li>Thở sâu và cảm nhận hương thơm</li>
        <li>Để tâm trí thư giãn, không nghĩ về công việc</li>
      </ol>
      
      <p>Hương nhang từ bã cà phê không chỉ là sản phẩm thư giãn mà còn là cầu nối giữa con người và thiên nhiên, giúp chúng ta tìm lại sự cân bằng trong cuộc sống.</p>
    `,
    image: "https://i.postimg.cc/T1FMcKYZ/24.jpg",
    date: "06/04/2025",
    author: "Hoanvngoc",
    readTime: "6 phút đọc",
    tags: ["Thư giãn", "Meditation", "Lifestyle", "Tái chế"]
  },
  {
    id: 5,
    title: "Cách Bảo Quản Hương Nhang Tự Nhiên",
    description: "Bảo quản đúng cách giúp hương nhang giữ được mùi thơm lâu và chất lượng tốt nhất.",
    content: `
      <p>Việc bảo quản hương nhang tự nhiên rất quan trọng để đảm bảo hương thơm và hiệu quả sử dụng lâu dài. Sau đây là một số lưu ý:</p>
      <ul>
        <li><strong>Bảo quản nơi khô ráo:</strong> Tránh độ ẩm cao vì có thể làm mốc, mất mùi thơm.</li>
        <li><strong>Đựng trong hộp kín:</strong> Sử dụng hộp hoặc túi kín khí để giữ hương thơm và ngăn côn trùng.</li>
        <li><strong>Tránh ánh nắng trực tiếp:</strong> Ánh nắng có thể làm nhang khô giòn, phai mùi.</li>
        <li><strong>Để xa nguồn nhiệt:</strong> Đảm bảo an toàn và giữ chất lượng nhang.</li>
      </ul>
      <p>Áp dụng các cách trên sẽ giúp hương nhang của bạn luôn thơm và sử dụng được lâu hơn.</p>
    `,
    image: "https://i.postimg.cc/brsfbx8x/21.jpg",
    date: "05/04/2025",
    author: "Hoanvngoc",
    readTime: "2 phút đọc",
    tags: ["Bảo quản", "Hương nhang", "Mẹo vặt"]
  },
  {
    id: 6,
    title: "Tác Dụng Của Tinh Dầu Trong Hương Nhang",
    description: "Tinh dầu thiên nhiên mang lại nhiều lợi ích cho sức khỏe và tăng giá trị cho hương nhang.",
    content: `
      <p>Tinh dầu là thành phần quan trọng giúp hương nhang tự nhiên thêm phần độc đáo. Một số tác dụng nổi bật của tinh dầu trong hương nhang:</p>
      <ul>
        <li><strong>Khử mùi:</strong> Giúp không khí trong nhà luôn thơm mát, dễ chịu.</li>
        <li><strong>Thư giãn tinh thần:</strong> Các loại tinh dầu như oải hương, bạc hà, sả giúp giảm căng thẳng, tạo cảm giác thư giãn.</li>
        <li><strong>Kháng khuẩn:</strong> Một số loại tinh dầu còn giúp diệt khuẩn, thanh lọc không khí.</li>
        <li><strong>Tăng giá trị sản phẩm:</strong> Hương nhang kết hợp tinh dầu cao cấp phù hợp làm quà tặng ý nghĩa.</li>
      </ul>
      <p>Hãy lựa chọn các loại tinh dầu tự nhiên, an toàn để sử dụng lâu dài cho sức khỏe.</p>
    `,
    image: "https://i.postimg.cc/SNYpxfgq/22.jpg",
    date: "04/04/2025",
    author: "Hoanvngoc",
    readTime: "2 phút đọc",
    tags: ["Tinh dầu", "Hương nhang", "Sức khỏe"]
  },
  {
    id: 7,
    title: "Hướng Dẫn Làm Hương Nhang Tại Nhà",
    description: "Chỉ với vài bước đơn giản, bạn có thể tự làm hương nhang tự nhiên tại nhà.",
    content: `
      <p>Làm hương nhang tại nhà không chỉ thú vị mà còn đảm bảo an toàn sức khỏe. Tham khảo các bước sau:</p>
      <ol>
        <li><strong>Chuẩn bị nguyên liệu:</strong> Bột gỗ, bã cà phê, tinh dầu yêu thích, nước sạch.</li>
        <li><strong>Trộn đều:</strong> Trộn các nguyên liệu với nhau theo tỉ lệ phù hợp để tạo độ dẻo.</li>
        <li><strong>Tạo hình:</strong> Nặn thành que hoặc hình tròn nhỏ tùy ý.</li>
        <li><strong>Sấy khô:</strong> Để nơi thoáng gió hoặc dùng lò sấy nhẹ cho khô hoàn toàn.</li>
        <li><strong>Bảo quản:</strong> Đựng trong hộp kín, tránh ẩm để dùng dần.</li>
      </ol>
      <p>Chúc bạn thành công với mẻ nhang tự nhiên của riêng mình!</p>
    `,
    image: "https://i.postimg.cc/kMpmCpFf/23.jpg",
    date: "03/04/2025",
    author: "Hoanvngoc",
    readTime: "3 phút đọc",
    tags: ["DIY", "Làm nhang", "Hướng dẫn"]
  },
];

export const relatedPosts = [
  {
    id: 5,
    title: "Cách Bảo Quản Hương Nhang Tự Nhiên",
    description: "Bảo quản đúng cách giúp hương nhang giữ được mùi thơm lâu và chất lượng tốt nhất.",
    content: `
      <p>Việc bảo quản hương nhang tự nhiên rất quan trọng để đảm bảo hương thơm và hiệu quả sử dụng lâu dài. Sau đây là một số lưu ý:</p>
      <ul>
        <li><strong>Bảo quản nơi khô ráo:</strong> Tránh độ ẩm cao vì có thể làm mốc, mất mùi thơm.</li>
        <li><strong>Đựng trong hộp kín:</strong> Sử dụng hộp hoặc túi kín khí để giữ hương thơm và ngăn côn trùng.</li>
        <li><strong>Tránh ánh nắng trực tiếp:</strong> Ánh nắng có thể làm nhang khô giòn, phai mùi.</li>
        <li><strong>Để xa nguồn nhiệt:</strong> Đảm bảo an toàn và giữ chất lượng nhang.</li>
      </ul>
      <p>Áp dụng các cách trên sẽ giúp hương nhang của bạn luôn thơm và sử dụng được lâu hơn.</p>
    `,
    image: "https://i.postimg.cc/brsfbx8x/21.jpg",
    date: "05/04/2025",
    author: "Hoanvngoc",
    readTime: "2 phút đọc",
    tags: ["Bảo quản", "Hương nhang", "Mẹo vặt"]
  },
  {
    id: 6,
    title: "Tác Dụng Của Tinh Dầu Trong Hương Nhang",
    description: "Tinh dầu thiên nhiên mang lại nhiều lợi ích cho sức khỏe và tăng giá trị cho hương nhang.",
    content: `
      <p>Tinh dầu là thành phần quan trọng giúp hương nhang tự nhiên thêm phần độc đáo. Một số tác dụng nổi bật của tinh dầu trong hương nhang:</p>
      <ul>
        <li><strong>Khử mùi:</strong> Giúp không khí trong nhà luôn thơm mát, dễ chịu.</li>
        <li><strong>Thư giãn tinh thần:</strong> Các loại tinh dầu như oải hương, bạc hà, sả giúp giảm căng thẳng, tạo cảm giác thư giãn.</li>
        <li><strong>Kháng khuẩn:</strong> Một số loại tinh dầu còn giúp diệt khuẩn, thanh lọc không khí.</li>
        <li><strong>Tăng giá trị sản phẩm:</strong> Hương nhang kết hợp tinh dầu cao cấp phù hợp làm quà tặng ý nghĩa.</li>
      </ul>
      <p>Hãy lựa chọn các loại tinh dầu tự nhiên, an toàn để sử dụng lâu dài cho sức khỏe.</p>
    `,
    image: "https://i.postimg.cc/SNYpxfgq/22.jpg",
    date: "04/04/2025",
    author: "Hoanvngoc",
    readTime: "2 phút đọc",
    tags: ["Tinh dầu", "Hương nhang", "Sức khỏe"]
  },
  {
    id: 7,
    title: "Hướng Dẫn Làm Hương Nhang Tại Nhà",
    description: "Chỉ với vài bước đơn giản, bạn có thể tự làm hương nhang tự nhiên tại nhà.",
    content: `
      <p>Làm hương nhang tại nhà không chỉ thú vị mà còn đảm bảo an toàn sức khỏe. Tham khảo các bước sau:</p>
      <ol>
        <li><strong>Chuẩn bị nguyên liệu:</strong> Bột gỗ, bã cà phê, tinh dầu yêu thích, nước sạch.</li>
        <li><strong>Trộn đều:</strong> Trộn các nguyên liệu với nhau theo tỉ lệ phù hợp để tạo độ dẻo.</li>
        <li><strong>Tạo hình:</strong> Nặn thành que hoặc hình tròn nhỏ tùy ý.</li>
        <li><strong>Sấy khô:</strong> Để nơi thoáng gió hoặc dùng lò sấy nhẹ cho khô hoàn toàn.</li>
        <li><strong>Bảo quản:</strong> Đựng trong hộp kín, tránh ẩm để dùng dần.</li>
      </ol>
      <p>Chúc bạn thành công với mẻ nhang tự nhiên của riêng mình!</p>
    `,
    image: "https://i.postimg.cc/kMpmCpFf/23.jpg",
    date: "03/04/2025",
    author: "Hoanvngoc",
    readTime: "3 phút đọc",
    tags: ["DIY", "Làm nhang", "Hướng dẫn"]
  },
];