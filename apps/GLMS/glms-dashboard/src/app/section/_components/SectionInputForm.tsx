import { Stack, TextField, TextFieldProps, Typography } from "@mui/material"
const SectionInputForm = (props : TextFieldProps) => {
    const { label, type = 'text', helperText, ...rest } = props;
    return(
        <Stack data-testid="inputForm">
            <Typography fontWeight={"bold"} data-testid="label">{label}</Typography>
            <TextField
            {...rest}
            />
            <Typography data-testid="helperText" fontSize={12} color={'error'} >
                {helperText}
            </Typography>
        </Stack>
    );
};

export default SectionInputForm