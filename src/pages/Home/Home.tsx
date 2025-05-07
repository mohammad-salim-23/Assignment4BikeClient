import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import LatestNews from "./LatestNews";
import NewsLetter from "./NewsLetter";
import OfferProducts from "./OfferProduct";

const Home = ()=>{
    return (
        <div>
            <div className="">
            <Banner></Banner>
            </div>
            <FeaturedProducts></FeaturedProducts>
            <OfferProducts></OfferProducts>
            <LatestNews></LatestNews>
            <NewsLetter></NewsLetter>

        </div>
    )
}
export default Home;