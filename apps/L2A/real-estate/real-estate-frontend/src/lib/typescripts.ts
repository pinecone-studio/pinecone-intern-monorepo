
import { LucideIcon } from 'lucide-react';

/* eslint-disable no-unused-vars */
export type OthersCompProps = {
garage:boolean | string | null
setGarage:(value:string )=>void;
lift:boolean | string | null
setLift:(value:string)=>void;
balcony:boolean | string | null;
setBalcony:(value:string)=>void;
}

export type RestRoomsCompProps = {
restrooms: string  | null
setTotalRestrooms:(value:string)=>void
}

export type RoomsCompProps = {
    totalRooms:string | null
    setTotalRooms:(value:string)=>void
}

export type TypeCompProps = {
type:string | null
setType:(value:string)=>void
}

export type LocationCompProps = {
setCity: (value:string)=>void;
setDistrict: (value:string)=>void;

};

export type Props = {
  mainImage: string;
  images?: string[] | null;
  setMainImage: (src: string) => void;
};

export type InfoItem = {
  icon: LucideIcon;
  label: string;
  value?: string | number | null;
};