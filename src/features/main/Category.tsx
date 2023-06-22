import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import SchoolIcon from '@mui/icons-material/School';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HandymanIcon from '@mui/icons-material/Handyman';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MoneyIcon from '@mui/icons-material/Money';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function Category() : JSX.Element {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Education" icon={<SchoolIcon />} />
        <BottomNavigationAction label="Care" icon={<ChildCareIcon />} />
        <BottomNavigationAction label="Repair" icon={<HandymanIcon />} />
        <BottomNavigationAction label="Houskeeping" icon={<HomeWorkIcon />} />
        <BottomNavigationAction label="Finance" icon={<MoneyIcon />} />
        <BottomNavigationAction label="Bureaucracy" icon={<InsertDriveFileIcon />} />
      </BottomNavigation>
    </Box>
  );
}
