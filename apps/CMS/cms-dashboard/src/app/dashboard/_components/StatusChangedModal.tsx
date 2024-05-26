export const StatusChangedModal = ({ message }: { message: string }) => {
  return (
    <div data-testid="status-change-modal-test-id">
      <p>{message}</p>
    </div>
  );
};
