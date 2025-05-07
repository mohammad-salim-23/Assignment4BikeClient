
import repair from "../../assets/images/BikeRepair.jpg";
import customBuild from "../../assets/images/CustomBuild.jpg";
import tuneUp from "../../assets/images/BikeMaintainance.jpg";
// import banner from "../../assets/images/support.jpg"
const services = [
  {
    title: "Bike Repair",
    description: "Professional bike repair with genuine parts and trained mechanics.",
    image: repair, 
  },
  {
    title: "Custom Bike Build",
    description: "Build your dream bike with our customization service.",
    image: customBuild,
  },
  {
    title: "Tune-Up & Maintenance",
    description: "Regular maintenance to keep your bike in top condition.",
    image: tuneUp,
  },
];

const Service = () => {
  return (
    <div className="mt-4">
      {/* Banner */}
      <div
        className="h-[200px] bg-opacity-50 text-center"
        // style={{ backgroundImage: `url(${banner})` }} // Update with your banner
      >
        <h1 className="text-orange-400 text-4xl font-bold   px-6 py-3 rounded-lg">
          Our Services
        </h1>
        <p className="mt-4 text-black   px-4 py-2 rounded-md text-lg">
        Explore a wide range of professional bike services, including expert repairs, regular maintenance, custom upgrades, performance tuning, and safety inspections — all designed to keep your bike in perfect condition and ready for every ride.
  </p>
      </div>

      {/* Service List */}
      <div className="py-12 px-4 md:px-20 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
