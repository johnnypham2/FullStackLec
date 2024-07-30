import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Avatar,
  Text,
  Badge,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useToast,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import ProductSkeleton from "./ProductSkeleton";
import ProductForm from "./ProductForm";
import ViewDetails from "./ViewDetails";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isInStore: boolean;
}

const ProductTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen:viewDialogOpen, onOpen:onViewDialogOpen, onClose:viewDialogClose } = useDisclosure();

  const [currentData, setCurrentData] = useState<Product>({} as Product);

  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toast = useToast();

  //function to help us fetch our data with axios, handle error
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Product")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProduct = (id: number) => {
    axios
      .get(BASE_URL + "Product/" + id)
      .then((res) => {
        setCurrentData(res.data);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdd = () => {
    onOpen();
    setCurrentData({} as Product);
  };

const handleDelete = (id:number) => {
  axios.delete(BASE_URL+"Product/"+id).then(() => {
    toast({
      title:"Deleted",
      description:"Deleted",
      isClosable:true,
      duration: 4000
    })
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
}

const handleViewDetail = (id:number) => {
  axios.get<Product>(BASE_URL+"Product/"+id)
  .then(res => {
    setCurrentData(res.data)
    onViewDialogOpen()
  }).catch(error => {
    console.log(error);
  })
}

  if (isLoading) return <ProductSkeleton />;

  return (
    <>
      <ColorModeSwitch />
      <Box m={32} shadow={"md"} rounded={"md"}>
        <Flex justifyContent={"space-between"} px={"5"}>
          <Heading>Product List</Heading>
          <Button
            onClick={() => handleAdd()}
            color="teal.300"
            leftIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Is In Stock</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((product: Product) => (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>
                    <HStack>
                      <Avatar size={"sm"} name={product.name} />
                      <Text>{product.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{product.description}</Td>
                  <Td>
                    <Badge>{product.isInStore ? "Yes" : "No"}</Badge>
                  </Td>
                  <Td>{product.price}</Td>
                  <Td>
                    <HStack>
                      <EditIcon
                        onClick={() => getProduct(product.id)}
                        boxSize={23}
                        color={"orange.200"}
                      />
                      <Popover>
                        <PopoverTrigger>
                      <DeleteIcon boxSize={23} color={"red.400"} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Are you show you want to Delete?
                          </PopoverBody>
                          <PopoverFooter>
                            <Button colorScheme="red" variant={'outline'} onClick={() => handleDelete(product.id)}>Delete</Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                      <ViewIcon onClick={() => handleViewDetail(product.id)} boxSize={23} color={"blue.300"} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {data.length == 0 && <Heading textAlign={"center"}>No Data</Heading>}
        {isOpen && (
          <ProductForm
            currentData={currentData}
            fetchProduct={fetchData}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}

        {viewDialogOpen && <ViewDetails isOpen={viewDialogOpen} onClose={viewDialogClose} currentData={currentData}/>}
      </Box>
    </>
  );
};
export default ProductTable;
