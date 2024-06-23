import { InputField } from '../_components';

export const TextField = () => {
  return (
    <div className='max-w-screen-md'>
      <InputField type="text" label={'Гарчиг өгөх'} name={'title'} placeholder={'Энд гарчгаа бичнэ үү...'} />
      <InputField type="text" label={'Нийтлэлээ бичих'} name={'body'} placeholder={'Бичиж эхлэх...'} as={'textarea'} addClass="resize-none" rows={5} />
    </div>
  );
};
