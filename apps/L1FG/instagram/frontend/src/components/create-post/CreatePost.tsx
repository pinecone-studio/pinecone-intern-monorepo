'use client';
import { useState } from 'react';
import { useCreatePostMutation } from '@/generated';

const CreatePost = () => {
  const [postImage, setPostImage] = useState('');
  const [caption, setCaption] = useState('');
  const [userId, setUserId] = useState('');

  const [createPost, { loading }] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!postImage || !caption || !userId) {
    //   alert('All fields are required!');
    //   return;
    // }

    // try {
    await createPost({
      variables: {
        input: {
          postImage: [postImage],
          caption,
        },
      },
    });

    // alert('Post created successfully!');
    // } catch (err) {
    //   console.error('Error creating post:', err);
    //   alert('Failed to create post. Please try again.');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label data-testid="create-post-postimage">Post Image:</label>
        <input type="text" value={postImage} onChange={(e) => setPostImage(e.target.value)} placeholder="Enter post image URL" required />
      </div>

      <div>
        <label data-testid="create-post-caption">Caption:</label>
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Enter caption" required />
      </div>

      <div>
        <label data-testid="create-post-user">User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" required />
      </div>

      <button type="submit" disabled={loading} data-testid="create-post-submit-button">
        {/* {loading ? 'Creating Post...' : 'Create Post'} */}
        Create Post
      </button>

      {/* {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p style={{ color: 'green' }}>Post created successfully!</p>} */}
    </form>
  );
};

export default CreatePost;
