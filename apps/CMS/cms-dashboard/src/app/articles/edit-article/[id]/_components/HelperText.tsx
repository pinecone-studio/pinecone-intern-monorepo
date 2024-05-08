export const HelperText = ({ error }: { error: string | undefined }) => {
  return <strong className="text-red-400 font-bold">{error}</strong>;
};
