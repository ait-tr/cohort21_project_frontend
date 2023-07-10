import React from 'react';
import { Typography, Container } from '@mui/material';

export default function Contact(): JSX.Element {
    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
                Contact
            </Typography>
            <Typography>
                Tel: +49 176 284 18180,
            </Typography>
            <Typography display="block">
                web: www.ait-tr.de
            </Typography>
            <Typography>
                E-mail: go@ait-tr.de
            </Typography>
        </Container>
    );
}
