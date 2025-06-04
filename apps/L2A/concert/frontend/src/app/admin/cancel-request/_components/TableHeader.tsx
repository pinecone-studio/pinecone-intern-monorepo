const TableHeader = () => {
  return (
    <div className="w-full grid grid-cols-6 bg-gray-100 text-xs md:text-sm font-semibold text-muted-foreground border-b border-gray-300 px-4 py-2">
      <p className="px-2">Тоглолтын нэр</p>
      <p className="px-2">Дансны мэдээлэл</p>
      <p className="px-2">Эзэмшигчийн нэр</p>
      <p className="px-2 text-right">Шилжүүлэх дүн</p>
      <p className="px-2 text-right">Хүсэлт ирсэн огноо</p>
      <p className="px-2 text-right">Төлөв</p>
    </div>
  );
};

export default TableHeader;
