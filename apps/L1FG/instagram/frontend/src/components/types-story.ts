export type CreateStoryStep1Props = {
  openCreateStoryModal: boolean;
  setOpenCreateStoryModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CreateStoryStep2Props = {
  step: boolean;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  setOpenCreateStoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CreateStoryProps = {
  images: string[];
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
