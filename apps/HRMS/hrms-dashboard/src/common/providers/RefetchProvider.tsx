import { GetEmployeesByPaginateQuery, useGetEmployeesByPaginateQuery } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';
import { perPage } from '../../app/employee-details/constants';
type RefetchContextType = {
  data: GetEmployeesByPaginateQuery | undefined;
  refetch: () => void;
  loading: boolean;
  page: number | undefined;
  setPage: Dispatch<SetStateAction<number | undefined>>;
  checked: number;
  setChecked: Dispatch<SetStateAction<number>>;
};
const RefetchContext = createContext<RefetchContextType>({} as RefetchContextType);

export const RefetchProvider = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  const employeesSearchPath: string | null = searchParams.get('search');
  const employmentStatusPath: string | null = searchParams.get('employmentStatus');
  const jobTitlePath: string | null = searchParams.get('jobTitle');
  const defaultValue = jobTitlePath || '';
  const [checked, setChecked] = useState(1);
  const [page, setPage] = useState<number | undefined>(0);
  const { data, loading, refetch } = useGetEmployeesByPaginateQuery({
    variables: {
      paginationInput: {
        limit: perPage.limit,
        page: checked,
      },
      employeeDetailsfilterInput: {
        searchedValue: employeesSearchPath || '',
        jobTitle: defaultValue,
        employmentStatus: employmentStatusPath || '',
      },
    },
  });

  return <RefetchContext.Provider value={{ data, refetch, loading, page, setPage, checked, setChecked }}>{children}</RefetchContext.Provider>;
};

export const useRefetch = () => useContext(RefetchContext);
