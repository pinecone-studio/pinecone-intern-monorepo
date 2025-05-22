const endpoint = 'http://localhost:4200/api/graphql';

export const imageUpload = async (files: File[], userId: string) => {
  const imageUrls: string[] = [];

  const uploadMutation = `
    mutation UploadImage($file: Upload!, $userId: String!) {
      uploadImage(file: $file, userId: $userId)
    }
  `;

  for (const file of files) {
    const formData = new FormData();
    formData.append(
      'operations',
      JSON.stringify({
        query: uploadMutation,
        variables: { file: null, userId },
      })
    );
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
    formData.append('0', file);

    const res = await fetch(endpoint, { method: 'POST', body: formData });
    const result = await res.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error('Image upload failed');
    }

    imageUrls.push(result.data.uploadImage);
  }

  const saveMutation = `
    mutation UploadUserImages($userId: String!, $imageUrls: [String!]!) {
      uploadUserImages(userId: $userId, imageUrls: $imageUrls)
    }
  `;

  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: saveMutation,
      variables: { userId, imageUrls },
    }),
  });

  return imageUrls;
};
