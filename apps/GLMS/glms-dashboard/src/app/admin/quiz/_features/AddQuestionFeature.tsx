/* eslint-disable complexity */
"use client"

import { useCreateQuestionMutation } from "@/generated";
import { AddQuestionDialog } from "../_components/AddQuestionDialog";
import { useState } from 'react';
import { toast } from "sonner";

interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface AddQuestionFeatureProps {
    quizId: string;
}

const initialOptions = [
  { optionText: '', isCorrect: false },
  { optionText: '', isCorrect: false },
  { optionText: '', isCorrect: false },
  { optionText: '', isCorrect: false }
];

export const AddQuestionFeature: React.FC<AddQuestionFeatureProps> = ({ quizId }) => {
  const [questionText, setQuestionText] = useState<string>('');
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false)


  const handleOptionChange = (index: number, field: keyof Option, value: string | boolean) => {
    setOptions(prevOptions => {
        const newOptions = [...prevOptions];
        if (field === 'isCorrect' && value === true) {
          newOptions.forEach((option, idx) => {
            if (idx !== index) option.isCorrect = false;
          });
        }
        newOptions[index] = { ...newOptions[index], [field]: value };
        return newOptions;
      });
    };

  const [createQuestion, { loading }] = useCreateQuestionMutation();

  const inputValidation = () => {
    if (questionText.trim() === '') {
      toast.error("Question text cannot be empty.", {className: "error-toast"});
      return false;
    };

    if (options.some(option => option.optionText.trim() === '')) {
      toast.error("All option texts cannot be empty.", {className: "error-toast"});
      return false;    
    }

    if (!options.some(option => option.isCorrect)) {
      toast.error("At least one option must be marked as correct.", { className: 'error-toast' });
      return false;
    }

    return true
  }

  const handleSubmit = async () => {
    if (!inputValidation()){
      return
    }

    try {
      await createQuestion({
        variables: {
          createInput: {
            text: questionText,
            quizId: quizId,
            options: options.map(option => ({
              optionText: option.optionText,
              isCorrect: option.isCorrect
            }))
          }
        }
      });

      setIsOpen(false);
      resetForm();
      toast.success("Question create successfully", { className: 'success-toast'});
    } catch (error) {
      toast.error('Failed to create question', { className: 'error-toast'});
      console.error("Error creating question:", error);
    }
  };

  const resetForm = () => {
    setQuestionText('');
    setOptions([...initialOptions]);
  };

  return (
    <AddQuestionDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      questionText={questionText}
      setQuestionText={setQuestionText}
      options={options}
      handleOptionChange={handleOptionChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};