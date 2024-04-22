'use client';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { MenuBtn } from '../_components/MenuBtn';
import { useGetArticlesQuery, useGetCategoriesQuery, Category, Article } from '../../../generated';
import { MenuAllBtn } from '../_components/MenuAllBtn';


export const MenuBar = () => {
  const [selected, setSelected] = useState('Бүгд');
  const { data: category } = useGetCategoriesQuery()
  const { data: article } = useGetArticlesQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;
  const categories = category?.getCategories as Category[] | undefined
  console.log(articles);
  console.log(categories);
  

  return (
    <Stack sx={{ display: 'flex', marginX: 'auto', width: '1200px', backgroundColor: 'white', height: '70px', paddingX: '20px', alignItems: 'start', justifyContent: 'end', fontSize: '20px', borderRadius: 2 }}>
      <Stack flexDirection={'row'} sx={{ textDecorationColor: 'gray', width: '65%', justifyContent: 'space-between', cursor: 'pointer' }}>
        <MenuAllBtn selected={selected} setSelected={setSelected} number={18} status={'Бүгд'} />
        { articles && articles.map((item, index) => {
          return ( 
            <MenuBtn selected={selected} setSelected={setSelected} number={10} status={item.status} key={index} />
          )
        })}
      </Stack>
    </Stack>
  );
};
