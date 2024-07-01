import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassCard from '../_components/ClassCard';
import { Class, ClassType } from '@/generated';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetClassesQuery } from '@/generated';

const ClassCardTab = () => {
  const { data, loading, error } = useGetClassesQuery();
  const classData = data?.getClasses;
  return (
    <div className="flex justify-center" data-testid="class-card-tab">
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
            <Button asChild className={'hidden'} />
          </div>
          <div className="relative h-[600px]">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error:{error?.message}</p>
            ) : (
              <div>
                <TabsContent value="Бүгд" className="grid grid-cols-4 gap-4 absolute top-0 left-0 w-full overflow-auto">
                  {classData?.map((item, index) => (
                    <ClassCard key={index} data={item} />
                  ))}
                </TabsContent>
                <TabsContent value="Coding" className="grid grid-cols-4 gap-4 absolute top-0 left-0 w-full overflow-auto">
                  {classData
                    ?.filter((item: Class) => item.classType === ClassType.Coding)
                    .map((item: Class, index) => (
                      <ClassCard key={index} data={item} />
                    ))}
                </TabsContent>
                <TabsContent value="Design" className="grid grid-cols-4 gap-4 absolute top-0 left-0 w-full overflow-auto">
                  {classData
                    ?.filter((item: Class) => item.classType === ClassType.Design)
                    .map((item: Class, index) => (
                      <ClassCard key={index} data={item} />
                    ))}
                </TabsContent>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ClassCardTab;
