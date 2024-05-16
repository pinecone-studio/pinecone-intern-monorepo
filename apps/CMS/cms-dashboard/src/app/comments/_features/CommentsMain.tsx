import { useState } from 'react';
import CommentsCard from '../_components/CommentsCard';
import { CommentStatus, useGetCommentsQuery } from '../../../generated';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import CommentsTab from '../_components/CommentsTab';
 
export const CommentsMain = () => {
  const perPage = 5;
  const [isHidden, setIsHidden] = useState(false);
  const [isHiddenDeleted, setIsHiddenDeleted] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<CommentStatus[]>([CommentStatus.Normal]);
  const getPageCountForStatus = (status: string | CommentStatus[]) => {
    if (status.length === 1) {
      const singleStatus = status[0];
      if (singleStatus === CommentStatus.Normal) {
        return normalPageCount;
      } else if (singleStatus === CommentStatus.Hidden) {
        return hiddenPageCount;
      } else if (singleStatus === CommentStatus.Deleted) {
        return deletedPageCount;
      }
    }
    return pageCount;
  };
  const handleNext = () => {const maxPageCount = getPageCountForStatus(status);if (currentPage < maxPageCount) {setCurrentPage(currentPage + 1);}};
  const handlePrev = () => {if (currentPage > 1) {setCurrentPage(currentPage - 1);}};
  const isNextDisabled = () => {const maxPageCount = getPageCountForStatus(status);return currentPage >= maxPageCount;};
  const handleAll = () => {setStatus([CommentStatus.Normal, CommentStatus.Hidden, CommentStatus.Deleted]);setIsHidden(false);setIsHiddenDeleted(true);};
  const handleNormal = () => {setStatus([CommentStatus.Normal]);setIsHidden(false);setIsHiddenDeleted(true);};
  const handleDeleted = () => {setStatus([CommentStatus.Deleted]);setIsHidden(true);setIsHiddenDeleted(false);};
  const handleHidden = () => {setStatus([CommentStatus.Hidden]);setIsHidden(false); setIsHiddenDeleted(true);};
  const { data, loading } = useGetCommentsQuery({
    variables: {
      input: {
        limit: perPage,
        offset: (currentPage - 1) * perPage,
        status,
      },
    },
  });
  if (loading) { return (<div className='w-full h-full flex justify-center items-center'>ачаалж байна ...<span className="loading loading-ring loading-lg"></span></div>);  }
  const { allCount = 0, normalCount = 0, hiddenCount = 0, deletedCount = 0, comments = [] } = data?.getComments || {};
  const pageCount = Math.ceil(allCount / perPage);
  const hiddenPageCount = Math.ceil(hiddenCount / perPage);
  const normalPageCount = Math.ceil(normalCount / perPage);
  const deletedPageCount = Math.ceil(deletedCount / perPage);
  return (
    <div className='my-10'>
      <CommentsTab
        handleAll={handleAll}
        normalCount={normalCount}
        allCount={allCount}
        hiddenCount={hiddenCount}
        deletedCount={deletedCount}
        handleNormal={handleNormal}
        handleDeleted={handleDeleted}
        handleHidden={handleHidden}
      />
      {comments.map((item) => (
        <div key={item?._id}>
          {item?.comment && (
            <CommentsCard
              isHidden={isHidden}
              isHiddenDeleted={isHiddenDeleted}
              comment={item.comment}
              name={item.name ?? ""}
              email={item.email ?? ""}
              createdAt={item.createdAt}
              articleId={item.articleId ?? ""}
            />
          )}
        </div>
      ))}
      <div className='w-full justify-center items-center flex'>
        <div className='flex items-center justify-between w-[860px]'>
          <div className='w-1/2'>
            <div>
              <button className='btn btn-default bg-white items-center' onClick={handlePrev} style={{ display: currentPage === 1 ? 'none' : 'block' }}>
                <span className='flex items-center gap-2'>
                  <FaArrowLeft />Prev
                </span>
              </button>
            </div>
          </div>
          <div className='flex items-center justify-between w-1/2'>
            <p className='rounded-lg -ml-[30px] bg-slate-200 text-[black] text-xl w-[40px] h-[40px] items-center justify-center flex'>{currentPage}</p>
            <button className={`btn btn-default bg-white`} onClick={handleNext} disabled={isNextDisabled()}>
              Next<FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};