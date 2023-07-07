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
                bgcolor: '#FFFFFF',
                border: '1px solid #F5F5F5',
                paddingLeft: 5
            }}>
            © 2023 GetHelp, Inc. ·
            <Link href="#/imprint">Imprint</Link> ·
            <Link href="#/contact">Contact</Link>  ·
            <Link href="#/faq">FAQ</Link>
        </TableFooter>
    );
}
