import { Img } from '@/app/icons/Img';
import { CardMedia } from '@mui/material';

const CLOUD_NAME = 'dbtqkhmu5';
const UPLOAD_PRESET = 'gbgzau24';

const PicUpload = ({ imageUrl, setImageUrl }: { imageUrl: string; setImageUrl: React.Dispatch<React.SetStateAction<string>> }) => {
  const fileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const selectedFile = event.target.files[0];
      await uploadHandler(selectedFile);
    }
  };

  const uploadHandler = async (file: File) => {
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: data,
      });

      const resJson = await res.json();
      console.log('cefef', resJson.url);

      if (resJson.url) {
        setImageUrl(resJson.url);
        console.log(resJson.url);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-[32px]">
        <div className="pt-[64px] flex flex-col items-start">
          <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Хавтасны зураг</p>
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="relative w-[540px] h-[420px] border-dashed border-2 border-gray-400 flex flex-col items-center justify-center rounded-[8px]">
              <input id="file-upload" type="file" onChange={fileChangeHandler} style={{ display: 'none' }} />
              {imageUrl && <CardMedia component="img" src={imageUrl} style={{ borderRadius: '8px', width: '99%', height: '99%', position: 'absolute', zIndex: 10 }} alt="uploaded" />}
              <div className="flex flex-col items-center gap-[10px]">
                <Img />
                <span className="text-[#D6D8DB]">Зураг сонгоно уу </span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export { PicUpload };
