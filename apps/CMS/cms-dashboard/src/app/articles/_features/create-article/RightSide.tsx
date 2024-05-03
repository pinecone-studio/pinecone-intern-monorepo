import React, { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react';
import { useGetCategoriesQuery } from '../../../../generated';
import ImageUploader from '../../_components/create-article/ImageUploader';
import CommentPermission from '../../_components/create-article/CommentPermission';

type CreateArticleRightSideProps = {
  commentPermission?: boolean;
  setCommentPermission: Dispatch<SetStateAction<boolean>>;
  coverPhoto: string;
  setCoverPhoto: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  setCategory: ChangeEventHandler<HTMLSelectElement>;
  name: string;
  value: string;
};
const RightSide: React.FC<CreateArticleRightSideProps> = ({ commentPermission, setCommentPermission, coverPhoto, setCoverPhoto, setCategory, name, value }) => {
  const { data, loading } = useGetCategoriesQuery();
  const categoriesData = data?.getCategories;

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className=" gap-[16px] flex flex-col p-6">
          <p className=" font-semibold text-lg">Ангилал</p>
          <select value={value} name={name} onChange={setCategory} placeholder="Хайх эсвэл шинээр нэмэх" className="p-2 bg-[#f7f7f8] rounded-lg border h-14">
            <option value="">Хайх эсвэл шинээр нэмэх</option>
            {categoriesData &&
              categoriesData.map((cat) => {
                return (
                  <option value={cat?.id} key={cat?.id}>
                    {cat?.name}
                  </option>
                );
              })}
            ;
          </select>
        </div>
      )}
      <ImageUploader coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} />
      <CommentPermission commentPermission={commentPermission} setCommentPermission={setCommentPermission} />
    </div>
  );
};

export default RightSide;
