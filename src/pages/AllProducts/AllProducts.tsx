import { useGetAllBikesQuery } from "../../redux/features/bike/bikeManagement.api"

const AllProducts = ()=>{
    const {data} = useGetAllBikesQuery(undefined);
    console.log(data);
    return (
        <div>
       <h2>All Bike</h2>
        </div>
    )
}
export default AllProducts;