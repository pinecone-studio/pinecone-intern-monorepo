export const me = async (_: any, __: any, context: any) => {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
  return context.user;
};