export const SuccessMessage = ({ valid }: { valid: boolean }) => {
  return valid && <div className="text-green-500 mt-2">Амжилттай нэвтэрлээ!</div>;
};
