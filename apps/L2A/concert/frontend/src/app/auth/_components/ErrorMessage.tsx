export const ErrorMessage = ({ message, alert }: { message: string | undefined | null; alert: boolean }) => {
  return message && alert && <div className="text-red-500 mt-2">{message}</div>;
};
