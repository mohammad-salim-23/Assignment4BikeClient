
import Marquee from "react-fast-marquee";
const newsData = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/fd/6a/92/fd6a9223e1cf388fa6d79ad73559b76f.jpg",
    title: "Yamaha Golf-Car Unveils UMAX® Li, Pilotcar® Partnership, and Joyride™ Platform at 2025 PGA Show®",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/3f/d8/d4/3fd8d4ed90a31083292338543dc33d2d.jpg",
    title: "Honda Motor Collaborated on Original Sci-Fi Anime Series, 'Tokyo Override'",
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/a1/eb/5b/a1eb5b0862db418466c3d3ce29d01ed8.jpg",
    title: "Hero, Roush and Regulator Marine Make Waves During 2024 SEMA Show® with World’s First Hydrogen-Powered...",
  },
  {
    id: 4,
    image: "https://i.pinimg.com/736x/4e/40/35/4e4035a074d5685d504b4bdbff6f97c1.jpg",
    title: "Yamaha's New Electric Motorcycle Concept Showcased at Tokyo Motor Show 2024",
  },
];

const LatestNews = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Latest News</h2>

      <Marquee gradient={false} speed={50}>
        {newsData.map((news) => (
          <div key={news.id} className="mx-4 space-y-3 w-64">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold text-center">{news.title}</h3>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LatestNews;
