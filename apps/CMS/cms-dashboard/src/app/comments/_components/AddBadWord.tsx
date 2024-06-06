import { useAddBadWordMutation } from '@/generated';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

const AddBadWord = () => {
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
      toast.success('Хараалын үг амжилттай нэмэгдлээ.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      resetForm();
    },
  });
  return (
    <div className="flex justify-end py-2 gap-4">
      <input
        type="input"
        name="word"
        value={formik.values.word}
        onChange={formik.handleChange}
        className="focus:outline-none bg-white rounded-lg p-2"
        placeholder="Хараал үг оруулах..."
        data-testid="bad-word-input"
      />
      <button id="add-bad-word-button-test-id" type="submit" onClick={() => formik.handleSubmit()} name="submitBtn" className="bg-black text-white btn" data-testid="add-bad-word-button">
        Нэмэх
      </button>
    </div>
  );
};

export default AddBadWord;
