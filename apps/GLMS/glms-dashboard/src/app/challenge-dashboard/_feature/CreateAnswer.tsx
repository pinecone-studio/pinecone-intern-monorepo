'use client';

import {  useState } from 'react';
import { AddAnswerButton } from '../_components/AddAnswerButton';
 
const CreateAnswer = () => {
  const [answers, setAnswers] = useState([{ answer: '', isCorrect: false }]);
  const [isDisabled, setIsDisabled] = useState(false);
 
  const addAnswer = () => {
    if (answers.length >= 4) {
      setIsDisabled(true);
      return;
    }
    setAnswers([...answers, { answer: '', isCorrect: false }]);
  };
  const handleCorrectAnswer = (index: number) => {
    const updatedArray = answers.map((a:{answer:string, isCorrect:boolean} , i: number) => (i === index ? { ...a, isCorrect: true } : { ...a, isCorrect: false }));
    setAnswers(updatedArray);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      ['answer']: value,
    };
    setAnswers(newAnswers);
  };
  return (
    <div>
      <AddAnswerButton label={'Хариулт нэмэх'} answers={answers} isDisabled={isDisabled} handleAnswerChange={handleAnswerChange} handleCorrectAnswer={handleCorrectAnswer} addAnswer={addAnswer} />
    </div>
  );
};
 
export default CreateAnswer;
