import React from "react";
import { motion } from "framer-motion";

const ForumFaq = () => {
  const faqs = [
    {
      question: "What is the MERN Forum Project?",
      answer: "The MERN Forum Project is a platform for engaging discussions through posted messages, built using the MERN stack with features like user authentication, real-time updates, and admin controls."
    },
    {
      question: "How do I create a post?",
      answer: "You can create a post by logging in, navigating to the dashboard, and clicking on 'Add Post.' Fill in the required details and submit your post."
    },
    {
      question: "Do I need an account to participate?",
      answer: "Yes, you must register or log in to create posts, comment, and interact with the forum."
    },
    {
      question: "How can I report inappropriate content?",
      answer: "If you come across inappropriate content, you can report it by clicking the 'Report' button on the post or comment. Admins will review and take action accordingly."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use JWT authentication, MongoDB security best practices, and environment variables to ensure data protection."
    }
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
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              className="group  border border-[#60a5fa] rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <summary className="font-semibold text-lg group-hover:cursor-pointer group-hover:text-primary">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForumFaq;
