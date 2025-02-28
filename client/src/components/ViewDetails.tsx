import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useDisclosure,
  Avatar,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Product } from "./ProductTable";

interface ViewDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    currentData: Product
}


const ViewDetails = ({isOpen,onClose,currentData}:ViewDetailsProps) => {

    
  
  return (
    <>
    
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>View Details {currentData.name}</DrawerHeader>

          <DrawerBody>
            <HStack>
                <Avatar name={currentData.name} size={'lg'}/>
                <VStack>
                <Heading fontSize={16}>
                    {currentData.name}
                </Heading>
                <Heading fontSize={20}>
                    {currentData.price}
                </Heading>
                <Text>
                    {currentData.description}
                </Text>
                </VStack>
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ViewDetails;
