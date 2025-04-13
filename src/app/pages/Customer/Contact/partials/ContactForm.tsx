import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onFinish = (values: FormData & { captchaValue: string | null }) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", values);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setCaptchaValue(null);
      
      // Reset reCAPTCHA
      const recaptchaInstance = document.querySelector<HTMLIFrameElement>('.g-recaptcha iframe');
      if (recaptchaInstance) {
        const src = recaptchaInstance.src;
        recaptchaInstance.src = '';
        recaptchaInstance.src = src;
      }
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-center text-green-600 uppercase">
          GỬI CHO CHÚNG TÔI YÊU CẦU CỦA BẠN
        </h3>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!captchaValue) {
            alert("Vui lòng xác nhận bạn không phải là robot");
            return;
          }
          onFinish({...formData, captchaValue});
        }}
      >
        <div>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ và tên"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        
        <div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        
        <div>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        
        <div>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Tiêu đề"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        
        <div>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Nội dung"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-green-500 resize-none"
            required
          />
        </div>
        
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual site key in production
            onChange={handleCaptchaChange}
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting || !captchaValue}
            className={`w-full py-2 text-white font-medium transition-colors ${
              isSubmitting || !captchaValue 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;