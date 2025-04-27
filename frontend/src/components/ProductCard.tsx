import { useState } from "react";
import { FC } from "react";
import { Product } from "../types/product.types";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { NoIDProduct } from "../types/product.types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const priceColor = useColorModeValue('blue.600', 'blue.300');
    const descriptionColor = useColorModeValue('gray.600', 'gray.400');

    const {deleteProduct, updateProduct} = useProductStore();
    const handleDeleteProduct = async (pid: string) => {
        const {success, message} = await deleteProduct(pid);

        if (!success) {
            toast({
              title: "Error",
              description: message,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top"
            });
          } else {
            toast({
              title: "Success!",
              description: message,
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top"
            });
        }
    }

    const handleUpdateProduct = async (pid: string, updatedProduct: NoIDProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();

        if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
    }

    return (
        <Box
            borderWidth="1px"
            borderColor={borderColor}
            shadow={'md'}
            rounded={'xl'}
            overflow={'hidden'}
            transition={'all 0.3s ease'}
            _hover={{ transform: 'translateY(-4px)', shadow: '2xl' }}
            bg={bg}
            w={{ base: 'full', sm: '320px', md: '360px' }}
            position="relative"
        >
            <Box position="relative" h={{ base: '240px', md: '280px' }} overflow="hidden">
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    w="full" 
                    h="full" 
                    objectFit="cover"
                    transition="transform 0.3s ease"
                    _hover={{ transform: 'scale(1.05)' }}
                />
                <Box
                    position="absolute"
                    top="0"
                    right="0"
                    p="2"
                    bg="blackAlpha.70"
                    borderBottomLeftRadius="xl"
                    transition="opacity 0.3s"
                    _groupHover={{ opacity: 1 }}
                >
                    <HStack spacing={2}>
                        <IconButton
                            aria-label="Edit Product"
                            icon={<EditIcon />}
                            onClick={onOpen}
                            size="sm"
                            colorScheme="blue"
                            variant="solid"
                            _hover={{ transform: 'translateY(-2px)' }}
                        />
                        <IconButton
                            aria-label="Delete Product"
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteProduct(product._id)}
                            size="sm"
                            colorScheme="red"
                            variant="solid"
                            _hover={{ transform: 'translateY(-2px)' }}
                        />
                    </HStack>
                </Box>
            </Box>

            <Box p={6}>
                <VStack align="start" spacing={4}>
                    <VStack align="start" spacing={2} w="full">
                        <Heading 
                            as="h3" 
                            size="md" 
                            noOfLines={2}
                            lineHeight="shorter"
                        >
                            {product.name}
                        </Heading>
                        <Text
                            fontSize="md"
                            color={descriptionColor}
                            noOfLines={2}
                            lineHeight="tall"
                        >
                            {product.description}
                        </Text>
                    </VStack>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={priceColor}
                    >
                        ${product.price}
                    </Text>
                </VStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: 'md' }}>
                <ModalOverlay backdropFilter="blur(2px)" />
                <ModalContent mx={4}>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={6}>
                            <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input
                                    placeholder="Product Name"
                                    name="name"
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                    size="lg"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    placeholder="Price"
                                    name="price"
                                    type="number"
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                    size="lg"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Image URL</FormLabel>
                                <Input
                                    placeholder="Image URL"
                                    name="image"
                                    value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                    size="lg"
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                            size="lg"
                            w={{ base: 'full', md: 'auto' }}
                        >
                            Update
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={onClose}
                            size="lg"
                            w={{ base: 'full', md: 'auto' }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;