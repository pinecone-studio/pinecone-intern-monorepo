import { UpdateButton } from './UpdateButton';
type EmployeeProps = {
  position: string;
  department: string;
  dateofEmployment: string;
  timeWorked: string;
  state: string;
};
export const EmploymentInfo = (props: EmployeeProps) => {
  const { position, department, dateofEmployment, timeWorked, state } = props;
  return (
    // <Stack sx={{ maxWidth: '722px', padding: '24px', gap: '24px', borderRadius: '12px' }}>
    //   <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
    //     <Typography fontWeight={600} fontSize={18}>
    //       Хөдөлмөр эрхлэлтийн мэдээлэл
    //     </Typography>
    //     <Stack width={'129px'}>
    //       <UpdateButton />
    //     </Stack>
    //   </Stack>
    //   <Stack gap={1}>
    //     <Typography data-testid="employment-info" fontWeight={400} fontSize={16}>
    //       Албан тушаал
    //     </Typography>
    //     <Typography fontWeight={600} fontSize={16}>
    //       {position}
    //     </Typography>
    //   </Stack>
    //   <Stack gap={1}>
    //     <Typography fontWeight={400} fontSize={16}>
    //       Хэлтэс
    //     </Typography>
    //     <Typography fontWeight={600} fontSize={16}>
    //       {department}
    //     </Typography>
    //   </Stack>
    //   <Stack gap={1}>
    //     <Typography fontWeight={400} fontSize={16}>
    //       Ажилд орсон өдөр
    //     </Typography>
    //     <Typography fontWeight={600} fontSize={16}>
    //       {dateofEmployment}
    //     </Typography>
    //     {/* 2023-03-09 */}
    //   </Stack>
    //   <Stack gap={1}>
    //     <Typography fontWeight={400} fontSize={16}>
    //       Ажилласан хугацаа
    //     </Typography>
    //     <Typography fontWeight={600} fontSize={16}>
    //       {timeWorked} жил
    //     </Typography>
    //     {/* 1  */}
    //   </Stack>
    //   <Stack gap={1}>
    //     <Typography fontWeight={400} fontSize={16}>
    //       Төлөв
    //     </Typography>
    //     <Typography fontWeight={600} fontSize={16}>
    //       {state}
    //     </Typography>
    //   </Stack>
    // </Stack>
    <div className=" flex flex-col w-[722px] flex-col p-6 g-6 rounded-[12px] ">
      <div className="w-full flex justify-between"> </div>
      <div className="flex flex-col align p-4 rounded-  "></div>
    </div>
  );
};
