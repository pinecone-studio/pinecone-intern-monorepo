import { ConcertsDocument, DeleteEventDocument, FeatureAnEventDocument } from '@/generated';
import { GraphQLError } from 'graphql';
import { mockConcerts } from 'specs/utils/mock-concert-info';

export const GraphqlMocks = [
  {
    request: {
      query: ConcertsDocument,
    },
    result: {
      data: { concerts: mockConcerts },
    },
  },
  {
    request: {
      query: ConcertsDocument,
    },
    result: {
      data: { concerts: mockConcerts },
    },
  },
  {
    request: {
      query: DeleteEventDocument,
      variables: {
        deleteEventId: 'mock-2',
      },
    },
    result: {
      data: {
        deleteEvent: {
          id: 'mock-2',
          __typename: 'Event',
        },
      },
    },
  },
  {
    request: {
      query: FeatureAnEventDocument,
      variables: {
        concertId: 'mock-2',
      },
    },
    result: {
      data: {
        featureAnEvent: {
          id: 'mock-2',
        },
      },
    },
  },
];

export const mockErrorConcertsDocument = [
  {
    request: { query: ConcertsDocument },
    error: new GraphQLError('failed'),
  },
];

export const mockDeleteEventError = {
  request: {
    query: DeleteEventDocument,
    variables: { deleteEventId: 'mock-2' },
  },
  error: new Error('Устгах үед алдаа гарлаа'),
};

export const mockFeatureEventError = {
  request: {
    query: FeatureAnEventDocument,
    variables: { concertId: 'mock-2' },
  },
  error: new Error('Онцлох үед алдаа гарлаа'),
};

export const successMockFeatureEvent = {
  request: {
    query: FeatureAnEventDocument,
    variables: { concertId: 'mock-1' },
  },
  result: {
    data: {
      featureAnEvent: {
        id: 'mock-1',
        __typename: 'Event',
      },
    },
  },
};
