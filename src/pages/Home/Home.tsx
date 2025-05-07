import Banner from "./Banner";
import FAQ from "./FAQ";
import FeaturedProducts from "./FeaturedProducts";
import LatestNews from "./LatestNews";
import NewsLetter from "./NewsLetter";
import OfferProducts from "./OfferProduct";
import Testimonial from "./Testimonial";
import WhyChoose from "./WhyChoose";

const Home = ()=>{
    return (
        <div>
            <div className="">
            <Banner></Banner>
            </div>
            <FeaturedProducts></FeaturedProducts>
            <OfferProducts></OfferProducts>
            <Testimonial></Testimonial>
            <WhyChoose></WhyChoose>
            <FAQ></FAQ>
            <LatestNews></LatestNews>
            <NewsLetter></NewsLetter>

        </div>
    )
}
export default Home;