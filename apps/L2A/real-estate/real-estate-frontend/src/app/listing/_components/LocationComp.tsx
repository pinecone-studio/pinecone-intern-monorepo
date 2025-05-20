import { Label } from "@/components/ui/label"
import { useGetPostsQuery } from "@/generated"
import { LocationCompProps } from "@/lib/filter-types"

const LocationComp = ({setCity, setDistrict }:LocationCompProps) => {
    const {data} = useGetPostsQuery()
    const cities = data?.getPosts?.map((item)=> item?.location?.city).filter((city):city is string=>Boolean(city))
    const uniqueCity = Array.from(new Set(cities))
    const districts = data?.getPosts?.map((item)=> item?.location?.district).filter((district):district is string=>Boolean(district))
    const uniqueDistrict = Array.from(new Set(districts))
    return (
        <>
             <div>
              <Label className="block mb-2">Байршил</Label>
              <select onChange={(e)=>setCity(e.target.value)} defaultValue="" className="w-full mb-2 border rounded px-2 py-1 text-sm" data-testid="select-city" data-cy="select-city">
                 <option value="">Бүх хотууд</option>
                 {uniqueCity?.map((item,index)=><option key={index}>{item}</option>)} 
              </select>
              <select onChange={(e)=>setDistrict(e.target.value)} defaultValue="" className="w-full border rounded px-2 py-1 text-sm" data-testid="select-district" data-cy="select-district">
                 <option value="" >Бүх дүүрэг</option>
                 {uniqueDistrict?.map((item,index)=><option key={index}>{item}</option>)}
              </select>
            </div>
        </>
    )
}
export default LocationComp