import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import PublishLeftSide from '../../src/app/articles/_components/PublishLeftSide';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CreateArticleDocument } from '../../src/generated';

const createArticleMock: MockedResponse = {
  request: {
    query: CreateArticleDocument,
    variables: {
      title:"garchig",
      coverPhoto:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      content:"aguulga",
      author:"661c68e36837efa536464cb5",
      category:"661c67e66837efa536464cad",
      status:"PUBLISHED",
      slug:"qwe123",
      commentPermission:true
    },
  },
  result: {
    data: {
      createAuthor: {
        _id: '1',
        content: 'aguulga',
      },
    },
  },
};

describe('CreateArticle', () => {
  it('should render', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createArticleMock]} addTypename={false}>
        <PublishLeftSide />
      </MockedProvider>
    );          

    const input = getByTestId('title').getElementsByTagName('input')[0];
    const contentInput = getByTestId('content');
    const createBtn = getByTestId('create-article-btn');

    act(() => {
      fireEvent.change(input, { target: { value: 'garchig' } });
      fireEvent.change(contentInput, { target: { value: 'aguulga' } });
    });

    act(() => {
      fireEvent.click(createBtn);
    });
  });
  

});
