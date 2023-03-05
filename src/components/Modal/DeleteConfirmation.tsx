
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Text, Box, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";

type deleteProps= {
  showModal: any;
  hideModal: any;
  confirmModal: () => void;
};
const DeleteConfirmationModal: React.FC<deleteProps> = ({showModal, hideModal, confirmModal}) => {

 
  return (
    <>
<Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Delete Confirmation</ModalHeader>
    <ModalBody pb={6}>
     Are you sure you want to delete this topic?
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' mr={3}
      onClick={() => confirmModal()}>
        Confirm
      </Button>
      <Button onClick={hideModal}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
};
export default DeleteConfirmationModal;