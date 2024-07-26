"use client"

import { useCreateQuestionMutation } from "@/generated";
import { AddQuestionDialog } from "../_components/AddQuestionDialog";
import { useState } from 'react';
import { toast } from "sonner";

interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface AddQuestionDialogProps {
    quizId: string;
}

export const AddQuestionFeature: React.FC<AddQuestionDialogProps> = ({ quizId }) => {
  const [questionText, setQuestionText] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
  ]);
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

  const handleSubmit = async () => {
    if (questionText.trim() === '') {
      toast.error("Question text cannot be empty.");
      return;
    };
  
    for (const option of options) {
      if (option.optionText.trim() === '') {
        toast.error("Option text cannot be empty.");
        return;
      }
    };

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
      toast.success("Question create Successfully");
    } catch (error) {
      toast.error('Асуулт үүсгэхэд алдаа гарлаа');
      console.error("Error creating question:", error);
    }
  };

  const resetForm = () => {
    setQuestionText('');
    setOptions([
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
    ]);
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


