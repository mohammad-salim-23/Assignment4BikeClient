import React from "react";
import { FaTruck, FaCheckCircle, FaHeadset, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck className="text-orange-500 text-3xl mb-3" />,
    title: "Fast Delivery",
    description: "We ensure quick and safe delivery to your doorstep across the country.",
  },
  {
    icon: <FaCheckCircle className="text-orange-500 text-3xl mb-3" />,
    title: "Verified Products",
    description: "All bikes are 100% verified and quality tested before shipping.",
  },
  {
    icon: <FaShieldAlt className="text-orange-500 text-3xl mb-3" />,
    title: "Secure Payment",
    description: "We offer secure payment options including SSLCommerz, cards, and mobile banking.",
  },
  {
    icon: <FaHeadset className="text-orange-500 text-3xl mb-3" />,
    title: "24/7 Support",
    description: "Our support team is always ready to help you with any questions or issues.",
  },
];

const WhyChoose: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        We provide the best online experience for bike lovers. Here's why our customers trust us:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition duration-300"
          >
            {feature.icon}
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
