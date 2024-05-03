'use client';

import {  Dispatch, SetStateAction } from "react";

type ArticleCommentProps = {
  commentPermission?: boolean;
  setCommentPermission: Dispatch<SetStateAction<boolean>>;
};

const CommentPermission: React.FC<ArticleCommentProps> = ({commentPermission, setCommentPermission}) => {

  return (
    <div className="flex gap-4 items-center justify-between p-6">
      <p data-testid="comment-header-text" className=" text-lg font-semibold"> Сэтгэгдэл идэвхтэй</p>
      <input data-testid="commentPermission" type="checkbox" className="toggle"  defaultChecked={commentPermission}  onChange={()=>{setCommentPermission((prev)=>!prev)}} />
    </div>
  );
};

export default CommentPermission;
