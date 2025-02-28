import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import bgVideo from "../images/Contact.mp4";

const ContactUs = () => {
  const messages = [
    "Have any questions? Reach out to us!",
    "We're here to help you, contact us anytime!",
    "Let's connect and discuss your needs!",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      {/* Banner with Video Background */}
      <div className="relative w-full h-72 lg:h-96 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="absolute inset-0 flex justify-center items-center text-3xl font-bold text-white">
          Contact Us
        </h1>
      </div>

      {/* Contact Info & Image */}
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap p-8 items-center">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg mb-4 text-yellow-400"
          >
            {messages[currentMessage]}
          </motion.p>
          <p className="text-gray-400">📞 Phone: +880 1234 567 890</p>
          <p className="text-gray-400">📧 Email: contact@example.com</p>
          <p className="text-gray-400">📍 Address: Dhaka, Bangladesh</p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <img
            src="https://i.pinimg.com/736x/a4/18/c2/a418c2fba3a5080f1554bab58ad88f3b.jpg"
            alt="Contact"
            className="w-3/4 lg:w-2/3 rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl mb-4 text-yellow-400">Send us a message</h2>
        <input type="text" placeholder="Name" className="w-full p-2 mb-4 bg-gray-700 text-white rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 bg-gray-700 text-white rounded" />
        <textarea placeholder="Message" className="w-full p-2 mb-4 bg-gray-700 text-white rounded h-24"></textarea>
        <button className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600">Send Message</button>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-4 my-6">
        <a href="#" className="text-yellow-400 hover:text-white flex items-center space-x-2">
          <FaFacebook /> <span>Facebook</span>
        </a>
        <a href="#" className="text-yellow-400 hover:text-white flex items-center space-x-2">
          <FaTwitter /> <span>Twitter</span>
        </a>
        <a href="#" className="text-yellow-400 hover:text-white flex items-center space-x-2">
          <FaLinkedin /> <span>LinkedIn</span>
        </a>
      </div>

      {/* Google Map */}
      <div className="w-full h-64">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9026820927386!2d90.39484541498158!3d23.750862084589204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8902d1d9e39%3A0x1056c49560db176!2sDhaka!5e0!3m2!1sen!2sbd!4v1634196226345!5m2!1sen!2sbd"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
