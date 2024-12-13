'use client';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useGetArtistsQuery, useUpdateArtistMutation } from '@/generated';
import { AddArtistComponent } from './AddArtistComponent';

export const ArtistComponent = () => {
  const { data, refetch } = useGetArtistsQuery();
  const [updatedArtist] = useUpdateArtistMutation();

  const filteredData = data?.getArtists.filter((getArtists) => getArtists.status === 'Энгийн');

  const handleUpdateStatus = async (artist: string, status: string) => {
    await updatedArtist({
      variables: {
        input: { _id: artist, status },
      },
    });

    refetch();
  };

  return (
    <div data-cy="Artist-Component" className="Artist-component flex flex-col gap-6 mt-9">
      <div className="flex justify-between">
        <div className="flex flex-col items-start">
          <div className="text-[#09090B] text-lg font-medium text-center">Артист</div>
          <div className="text-[14px] text-[#71717A]">Идэвхитэй Артистууд</div>
        </div>

        <AddArtistComponent refetch={refetch} />
      </div>
      <div className="border"></div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="flex space-between">
                <TableCell className="text-[#71717A] text-[14px]">Артист нэр</TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Артист нэмэлт мэдээлэл
                </TableCell>

                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Төлөв
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((item, index) => (
                <TableRow data-testid={`getArtist-${index}`} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" className="text-[#09090B] text-[16px] font-semibold">
                    {item.artistName}
                  </TableCell>

                  <TableCell align="center" className="font-medium">
                    {item.additional}
                  </TableCell>

                  <TableCell align="center">
                    <AlertDialog data-testid="clickDialog">
                      <AlertDialogTrigger data-testid="clickDialogTrigger">
                        <div
                          className={`w-fit h-fit  
                             bg-[#FFFFFF] text-[14px] py-2 font-medium rounded-lg  px-3 border cursor-pointer
                         `}
                        >
                          {item.status}
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#FAFAFA] dark:text-black">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Төлөв өөрчлөх</AlertDialogTitle>
                          <AlertDialogDescription>{item.artistName}-н Төлөвийг өөрчлөх үү</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => handleUpdateStatus(item._id, 'Энгийн')} data-testid="cancelButton">
                            Идэвхтэй
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleUpdateStatus(item._id, 'Устгагдсан')} data-testid="actionButton">
                            Устгах
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
