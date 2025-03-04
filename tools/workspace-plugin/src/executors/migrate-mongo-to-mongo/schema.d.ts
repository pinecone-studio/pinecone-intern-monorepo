export interface MongotoMongoMigrateExecutorSchema {
  sourceUri: string;
  targetUri: string;
  sourceDbName: string;
  sourceCollectionName: string;
  targetDBName: string;
  targetCollectionName: string;
}
