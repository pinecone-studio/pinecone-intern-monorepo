import { useEffect, useState } from 'react';
import { useGetCommentsLazyQuery } from '../../../generated';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import CommentsTab from '../_components/CommentsTab';
import CommentsCard from '../_components/AdminCommentsCard';
import AddBadWord from '../_components/AddBadWord';

const perPage = 5;

export const CommentsMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState({ status: 'NORMAL', count: 0 });
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const [getComments, { data }] = useGetCommentsLazyQuery({
    variables: {
      input: {
        limit: perPage,
        offset: currentPage - 1,
        status: selectedStatus.status,
      },
    },
  });
  useEffect(() => {
    getComments();
    setCurrentPage(1);
  }, [selectedStatus]);
  const comments = data?.getComments || [];
  return (
    <div className="my-10">
      <AddBadWord />
      <CommentsTab setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />
      {comments.map((item) => (
        <div key={item?._id}>
          {item?.comment && <CommentsCard comment={item.comment} name={item.name ?? ''} email={item.email ?? ''} createdAt={item.createdAt} articleId={item.articleId ?? ''} />}
        </div>
      ))}
      <div className="w-full justify-center items-center flex">
        <div className="flex items-center justify-between w-[860px]">
          <div className="w-1/2">
            <div>
              <button className="btn btn-default bg-white items-center" onClick={handlePrev} style={{ display: currentPage === 1 ? 'none' : 'block' }}>
                <span className="flex items-center gap-2">
                  <FaArrowLeft />
                  Prev
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-1/2">
            <p className=" rounded-lg -ml-[30px] bg-slate-200 text-[black] text-xl w-[40px] h-[40px] items-center justify-center flex">{currentPage}</p>
            <button className="btn btn-default bg-white items-center" style={{ display: Math.ceil(selectedStatus.count / perPage) == currentPage ? 'none' : 'flex' }} onClick={handleNext}>
              Next
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
