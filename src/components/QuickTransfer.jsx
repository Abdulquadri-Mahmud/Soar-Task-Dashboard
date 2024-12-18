import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // For navigation arrows
import "swiper/css";
import "swiper/css/navigation";
import { FaAngleRight } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export default function QuickTransfer() {
  const users = [
    { id: 1, name: "Livia Bator", role: "CEO", img: "https://i.pravatar.cc/60?img=1" },
    { id: 2, name: "Randy Press", role: "Director", img: "https://i.pravatar.cc/60?img=2" },
    { id: 3, name: "Workman", role: "Designer", img: "https://i.pravatar.cc/60?img=3" },
    { id: 4, name: "Alex Hanks", role: "Manager", img: "https://i.pravatar.cc/60?img=4" },
    { id: 5, name: "Samantha Grey", role: "Engineer", img: "https://i.pravatar.cc/60?img=5" },
  ];

  const swiperRef = useRef(null);

  // State for modal visibility
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle send button click
  const handleSendClick = () => {
    setModalVisible(true);
    // Automatically close the modal after 3 seconds
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  };

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      const swiperInstance = swiperRef.current.swiper;

      // Custom button functionality
      const customNextButton = document.querySelector(".custom-next-button");
      if (customNextButton) {
        customNextButton.addEventListener("click", () => {
          swiperInstance.slideNext();
        });
      }

      // Clean up event listeners on component unmount
      return () => {
        if (customNextButton) {
          customNextButton.removeEventListener("click", () => swiperInstance.slideNext());
        }
      };
    }
  }, []);

  return (
    <div className="w-full md:w-[45%]">
      <h3 className="text-gray-600 font-semibold mb-4">Quick Transfer</h3>
      <div className="bg-white relative px-6 py-10 rounded-2xl shadow-md">
        {/* Users */}
        <div className="max-w-[80%]">
          <Swiper ref={swiperRef} modules={[Navigation]} spaceBetween={10} slidesPerView={3} className="relative">
            {users.map((user, index) => (
              <SwiperSlide key={user.id}>
                <div className="flex flex-col items-center">
                  <img src={user.img} alt={user.name} className="w-14 h-14 rounded-full object-cover mb-1" />
                  <p className={`text-sm pb-1 ${index === 0 ? "font-bold" : "font-medium"}`}>
                    {user.name}
                  </p>
                  <p className="text-xs text-blue-900 font-bold">{user.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Next Button */}
        <div className="custom-next-button h-10 w-10 rounded-full shadow-lg absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 flex justify-center items-center hover:bg-gray-300 transition-all duration-200 cursor-pointer z-10">
          <FaAngleRight className="text-black text-base" />
        </div>

        {/* Amount Input and Send Button */}
        <div className="flex items-center gap-4 mt-10">
          <p className="text-blue-950 text-sm">Write amount</p>
          <div className="flex -space-x-4">
            <input type="text" placeholder="$525.50" className="px-4 py-2 border border-zinc-20 bg-zinc-200 rounded-l-full w-[100%] border2 placeholder:text-sm place
              rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue- placeholder:text-blue-900"/>
            <button onClick={handleSendClick}
              className="bg-black rounded-full text-white px-4 w-[120px] py-2 font-medium flex items-center gap-2 hover:bg-gray-800">
              Send <FiSend />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-green-600">Success!</h2>
            <p className="text-gray-700 mt-2">The amount has been sent successfully.</p>
            <button onClick={() => setModalVisible(false)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-black transition-all">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
