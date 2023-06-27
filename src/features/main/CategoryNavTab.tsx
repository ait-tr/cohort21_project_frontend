import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  AccessibilityNewRounded,
  CelebrationRounded,
  DirectionsCarRounded,
  GroupsRounded,
  MapsHomeWorkRounded,
  SchoolRounded,
} from '@mui/icons-material';

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