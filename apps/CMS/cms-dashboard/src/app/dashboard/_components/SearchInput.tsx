'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MagnifyingGlassSvg } from '../../../assets/icons/MagnifyingClassIcon';
import { ClearAllFilterIcon } from '@/assets/icons';

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>('');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const clearFilter = ({ name }: { name: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(name);
    return params.toString();
  };
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      setTimeout(() => {
        router.push(pathname + '?' + createQueryString('searchedValue', event.target.value));
      }, 1000);
    },
    [pathname, createQueryString, router]
  );
  const handleClear = useCallback(() => {
    setSearchValue('');
    router.push(pathname + '?' + clearFilter({ name: 'searchedValue' }));
  }, [pathname, clearFilter, router]);

  useEffect(() => {
    setSearchValue(searchParams.get('searchedValue') ?? '');
  }, []);
  return (
    <div data-cy="search-input-cy-id" className="bg-white w-full h-[58px] rounded-[8px] overflow-hidden">
      <label className="h-full flex items-center gap-2 input focus-within:outline-none">
        <MagnifyingGlassSvg />
        <input data-testid="search-input-test-id" type="text" value={searchValue} className="grow" placeholder="Нийтлэл, шошгоор хайх" onChange={handleChange} />
        <button data-testid="clear-filter-button-test-id" onClick={handleClear}>
          <ClearAllFilterIcon />
        </button>
      </label>
    </div>
  );
};
