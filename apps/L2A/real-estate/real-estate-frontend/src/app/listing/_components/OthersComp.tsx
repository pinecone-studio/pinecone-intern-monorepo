import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { OthersCompProps } from "@/lib/filter-types"

const OthersComp = ({garage, setGarage, lift, setLift, balcony, setBalcony}:OthersCompProps) =>{
    return (<>
      <div>
              <Label className="block mb-2">Бусад</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2" data-cy="option-garage">
                  <Checkbox id="garage" checked={garage === 'true'} onCheckedChange={(checked) => setGarage(checked ? 'true' : '')} />
                  <Label htmlFor="garage">Дулаан зогсоол</Label>
                </div>
                <div className="flex items-center gap-2" data-cy="option-lift">
                  <Checkbox id="lift" checked={lift === 'true'} onCheckedChange={(checked) => setLift(checked ? 'true' : '')} />
                  <Label htmlFor="lift">Лифт</Label>
                </div>
                <div className="flex items-center gap-2" data-cy="option-balcony">
                  <Checkbox id="balcony" checked={balcony === 'true'} onCheckedChange={(checked) => setBalcony(checked ? 'true' : '')} />
                  <Label htmlFor="balcony">Агуулах</Label>
                </div>
              </div>
            </div>
    </>)
}

export default OthersComp