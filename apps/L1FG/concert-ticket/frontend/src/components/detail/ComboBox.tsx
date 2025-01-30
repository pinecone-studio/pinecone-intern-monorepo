// 'use client';

// import * as React from 'react';
// import { ChevronsUpDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// const frameworks = [{ label: '2024 oн 11 сарын 13 өдөр' }, { label: '2024 он 11 сарын 14 өдөр' }, { label: '2024 он 11 сарын 15 өдөр' }];

// export function Combobox() {
//   const [open, setOpen] = React.useState(false);
//   const [songoson, setSongoson] = React.useState('');

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" role="combobox" aria-haspopup="listbox" aria-expanded={open} className={`w-[345px] justify-between my-3 ${songoson ? '' : 'bg-[#1F1F1F] text-white'}`}>
//           {songoson || 'Өдөр сонгох'}
//           <ChevronsUpDown className="opacity-50 ml-2" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandList>
//             <CommandGroup className="bg-black text-white">
//               {frameworks.map((framework) => (
//                 <CommandItem
//                   data-testid="input"
//                   key={framework.label}
//                   value={framework.label}
//                   onSelect={(label) => {
//                     setSongoson(label === songoson ? '' : label);
//                     setOpen(false);
//                   }}
//                   className={songoson === framework.label ? 'bg-[#1F1F1F] text-white' : 'bg-[#1F1F1F] text-white'}
//                 >
//                   {framework.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

const ComboBox = () => {
  return (
    <div data-testid="Combo-box">
      <img src="/ComboBox.svg" />
    </div>
  );
};
export default ComboBox;
