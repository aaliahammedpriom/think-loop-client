import React from "react";
import { motion } from "framer-motion";

const Legal = () => {
  const legalItems = [
    {
      title: "Terms of Use",
      content: "By using our services, you agree to these terms and conditions. Please read them carefully before accessing or using our platform. Any use of our service constitutes your acceptance of these terms. We may update these terms periodically, and you should review them regularly.",
    },
    {
      title: "Privacy Policy",
      content: "This privacy policy explains how we collect, store, and protect your personal information. We take your privacy seriously and ensure that your data is treated with the utmost care and respect. By using our services, you consent to the collection and use of your data as described below.",
    },
    {
      title: "Cookie Policy",
      content: "We use cookies to enhance your experience on our website. Cookies are small files that are placed on your device when you visit our platform. These cookies help us analyze usage patterns, provide personalized content, and improve our services.",
    },
    {
      title: "Disclaimer",
      content: "The information provided on this platform is for informational purposes only. While we strive to ensure the accuracy and completeness of the information, we make no guarantees regarding the reliability of any content. We are not responsible for any actions you take based on the information provided here.",
    },
    {
      title: "Changes to Legal Documents",
      content: "We may update or revise our legal documents at any time. Any changes will be posted on this page, and you are encouraged to review the documents regularly. Your continued use of the services after the changes have been posted signifies your acceptance of the new terms.",
    }
  ];

  return (
    <section className="py-16 bg-white rounded-lg mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-[#60a5fa] mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Legal
        </motion.h2>
        <div className="space-y-6">
          {legalItems.map((item, index) => (
            <motion.details
              key={index}
              className="group border border-[#60a5fa] rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <summary className="font-semibold text-xl group-hover:cursor-pointer group-hover:text-primary">
                {item.title}
              </summary>
              <p className="mt-2 text-gray-700 text-lg">{item.content}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Legal;
