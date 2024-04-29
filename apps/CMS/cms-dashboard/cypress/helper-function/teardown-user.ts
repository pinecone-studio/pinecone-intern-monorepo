import axios from 'axios';

export const teardownUser = async (email: string) => {
  try {
    const data = {
      query: `mutation DeleteUser($input: deleteUserInput!) {
        deleteUser(input: $input) {
          message
        }
      }`,
      variables: {
        input: { email: email },
      },
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: 'https://intern-federation-testing.vercel.app/graphql',
    };
    await axios(options);
    console.log('successfully removed user');
    return true;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
