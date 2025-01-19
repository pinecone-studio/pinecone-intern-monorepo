type TimeType = 'minute' | 'hour' | 'day';
export const tokenExpireCal = (type: TimeType, quantity: number) => {
  switch (type) {
    case 'minute': {
      return Math.floor(Date.now() / 1000) + quantity * 60;
    }
    case 'day': {
      const daySeconds = 24 * 60 * 60 * quantity;
      return Math.floor(Date.now() / 1000) + daySeconds;
    }
    case 'hour': {
      const hourSeconds = 60 * 60;
      return Math.floor(Date.now() / 1000) + hourSeconds;
    }
  }
};
