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
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isInStore: boolean;
}

const ProductSkeleton = () => {
  return (
    <>
      <Box m={32} shadow={"md"} rounded={"md"}>
        <Flex justifyContent={"space-between"} px={"5"}>
          <Heading>
            <Skeleton>Product List</Skeleton>
          </Heading>
          <Button color="teal.300" leftIcon={<AddIcon />}>
            {""}
            <Skeleton>Add Product</Skeleton>
          </Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>
                  <Skeleton>Id</Skeleton>
                </Th>
                <Th>
                  <Skeleton>Name</Skeleton>
                </Th>
                <Th>
                  <Skeleton>Description</Skeleton>
                </Th>
                <Th>
                  <Skeleton>IsinStock</Skeleton>
                </Th>
                <Th isNumeric>
                  <Skeleton>Price</Skeleton>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton>01</Skeleton>
                  </Td>
                  <Td>
                    <HStack>
                      <SkeletonCircle>AD</SkeletonCircle>
                      <Text>
                        <Skeleton>Product Name</Skeleton>
                      </Text>
                    </HStack>
                  </Td>

                  <Td>
                    <Skeleton>Product Description</Skeleton>
                  </Td>
                  <Td>
                    <Badge>
                      <Skeleton>Yes</Skeleton>
                    </Badge>
                  </Td>
                  <Td>
                    <Skeleton>123456</Skeleton>
                    <Td>
                    <HStack>
                      <SkeletonCircle>1</SkeletonCircle>
                      <SkeletonCircle>1</SkeletonCircle>
                      <SkeletonCircle>1</SkeletonCircle>
                    </HStack>
                  </Td>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default ProductSkeleton;
