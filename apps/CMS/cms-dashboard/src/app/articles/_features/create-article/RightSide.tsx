'use client';
import React, { ChangeEventHandler, Dispatch, FocusEventHandler, SetStateAction } from 'react';
import cx from 'classnames';
import { useGetCategoriesQuery } from '../../../../generated';
import ImageUploader from '../../_components/create-article/ImageUploader';
import CommentPermission from '../../_components/create-article/CommentPermission';

type CreateArticleRightSideProps = {
  commentPermission: boolean;
  setCommentPermission: Dispatch<SetStateAction<boolean>>;
  coverPhoto: string;
  setCoverPhoto: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  setCategory: ChangeEventHandler<HTMLSelectElement>;
  name: string;
  value: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error?: string;
  helpertext?: string;
  imageUploaderError?: string;
  ImageUploaderHelpertext?: string;
};
const RightSide: React.FC<CreateArticleRightSideProps> = ({
  commentPermission,
  setCommentPermission,
  coverPhoto,
  setCoverPhoto,
  setCategory,
  onBlur,
  name,
  value,
  error,
  helpertext,
  imageUploaderError,
  ImageUploaderHelpertext,
}) => {
  const { data, loading } = useGetCategoriesQuery();
  const categoriesData = data?.getCategories;

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className=" gap-[16px] flex flex-col p-6">
          <p className=" font-semibold text-lg">Ангилал</p>
          <select
            onBlur={onBlur}
            value={value}
            name={name}
            onChange={setCategory}
            placeholder="Хайх эсвэл шинээр нэмэх"
            className={cx('p-2 bg-[#f7f7f8] rounded-lg border h-14', {
              'ring-[1px] ring-red-700 hover:ring-[1px]': error,
              'focus-within:border focus-within:border-[#000000] focus-within:hover:border-[#000000]': !error,
            })}
          >
            <option value="">Хайх эсвэл шинээр нэмэх</option>
            {categoriesData &&
              categoriesData.map((cat) => {
                return (
                  <option value={cat?.id} key={cat?.id}>
                    {cat.name}
                  </option>
                );
              })}
            ;
          </select>
          <p data-testid="helperText" className=" text-red-700 text-[16px]">
            {helpertext}
          </p>
        </div>
      )}
      <ImageUploader coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} imageUploaderError={imageUploaderError} ImageUploaderHelpertext={ImageUploaderHelpertext} />
      <CommentPermission commentPermission={commentPermission} setCommentPermission={setCommentPermission} />
    </div>
  );
};

export default RightSide;
