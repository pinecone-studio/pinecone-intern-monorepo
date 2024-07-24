/* eslint-disable no-unused-vars */
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FieldWithCheckboxPropsTypes {
  label: string
  value: string
  dataTestid: string
  onChange: (newValue: string) => void
}

export const FieldWithCheckbox = ({label, value, onChange, dataTestid}: FieldWithCheckboxPropsTypes) => {
    return (
        <div className="flex items-center gap-4">
        <Label htmlFor={label} className="text-right">
          {label}
        </Label>
        <Input
          id={label}
          name={label}
          value={value}
          onChange={(e)=>onChange(e.target.value)}
          data-testid={dataTestid}
          className="col-span-3 focus-visible:ring-0"
          aria-label={label}
        />
         <Checkbox id={label} />
        </div>
    )
}