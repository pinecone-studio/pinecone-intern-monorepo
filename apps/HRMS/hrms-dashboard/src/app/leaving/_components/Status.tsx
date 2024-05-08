type Status = {
  status: string;
};

const getStatusText = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'Зөвшөөрсөн';
    case 'declined':
      return 'Татгалзсан';
    case 'pending':
      return 'Шинэ хүсэлт';
    default:
      return '';
  }
};

const getBackgroundColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'rgba(193, 230, 207, 1)';
    case 'declined':
      return 'rgba(252, 186, 190, 1)';
    default:
      return '';
  }
};

const getBorderStyle = (status: string): string => {
  return status.toLowerCase() === 'pending' ? '1px solid rgba(214, 216, 219, 1)' : '';
};

const Status = ({ dat }: { dat: Status }) => {
  const { status } = dat;
  const statusText = getStatusText(status);
  const backgroundColor = getBackgroundColor(status);
  const borderStyle = getBorderStyle(status);

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
