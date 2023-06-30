import React from 'react';
import { Button, TextField } from '@mui/material';

interface ProfileEditProps {
  email: string;
  phone: string;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  handleProfileUpdate: (email: string, phone: string) => void;
  handleSave: () => void;
}

function ProfileEdit({
  email,
  phone,
  setEmail,
  setPhone,
  handleProfileUpdate,
  handleSave,
}: ProfileEditProps): JSX.Element {
  return (
    <div>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="phone"
        label="Phone"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button type="button" onClick={() => handleProfileUpdate(email, phone)}>
        Save
      </Button>
      <Button type="button" onClick={handleSave}>
        Cancel
      </Button>
    </div>
  );
}

export default ProfileEdit;
