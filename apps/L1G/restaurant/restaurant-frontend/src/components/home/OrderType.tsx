'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
type Props = {
  isClicked: boolean;
};
const OrderType = ({ isClicked }: Props) => {
  return (
    isClicked && (
      <Dialog>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Захиалгаа хаана сууж эсэх</DialogTitle>
            <DialogDescription>Доорх нэгийг сонгоод баталгаажуулна уу.</DialogDescription>
          </DialogHeader>
          <RadioGroup>
            <div className="flex items-center space-x-3">
              <RadioGroupItem id="dinein" value="dine_in" />
              <Label htmlFor="dinein">Эндээ идэх</Label>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <RadioGroupItem id="takeaway" value="takeaway" />
              <Label htmlFor="takeaway">Аваад явах</Label>
            </div>
          </RadioGroup>
          <DialogFooter>
            <Button variant="secondary">Болих</Button>
            <Button>Батлах</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default OrderType;
