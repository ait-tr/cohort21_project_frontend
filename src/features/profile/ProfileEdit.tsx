import React from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ProfileEditProps {
  email: string;
  phone: string;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  handleProfileUpdate: (email: string, phone: string) => void;
  handleSave: () => void;
}

export default function ProfileEdit({
  email,
  phone,
  setEmail,
  setPhone,
  handleProfileUpdate,
  handleSave,
}: ProfileEditProps): JSX.Element {
  return (
    <Box>
      <Box mt="1rem">
        <TextField
          id="email"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box mt="1rem">
        <TextField
          id="phone"
          label="Phone"
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Box>

      <Box sx={{ mt: '0.5rem' }}>
        <Button
          variant="contained"
          type="button"
          color="success"
          sx={{ mr: '0.5rem' }}
          onClick={() => handleProfileUpdate(email, phone)}
        >
          Save
        </Button>
        <Button variant="outlined" color="error" type="button" onClick={handleSave}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
