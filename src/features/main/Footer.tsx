import * as React from 'react';
import { TableFooter, Link } from '@mui/material';

export default function Footer(): JSX.Element {
  return (
    <TableFooter
      sx={{
        color: 'black',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        py: 1.5,
        bgcolor: '#e0dfe4',
        borderTop: 1,
        paddingLeft: 5,
      }}
    >
      © 2023 GetHelp, Inc. ·
      <Link sx={{ mx: 1, fontWeight: 600 }} href="#/disclaimer">
        Disclaimer
      </Link>
      ·
      <Link sx={{ mx: 1, fontWeight: 600 }} href="#/imprint">
        Imprint
      </Link>
      ·
      <Link sx={{ mx: 1, fontWeight: 600 }} href="#/contact">
        Contact
      </Link>
      ·
      <Link sx={{ mx: 1, fontWeight: 600 }} href="#/faq">
        FAQ
      </Link>
    </TableFooter>
  );
}
