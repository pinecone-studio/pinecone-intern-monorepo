'use client';

import { useState, useEffect } from 'react';

const Chat = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <div>chat page</div>;
};

export default Chat;
