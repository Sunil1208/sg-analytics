import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({data, handleChange, name, value}) => {

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={(e) => {handleChange(e, name)}}
          input={<OutlinedInput  />}
          MenuProps={MenuProps}
          size="small"
          disabled={!data}
        >
          {data && data.map((name, index) => (
            <MenuItem
              key={`${name}-${index}-menu`}
              value={name}
            //   style={getStyles(name, value, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;