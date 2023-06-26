import React from 'react';
import Box from '@mui/material/Box';
<<<<<<< HEAD
import Button from '@mui/material/Button';

=======
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
>>>>>>> 138f628dc56ec471129d981b1db1344592d49f6e
import {
  AccessibilityNewRounded,
  CelebrationRounded,
  DirectionsCarRounded,
  GroupsRounded,
  MapsHomeWorkRounded,
  SchoolRounded,
} from '@mui/icons-material';

<<<<<<< HEAD
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
=======
interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps): JSX.Element {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function CategoryNavTab(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="categoryNavTab">
        <LinkTab icon={<AccessibilityNewRounded />} label="Care" href="/care" />
        <LinkTab
          icon={<DirectionsCarRounded />}
          label="Carrier"
          href="/carrier"
        />
        <LinkTab icon={<SchoolRounded />} label="Education" href="/education" />
        <LinkTab icon={<CelebrationRounded />} label="Events" href="/events" />
        <LinkTab
          icon={<MapsHomeWorkRounded />}
          label="Houskeeping"
          href="/houskeeping"
        />
        <LinkTab
          icon={<GroupsRounded />}
          label="Specialist"
          href="/specialist"
        />
      </Tabs>
    </Box>
  );
}
>>>>>>> 138f628dc56ec471129d981b1db1344592d49f6e
