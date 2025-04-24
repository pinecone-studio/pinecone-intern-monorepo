export const LoginButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`text-sm py-2 px-4 rounded-lg w-full ${
        disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-black'
      } text-white`}
    >
      Нэвтрэх
    </button>
  );
};