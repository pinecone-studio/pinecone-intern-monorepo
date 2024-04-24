'use client';
import { Dispatch, SetStateAction } from 'react';
import { Stack } from '@mui/material';
import { MenuBtn } from '../_components/MenuBtn';
import { Article } from '../../../generated';
import { MenuAllBtn } from '../_components/MenuAllBtn';


const getNumberOfArticlesByStatus = (articles: Article[] | undefined, status: string) => {
  return articles?.filter((item) => item.status === status).length;
};

type MenuBarTypes = {
  articles: Article[] | undefined;
  setStatus: Dispatch<SetStateAction<string>>;
  status: string;
}

export const MenuBar = (props: MenuBarTypes) => {
  const { articles, setStatus, status } = props;
  return (
    <Stack
      data-cy="menu-bar-cy-id"
      sx={{
        display: 'flex',
        marginX: 'auto',
        width: '1200px',
        backgroundColor: 'white',
        height: '70px',
        paddingX: '20px',
        alignItems: 'start',
        justifyContent: 'end',
        fontSize: '20px',
        borderRadius: 2,
      }}
    >
      <Stack flexDirection={'row'} sx={{ textDecorationColor: 'gray', width: '65%', justifyContent: 'space-between', cursor: 'pointer' }}>
        <MenuAllBtn status={status} setStatus={setStatus} number={articles?.length} statusName={'Бүгд'}/>
        {articles && articles.map((item, index) => {
          const myQty = getNumberOfArticlesByStatus(articles, item.status);
          return <MenuBtn status={status} setStatus={setStatus} number={myQty} statusName={item.status} key={index} />;
        })}
      </Stack>
    </Stack>
  );
};
