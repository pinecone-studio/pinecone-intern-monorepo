'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassCard from '../_components/ClassCard';
import { Class, ClassType } from '@/generated';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetClassesQuery } from '@/generated';
import { useState, useEffect } from 'react';
import { AddClassModal } from './AddClassModal';
import { ApolloError } from '@apollo/client';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (_term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => (
  <div className="relative flex items-center w-[373px]">
    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
    <Input placeholder="Сурагч, Анги, гэх/м..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  </div>
);

interface AddButtonProps {
  setIsOpen: (_isOpen: boolean) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ setIsOpen }) => (
  <Button data-testid="openModalButton" className="flex h-[40px] px-[16px] py-[8px] justify-center items-center gap-[8px]" onClick={() => setIsOpen(true)}>
    <p>Анги</p>
    <span>
      <Plus className="h-4 w-4" />
    </span>
  </Button>
);

interface ClassContentProps {
  classData: Class[];
  classType: string;
}

const ClassContent: React.FC<ClassContentProps> = ({ classData, classType }) => (
  <TabsContent value={classType} className="grid grid-cols-4 gap-4 absolute top-0 left-0 w-full overflow-auto">
    {classData
      .filter((item) => classType === 'Бүгд' || item.classType === ClassType[classType as keyof typeof ClassType])
      .map((item, index) => (
        <ClassCard key={index} data={item} />
      ))}
  </TabsContent>
);

const TabsListComponent: React.FC = () => (
  <TabsList className="grid w-[404px] grid-cols-3">
    <TabsTrigger value="Бүгд">Бүгд</TabsTrigger>
    <TabsTrigger value="Coding">Кодинг</TabsTrigger>
    <TabsTrigger value="Design">Дизайн</TabsTrigger>
  </TabsList>
);

const ClassContentWrapper: React.FC<{ classData: Class[] }> = ({ classData }) => (
  <>
    <ClassContent classData={classData} classType="Бүгд" />
    <ClassContent classData={classData} classType="Coding" />
    <ClassContent classData={classData} classType="Design" />
  </>
);

interface ContentRendererProps {
  loading: boolean;
  error: undefined | ApolloError;
  classData: Class[];
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ loading, error, classData }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;
  if (classData.length === 0) return <p>No classes found</p>;
  return <ClassContentWrapper classData={classData} />;
};

const ClassCardTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error, refetch } = useGetClassesQuery({
    variables: { search: searchTerm || undefined },
  });

  useEffect(() => {
    refetch({ search: searchTerm || undefined });
  }, [searchTerm, refetch]);

  const classData = data?.getClasses || [];

  return (
    <div className="flex justify-center" data-testid="class-card-tab">
      <div className="w-[1720px] py-[24px]">
        <Tabs defaultValue="Бүгд" className="flex flex-col gap-[36px]">
          <div className="flex flex-row justify-between items-center gap-[16px]">
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex flex-row gap-[12px]">
              <TabsListComponent />
              <AddButton setIsOpen={setIsOpen} />
              <AddClassModal open={isOpen} onOpenChange={setIsOpen} />
            </div>
          </div>
          <div className="relative h-[600px]">
            <ContentRenderer loading={loading} error={error} classData={classData} />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ClassCardTab;
