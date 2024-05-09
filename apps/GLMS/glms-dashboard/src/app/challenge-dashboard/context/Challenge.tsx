import { PropsWithChildren, createContext } from 'react';
import { ChangeEvent, useState } from 'react';

type IChallengeProps = {
  answers: {
    answer: string;
    isCorrect: boolean;
  }[];
  question: string;
  setAnswerTwo: React.Dispatch<React.SetStateAction<string>>;
  setAnswerOne: React.Dispatch<React.SetStateAction<string>>;
  selectedBtn: 'TEXT' | 'IMAGE';
  addAnswer: () => void;
  handleAnswerChange: (_index: number, _value: string) => void;
  handleCorrectAnswer: (_index: number) => void;
  handleQuestion: (_value: ChangeEvent<HTMLInputElement>) => void;
  isFirstImgCorrect: boolean;
  isSecondImgCorrect: boolean;
  handleSelectText: () => void;
  handleSelectFile: () => void;
  answerTwo: string;
  answerOne: string;
  handleImageAnswer: (_index: 1 | 2) => void;
  allQuiz: string[];
  submitQuiz: () => void;
};

export const ChallengeContext = createContext({} as IChallengeProps);
export const Challengeprovider = ({ children }: PropsWithChildren) => {
  const [allQuiz, setAllQuiz] = useState(['']);
  const [answers, setAnswers] = useState([{ answer: '', isCorrect: false }]);
  const [answerTwo, setAnswerTwo] = useState('');
  const [answerOne, setAnswerOne] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedBtn, setSelectedBtn] = useState<'TEXT' | 'IMAGE'>('TEXT');
  const [isFirstImgCorrect, setIsFirstImgCorrect] = useState(false);
  const [isSecondImgCorrect, setIsSecondImgCorrect] = useState(false);

  const handleImageAnswer = (index: 1 | 2) => {
    if (index === 1) {
      setIsFirstImgCorrect(true);
      setIsSecondImgCorrect(false);
      return;
    }
    setIsSecondImgCorrect(true);
    setIsFirstImgCorrect(false);
  };

  const handleSelectText = () => {
    setSelectedBtn('TEXT');
  };

  const handleSelectFile = () => {
    setSelectedBtn('IMAGE');
  };

  const handleQuestion = (_value: ChangeEvent<HTMLInputElement>) => {
    const value = _value.target.value;
    setQuestion(value);
  };

  const addAnswer = () => {
    setAnswers([...answers, { answer: '', isCorrect: false }]);
  };

  const handleCorrectAnswer = (index: number) => {
    const updatedAnswers = answers.map((answer: { answer: string; isCorrect: boolean }, i: number) => (i === index ? { ...answer, isCorrect: true } : { ...answer, isCorrect: false }));
    setAnswers(updatedAnswers);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      ['answer']: value,
    };
    setAnswers(newAnswers);
  };

  const submitQuiz = () => {
    if (selectedBtn === 'TEXT') {
      const textQuiz = JSON.stringify({ question: question, choiceType: selectedBtn, choices: answers });
      setAllQuiz([textQuiz]);
      localStorage.setItem('challenge', JSON.stringify(allQuiz));
      setAnswers([{ answer: '', isCorrect: false }]);
      setAnswerTwo('');
      setAnswerOne('');
      setQuestion('');
      setSelectedBtn('TEXT');
      setIsFirstImgCorrect(false);
      setIsSecondImgCorrect(false);
      return;
    }
    const imageQuiz = JSON.stringify({
      question: question,
      choiceType: selectedBtn,
      choices: [
        { choice: answerOne, isCorrect: isFirstImgCorrect },
        { choice: answerTwo, isCorrect: isSecondImgCorrect },
      ],
    });
    localStorage.setItem('quiz', imageQuiz);
    console.log('imageQuiz', imageQuiz);
    setAllQuiz([imageQuiz]);
    setAnswers([{ answer: '', isCorrect: false }]);
    setAnswerTwo('');
    setAnswerOne('');
    setQuestion('');
    setSelectedBtn('TEXT');
    setIsFirstImgCorrect(false);
    setIsSecondImgCorrect(false);
  };

  return (
    <ChallengeContext.Provider
      value={{
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
        allQuiz,
        submitQuiz,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
