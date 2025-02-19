import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { id: 1, name: "Alice", text: "Great platform for discussions!", rating: 5 },
  { id: 2, name: "Bob", text: "User-friendly and well-designed.", rating: 4 },
  { id: 3, name: "Charlie", text: "Helpful community and responsive UI.", rating: 5 },
  { id: 4, name: "David", text: "Could use some more features, but overall great!", rating: 4 },
  { id: 5, name: "Emma", text: "Fast and efficient, love it!", rating: 5 },
  { id: 6, name: "Frank", text: "Easy to use, great experience!", rating: 4 },
  { id: 7, name: "Grace", text: "Best forum I've used in a while!", rating: 5 },
  { id: 8, name: "Hannah", text: "Impressive work, very intuitive!", rating: 5 },
  { id: 9, name: "Ian", text: "Would love more customization options.", rating: 4 },
  { id: 10, name: "Jack", text: "Superb! Highly recommended!", rating: 5 },
];

export default function ReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4 border rounded-lg shadow-md ">
      <motion.div
        key={reviews[currentIndex].id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-xl font-semibold">{reviews[currentIndex].name}</h2>
        <p className="text-gray-600">{reviews[currentIndex].text}</p>
        <p className="text-yellow-500">{"⭐".repeat(reviews[currentIndex].rating)}</p>
      </motion.div>
      <div className="flex justify-between w-full mt-4">
        <button onClick={prevReview} className="p-2 bg-gray-200 rounded-full">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextReview} className="p-2 bg-gray-200 rounded-full">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
