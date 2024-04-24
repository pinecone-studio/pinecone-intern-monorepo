'use client';

import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export const ChooseTypeButton = () => {
  const [chooseBtn, setChooseBtn] = useState(true);

  const handleChooseClick = () => {
    setChooseBtn(true);
  };

  const handlePhotoClick = () => {
    setChooseBtn(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: 220 }}>
      <div style={{ width: '110px', backgroundColor: chooseBtn ? 'black' : '#eef0f2', textAlign: 'center', borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}>
        <IconButton
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            color: chooseBtn ? '#eef0f2' : 'black',

            gap: 10,
            fontSize: '16px',
            fontWeight: 600,
            padding: '10px',
          }}
          onClick={handleChooseClick}
        >
          <RadioButtonCheckedIcon /> Сонгох
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100px',
          backgroundColor: !chooseBtn ? 'black' : '#eef0f2',

          borderTopRightRadius: '50px',
          borderBottomRightRadius: '50px',
        }}
      >
        <IconButton style={{ backgroundColor: 'transparent', color: !chooseBtn ? '#eef0f2' : 'black', padding: '10px', gap: 10, fontSize: '16px', fontWeight: 600 }} onClick={handlePhotoClick}>
          <AddPhotoAlternateIcon />
          <input id="file-input" type="file" style={{ display: 'none' }} />
          Зураг
        </IconButton>
      </div>
    </div>
  );
};
