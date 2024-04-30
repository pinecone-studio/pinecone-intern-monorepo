'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { UploadFile } from './File';
import { UploadText } from './UploadText';

const getColors = (chooseBtn: boolean) => {
  if (chooseBtn) {
    return {
      backgroundColor: 'black',
      iconColor: '#eef0f2',
    };
  }
  return {
    backgroundColor: '#eef0f2',
    iconColor: 'black',
  };
};

export const ChooseTypeButton = () => {
  const [chooseBtn, setChooseBtn] = useState(true);

  const handleChooseClick = () => {
    setChooseBtn(true);
  };

  const handlePhotoClick = () => {
    setChooseBtn(false);
  };

  const colors = getColors(chooseBtn);

  const centerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const isDrawTextStyle: React.CSSProperties = {
    ...centerStyle,
    width: '110px',
    backgroundColor: colors.backgroundColor,
    textAlign: 'center',
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
  };

  const isTextStyle: React.CSSProperties = {
    color: colors.iconColor,
    fontSize: '12px',
    fontWeight: 600,
    padding: '10px',
  };

  const isFileStyle: React.CSSProperties = {
    width: '100px',
    backgroundColor: colors.iconColor,
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
  };

  const isFileTextStyle = {
    color: colors.backgroundColor,
    fontSize: '12px',
    fontWeight: 600,
    padding: '10px',
  };

  return (
    <div style={{ ...centerStyle, flexDirection: 'column' }}>
      <div style={{ ...centerStyle, width: 220 }}>
        <div style={isDrawTextStyle}>
          <Button style={isTextStyle} onClick={handleChooseClick} startIcon={<RadioButtonCheckedIcon />}>
            Сонгох
          </Button>
        </div>
        <div style={isFileStyle}>
          <Button style={isFileTextStyle} onClick={handlePhotoClick} startIcon={<AddPhotoAlternateIcon />}>
            Зураг
          </Button>
        </div>
      </div>
      {chooseBtn ? <UploadText /> : <UploadFile />}
    </div>
  );
};
