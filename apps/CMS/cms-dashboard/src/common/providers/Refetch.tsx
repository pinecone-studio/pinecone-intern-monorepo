import { PropsWithChildren, createContext, useContext } from 'react';

const RefetchContext = createContext<() => void>(() => {});

type RefetchProviderProps = PropsWithChildren<{
  refetch: () => void;
}>;

export const RefetchProvider = ({ refetch, children }: RefetchProviderProps) => {
  return <RefetchContext.Provider value={refetch}>{children}</RefetchContext.Provider>;
};

export const useRefetch = () => useContext(RefetchContext);
