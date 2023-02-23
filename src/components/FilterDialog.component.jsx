import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import MultipleSelect from './forms/MultipleSelect.component';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filteredflightDataState, filterOptionDataState, filterPopUpState, flightDataState } from '../services/atoms.services';
import { getFilteredData } from '../utils/common.utils';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const FilterDialog = () => {
  const flightData = useRecoilValue(flightDataState);
  const [filterPopUpData, setFilterPopUpData] = useRecoilState(filterPopUpState);
  const setFilteredFlightData = useSetRecoilState(filteredflightDataState);
  const { isOpen, appliedFilters } = filterPopUpData;
  const filterDataOptions = useRecoilValue(filterOptionDataState);
  const { carriers, origins , years } = filterDataOptions;

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFilterPopUpData({
      ...filterPopUpData,
      appliedFilters: {
        ...filterPopUpData.appliedFilters,
        [name]: value
      }
    });
  };

  const handleClickOpen = () => {
    setFilterPopUpData({
      ...filterPopUpData,
      isOpen: true
    })
  };
  const handleClose = () => {
    setFilterPopUpData({
      ...filterPopUpData,
      isOpen: false
    })
  };

  const handleApplyFilter = () => {
    const filteredResults = getFilteredData(flightData, appliedFilters);
    setFilterPopUpData({
      ...filterPopUpData,
      isOpen: false
    });
    setFilteredFlightData(filteredResults);
  };

  const handleReset = () => {
    setFilterPopUpData({
      ...filterPopUpData,
      isOpen: false,
      appliedFilters: {
        ...filterPopUpData.appliedFilters,
        carriers: [],
        origins: [],
        startYear: "",
        endYear: ""
      }
    });
    setFilteredFlightData(undefined);
  }

  return (
    <>
      <Button 
        variant="outlined" 
        onClick={handleClickOpen} 
        endIcon={<FilterListIcon />} 
        size="small" 
        style={{height: "3rem"}}
        disabled={!flightData}
      >
        Filters
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="flex flex-col gap-y-2">
              {/** Origin City */}
              <div className="flex gap-x-2 items-center">
                <div className="basis-1/4">Origin City: </div>
                <div className="basis-3/4">
                  <MultipleSelect 
                    data={origins} 
                    handleChange={handleChange} 
                    value={appliedFilters.origins} 
                    name="origins"
                  />
                </div>
              </div>


              {/** Airline */}
              <div className="flex gap-x-2 items-center">
                <div className="basis-1/4">Airline: </div>
                <div className="basis-3/4">
                  <MultipleSelect 
                    data={carriers} 
                    handleChange={handleChange}
                    value={appliedFilters.carriers}
                    name="carriers"
                  />
                </div>
              </div>


              {/** Date */}
              <div className="flex gap-x-2 items-center">
                <div className="basis-1/4">Date: </div>
                <div className="basis-3/4">
                  <div className="flex justify-content gap-x-2">
                    {/** Start Year */}
                      <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small">Start</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={appliedFilters.startYear}
                        label="Start"
                        onChange={(e) => {handleChange(e, "startYear")}}
                        // disabled={!years || (years && years.length === 1)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {
                          years && years.map((year, idx) => {
                            return(
                              <MenuItem value={year} key={`year-${year}-${idx}`}>{year}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>

                      {/** End Year */}
                      <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small">End</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={appliedFilters.endYear}
                        label="End"
                        onChange={(e) => {handleChange(e, "endYear")}}
                        disabled={!years || (years && years.length === 1)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {
                          years && years.map((year, idx) => {
                            return(
                              <MenuItem value={year} key={`year2-${year}-${idx}`}>{year}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleApplyFilter}>
            Apply
          </Button>
          <Button autoFocus onClick={handleReset}>
            Reset
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default FilterDialog;