import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TypeCompProps } from "@/lib/typescripts";


const TypeComp = ({type, setType}:TypeCompProps)=>{
    const selectedTypes = type?.split(',') ?? [];

    const toggleType = (value: string) => {
        const current = type?.split(',').filter(Boolean) ?? [];
        const updated = current.includes(value)
         ? current.filter((t) => t !== value)
         : [...current, value];
         setType(updated.join(','));
     }; 
return (<>
      <div className='mb-[-20px]'>Төрөл</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2" data-cy="type-apartment"> 
                <Checkbox id="apartment" checked={selectedTypes.includes("APARTMENT")} onCheckedChange={() => toggleType("APARTMENT")}/>
                <Label htmlFor="apartment">Байр</Label>
              </div>
              <div className="flex items-center gap-2" data-cy="type-house">
                <Checkbox id="house" checked={selectedTypes.includes("HOUSE")} onCheckedChange={() => toggleType("HOUSE")}/>
                <Label htmlFor="house">Хаус</Label>
              </div>
              <div className="flex items-center gap-2" data-cy="type-office">
                <Checkbox id="office" checked={selectedTypes.includes("OFFICE")} onCheckedChange={() => toggleType("OFFICE")}/>
                <Label htmlFor="office">Оффис</Label>
              </div>
            </div>
    </>)
}
export default TypeComp