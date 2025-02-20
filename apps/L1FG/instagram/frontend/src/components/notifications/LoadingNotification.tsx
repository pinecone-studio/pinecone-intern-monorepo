export const LoadingNotification = () => {
  return (
    <div data-testid="notification-skeleton" className="w-full space-y-4 p-4">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-3 w-3/4 rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
