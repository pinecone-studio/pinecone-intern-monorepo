import { useEffect, useState } from 'react';
import { useGetCommentsLazyQuery, useAddBadWordMutation } from '../../../generated';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import CommentsTab from '../_components/CommentsTab';
import CommentsCard from '../_components/AdminCommentsCard';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

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
  const [addBadWord] = useAddBadWordMutation();
  const formik = useFormik({
    initialValues: {
      word: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await addBadWord({
        variables: {
          word: values.word,
        },
      });
      console.log('xdslbhv', values.word);
      toast.success('Хараалын үг амжилттай нэмэгдлээ.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      resetForm();
    },
  });

  return (
    <div className="my-10">
      <div className="flex justify-end py-2 gap-4">
        <input type="input " name="word" value={formik.values.word} onChange={formik.handleChange} className="focus:outline-none bg-white rounded-lg p-2" placeholder="Хараал үг оруулах..." />
        <button id='add-bad-word-button-test-id"' type="submit" onClick={() => formik.handleSubmit()} name="submitBtn" className="bg-black text-white btn">
          Нэмэх
        </button>
      </div>
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
