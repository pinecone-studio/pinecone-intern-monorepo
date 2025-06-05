const TableHeader = () => {
  return (
    <div className="hidden md:flex justify-between bg-gray-50 text-xs md:text-sm font-semibold text-muted-foreground border-b px-6 py-3">
      <p className="w-1/5">Тоглолтын нэр</p>
      <p className="w-1/5">Дансны дугаар</p>
      <p className="w-1/5">Банкны нэр</p>
      <p className="w-1/5">Эзэмшигчийн нэр</p>
      <p className="w-1/5 text-right">Шилжүүлэх дүн</p>
      <p className="w-1/5 text-right">Огноо</p>
      <p className="w-[120px] text-right">Төлөв</p>
    </div>
  );
};

export default TableHeader;
