// types.ts
export type CreatePostStep1Props = {
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CreatePostStep2Props = {
  step: boolean;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  setOpenCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CreatePostProps = {
  images: string[];
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
