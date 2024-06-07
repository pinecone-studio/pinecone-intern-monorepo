import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shadcn/Tabs';
import { ClassCard } from '../_components/ClassCard';

type DataType = {
  __typename?: TypeNameClass | undefined;
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  teachers: string[] | undefined;
  classType: ClassType;
};

export enum ClassType {
  'CODING',
  'DESIGN',
}
type TypeNameClass = 'Class';

export const ClassCards = ({ data }: { data?: DataType[] }) => {
  return (
    <Tabs defaultValue="Бүгд" className="w-[1072px] mb-[30px]">
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
            ?.filter((item: DataType) => item.classType === ClassType.CODING)
            .map((item: DataType, index) => (
              <ClassCard key={item._id} data={item} />
            ))}
        </TabsContent>
        <TabsContent value="Design" className="grid w-full grid-cols-4 gap-y-[16px]">
          {data
            ?.filter((item: DataType) => item.classType === ClassType.DESIGN)
            .map((item: DataType, index) => (
              <ClassCard key={item._id} data={item} />
            ))}
        </TabsContent>
      </div>
    </Tabs>
  );
};
