'use client';

type ArticleCommentProps = {
    checked?: boolean  ;
    setChecked?: ()=> void;
  };

const CommentPermission = (props: ArticleCommentProps)=> {
    const { checked, setChecked } = props;
    return (
        <div className=" flex p-6 gap-4 items-center justify-between ">
            <p data-testid="comment-header-text" className=" text-lg">   Сэтгэгдэл идэвхтэй</p>
            <input data-testid="commentPermission" type="checkbox" className="toggle" checked={checked} onChange={setChecked} />
        </div>
    );
}
export default CommentPermission