'use client';
import { useEffect } from 'react';
import { RequestStatus, useGetRequestByIdQuery } from '../../../generated';
import { useRouter, useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApproveButton from '../_components/ApproveButton';
import DeclineButton from '../_components/DeclineButton';
import DetailInfo from '../_components/Info';
import RequestDetails from '../_components/RequestDetails';

const getStatusColor = (status: RequestStatus | undefined) => {
  switch (status) {
    case 'APPROVED':
      return '#16A94A';
    case 'DECLINED':
      return '#ff7081';
    default:
      return 'gray';
  }
};

const getStatusText = (status: RequestStatus | undefined) => {
  switch (status) {
    case 'APPROVED':
      return 'Зөвшөөрсөн';
    case 'DECLINED':
      return 'Татгалзсан';
    default:
      return 'Шинэ хүсэлт';
  }
};

const Detail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId') || '';
  const { data, loading } = useGetRequestByIdQuery({
    variables: { id: requestId },
  });

  useEffect(() => {
    if (!loading && !data?.getRequestById) {
      router.push('/error');
    }
  }, [loading, data, router]);

  if (loading)
    return (
      <div className="flex w-full justify-center items-center pt-10">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  const requestData = data?.getRequestById;
  const statusColor = getStatusColor(requestData?.status);
  const statusText = getStatusText(requestData?.status);

  const handleBackClick = () => {
    router.push('/leaving');
  };

  return (
    <div className="w-full h-screen bg-base-200">
      <div className="flex flex-col items-center gap-6 w-full h-screen">
        <div className="flex items-center justify-between p-3 bg-white w-full">
          <button onClick={handleBackClick} data-testid="back">
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
                  <p style={{ color: statusColor }}>{statusText}</p>
                </div>
                <div className="flex gap-3 items-center" data-testid="request-status">
                  <DeclineButton id={requestId} status={requestData?.status} />
                  <ApproveButton id={requestId} />
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
