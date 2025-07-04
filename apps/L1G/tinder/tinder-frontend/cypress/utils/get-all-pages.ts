import fs from 'fs';
import path from 'path';

const root = './apps/L1G/tinder/tinder-frontend/src/app';

const searchDepth = (folderPath: string) => {
  let pages: string[] = [];

  const rootFolders = fs.readdirSync(path.join(root, folderPath));
  const folders = rootFolders.filter((folder) => !folder.includes('.'));

  if (rootFolders.includes('page.tsx')) {
    pages.push(folderPath);
  }

  folders.forEach((folder) => {
    pages = [...pages, ...searchDepth(path.join(folderPath, folder))];
  });

  return pages;
};

export const getAllPages = () => {
  let pages: string[] = searchDepth('');

  pages = pages.map((page) => {
    // Remove empty segments, join with '/', and ensure leading slash
    const route = '/' + page.split('/').filter(Boolean).join('/');
    return route === '/' ? '/' : route.replace(/\/$/, '');
  });

  fs.writeFileSync(
    path.join('apps', 'L1G', 'tinder', 'tinder-frontend', 'cypress', 'utils', 'all-pages.json'),
    JSON.stringify(pages)
  );

  return;
};

getAllPages();