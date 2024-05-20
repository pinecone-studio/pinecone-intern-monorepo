'use client';
import { Input, TextOrFileQuestionCreate, CheckBox } from '../_components';
import { AddAnswer } from './AddAnswer';
import { ChallengeFileUploader } from './FileUploader';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { QuizInput } from '@/generated';
import { MdDelete } from 'react-icons/md';

type AddQuizType = {
  updateQuiz: (_index: number, _newQuiz: QuizInput) => void;
  question: string;
  choicesType: string;
  choices: {
    choice: string;
    isCorrect: boolean;
  }[];
  index: number;
  deleteQuiz: (_index: number) => void;
};

export const UpdateQuiz = (props: AddQuizType) => {
  const { updateQuiz, question, choicesType, choices, index, deleteQuiz } = props;
  const validationSchema = Yup.object({
    question: Yup.string().required('Асуулт оруулна уу'),
    questionType: Yup.string().oneOf(['TEXT', 'IMAGE']),
  });
  const formik = useFormik({
    initialValues: {
      question: question,
      answersText: choices.map(({ choice, isCorrect }) => ({ choice, isCorrect })),
      questionType: choicesType,
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
      updateQuiz(index, quiz as QuizInput);
    },
  });

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
    formik.setFieldValue('answersText', [...formik.values.answersText, { answer: '', isCorrect: false }]);
  };

  useEffect(() => {
    if (choicesType === 'IMAGE') {
      formik.setFieldValue('firstImageAnswer', choices[0].choice);
      formik.setFieldValue('secondImageAnswer', choices[1].choice);
      formik.setFieldValue('isFirstImageAnswerCorrect', choices[0].isCorrect);
      formik.setFieldValue('isSecondImageAnswerCorrect', choices[1].isCorrect);
      formik.setFieldValue('answersText', [{ answer: '', isCorrect: false }]);
    }
  }, [choicesType]);

  return (
    <div className="flex items-center justify-center flex-col mb-4" data-testid="update-quiz">
      <div className="w-[668px] max-h-[500px] h-fit border-2 border-dashed p-6 rounded-lg gap space-y-4">
        <>
          <h2 className="font-semibold text-base  font-inter tracking-tight text-left mb-1 ml-1">Сорилын асуулт</h2>
          <Input name="question" value={formik.values.question} onChange={formik.handleChange} />
          <span className="text-red-400 ">{formik.errors.question}</span>
        </>
        <TextOrFileQuestionCreate selectedBtn={formik.values.questionType} handleSelectText={handleSelectText} handleSelectFile={handleSelectFile} />
        {formik.values.questionType === 'TEXT' ? (
          <AddAnswer
            checked={true}
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
                label="Зөв эсэх"
                onClick={handleFirstImageAnswer}
                className="flex justify-center items-center gap-3 font-bold"
                checked={formik.values.isFirstImageAnswerCorrect}
                isExist={true}
              />
            </div>
            <div className={`flex-1 h-[230px]`}>
              <ChallengeFileUploader name="secondImageAnswer" image={formik.values.secondImageAnswer} setFieldValue={formik.setFieldValue} />
              <CheckBox
                label="Зөв эсэх"
                onClick={handleSecondImageAnswer}
                className="flex justify-center items-center gap-3 font-bold"
                checked={formik.values.isSecondImageAnswerCorrect}
                isExist={true}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-10 h-9 mt-3">
        <button data-cy="delete-btn" className="rounded-lg h-9 p-1 border border-[#D6D8DB] px-2" onClick={() => deleteQuiz(index)}>
          <MdDelete />
        </button>
        <div className="border-r border"></div>
        <button type="submit" onClick={() => formik.handleSubmit()} data-cy="update-btn" className="bg-black text-white border-l-2 p-1 px-2 rounded-lg">
          save
        </button>
      </div>
    </div>
  );
};
