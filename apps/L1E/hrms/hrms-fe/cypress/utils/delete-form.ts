export const deleteTestForm = (name: string) => {
  const endpoint = 'https://hrms-service-testing-pinecone-studio.vercel.app/api/graphql'; // Replace with your actual GraphQL endpoint URL

  const query = `
  mutation deleteFormByName($name: String) {
    getEmployees(input: $input) {
      _id
      email
      jobTitle
      username
      adminStatus
      remoteLimit
      paidLeaveLimit
      freeLimit
      employeeStatus
      updatedAt
      createdAt
    }
  }
`;

  const variables = {
    name: name, // Replace with actual input value
  };

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response Data:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
