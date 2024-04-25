import { Stack, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddSection from "./_features/AddSection";


const section = () => {
    return(
        <Stack sx={{backgroundColor:"#ECEDF0" , padding:4}}>
            <Stack sx={{display:"flex" , flexDirection:"row" , gap:1 , padding:4}}>
                <ArrowBackIosIcon/>
                <Typography>HTML Intro</Typography>
            </Stack>
            <AddSection/>
            <Typography sx={{alignSelf:"center" , paddingTop:8 , color:"#3F4145"}}>© 2023 Pinecone</Typography>
        </Stack>
    )
}
export default section