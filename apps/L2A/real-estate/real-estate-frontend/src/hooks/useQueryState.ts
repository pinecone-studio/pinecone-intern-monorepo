import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function useQueryParamState(key: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const value = searchParams.get(key);
  const setValue = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return [value, setValue] as const;
}
