import { Label } from "@/components/ui/label"

const PriceComp = ()=>{
    return(
        <>
            <div>
              <Label className="block mb-2">Үнэ</Label>
              <select className="w-full border rounded px-2 py-1 text-sm" data-testid="price-min" data-cy="price-min">
                <option>Доод</option>
              </select>
              <select className="w-full mt-2 border rounded px-2 py-1 text-sm" data-testid="price-max" data-cy="price-max">
                <option>Дээд</option>
              </select>
            </div>
        </>
    )
}
export default PriceComp