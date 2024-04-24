"use client"
import { Button, Divider, Stack, TextField, Typography } from "@mui/material"
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import {useCreateSectionMutation} from "../../../generated"
import { useRef } from "react";

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
      console.log('Section created successfully:', data);
    } catch (error) {
      console.error('Error creating section:', error);
      throw error;
    }
  };
  
    return(
        <Stack data-testid="add-section-component" sx={{ display:"flex" , flexDirection:"column" , gap:4 , backgroundColor:"#fff" , borderRadius:4 , justifyContent:"center" , alignItems:"center" , padding:6 }}>
            <Stack sx={{ display:"flex" , flexDirection:"row" , gap:4 , backgroundColor:"#fff" , borderRadius:4 , justifyContent:"center" , alignItems:"center" , padding:6 }}>
            <Stack sx={{width:4 , height:"546px", backgroundColor:"black" , borderTopLeftRadius:10 , borderBottomLeftRadius:10 }}>
            </Stack>
            <Stack sx={{display:"flex" , flexDirection:"column" , gap:4 }}>
                <Stack>
                    <Typography sx={{fontWeight:"bold"}}>Хичээлийн гарчиг</Typography>
                    <TextField data-cy="add-section-title-input" onChange={(e)=> handleBack("title" , e.target.value)} helperText="" placeholder="Оруулна уу..."></TextField>
                </Stack>
                <Stack>
                    <Typography sx={{fontWeight:"bold"}}>Дэлгэрэнгүй</Typography>
                    <TextField data-cy="add-section-description-input" onChange={(e)=> handleBack("description" , e.target.value)} placeholder="Энд бичнэ үү..."></TextField>
                </Stack>
                <Stack>
                    <Typography sx={{fontWeight:"bold"}}> Хичээлийн зураг</Typography>
                    <Stack sx={{display:"flex" ,flexDirection:"column" , gap:1 , width:"588px" , height:"260px" , justifyContent:"center" , alignItems:"center" , borderStyle:'dashed' , border:2 , borderRadius:4}}>
                        <PhotoOutlinedIcon/>
                        <Stack sx={{display:"flex", flexDirection:"row", gap:1  }} >
                            <Typography>Зургийг чирж буулгах эсвэл</Typography>
                            <Typography sx={{fontWeight:"bold" , textDecoration:"underline"}} >Browse</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
        <Button data-cy="add-section-handle-btn" onClick={handleSubmit} sx={{width:"200px" , backgroundColor:"black" , alignSelf:"center", ":hover":{backgroundColor:"black"}}} variant="contained">+</Button>
            <Divider sx={{width:"100%"}}/>
                <Stack sx={{display:"flex" , flexDirection:"row" , gap:"500px"}}>
                   <Button sx={{ width:"280px",color:"black" , borderColor:"black" , ":hover":{backgroundColor:"#fff" , borderColor:"black"}}} variant="outlined">Нийтлэх</Button>
                   <Button sx={{ width:"280px", backgroundColor:"#D6D8DB" , color:"#1c2024" , ":hover":{backgroundColor:"#D6D8DB"}}} variant="contained">Хадгалах</Button>
                </Stack>
        </Stack>
    )
}

export default AddSection