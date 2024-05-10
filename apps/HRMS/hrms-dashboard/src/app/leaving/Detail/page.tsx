'use client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetRequestByIdQuery } from '../../../generated';
import { useRouter, useSearchParams } from 'next/navigation';
import ApproveButton from '../_components/ApproveButton';
import DeclineButton from '../_components/DeclineButton';
import DetailInfo from '../_components/Info';
import RequestDetails from '../_components/RequestDetails';

const Detail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId');
  const id = requestId || '';

  const { data, loading } = useGetRequestByIdQuery({
    variables: { id },
  });
  if (loading)
    return (
      <div className="flex w-full justify-center items-center pt-10">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  const requestData = data?.getRequestById;

  return (
    <div className="w-full h-screen bg-base-200">
      <div className="flex flex-col items-center gap-6 w-full h-screen">
        <div className="flex items-center justify-between p-3 bg-white w-full">
          <button onClick={() => router.push('/leaving')} data-testid="back">
            <ArrowBackIcon />
          </button>
          <p className="text-center flex-grow">Чөлөөний дэлгэрэнгүй</p>
        </div>
        <div className="flex justify-between w-[1154px]">
          <div className="flex flex-col gap-4">
            {requestData && <DetailInfo data={requestData} />}
            {requestData && <RequestDetails data={requestData} />}
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-[565px] h-[384px] bg-white rounded-lg p-5 flex flex-col gap-6">
              <div>
                <p>Ажлаа шилжүүүлэн өгөх ажилтны нэр</p>
                <p>-</p>
              </div>
              <div>
                <p className="w-[400px]">Ажлаа түр хугацаанд юу юу шилжүүлэн өгч буйгаа товч тэмдэглэнэ үү.</p>
                <p>-</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[565px] h-[96px] bg-white rounded-lg p-5">
              <p>Хүсэлт батлах хүн</p>
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-3">
                  <p>{data?.getRequestById?.superVisor}</p>
                  <p style={{ color: '#16A94A' }}>{data?.getRequestById?.status.toLowerCase()}</p>
                </div>
                <div className="flex gap-3 items-center" data-testid="request-status">
                  <DeclineButton id={id} />
                  <ApproveButton id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
