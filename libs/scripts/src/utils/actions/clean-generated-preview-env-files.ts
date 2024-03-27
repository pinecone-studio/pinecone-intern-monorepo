import * as fs from 'fs';
import path from 'path';

export const envGeneratedPaths = ['apps/GLMS/glms-dashboard', 'apps/federation'];

export const cleanGeneratedPreviewEnvFiles = () => {
  envGeneratedPaths.forEach((relativePath) => {
    const filePath = path.join(__dirname, relativePath, '.env.preview');

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`.env.preview file removed successfully from ${relativePath}.`);
    } else {
      console.log(`.env.preview file not found in ${relativePath}.`);
    }
  });
};
