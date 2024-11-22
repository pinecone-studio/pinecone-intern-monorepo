import { GetUserByIdDocument, UpdateUserDocument } from '@/generated';
import { MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom';

const mock: MockedResponse = {
  request: {
    query: GetUserByIdDocument,
  },
};
