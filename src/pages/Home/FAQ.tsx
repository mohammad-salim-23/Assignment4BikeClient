import React from "react";
import { Disclosure } from "@headlessui/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What types of bikes do you offer?",
    answer:
      "We offer a wide range of bikes including mountain bikes, road bikes, electric bikes, and city bikes tailored to various riding styles and preferences.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Typically, delivery takes 3–7 business days depending on your location. You'll receive tracking updates once your order is shipped.",
  },
  {
    question: "Can I return a bike if I’m not satisfied?",
    answer:
      "Yes, we offer a hassle-free return policy within 7 days of delivery. Make sure the bike is unused and in original packaging.",
  },
  {
    question: "Do you provide warranty on bikes?",
    answer:
      "Yes, all bikes come with a 1-year manufacturer warranty covering frame and components. Terms vary by brand.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via live chat, email, or our support hotline available 24/7. We’re here to help you anytime!",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Got questions? We’ve got answers! Click on a question below to reveal more information.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-white rounded-xl shadow">
                  <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-800 font-medium hover:bg-orange-50 transition duration-300">
                    <span>{faq.question}</span>
                    {open ? (
                      <Minus className="w-5 h-5 text-orange-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-orange-500" />
                    )}
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
