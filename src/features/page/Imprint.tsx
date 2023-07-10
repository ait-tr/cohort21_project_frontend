import React from 'react';
import { Typography, Container } from '@mui/material';

export default function Imprint(): JSX.Element {
    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
                AIT TR GmbH
            </Typography>
            <Typography variant="body1" component="div">
                <Typography>
                    Linkstraße 2, 8 Etage, 10785 Berlin, Germany
                    <Typography>
                        Tel: +49 176 284 18180,
                    </Typography>
                    <Typography>
                        web: www.ait-tr.de
                    </Typography>
                    <Typography>
                        E-mail: go@ait-tr.de
                    </Typography>
                    <Typography>
                        Registriert Amtsgericht Charlottenburg HRB 223350 B,
                    </Typography>
                    <Typography>
                        Geschäftsführer: Brovarnyy Denis, Victoria Prokopchuk
                    </Typography>
                    <Typography>
                        St.Nr (TaxID) 30/203/51209
                    </Typography>
                    <Typography>
                        USt-IdNr. (VAT ID) DE352204126
                    </Typography>
                </Typography>
            </Typography>
        </Container>
    );
}
