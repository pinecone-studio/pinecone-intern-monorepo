import { useState } from 'react';
import CommentsCard from '../_components/CommentsCard';
import { useGetCommentsQuery } from '../../../generated';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import CommentsTab from '../_components/CommentsTab' 

const perPage = 5;

export const CommentsMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetCommentsQuery({
    variables: {
      input: {
        limit: perPage,
        offset: (currentPage - 1) * perPage ,
      }
    }
  });
  const comments = data?.getComments || [];

  return (
    <div className='my-10'>
       <CommentsTab/>
       {comments.map((item) => (
        <div  key={item?._id}>
          {item?.comment && (
            <CommentsCard 
              comment={item.comment}
              name={item.name ?? ""}
              email={item.email ?? ""}
              createdAt={item.createdAt}
              articleId={item.articleId ?? ""} />
          )}
        </div>
      ))}
      <div className='w-full justify-center items-center flex'>
        <div className='flex items-center justify-between w-[860px]'>
        <div className='w-1/2'>
             <div><button className='btn btn-default bg-white items-center' onClick={() => setCurrentPage(currentPage - 1)} style={{ display: currentPage === 1 ? 'none' : 'block' }}><span className='flex items-center gap-2'><FaArrowLeft/>Prev</span></button></div>    
        </div>
        <div className='flex items-center justify-between w-1/2'>
         <p className=' rounded-lg -ml-[30px] bg-slate-200 text-[black] text-xl w-[40px] h-[40px] items-center justify-center flex'>{currentPage}</p>
         <button className='btn btn-default bg-white items-center' onClick={() => setCurrentPage(currentPage + 1)}>Next<FaArrowRight/></button>
        </div>
        </div>
      </div>
    </div>
  );
};
