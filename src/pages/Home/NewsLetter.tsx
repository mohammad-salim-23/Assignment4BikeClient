/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { useSubscribeToNewsLetterMutation } from "../../redux/features/newsletter/newsLetter";

// Update path if needed
import BikeNews from "../../../src/assets/images/BikeNews.jpg"; 

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [subscribeToNewsLetter] = useSubscribeToNewsLetterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }

    try {
      const res: any = await subscribeToNewsLetter(email);
      if (res?.data?.success) {
        setMessage({ type: "success", text: "Thanks for subscribing!" });
        setEmail("");
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error(res.error.data.message || "Subscription failed.");
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.message || "Something went wrong.",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div
      className="relative shadow-lg overflow-hidden my-10"
      style={{
        backgroundImage: `url(${BikeNews})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-primaryColor/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-white py-20 px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 text-white p-3 rounded-full">
              <FiMail size={28} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">
                Sign up for newsletters
              </h2>
              <p className="text-sm sm:text-base">
                Be the First to Know. Sign up for newsletter today.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-96 px-4 py-3 rounded-lg text-black focus:outline-none border-2 border-white focus:border-secondaryColor transition-colors"
            required
          />
          <button
            type="submit"
            className="bg-secondaryColor hover:bg-orange-600 transition-colors px-6 py-3 rounded-lg text-black font-bold uppercase cursor-pointer"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            } text-sm sm:text-base`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
