type Status = {
  status: string;
};
const Status = ({ dat }: { dat: Status }) => {
  const { status } = dat;
  const statusText = status.toLowerCase();
  let backgroundColor = '';
  let borderStyle = '';

  switch (statusText) {
    case 'approved':
      backgroundColor = 'rgba(193, 230, 207, 1)';
      break;
    case 'declined':
      backgroundColor = 'rgba(252, 186, 190, 1)';
      break;
    case 'pending':
      borderStyle = '1px solid rgba(214, 216, 219, 1)';
      break;
  }

  return (
    <p
      style={{
        borderRadius: '15px',
        textAlign: 'center',
        background: backgroundColor,
        border: borderStyle,
        fontWeight: 500,
      }}
      data-testid="request-status"
    >
      {statusText}
    </p>
  );
};

export default Status;
