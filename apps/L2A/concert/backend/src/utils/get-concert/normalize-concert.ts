export const normalizeConcert = (concertDoc: any) => {
  const concertObj = concertDoc.toObject();

  concertObj.seatData = (concertObj.seatData || []).filter(Boolean);
  concertObj.id = concertObj._id.toString();

  if (concertObj.venue && concertObj.venue._id) {
    concertObj.venue.id = concertObj.venue._id.toString();
  }

  concertObj.seatData = concertObj.seatData.map((seat: any) => {
    if (seat && seat._id) {
      return {
        ...seat,
        id: seat._id.toString(),
      };
    }
    return seat;
  });

  return concertObj;
};
