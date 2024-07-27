/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, LoaderCircle } from "lucide-react";
import { ChangeEvent } from 'react';
import { Toaster } from 'sonner';

interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface AddQuestionDialogPropsTypes {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  questionText: string;
  setQuestionText: (text: string) => void;
  options: Option[];
  handleOptionChange: (index: number, field: keyof Option, value: string | boolean) => void;
  handleSubmit: () => Promise<void>;
  loading: boolean;
}

export const AddQuestionDialog: React.FC<AddQuestionDialogPropsTypes> = ({
  isOpen,
  setIsOpen,
  questionText,
  setQuestionText,
  options,
  handleOptionChange,
  handleSubmit,
  loading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Toaster richColors position="top-right" data-testid="dialog-toaster"/>
      <DialogTrigger asChild>
        <Button variant="outline" className='' onClick={() => setIsOpen(true)} data-testid="open-dialog-button">
          <Plus className="h-5 w-5 mr-2" />Асуулт нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-content">
        <DialogHeader>
          <DialogTitle>Шинэ асуулт нэмэх</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="question">Асуулт</Label>
            <Input
              type="text"
              id="question"
              placeholder=""
              value={questionText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value)}
              className="focus-visible:ring-0"
              data-testid="question-input"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm font-semibold mb-1">
              <h3>Сонголтууд</h3>
              <h3>Зөв хариулт</h3>
            </div>
            <div className="flex flex-col gap-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-4" data-testid={`option-${index}`}>
                  <Label htmlFor={`option-${index}`} className="text-right">
                    {String.fromCharCode(65 + index)}
                  </Label>
                  <Input
                    id={`option-${index}`}
                    className="col-span-3 focus-visible:ring-0"
                    value={option.optionText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleOptionChange(index, 'optionText', e.target.value)}
                    data-testid={`option-input-${index}`}
                  />
                  <Checkbox
                    id={`correct-${index}`}
                    checked={option.isCorrect}
                    onCheckedChange={(checked: boolean) => handleOptionChange(index, 'isCorrect', checked)}
                    data-testid={`correct-checkbox-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={loading} data-testid="submit-button">
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Түр хүлээгээрэй
              </>
            ) : (
              'Асуулт үүсгэх'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
