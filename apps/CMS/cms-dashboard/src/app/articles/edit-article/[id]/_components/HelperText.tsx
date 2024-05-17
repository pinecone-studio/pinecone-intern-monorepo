export const HelperText = ({ error }: { error: string | undefined }) => {
  return (
    <strong data-cy="helper-text-cy-id" className="text-red-400 font-bold">
      {error}
    </strong>
  );
};
