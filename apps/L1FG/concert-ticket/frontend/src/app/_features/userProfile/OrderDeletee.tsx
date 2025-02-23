/* eslint-disable */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PopoverClose } from '@radix-ui/react-popover';
import { CircleX } from 'lucide-react';
import { useCreateDeleteReqMutation, useGetConcertQuery } from '@/generated';
import { useAlert } from '../../../components/providers/AlertProvider';

type ButtonProps = {
  ticketNumber: string;
  orderId: string;
  concertId: string;
  totalPrice: number;
  refetch: () => void;
};
export const DeleteButton = ({ refetch, ticketNumber, orderId, totalPrice, concertId }: ButtonProps) => {
  const [accountNumber, setAccountNumber] = React.useState(0);
  const { showAlert } = useAlert();
  const [bankName, setBankName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const { data } = useGetConcertQuery({ variables: { id: concertId } });
  const [createDeleteReq] = useCreateDeleteReqMutation({ onError: (error) => showAlert('error', `${error.message}`) });
  const concertName = data?.getConcert.concertName || '';
  const deleteReq = async () => {
    await createDeleteReq({
      variables: {
        input: { accountNumber: accountNumber, bankName: bankName, concertName: concertName, orderId: orderId, reqStatus: false, totalPrice: totalPrice, userName: userName, orderStatus: 'CANCEL' },
      },
    });
    await refetch();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button data-cy="order-delete-modal" data-testid="open-modal-button" variant="outline" className="bg-[#27272A] text-white hover:bg-none">
          Цуцлах
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-100 bg-black p-5 border-neutral-600 rounded-lg flex flex-col gap-5">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <h4 className="font-medium leading-none text-white">Тасалбар цуцлах</h4>
              <p className="text-sm text-muted-foreground">{ticketNumber} тасалбараа цуцлахдаа итгэлтэй байна уу?</p>{' '}
            </div>
            <PopoverClose className="flex justify-between">
              <CircleX className="text-neutral-400"></CircleX>
            </PopoverClose>
          </div>
          <div className="grid gap-4 w-[416px]">
            <div className="flex flex-row justify-between w-[416px] items-center gap-4 border-neutral-600">
              <Label htmlFor="width" className="text-white border-neutral-600">
                Банк
              </Label>
              <Select data-cy="select-khan" onValueChange={(event) => setBankName(event)}>
                <SelectTrigger data-cy="open-select" className="w-[318px] bg-black text-white border-neutral-600">
                  <SelectValue placeholder="Сонгох" className="border-neutral-600" />
                </SelectTrigger>
                <SelectContent className="border-neutral-600">
                  <SelectGroup className="bg-neutral-900 text-white">
                    <SelectItem data-cy="khan" value="Хаан банк">
                      Хаан банк
                    </SelectItem>
                    <SelectItem value="Голомт банк">Голомт банк</SelectItem>
                    <SelectItem value="Төрийн банк">Төрийн банк</SelectItem>
                    <SelectItem value="Хас банк">Хас банк</SelectItem>
                    <SelectItem value="М банк">М банк</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className=" flex flex-row justify-between items-center gap-4">
              <Label htmlFor="maxWidth" className="text-white">
                Дансны №
              </Label>
              <Input
                data-cy="account-number"
                data-testid="account-number"
                type="number"
                onChange={(event) => setAccountNumber(Number(event.target.value))}
                id="maxWidth"
                placeholder="Дансны дугаар"
                className=" bg-black text-white col-span-2 h-8 border-neutral-600 w-[318px]"
              />
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
              <Label htmlFor="height" className="text-white">
                Нэр
              </Label>
              <Input
                data-testid="user-name"
                onChange={(event) => setUserName(event.target.value)}
                id="height"
                placeholder={`${userName ? userName : 'Нэр'} `}
                className="bg-black w-[318px]  text-white col-span-2 h-8 border-neutral-600"
              />
            </div>
          </div>
        </div>{' '}
        <div className="flex justify-end">
          <PopoverClose>
            <button
              data-cy="delete-button"
              disabled={!userName && !bankName && !accountNumber}
              onClick={deleteReq || refetch()}
              data-testid="delete-button"
              className="bg-[#18181B] text-white px-3 py-2  rounded-md border-neutral-600"
            >
              Цуцлах хүсэлт илгээх
            </button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
