'use client';

import { useContext } from 'react';
import { Input, TextOrFileQuestionCreate } from '../_components';
import { AddAnswer } from './AddAnswer';
import { ChallengeFileUploader } from './FileUploader';
import { ChallengeContext } from '../context/Challenge';
import { MdDelete } from 'react-icons/md';

export const AddQuiz = () => {
  const {
    handleImageAnswer,
    answers,
    setAnswerOne,
    setAnswerTwo,
    answerTwo,
    answerOne,
    selectedBtn,
    addAnswer,
    handleAnswerChange,
    handleCorrectAnswer,
    isFirstImgCorrect,
    isSecondImgCorrect,
    handleQuestion,
    handleSelectText,
    handleSelectFile,
    question,
    submitQuiz,
  } = useContext(ChallengeContext);

  return (
    <div className="flex items-center justify-center flex-col" data-testid="add-quiz">
      <div className="w-[668px] max-h-[500px] h-fit border-2 border-dashed p-6 rounded-lg gap space-y-4">
        <>
          <h2 className="font-semibold text-base  font-inter tracking-tight text-left mb-1 ml-1">Сорилын асуулт</h2>
          <Input name="question" value={question} onChange={handleQuestion} />
        </>
        <TextOrFileQuestionCreate selectedBtn={selectedBtn} handleSelectText={handleSelectText} handleSelectFile={handleSelectFile} />
        {selectedBtn === 'TEXT' ? (
          <AddAnswer label={'Хариулт нэмэх'} answers={answers} handleAnswerChange={handleAnswerChange} handleCorrectAnswer={handleCorrectAnswer} addAnswer={addAnswer} />
        ) : (
          <div className="flex grid-rows-2 h-[235px] pb-2 gap-2">
            <div className={`flex-1`}>
              <ChallengeFileUploader image={answerOne} setFieldValue={setAnswerOne} />
              <div className="flex justify-center items-center gap-3 font-bold">
                <input type="checkbox" checked={isFirstImgCorrect} onClick={() => handleImageAnswer(1)} className="checkbox checkbox-md" />
                <span className="label-text my-1">Зөв эсэх</span>
              </div>
            </div>
            <div className={`flex-1`}>
              <ChallengeFileUploader image={answerTwo} setFieldValue={setAnswerTwo} />
              <div className="flex justify-center items-center gap-3 font-bold">
                <input type="checkbox" checked={isSecondImgCorrect} onClick={() => handleImageAnswer(2)} className="checkbox checkbox-md" />
                <span className="label-text my-1">Зөв эсэх</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-5 m-2 justify-center">
          <button className="border-r">
            <MdDelete color="black" size={50} className="border rounded-lg mr-3 p-1" />
          </button>
          <button type="button" data-cy="submit-btn" className="bg-black text-white p-2 rounded-xl" onClick={submitQuiz}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};
