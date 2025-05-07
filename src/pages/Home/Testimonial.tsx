import React from "react";

interface Testimonial {
  name: string;
  message: string;
  location: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rakib Hossain",
    message: "I bought a bike from here and the service was excellent. Delivery was on time and the quality of the bike was outstanding.",
    location: "Dhaka, Bangladesh",
    image: "https://i.pinimg.com/736x/57/af/ed/57afed488dd52ce8b3e3819f30b947c0.jpg",
  },
  {
    name: "Sharmin Akter",
    message: "Shopping from this website is really easy and the support team is super helpful. Highly recommended!",
    location: "Chittagong, Bangladesh",
    image: "https://i.pinimg.com/736x/e2/92/26/e2922682eadda7a940be55dc988a13ab.jpg",
  },
  {
    name: "Jubayer Rahman",
    message: "I bought a bike for my younger brother. Both the product and packaging were great. Thank you!",
    location: "Sylhet, Bangladesh",
    image: "https://i.pinimg.com/736x/4f/69/7e/4f697e87177f74d36fcd3ce4de11c086.jpg",
  },
];

const Testimonial: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto ">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-primaryColor p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            {testimonial.image && (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
              />
            )}
            <p className="text-white italic mb-3">"{testimonial.message}"</p>
            <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
            <p className="text-sm text-secondaryColor">{testimonial.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
