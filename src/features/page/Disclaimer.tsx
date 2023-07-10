import React from 'react';
import { Typography, Container } from '@mui/material';

export default function Disclaimer(): JSX.Element {
  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem', mb: 7 }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
        Disclaimer
      </Typography>
      <Typography variant="body1" component="div">
        <Typography sx={{ my: 2 }}>
          This website has been created as an educational project and does not
          generate any commercial benefits. All images and information provided on
          this website are purely illustrative and presented as examples.
        </Typography>
        <Typography sx={{ my: 2 }}>
          The administrators and authors of this website do not take any
          responsibility for the accuracy, completeness, and timeliness of the
          information provided. All information on this website is subject to change
          without prior notice.
        </Typography>
        <Typography sx={{ my: 2 }}>
          We make every effort to provide accurate and up-to-date information.
          However, we do not guarantee that the information on this website is
          error-free or that it will meet your specific requirements.
        </Typography>
        <Typography sx={{ my: 2 }}>
          By using this website, you acknowledge that any reliance you place on the
          information provided is at your own risk. We shall not be liable for any
          direct, indirect, incidental, consequential, or punitive damages arising
          out of your access to or use of this website.
        </Typography>
        <Typography sx={{ my: 2 }}>
          This disclaimer applies to the fullest extent permitted by law. If you
          disagree with any part of this disclaimer, please refrain from using our
          website.
        </Typography>
      </Typography>
    </Container>
  );
}
