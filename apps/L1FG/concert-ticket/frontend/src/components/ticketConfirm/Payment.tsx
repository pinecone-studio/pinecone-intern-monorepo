import { OrderClick } from '@/app/ticketReservation/[ticketID]/page';
import Payment from '@/components/ticketReservation/PaymentSection';
import { useCreateOrderMutation, useGetConcertQuery, useGetTicketQuery } from '@/generated';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAlert } from '../providers/AlertProvider';

const PaymentTicket = ({ handleChange, handleBack, value, ticketID }: OrderClick) => {
  const { showAlert } = useAlert();

  const router = useRouter();

  const { data: concertData } = useGetConcertQuery({ variables: { id: ticketID } });

  const { data: ticketData } = useGetTicketQuery({ variables: { ticketNumber: value.orderNumber } });

  const [createOrder] = useCreateOrderMutation({
    onCompleted: () => {
      showAlert('success', 'Захиалга амжилттай хийгдлээ');
      router.push('../');
    },
    onError: () => {
      showAlert('error', 'Захиалга үүсэхэд алдаа гарлаа');
    },
  });

  const concertId = concertData?.getConcert._id ?? '';
  const ticketId = ticketData?.getTicket._id ?? '';

  const userCreateOrder = async () => {
    if (value.payType.length === 0) {
      return showAlert('warning', 'Төлбөрийн нөхцөлөө сонгоно уу');
    }

    await createOrder({
      variables: {
        input: {
          userID: userID,
          concertID: concertId,
          ticketID: ticketId,
          phoneNumber: Number(value.phoneNumber),
          email: value.email,
          totalPrice: value.totalPrice,
          paymentType: value.payType,
          ticketNumber: value.orderNumber,
          vipTicket: {
            price: value.vipPrice,
            quantity: value.vipQuantity,
          },
          regularTicket: {
            price: value.standartPrice,
            quantity: value.standartQuantity,
          },
          standingAreaTicket: {
            price: value.standingAreaPrice,
            quantity: value.standingAreaQuantity,
          },
        },
      },
    });
  };

  const user = localStorage.getItem('user');

  if (!user) return;

  const parsedUser = JSON.parse(user);

  const userID = parsedUser?._id;

  return (
    <div className=" h-screen flex flex-col items-center justify-start ">
      <div className="w-[1334px] flex flex-col gap-14">
        <div className="flex text-[48px] w-[1334px] pt-20 items-center ">
          <Image onClick={handleBack} className="cursor-pointer" width={40} height={40} src={'/chevron-back.svg'} alt="chevron-back" />
          <div className="text-white text-[28px] mx-auto items-center">Төлбөр төлөх</div>
        </div>
        <div className="border-b border-neutral-500"></div>
        <div className="">
          <Payment value={value} handleChange={handleChange} handleNext={userCreateOrder} />
        </div>
      </div>
    </div>
  );
};
export default PaymentTicket;
