interface CommentsTabProps {
  handleDeleted: () => void;
  handleHidden: () => void;
  handleNormal: () => void;
  handleAll: () => void;
  allCount: number;
  deletedCount: number;
  hiddenCount: number;
  normalCount: number;
}
 
const CommentsTab = (props: CommentsTabProps) => {
    const {handleAll,handleDeleted,handleHidden,handleNormal,allCount,deletedCount,normalCount,hiddenCount} = props;
  return (
    <div className='p-3 bg-white rounded-xl w-full'>
      <button type="button" className='btn btn-ghost' onClick={handleAll}>
        Бүгд
        <div className='bg-slate-200 rounded-full flex justify-center items-center w-6 h-6'>{allCount}</div>
      </button>
      <button type="button" className='btn btn-ghost' onClick={handleNormal}>
        Энгийн
        <div className='bg-slate-200 rounded-full flex justify-center items-center w-6 h-6'>{normalCount}</div>
      </button>
      <button type="button" className='btn btn-ghost' onClick={handleHidden}>
        Нуусан
        <div className='bg-slate-200 rounded-full flex justify-center items-center w-6 h-6'>{hiddenCount}</div>
      </button>
      <button type="button" className='btn btn-ghost' onClick={handleDeleted}>
        Устгасан
        <div className='bg-slate-200 rounded-full flex justify-center items-center w-6 h-6'>{deletedCount}</div>
      </button>
    </div>
  );
};
 
export default CommentsTab;

