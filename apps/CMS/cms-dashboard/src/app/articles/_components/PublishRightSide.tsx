import { Stack, Box, Typography, Divider, Switch, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import AddPictureIcon from './icons/ArticleIcons';
import { styled } from '@mui/material/styles';



const PublishRightSide = () => {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const MockData: string[] = [ "Suggest1", "Suggest2", "Suggest3" ]

    return (
        <Stack sx={{ height:"100vh", width: "388px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
                <Box sx={{ display: "flex", padding: "24px", flexDirection: "column", gap: '16px' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ангилал</InputLabel>
                    <Select
                        data-testid="custom-select"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Ангилал"
                    >
                        {MockData.map((el, index) => {
                            return (
                                <MenuItem key={index} value={index}>{el}</MenuItem>
                            )
                        })} 
                    </Select>
                </FormControl>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", padding: "24px", flexDirection: "column", gap: '16px' }}>
                    <Typography data-testid="image-field-text" sx={{ fontSize: '18px', fontWeight: '600' }}>
                        Өнгөц зураг
                    </Typography>
                    <Button component="label" sx={{ bgcolor: '#F7F7F8', border: 'none', display: 'flex', flexDirection: 'column', paddingX: '72px', paddingY: '36px', gap: '8px', borderRadius: '12px' }}>
                        <AddPictureIcon />
                        <Typography sx={{ color: '#121316', fontSize: '16px' }}>Зураг оруулах</Typography>
                        <Typography sx={{ color: '#5E6166', fontSize: '12px' }}>Хэмжээ: 928x427</Typography>
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Box>
                <Divider sx={{ width: "100%" }} />
                <Box sx={{ display: "flex", padding: "24px", gap: '16px', alignItems: "center", justifyContent: "space-between" }}>
                    <Typography data-testid="comment-header-text" sx={{ fontSize: '18px', fontWeight: '600' }}>
                        Сэтгэгдэл идэвхтэй
                    </Typography>
                    <Switch data-testid="switch-input" color="success"/>
                </Box>
            </Box>
            <Box sx={{ paddingX: "24px", paddingY: "32px", display: "flex", flexDirection: "column", gap: "24px"}}>
                <Button data-testid="save-draft-button" sx={{paddingX: "20px", paddingY: "16px", background: "#121316", color: "white", fontSize: "18px", '&:hover': {background: "#121316"}}}>Ноорогт хадгалах</Button>
                <Button data-testid="publish-button" sx={{paddingX: "20px", paddingY: "16px", background: "#121316", color: "white", fontSize: "18px", '&:hover': {background: "#121316"}}}>Нийтлэх</Button>
            </Box>
        </Stack>
    )
}

export default PublishRightSide;