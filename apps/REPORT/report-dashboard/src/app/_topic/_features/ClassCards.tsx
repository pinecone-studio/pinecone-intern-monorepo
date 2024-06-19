import { Class, ClassType } from '@/generated';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shadcn/Tabs';
import { ClassCard } from '../_components/ClassCard';

export const ClassCards = ({ data }: { data: Class[] | null | undefined }) => {
  return (
    <Tabs defaultValue="Бүгд" className="w-[1072px] mb-[30px]" data-testid="class-cards">
      <TabsList className="grid w-[386px] grid-cols-3">
        <TabsTrigger value="Бүгд">Бүгд</TabsTrigger>
        <TabsTrigger value="Coding">Coding</TabsTrigger>
        <TabsTrigger value="Design">Design</TabsTrigger>
      </TabsList>
      <div className="mt-[24px]">
        <TabsContent value="Бүгд" className="grid w-full grid-cols-4 gap-y-[16px]">
          {data?.map((item, index) => (
            <ClassCard key={index} data={item} />
          ))}
        </TabsContent>
        <TabsContent value="Coding" className="grid w-full grid-cols-4 gap-y-[16px]">
          {data
            ?.filter((item: Class) => item.classType === ClassType.Coding)
            .map((item: Class, index) => (
              <ClassCard key={index} data={item} />
            ))}
        </TabsContent>
        <TabsContent value="Design" className="grid w-full grid-cols-4 gap-y-[16px]">
          {data
            ?.filter((item: Class) => item.classType === ClassType.Design)
            .map((item: Class, index) => (
              <ClassCard key={index} data={item} />
            ))}
        </TabsContent>
      </div>
    </Tabs>
  );
};
