import * as fs from 'fs';

export const extractSchemaChanges = (diffFilePath: string) => {
  const diffContent = fs.readFileSync(diffFilePath, 'utf-8');
  const diffLines = diffContent.split('\n');
  const addedLines = diffLines.filter((line) => line.trim().startsWith('+'));

  const schemaChanges = extractSchemaTypes(addedLines);
  const mutationAndQueryChanges = extractMutationAndQueryChanges(addedLines);

  const allChanges = [...schemaChanges, ...mutationAndQueryChanges];

  return allChanges;
};

const extractMutationAndQueryChanges = (addedLines: string[]): string[] => {
  const cleanedAddedLines = addedLines.map((line) => line.slice(1).trim());
  const relevantLines = cleanedAddedLines.filter((line) => !/^(type|input|enum)\b/.test(line));
  const firstWordsInLines = relevantLines.map((line) => line.split(/\s+/)[0]);
  const finalWords = firstWordsInLines.map((word) => word.replace(/:/g, ''));

  return finalWords;
};

const extractSchemaTypes = (addedLines: string[]): string[] => {
  const schemaTypePattern = /(type|input|enum|query|mutation|subscription)\s+([a-zA-Z0-9_]+)/g;

  const filteredContent = addedLines.join('\n');

  const matches = [...filteredContent.matchAll(schemaTypePattern)];
  return matches.map((match) => match[2]);
};
