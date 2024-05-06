'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MagnifyingGlassSvg } from '../../../assets/icons/MagnifyingClassIcon';

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

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      setTimeout(() => {
        router.push(pathname + '?' + createQueryString('searchedValue', event.target.value));
      }, 1000);
    },
    [pathname, createQueryString, router]
  );

  useEffect(() => {
    setSearchValue(searchParams.get('searchedValue') ?? '');
  }, []);
  return (
    <div data-cy="search-input-cy-id" className="bg-white w-[78%] h-[58px] rounded-[8px] overflow-hidden border">
      <label className="h-full flex items-center gap-2 input  border-[1px] border-[#D6D8DB] focus-within:outline-none">
        <MagnifyingGlassSvg />
        <input data-testid="search-input-test-id" type="text" value={searchValue} className="grow" placeholder="Нийтлэл, шошгоор хайх" onChange={handleChange} />
      </label>
    </div>
  );
};
