const TableHeader = () => {
  return (
    <div className="w-full grid grid-cols-6 text-sm font-medium text-muted-foreground border-b border-b-1 p-3">
      <p className="px-4 ">Тоглолтын нэр</p>
      <p className="px-4">Дансны мэдээлэл</p>
      <p className="px-4">Эзэмшигчийн нэр</p>
      <p className="px-4 grid justify-end">Шилжүүлэх дүн</p>
      <p className="px-4 grid justify-end">Хүсэлт ирсэн огноо</p>
      <p className="px-4 grid justify-end">Төлөв</p>
    </div>
  );
};
export default TableHeader;
