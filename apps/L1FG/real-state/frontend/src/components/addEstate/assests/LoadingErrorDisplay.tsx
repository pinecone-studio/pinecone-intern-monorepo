import React from 'react';

interface LoadingErrorDisplayProps {
  loading: boolean;
  error?: Error;
}

const LoadingErrorDisplay: React.FC<LoadingErrorDisplayProps> = ({ loading, error }) => {
  if (loading) {
    return <div data-testid="error-message">Loading...</div>;
  }

  return <div data-testid="error-message">Error: {error?.message || ''}</div>;
};

export default LoadingErrorDisplay;
