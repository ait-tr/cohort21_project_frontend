import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
  AccessibilityNewRounded,
  CelebrationRounded,
  DirectionsCarRounded,
  GroupsRounded,
  MapsHomeWorkRounded,
  SchoolRounded,
} from '@mui/icons-material';

interface CategoryNavTabProps {
  handleFilter: (value: string) => void;
}
const CategoryNavTab: React.FC<CategoryNavTabProps> = function CategoryNavTab({ handleFilter }) {
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        startIcon={<AccessibilityNewRounded />}
        sx={buttonStyle}
        onClick={() => handleFilter('care')}
      >
        Care
      </Button>
      <Button
        startIcon={<DirectionsCarRounded />}
        sx={buttonStyle}
        onClick={() => handleFilter('carrier')}
      >
        Carrier
      </Button>
      <Button
        startIcon={<SchoolRounded />}
        sx={buttonStyle}
        onClick={() => handleFilter('education')}
      >
        Education
      </Button>
      <Button
        startIcon={<CelebrationRounded />}
        sx={buttonStyle}
        onClick={() => handleFilter('events')}
      >
        Events
      </Button>
      <Button
        startIcon={<MapsHomeWorkRounded />}
        sx={buttonStyle}
        onClick={() => handleFilter('housekeeping')}
      >
        Housekeeping
      </Button>
      <Button
        startIcon={<GroupsRounded />}
        sx={buttonStyle}
        onClick={() => handleFilter('specialist')}
      >
        Specialist
      </Button>
    </Box>
  );
};

export default CategoryNavTab;
