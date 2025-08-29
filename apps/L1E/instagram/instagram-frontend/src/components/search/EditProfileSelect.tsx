// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ChevronDown } from "lucide-react";

// const DropdownMenuDemo = () => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" className="bg-gray-50 hover:bg-gray-50 cursor-pointer rounded-lg flex items-center gap-2">Change profile photo <span><ChevronDown strokeWidth={1} size={16} /></span></Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-fit" align="end">
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             Upload new photo
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             Remove current photo
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             Cancel
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// export default DropdownMenuDemo;

 
// components/search/EditProfileSelect.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type ProfilePhotoAction = "upload" | "remove" | "cancel";

interface DropdownMenuDemoProps {
  onSelect: (action: ProfilePhotoAction) => void;
}

const DropdownMenuDemo: React.FC<DropdownMenuDemoProps> = ({ onSelect }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-gray-50 hover:bg-gray-50 cursor-pointer rounded-lg flex items-center gap-2"
        >
          Change profile photo{" "}
          <span>
            <ChevronDown strokeWidth={1} size={16} />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onSelect("upload")}>
            Upload new photo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSelect("remove")}>
            Remove current photo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSelect("cancel")}>
            Cancel
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuDemo;
