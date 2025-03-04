export const findConflictingNames = (existing: { types: string[]; queries: string[]; mutations: string[] }, changes: string[], excludeTypes: string[]): string[] => {
  const filteredExistingTypes = existing.types.filter((type) => !excludeTypes.includes(type));
  const filteredExistingQueries = existing.queries.filter((query) => !excludeTypes.includes(query));
  const filteredExistingMutations = existing.mutations.filter((mutation) => !excludeTypes.includes(mutation));

  const existingSet = new Set([...filteredExistingTypes, ...filteredExistingQueries, ...filteredExistingMutations]);

  return changes.filter((change) => existingSet.has(change));
};
