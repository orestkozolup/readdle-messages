import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import { SxProps } from "@mui/material/styles";

import { containerSx, contentContainerSx, modalFooterSx } from "./styles";

interface ModalComponentProps {
  modalText: string;
  onConfirm: () => void;
  buttonType: ButtonProps["color"];
  buttonSx?: SxProps;
}

const ModalButton = ({
  modalText,
  onConfirm,
  buttonType,
  buttonSx,
}: ModalComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        variant="outlined"
        color={buttonType}
        onClick={handleModalOpen}
        sx={buttonSx}
      >
        Delete
      </Button>
      <Modal open={isOpen} onClose={handleCancel}>
        <Box sx={containerSx}>
          <Box sx={contentContainerSx}>
            <Typography variant="subtitle1">
              {modalText}
            </Typography>
          </Box>
          <Box sx={modalFooterSx}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm} color={buttonType} variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalButton;
