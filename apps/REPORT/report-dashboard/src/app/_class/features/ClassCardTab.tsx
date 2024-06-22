import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassCard from '../_components/ClassCard';
import { Class, ClassType } from '@/generated';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const data = [
  { id: '1', name: '1class', classType: ClassType.Coding, teachers: ['Эрдэнэцогт', 'Нандир'], endDate: '2022-12-31', startDate: '2022-12-01' },
  { id: '2', name: '2class', classType: ClassType.Coding, teachers: ['Эрдэнэцогт', 'Нандир'], endDate: '2022-12-31', startDate: '2022-12-01' },
  { id: '3', name: '3class', classType: ClassType.Design, teachers: ['Эрдэнэцогт', 'Нандир'], endDate: '2022-12-31', startDate: '2022-12-01' },
  { id: '4', name: '4class', classType: ClassType.Design, teachers: ['Эрдэнэцогт', 'Нандир'], endDate: '2022-12-31', startDate: '2022-12-01' },
  { id: '5', name: '5class', classType: ClassType.Design, teachers: ['Эрдэнэцогт', 'Нандир'], endDate: '2022-12-31', startDate: '2022-12-01' },
];

const CLassCardTab = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[1720px] py-[24px]">
        <Tabs defaultValue="Бүгд" className="flex flex-col gap-[36px]">
          <div className="flex flex-row justify-between items-center gap-[16px]">
            <div className="relative flex items-center w-[373px] ">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
              <Input placeholder="Сурагч, Анги, гэх/м..." className=" pl-8" />
            </div>
            <div className="flex flex-row gap-[12px]">
              <TabsList className="grid w-[404px] grid-cols-3">
                <TabsTrigger value="Бүгд">Бүгд</TabsTrigger>
                <TabsTrigger value="Coding">Кодинг</TabsTrigger>
                <TabsTrigger value="Design">Дизайн</TabsTrigger>
              </TabsList>
              <Button className="flex h-[40px] px-[16px] py-[8px] justify-center items-center gap-[8px]">
                <p>Анги</p>
                <span>
                  <Plus className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
          <div className="relative h-[600px]">
            <TabsContent value="Бүгд" className="grid grid-cols-4 gap-4 absolute top-0 left-0 w-full overflow-auto">
              {data?.map((item, index) => (
                <ClassCard key={index} data={item} />
              ))}
            </TabsContent>
            <TabsContent value="Coding" className="grid grid-cols-4 gap-4 absolute top-0 left-0 w-full overflow-auto">
              {data
                ?.filter((item: Class) => item.classType === ClassType.Coding)
                .map((item: Class, index) => (
                  <ClassCard key={index} data={item} />
                ))}
            </TabsContent>
            <TabsContent value="Design" className="grid grid-cols-4 gap-4 absolute top-0 left-0 w-full overflow-auto">
              {data
                ?.filter((item: Class) => item.classType === ClassType.Design)
                .map((item: Class, index) => (
                  <ClassCard key={index} data={item} />
                ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CLassCardTab;
