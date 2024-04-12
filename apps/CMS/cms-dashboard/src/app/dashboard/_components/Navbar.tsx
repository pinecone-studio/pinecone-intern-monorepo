import React from "react";
import { Stack } from '@mui/material';
import Image from "next/image";

const Navbar = () => {
    return (
        <Stack px={4} py={2} bgcolor={"#FFF"}>
            <Image src={"Logo.svg"} alt="" width={36} height={36}/>
        </Stack>
    );
};

export default Navbar;