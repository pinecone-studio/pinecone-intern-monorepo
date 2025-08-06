import { Button } from '@/components/ui/button';
import { DialogContainer } from './DialogContainer';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { ImageDownloader } from '@/utils/ImageDownloader';

type dataType = {
  __typename?: 'Table' | undefined;
  tableId: string;
  tableName: string;
  tableQr: string;
};

export const SeeTableModal = ({ data }: { data: dataType }) => {
  const handleImage = (url: string) => {
    try {
      ImageDownloader(url, `${data.tableName}_QRcode.png`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger data-testid="admin-table-dialog-button" className="bg-[#F4F4F5] text-[14px] font-medium rounded-md flex w-fit px-2 h-[36px] items-center">
        QR харах
      </DialogTrigger>
      <DialogContainer
        title={`${data.tableName} ширээний QR код`}
        content={
          <div>
            <Image width={291} height={291} alt="Qr Code" src={data.tableQr} />{' '}
            <Button data-testid="admin-table-imageDownload-button" onClick={() => handleImage(data.tableQr)} className="w-full bg-black">
              QR татах
            </Button>
          </div>
        }
      />
    </Dialog>
  );
};
