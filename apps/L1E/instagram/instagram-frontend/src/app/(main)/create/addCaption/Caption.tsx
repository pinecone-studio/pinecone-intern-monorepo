"use client"
import { ArrowLeft } from "lucide-react";
import { CREATE_POST } from "@/graphql/mutations/createPost/Post";
import ImageCarousel from "@/components/ImageCarousels";
import { useMutation } from "@apollo/client/react/hooks";


type PostStep = "idle" | "select-image" | "add-caption" | "preview";
type CaptionProps = {
  selectedImages: string[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  onAddImageClick: () => void;
  handleShare: () => void;
  postStep: string;
  setCaption: (_caption: string) => void;
  setPostStep: (_step: PostStep) => void;
  setSelectedImages: (_images: string[]) => void;
  caption: string;
  loading: boolean;
};

const Caption = ({
  selectedImages,
  currentIndex,
  onAddImageClick,
  handleNext,
  handlePrev,
  postStep,
  setCaption,
  setPostStep,
  setSelectedImages,
  caption,
}: CaptionProps) => {

  const wordCount = caption.trim() === "" ? 0 : caption.trim().split(/\s+/).length;
  const maxWords = 2200;
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: () => resetPost(),



  });

  const handleShare = async () => {
    try {
      await createPost({
        variables: { image: selectedImages, description: caption },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const resetPost = () => {
    setPostStep("idle");
    setSelectedImages([]);
    setCaption("");
    alert("Post created successfully!");
  };

  return (

    <div>

      <div className="w-[997px] h-[679px] flex flex-col ">
        <div className="flex flex-col justify-between items-center w-[997px] h-[41px] pt-2">
          <div className="h-[24px] flex justify-between items-center w-[997px]  p-[0px_8px]">
            <ArrowLeft data-cy="back-icon" onClick={() => setPostStep("preview")} className="h-[16px] w-[16px]" />
            <h2 className="text-[16px] font-bold">Create new post</h2>
            <p className="text-blue-600 cursor-pointer text-[14px] font-bold" onClick={handleShare}>   {loading ? "Sharing..." : "Share"} </p>
          </div>
          <div>.</div>
        </div>
        <div className="items-center h-[638px] flex gap-[16px] border-t">
          <div className="w-[638px] h-[638px]">
            <ImageCarousel
              selectedImages={selectedImages}
              currentIndex={currentIndex}
              handleNext={handleNext}
              handlePrev={handlePrev}
              postStep={postStep}
              onAddImageClick={onAddImageClick}
            />
          </div>
          <div className="w-[343px] h-[638px] p-[8px_0] ">
            <div className="w-full h-[232px] flex flex-col gap-[8px] border-b border-b-gray-100 ">
              <div className="w-full flex justify-between h-[40px] items-center pt-2">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-[30px] h-[30px] rounded-full bg-slate-300"></div>
                  <h1>Oyunbat</h1>
                </div>
              </div>
              <textarea
                value={caption}
                data-cy="caption-input"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="w-[327px] h-[132px] border rounded-md p-[8px_12px]"
              />
              <div className="flex justify-between h-[44px] w-[343px] text-sm text-gray-500 p-[12px_16px_16px_0]">
                <div>{wordCount} {wordCount === 1 ? "word" : "words"} </div>
                <div className="pr-[16px]">{wordCount > maxWords ? "Limit exceeded" : `${wordCount}/${maxWords}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Caption;