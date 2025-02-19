import React from "react";
import { motion } from "framer-motion";

const ForumTrivia = () => {
  const trivia = [
    {
      fact: "The MERN stack enables full-stack JavaScript development, allowing seamless integration between frontend and backend.",
    },
    {
      fact: "MongoDB uses a flexible, document-based structure that makes it ideal for forums with dynamic user-generated content.",
    },
    {
      fact: "React's virtual DOM boosts performance by reducing unnecessary re-renders, making forums more responsive.",
    },
    {
      fact: "Node.js handles thousands of concurrent connections efficiently, making it perfect for real-time forums.",
    },
    {
      fact: "Express.js simplifies server-side logic with minimal boilerplate code, enhancing forum backend efficiency.",
    },
    {
      fact: "JWT authentication ensures secure access control, protecting user data in forum applications.",
    },
    {
      fact: "React Hook Form optimizes form handling, reducing re-renders and improving performance in forum comment sections.",
    },
    {
      fact: "MongoDB aggregation enables advanced analytics, helping admins monitor forum engagement and trends.",
    },
    {
      fact: "Tailwind CSS provides utility-first styling, ensuring a sleek and responsive design for forums.",
    },
    {
      fact: "WebSockets enable real-time notifications, enhancing user engagement in live discussions and updates.",
    },
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center text-[#60a5fa] mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MERN Forum Trivia & Fun Facts
        </motion.h2>
        <ul className="space-y-4">
          {trivia.map((item, index) => (
            <motion.li
              key={index}
              className="p-4 rounded-lg shadow hover:shadow-lg transition bg-gray-100"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-lg text-gray-700 font-medium">{item.fact}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ForumTrivia;
