"use client"
import { Button, Divider, Stack, TextField, Typography } from "@mui/material"
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import {useCreateSectionMutation} from "../../../generated"
import { useRef } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const AddSection = () => {

    const[createSection] = useCreateSectionMutation()
    const sectionInput = useRef({
        title: "",
        description : "",
        contentImage : ""
     })

    const handleBack = (field: string, value: string | number) => {
    sectionInput.current = { ...sectionInput.current, [field]: value };
  };

  const handleSubmit = async () => {
    try {
      const { data } = await createSection({
        variables: {
          title: sectionInput.current.title,
          description: sectionInput.current.description,
          contentImage: sectionInput.current.contentImage
        },
      });
     throw data
    } catch (error) {
      throw error
    }
  };
  
    return(
        <Stack data-testid="add-section-component" sx={{ display:"flex" , flexDirection:"column" , gap:4 , backgroundColor:"#fff" , borderRadius:4 , justifyContent:"center" , alignItems:"center" , padding:6 }}>
            <Stack sx={{display:"flex" , flexDirection:"column" , gap:4 , border:2 , borderRadius:4 , padding:4 , borderStyle:"dashed" , borderColor:"#D6D8DB" }}>
                <Stack>
                    <Typography sx={{fontWeight:"bold"}}>Хичээлийн гарчиг</Typography>
                    <TextField data-testid="add-section-title-input" onChange={(e)=> handleBack("title" , e.target.value)}  placeholder="Html"></TextField>
                </Stack>
                <Stack>
                    <Typography sx={{fontWeight:"bold"}}>Дэлгэрэнгүй</Typography>
                    <TextField data-testid="add-section-description-input" onChange={(e)=> handleBack("description" , e.target.value)} placeholder="Html introduction"></TextField>
                </Stack>
                <Stack>
                    <Typography sx={{fontWeight:"bold"}}> Хичээлийн зураг</Typography>
                    <Stack sx={{display:"flex" ,flexDirection:"column" , gap:1 , width:"588px" , height:"260px" , justifyContent:"center" , alignItems:"center" , border:2 , borderRadius:4 , borderStyle:"dashed" , borderColor:"#D6D8DB"}}>
                        <PhotoOutlinedIcon sx={{color:"#D6D8DB"}}/>
                        <Stack sx={{display:"flex", flexDirection:"row", gap:1 , color:"#D6D8DB"  }} >
                            <Typography>Зургийг чирж буулгах эсвэл</Typography>
                            <Typography sx={{fontWeight:"bold" , textDecoration:"underline" , color:"black"}} >Browse</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack sx={{display:"flex" , flexDirection:"row" , gap:2}}>
              <Button variant="outlined" sx={{borderColor:"black" , color:"black" , ":hover":{backgroundColor:"white" , borderColor:"black"}}}>Засах <EditOutlinedIcon/></Button>
              <Button variant="outlined" sx={{borderColor:"black" , color:"black" , ":hover":{backgroundColor:"white" , borderColor:"black"}}}>Устгах <DeleteOutlineOutlinedIcon/></Button>
              <Divider orientation="vertical" flexItem/>
              <Button data-cy="add-section-handle-btn" onClick={handleSubmit} sx={{width:"26px" , backgroundColor:"black" , alignSelf:"center", ":hover":{backgroundColor:"black"}}} variant="contained">+</Button>
            </Stack>
            <Divider sx={{width:"100%"}}/>
                <Stack sx={{display:"flex" , flexDirection:"row" , gap:"500px"}}>
                   <Button sx={{ width:"280px",color:"black" , borderColor:"black" , ":hover":{backgroundColor:"#fff" , borderColor:"black"}}} variant="outlined">Нийтлэх</Button>
                   <Button sx={{ width:"280px", backgroundColor:"#D6D8DB" , color:"#1c2024" , ":hover":{backgroundColor:"#D6D8DB"}}} variant="contained">Хадгалах</Button>
                </Stack>
        </Stack>
    )
}

export default AddSection