import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { PAGE_LIST } from '../constants';
import { selectedPageState } from '../services/atoms.services';
import { useRecoilState } from 'recoil';

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const PageFilter = () => {
  const theme = useTheme();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageState);

  const handleChange = (event) => {
    console.log("target value is ", event.target.value)
    const {
      target: { value },
    } = event;
    setSelectedPage(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="demo-multiple-chip-label">Page</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={selectedPage}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Chip key={selectedPage} label={PAGE_LIST[selectedPage].label} />
              
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {
            Object.entries(PAGE_LIST).map((item, idx) => {
                console.log("item is ", item)
                const keyName = item[1].key;
                const keyLabel = item[1].label;
                return (
                    <MenuItem
                        key={`${keyName}-${idx}`}
                        value={keyName}
                        style={getStyles(keyName, selectedPage, theme)}
                        >
                        {keyLabel}
                     </MenuItem>
                )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default PageFilter;