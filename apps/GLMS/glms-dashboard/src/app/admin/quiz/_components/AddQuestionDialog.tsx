import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from 'lucide-react';


export const AddQuestionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><CirclePlus className="h-4 w-4 mr-2"/>Add Question</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="question">Question</Label>
      <Input type="question" id="question" placeholder="" className="focus-visible:ring-0"/>
    </div>
    <div>
        <div className="flex justify-between">
        <h3>Options</h3>
        <p>Correct</p>
        </div>
        <div className="flex flex-col gap-2">
            {/* A */}
          <div className="flex items-center gap-4">
            <Label htmlFor="a" className="text-right">
              A
            </Label>
            <Input
              id="a"
              className="col-span-3 focus-visible:ring-0"
            />
             <Checkbox id="a" />
            </div>
           </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
