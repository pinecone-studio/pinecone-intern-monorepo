type DroppedListItemType = {
  text: string;
  icon: React.JSX.Element;
  testId: string;
  onClick: () => void;
};
export const DroppedListItem = ({ text, icon, testId, onClick }: DroppedListItemType) => {
  return (
    <li onClick={onClick} data-testid={testId}>
      <div className="flex flex-row gap-3 items-center">
        {icon}
        <div>{text}</div>
      </div>
    </li>
  );
};
