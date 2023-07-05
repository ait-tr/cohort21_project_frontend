import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { getProfile } from '../auth/authSlice';
import { selectUser } from '../auth/selectors';

interface UploadFormProps {
  onClose: () => void;
}

function UploadForm({ onClose }: UploadFormProps): JSX.Element {
  const user = useSelector(selectUser);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!image) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await fetch('api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Файл загружен на сервер.');
        setImage(null);
        onClose();
        window.location.reload();
      } else {
        console.log('Произошла ошибка при загрузке файла на сервер.');
      }
    } catch (error) {
      console.log('Произошла ошибка при загрузке фрйла на сервер:', error);
    }
  };

  const handleCancel = (): void => {
    onClose();
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontFamily: 'Literata' }}>
        Add or Change your profile image
      </Typography>
      <FormControl component="form" onSubmit={handleSubmit}>
        <InputLabel htmlFor="imageInput" />
        <TextField
          type="file"
          id="imageInput"
          inputProps={{ accept: 'image/jpeg' }}
          onChange={handleImageChange}
        />
        <Box sx={{ mt: 1, mb: 1, mr: 1 }}>
          <Button sx={{ mr: 1 }} variant="contained" color="success" type="submit">
            Accept
          </Button>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="error"
            type="reset"
          >
            Close
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}

export default UploadForm;
