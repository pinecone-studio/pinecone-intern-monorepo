'use client';
import { Input, TextOrFileQuestionCreate, CheckBox } from '../_components';
import { AddAnswer } from './AddAnswer';
import { ChallengeFileUploader } from './FileUploader';
import { FaPlus } from 'react-icons/fa';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { QuizInput } from '@/generated';
type AddQuizType = {
  handleAllQuiz: (_newQuiz: QuizInput) => void;
};
export const AddQuiz = ({ handleAllQuiz }: AddQuizType) => {
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const validationSchema = Yup.object({
    question: Yup.string().required('Асуулт оруулна уу'),
    answersText: Yup.array().of(
      Yup.object().shape({
        answer: Yup.string(),
        isCorrect: Yup.boolean(),
      })
    ),
    questionType: Yup.string().oneOf(['TEXT', 'IMAGE']),
    answersImage: Yup.array().of(
      Yup.object().shape({
        answer: Yup.string(),
        isCorrect: Yup.boolean(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      question: '',
      answersText: [{ choice: '', isCorrect: false }],
      questionType: 'TEXT',
      firstImageAnswer: '',
      isFirstImageAnswerCorrect: false,
      secondImageAnswer: '',
      isSecondImageAnswerCorrect: false,
    },
    validationSchema,
    onSubmit: ({ question, questionType, firstImageAnswer, isFirstImageAnswerCorrect, secondImageAnswer, isSecondImageAnswerCorrect, answersText }) => {
      const quiz = {
        question,
        choicesType: questionType,
        choices:
          questionType === 'TEXT'
            ? answersText
            : [
                { choice: firstImageAnswer, isCorrect: isFirstImageAnswerCorrect },
                { choice: secondImageAnswer, isCorrect: isSecondImageAnswerCorrect },
              ],
      };
      handleAllQuiz(quiz as QuizInput);
      formik.resetForm();
    },
  });

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleFirstImageAnswer = () => {
    formik.setFieldValue('isFirstImageAnswerCorrect', true);
    formik.setFieldValue('isSecondImageAnswerCorrect', false);
  };
  const handleSecondImageAnswer = () => {
    formik.setFieldValue('isSecondImageAnswerCorrect', true);
    formik.setFieldValue('isFirstImageAnswerCorrect', false);
  };

  const handleSelectText = () => {
    formik.setFieldValue('questionType', 'TEXT');
  };
  const handleSelectFile = () => {
    formik.setFieldValue('questionType', 'IMAGE');
  };

  const handleCorrectAnswer = (index: number) => {
    const quizAnswers = [...formik.values.answersText];
    const updatedAnswers = quizAnswers.map((choice: { choice: string; isCorrect: boolean }, i: number) => (i === index ? { ...choice, isCorrect: true } : { ...choice, isCorrect: false }));
    formik.setFieldValue('answersText', updatedAnswers);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...formik.values.answersText];
    newAnswers[index] = {
      ...newAnswers[index],
      ['choice']: value,
    };
    formik.setFieldValue('answersText', newAnswers);
  };

  const addAnswer = () => {
    formik.setFieldValue('answersText', [...formik.values.answersText, { choice: '', isCorrect: false }]);
  };

  const handleImageCorrect = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center justify-center flex-col" data-testid="add-quiz">
      <div className="w-[668px] max-h-[500px] h-fit border-2 border-dashed p-6 rounded-lg gap space-y-4">
        <>
          <h2 className="font-semibold text-base  font-inter tracking-tight text-left mb-1 ml-1">Сорилын асуулт</h2>
          <Input name="question" value={formik.values.question} onChange={formik.handleChange} />
          <span className="text-red-400 ">{formik.errors.question}</span>
        </>
        <TextOrFileQuestionCreate selectedBtn={formik.values.questionType} handleSelectText={handleSelectText} handleSelectFile={handleSelectFile} />
        {formik.values.questionType === 'TEXT' ? (
          <AddAnswer
            checked={checked}
            label={'Хариулт нэмэх'}
            answers={formik.values.answersText}
            handleAnswerChange={handleAnswerChange}
            handleCorrectAnswer={handleCorrectAnswer}
            addAnswer={addAnswer}
          />
        ) : (
          <div className="flex grid-rows-2 h-fit pb-2 gap-2">
            <div className={`flex-1 h-[230px]`}>
              <ChallengeFileUploader name="firstImageAnswer" image={formik.values.firstImageAnswer} setFieldValue={formik.setFieldValue} />
              <CheckBox
                isExist={isChecked}
                label="Зөв эсэх"
                onClick={handleFirstImageAnswer}
                className="flex justify-center items-center gap-3 font-bold"
                checked={formik.values.isFirstImageAnswerCorrect}
              />
            </div>
            <div className={`flex-1 h-[230px]`}>
              <ChallengeFileUploader name="secondImageAnswer" image={formik.values.secondImageAnswer} setFieldValue={formik.setFieldValue} />
              <CheckBox
                isExist={isChecked}
                label="Зөв эсэх"
                onClick={handleSecondImageAnswer}
                className="flex justify-center items-center gap-3 font-bold"
                checked={formik.values.isSecondImageAnswerCorrect}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-10 h-9 mt-3">
        <button data-testid="choose-button" className="rounded-lg h-9 p-1 border border-[#D6D8DB] px-2" onClick={formik.values.questionType === 'TEXT' ? handleChecked : handleImageCorrect}>
          Зөв хариулт сонгох
        </button>
        <div className="border-r border"></div>
        <button type="submit" onClick={() => formik.handleSubmit()} data-cy="submit-btn" className="bg-black text-white p-1 px-2 rounded-lg">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
