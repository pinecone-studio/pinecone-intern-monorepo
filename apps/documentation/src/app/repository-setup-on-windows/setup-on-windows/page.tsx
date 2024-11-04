/* eslint-disable no-secrets/no-secrets */
'use client';

import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        Repository setup on Windows Guide
      </Typography>

      <Stack my={2}>
        <Typography variant="h6" fontWeight="bold">
          Step-1: Windows-ийн start aa нээгээд turn Windows features on or off гэж хайгаад цонхоо нээнэ. 
        </Typography>
        <Stack my={2}>
        <Image src="/images/step-1.png" width={900} height={400} alt='step-1'/>
        </Stack>
      </Stack>

      <Stack my={2}>
        <Typography variant="h6" fontWeight="bold">
          Step-2:  Тухайн жагсаалтан дотроос Windows Subsystems for Linux ийг сонгоно.
        </Typography>
        <Stack my={2}>
        <Image src="/images/step-2.png" width={900} height={400} alt='step-1'/>
        </Stack>
      </Stack>

      <Stack my={2}>
        <Typography variant="h6" fontWeight="bold">
          Step-3: Command prompt оо run as administartor - оор нээнэ.
        </Typography>
        <Stack my={2}>
        <Image src="/images/step-3.png" width={900} height={400} alt='step-1'/>
        </Stack>
      </Stack>

      <Stack my={2}>
        <Typography variant="h6" fontWeight="bold">
          Step-4: wsl --install command -ийг бичин ажиллууллна.
          
        </Typography>
        <Typography>Энэ нь windows дээр linux subsystems ээр суулгаж байгаа юм.</Typography>
        <Stack my={2}>
        <Image src="/images/step-5.png" width={900} height={400} alt='step-1'/>
        </Stack>
      </Stack>

      <Stack my={2}>
        <Typography variant="h6" fontWeight="bold">
          Step-5: wsl --install command -ийг бичин ажиллууллна.
          
        </Typography>
        <Typography>Энэ нь windows дээр linux subsystems ээр суулгаж байгаа юм.</Typography>
        <Stack my={2}>
        <Image src="/images/step-6.png" width={900} height={400} alt='step-1'/>
        </Stack>
      </Stack>

    </Stack>
  );
};

export default Page;
