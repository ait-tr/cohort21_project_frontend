import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface HelpCardModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageUrl: string;
}
const HelpCardModal: React.FC<HelpCardModalProps> = ({
  open,
  onClose,
  title,
  description,
  imageUrl,
}): JSX.Element => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt="green iguana"
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Modal>
    );
  };

export default HelpCardModal;
