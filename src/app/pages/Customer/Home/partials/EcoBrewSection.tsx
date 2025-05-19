import { Button } from "antd";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imageList = [
  "https://s3-alpha-sig.figma.com/img/a352/5e78/d94d1fec3ea9eeb6860060c967c2fc82?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gQwb4L3wTVNvCyjDKh8sqEe1J-Gr5nre7O1f2IhIPPQ5oXLvGl6LzR3ug~NgYDcIe-iaBx5ZUkK7qKGUmUsuJYRuKebx2HSaSPHG2ITL3iaV-t4f~y4a~M0M45zsa9vdX14YsxRdGvTrgBFSttJ6YIk8jDfzgK2Gy1kSx~H7xG7PwTmji6SHbVP5hltP6ysPfJaMfbuDCKY0qWzuj7h6wU6to5nTHw6~9dVE~bscQK9BbSY5Z~zALoedUcr7wrBlrugAJoJfsDFtiY8dRg~vpBfQfGP953BKePEvWdpVNh2QpGVyzoMVplohxUgaDpiOTX979Fx3cuHUWL8sWasuWg__",
  "https://s3-alpha-sig.figma.com/img/481c/5868/0c382c2ce480a25a111391a9f574166b?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VKoagXh9Sq6CjtkFTC9AD0Yab~0q7mzrW8psuHditTdONAatDdLIgT7ZfTxfYubpI2Vv5SDCHxYKswXs9OaCUZ57rik4RoLEDRIsHRvP-bOZ5NK30fpzk5CY9hqyyGFxSu49dS9-RZireJUB3xnQA3WdnYRT50Fw8HYy~V8O0QeiMgAphfExRHvRHV8h3tpiXRdXxqF1B1a23MATYWzq4fbtqrdZ7nMTt9goLfFdt6Twmc2cjsXUvOPrqa9esHgl~lkFsIX1QMq0lIH~dSooNPLyiZaeGRdPP~kVp8I~1TZbNHJrp8KRnJVfzNg9uDS84PRTlEkWDwxndQEOJMRjwA__",
  "https://s3-alpha-sig.figma.com/img/0e98/cff6/d3fa866d88dd18a78fd25d878f9fdc5b?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TRQU90M6XYAyCWbiE4PFFZ0MZypOF1CiQ0-~HSMpduOq2rprG7Jhy25LzoLCxM7cwqLhUif2wEp3U6usL0kTVQNzasROVpMX1Xjcnu6BXkkcI4csj~NB7tMObu5srNyLIHW9Y~QoTSuApw8-nNBlzgOQ2mH3VM9uCTRxn1FO92K1-VHbei8rCvsWybIt12PtSGQDRiF7u5V437u8ZRWWbh289arw7Uqxu8m2EwJl6Gs0BdRFGNiaOcqDjqa6ySI4HurxrWuFsrbRuHuoGyKL5eyb~qRGsNx9Upm8IxHnpMjOZ4PmCMC3rjfkwiKIJH92YFSOk1k-R05c4itX6w92gg__",
];

const EcoBrewSection = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col md:flex-row items-center gap-8 mx-0 md:mx-6">
          {/* Left content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="mb-4">
              {/* <img 
                src="/assets/images/fbc-logo.png" 
                alt="FBC Logo" 
                className="h-16 md:h-20 w-auto mb-4"
              /> */}
              <h2 className="text-8xl md:text-7xl font-bold">
                <span className="text-[#8B7156]">ECO BREW</span> 
                <br />
                Cycle
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              EcoBrewCycle là quy trình cà phê thơm ngon, sạch và trách nhiệm với môi trường. Thụ quân tái sử dụng các phế phẩm từ lý trình chế biến không bỏ chất, tận dụng mọng lại hương thơm nhu mịn, giúp thư giãn và giảm căng thẳng, cho sự khâng phí trong nên xanh đẹp, phổi bạn thoát mảt cỏn tắm đều là sống xanh, trở lại môi trong hành trình dạo về môi trường.
            </p>
            
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/products')}
                className="bg-transparent hover:bg-transparent border-[#8B7156] text-[#8B7156] px-8 rounded-full"
              >
                Xem chi tiết
              </Button>
            </div>

            <div className="pt-6">
              <img 
                src="https://s3-alpha-sig.figma.com/img/4977/7062/63928f8cfe1a21792739613facf28bf6?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HpOiYWEkNLB8mLPPBKy39aoh47yuWdkZr~-eHrm9oUwvhhcQM6mTtNfzS5iQFEBHlGtMvrvWTmk~1I9Z1nAVOTF2KIVwFotYbJkKCOWTQTPPla6SMGROCvTdXN37cLRUBZfpn8pifx4RiwWTvytkGSgCsvGpHa97m27yIdrG~0BIduyyFtTQ7-CeTUsoZHJ1NSNwE4NzuLwwyLOYGx1ISuR-TCheXBiGxhR~CU0qEtFH3K~x28ftIfTJ1X2vchNwCL52Fx1ol-TSWIA-qzOd~eYd7KdUIWjmNqTVyrC711Xwph9LTW~HHYVVjOE2U0pJElcrDGJWE2ob0FsaW5MqBA__" 
                alt="Leaf decoration" 
                className="h-16 opacity-80"
              />
            </div>
          </div>

          {/* Right slider image */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={imageList[currentImageIndex]}
                  alt="EcoBrew showcase"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoBrewSection;
