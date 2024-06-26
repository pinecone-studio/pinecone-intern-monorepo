import { InputField } from '../_components';

export const TextField = () => {
  return (
    <div className="w-4/5 h-[93.5vh] flex justify-center items-center m-auto">
      <div className='w-4/5'>
        <InputField type="text" data-cy="title-input" label={'Гарчиг өгөх'} name={'title'} placeholder={'Энд гарчгаа бичнэ үү...'} addClass="mb-12"/>
        <InputField type="text" data-cy="body-input" label={'Нийтлэлээ бичих'} name={'body'} placeholder={'Бичиж эхлэх...'} as={'textarea'} addClass="resize-none" rows={5} />
      </div>
    </div>
  );
};
