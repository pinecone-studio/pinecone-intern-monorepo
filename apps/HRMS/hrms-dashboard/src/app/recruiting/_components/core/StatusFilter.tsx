import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const StatusFilter = () => {
  const labels = ['Draft', 'Closed', 'Published'];
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedLabel(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select value={selectedLabel} onChange={handleChange} displayEmpty sx={{ fontWeight: '600', height: '45px', paddingX: '4px' }}>
          <MenuItem value="">
            <em style={{ fontStyle: 'normal' }}>Төлөв</em>
          </MenuItem>
          {labels.map((label, index) => (
            <MenuItem key={index} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export const DateFilter = () => {
  const labels = ['4/30 - Мягмар', '5/1 - Лхагва', '5/2 - Пүрэв', '5/3 - Баасан'];
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedLabel(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select value={selectedLabel} onChange={handleChange} displayEmpty sx={{ fontWeight: '600', height: '45px', paddingX: '4px' }}>
          <MenuItem value="">
            <em style={{ fontStyle: 'normal' }}>Огноо</em>
          </MenuItem>
          {labels.map((label, index) => (
            <MenuItem key={index} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
