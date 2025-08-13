  "use client";
  import { useState } from "react";
  import { useMutation } from "@apollo/client";
  import { CREATE_POST } from "@/graphql/mutations/createPost/page";
  import { usePost } from "@/components/context/PostContext";
  import Caption from "./addCaption/page";
  import SelectImagePage from "./selectImage/page";
import Preview from "./preview/page";

  const CreatePost = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [caption, setCaption] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const { postStep, setPostStep } = usePost();

    const [createPost, { loading }] = useMutation(CREATE_POST, {
      onCompleted: () => {
        alert("Post created successfully!");
        setPostStep("idle");
        setSelectedImages([]);
        setCaption("");
      }
    });

    const handleShare = async () => {
      try {
        await createPost({
          variables: {
            image: selectedImages, 
            description: caption
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (!files) return;

  const fileArray = Array.from(files);
  const newImages: string[] = [];

  fileArray.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        newImages.push(e.target.result as string);

       
        if (newImages.length === fileArray.length) {
          setSelectedImages((prev) => {
            const updated = [...prev, ...newImages];

        
            if (postStep === "select-image" && updated.length > 0) {
              setPostStep("preview");
            }

            return updated;
          });
        }
      }
    };
    reader.readAsDataURL(file);
  });
};
const handleAddImageClick = () => {
  const input = document.getElementById("global-image-input") as HTMLInputElement;
  if (input) {
    input.value = ''; 
    input.click();
  }
};

    const handleNext = () => {
      if (currentIndex < selectedImages.length - 1) setCurrentIndex((p) => p + 1);
    };
    const handlePrev = () => {
      if (currentIndex > 0) setCurrentIndex((p) => p - 1);
    };

    return (
      <div className="m-[80px_0px_0px_536px] ">
                            <input
                      type="file"
                       id="global-image-input"
                      data-cy="image-upload"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleAddImages}
                    />
        {postStep !== "idle" && (
          <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-0"></div>

            <div className="fixed bg-white rounded-xl   z-50 mt-[90px] ml-[210px]">
              {postStep === "select-image" && (
              <SelectImagePage />
              )}
              {postStep === "preview" && selectedImages.length > 0 && (
                <Preview
                  selectedImages={selectedImages}
                  currentIndex={currentIndex}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  onAddImageClick={handleAddImageClick}
                  setSelectedImages={setSelectedImages}
                  setCaption={setCaption}
                />
              )}

              {postStep === "add-caption" && selectedImages.length > 0 && (
                <Caption
                  selectedImages={selectedImages}
                  currentIndex={currentIndex}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  handleShare={handleShare}
                  onAddImageClick={handleAddImageClick}
                  postStep={postStep}
                  loading={loading}
                  setPostStep={setPostStep}
                  caption={caption}
                  setCaption={setCaption}
                />
              )}
            </div>
            </>
        )}
      </div>
    );
  };

  export default CreatePost;