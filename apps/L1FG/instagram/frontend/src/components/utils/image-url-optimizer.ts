// eslint-disable-next-line complexity
export function imageUrlOptimizer(url: string): string {
  try {
    if (typeof url !== 'string') {
      throw new Error('not a string');
    }
    const arr = url.split('/upload');
    if (arr.length !== 2) {
      throw new Error('String doesnt contain upload');
    }
    arr.splice(1, 0, '/upload/q_auto,f_auto');
    return arr.join('');
  } catch (error) {
    return '/images/profilePic.png';
  }
}
