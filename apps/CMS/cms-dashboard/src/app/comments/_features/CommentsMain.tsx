import { useState } from 'react';
import CommentsCard from '../_components/CommentsCard';
import { useGetCommentsQuery } from '../../../generated';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

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
    <div>
      <CommentsCard/>
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
      <div className='flex items-center justify-evenly w-full'>
        <button className='btn btn-default items-center' onClick={() => setCurrentPage(currentPage - 1)}><FaArrowLeft/>Prev</button>
        <p className='px-2 rounded-sm bg-slate-300 text-#1C2024'>{currentPage}</p>
        <button className='btn btn-default items-center' onClick={() => setCurrentPage(currentPage + 1)}>Next<FaArrowRight/></button>
      </div>
    </div>
  );
};
