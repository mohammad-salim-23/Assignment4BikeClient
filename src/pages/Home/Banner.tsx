import "../../CSSdesign/All.css";

const Banner = () => {
  return (
    <div className="carousel w-full img-style mt-12">
      <div id="slide1" className="carousel-item relative w-full">
        <img 
          src="https://i.pinimg.com/736x/58/3c/9f/583c9fb3ec2d0a3933941bde8403156c.jpg"
          className="w-full rounded-xl object-cover"
          alt="Bike Shop Banner"
        />
        <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#1E3A8A] to-[rgba(255, 255, 255, 0.7)]">
          <div className="text-white space-y-6 p-6 md:pl-12 w-3/4 md:w-1/2">
            <h2 className="text-3xl md:text-6xl font-bold">
              Discover Your Perfect Ride 🚴‍♂️
            </h2>
            <p className="text-lg md:text-2xl">
              Explore top-quality bikes and accessories for every adventure.
            </p>
            <button className="btn bg-secondaryColor text-lg px-6 py-2 rounded-lg shadow-md">
              Shop Now
            </button>
          </div>
        </div>
        <div className="absolute flex justify-between items-center w-full px-4 bottom-4">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      
      <div id="slide2" className="carousel-item relative w-full">
        <img 
          src="https://i.pinimg.com/736x/4e/eb/2e/4eeb2e1c7862da649ea3edf086380c48.jpg"
          className="w-full rounded-xl object-cover"
          alt="Bike Shop Banner"
        />
        <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#1E3A8A] to-[rgba(255, 255, 255, 0.7)]">
          <div className="text-white space-y-6 p-6 md:pl-12 w-3/4 md:w-1/2">
            <h2 className="text-3xl md:text-6xl font-bold">
              Unleash Your Cycling Passion 🌍
            </h2>
            <p className="text-lg md:text-2xl">
              Premium bikes designed for every terrain and adventure.
            </p>
            <button className="btn text-lg px-6 py-2 rounded-lg shadow-md bg-secondaryColor">
              Shop Now
            </button>
          </div>
        </div>
        <div className="absolute flex justify-between items-center w-full px-4 bottom-4">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
