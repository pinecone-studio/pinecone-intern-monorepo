type Props = {
  name: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
};

export const CreatePostText = ({name, value, onChange, onBlur, error}: Props) => {
  return (
    <div>
      <label className="block text-md text-[#09090B] pb-2">Дэлгэрэнгүй тайлбар</label>
      <textarea  id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Дэлгэрэнгүй тайлбар бичнэ үү"
        data-testid="text"
        className={`w-full block px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-1'}`}/>
      <div className="h-3 mt-1">{error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm invisible">placeholder</p>}</div>
    </div>
  );
};
