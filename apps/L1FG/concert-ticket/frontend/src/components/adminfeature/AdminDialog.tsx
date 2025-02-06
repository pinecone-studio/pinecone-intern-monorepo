import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from './RangeDatePicker';
import { FormData } from './concert-type';
import { useConcertForm } from '../admincontext/DialogContext';

interface AdminDialogProps {
  onSubmit?: (_data: FormData) => void;
}
export const AdminDialog = ({ onSubmit: _onSubmit }: AdminDialogProps) => {
  const { formData, addArtist, handleArtistChange, handleChange, removeArtist, handleDatesSelect, handleSubmit } = useConcertForm();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-black" variant="outline">
          Тасалбар нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen overflow-y-scroll pt-5 pb-5 pr-5 pl-5 ">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Тасалбар нэмэх</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 pt-1">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="concertname" className="text-right">
                Тоглолтын нэр
              </Label>
              <Input id="concertname" placeholder="Нэр оруулах" value={formData.concertname} onChange={handleChange} className="col-span-3" />
            </div>
            <div>
              <Label htmlFor="concertPhoto"></Label>
              <Input type="file" id="concertPhoto" name="concertPhoto" placeholder="Зураг оруулах" className="col-span-3 h-[90px] customFileInput" onChange={handleChange} />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="concertDescription" className="text-right">
                Хөтөлбөрийн тухай
              </Label>
              <Input id="concertDescription" placeholder="Дэлгэрэнгүй мэдээлэл" value={formData.concertDescription} onChange={handleChange} className="col-span-3  pr-3 pl-3 " />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="artistName" className="text-right">
                Үндсэн артистын нэр
              </Label>
              {formData.artistName.map((artist, index) => (
                <div key={index} className="flex w-full gap-2">
                  <Input id={`artistName-${index}`} placeholder="Артистын нэр" value={artist} onChange={(e) => handleArtistChange(index, e.target.value)} className="col-span-3 pt-1 pb-1 pr-3 pl-3" />
                  {index > 0 && (
                    <Button type="button" onClick={() => removeArtist(index)} className="bg-red-500 hover:bg-red-600 text-white px-3">
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={addArtist} className="bg-white text-black border hover:bg-slate-300">
                Бусад артист нэмэх +
              </Button>
            </div>
            <div className="flex items-start gap-2">
              <div>
                <Label htmlFor="date" className="text-right">
                  Тоглолтын өдөр сонгох
                </Label>
                <DatePicker selectedDates={formData.dates} onDatesSelect={handleDatesSelect} />
              </div>
              <div>
                <Label htmlFor="time" className="text-right">
                  Тоглолтын цаг сонгох
                </Label>
                <Input type="time" id="time" placeholder="Цаг сонгох" value={formData.time} onChange={handleChange} className="col-span-3 pt-1 pb-1 pr-3 pl-3 w-[231px] " />
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-2 items-start">
                <Label htmlFor="vipticket" className="text-right">
                  VIP
                </Label>
                <Input
                  id="vipticketquantity"
                  placeholder="Нийт тоо хэмжээ"
                  type="number"
                  value={formData.vipticketquantity}
                  onChange={handleChange}
                  className="col-span-3 pt-1 pb-1 pr-3 pl-3 "
                  data-testid="vipticketquantity"
                />
                <Input
                  id="vipticketprice"
                  placeholder="Нэгжийн үнэ"
                  type="number"
                  value={formData.vipticketprice}
                  onChange={handleChange}
                  className="col-span-3 pt-1 pb-1 pr-3 pl-3"
                  data-testid="vipticketprice"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <Label htmlFor="regularticket" className="text-right">
                  Regular
                </Label>
                <Input id="regularticketquantity" placeholder="Нийт тоо хэмжээ" value={formData.regularticketquantity} onChange={handleChange} className="col-span-3 pt-1 pb-1 pr-3 pl-3 " />
                <Input id="regularticketprice" placeholder="Нэгжийн үнэ" value={formData.regularticketprice} onChange={handleChange} className="col-span-3 pt-1 pb-1 pr-3 pl-3" />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <Label htmlFor="openfieldticket" className="text-right">
                  Задгай
                </Label>
                <Input id="openfieldticketquantity" placeholder="Нийт тоо хэмжээ" value={formData.openfieldticketquantity} onChange={handleChange} className="col-span-3 pt-1 pb-1 pr-3 pl-3 " />
                <Input id="openfieldticketprice" placeholder="Нэгжийн үнэ" value={formData.openfieldticketprice} onChange={handleChange} className="col-span-3 pt-1 pb-1 pr-3 pl-3" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="mt-2">
              <Button type="submit">Үүсгэх</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
