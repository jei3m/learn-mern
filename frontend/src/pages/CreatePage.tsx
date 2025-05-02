import { 
  Container, 
  Heading, 
  Box, 
  useColorModeValue, 
  VStack, 
  Input, 
  Button, 
  useToast,
  FormControl,
  FormLabel,
  Textarea,
  Image,
  Flex,
  Spinner
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

function CreatePage() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    count: "",
    image: ""
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    setIsSubmitting(true);
    const { success, message } = await createProduct(newProduct);

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
      
      // Reset form
      setNewProduct({
        name: "",
        description: "",
        count: "",
        image: ""
      });
    }
    setIsSubmitting(false);
  };

  const cardBg = useColorModeValue("white", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="container.md" py={8} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="stretch">
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={cardBg}
          p={{ base: 4, md: 8 }}
          rounded="xl"
          shadow="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6}>
            {newProduct.image && (
              <Box w="full" textAlign="center">
                <Image
                  src={newProduct.image}
                  alt="Product preview"
                  maxH="200px"
                  mx="auto"
                  rounded="md"
                /> 
              </Box>
            )}

            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Product Name</FormLabel>
              <Input
                placeholder="Enter product name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                bg={inputBg}
                size="lg"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Description</FormLabel>
              <Textarea
                placeholder="Enter detailed product description"
                name="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                bg={inputBg}
                size="lg"
                rows={4}
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Count</FormLabel>
              <Input
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                name="count"
                value={newProduct.count}
                onChange={(e) => setNewProduct({...newProduct, count: e.target.value})}
                bg={inputBg}
                size="lg"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Image URL</FormLabel>
              <Flex align="center">
                <Input
                  placeholder="Paste image URL or upload"
                  name="image"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  bg={inputBg}
                  size="lg"
                  focusBorderColor="blue.500"
                  flex="1"
                />
              </Flex>
            </FormControl>

            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
              size="lg"
              mt={4}
              isLoading={isSubmitting}
              loadingText="Creating..."
              spinner={<Spinner size="sm" mr={2} />}
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
              transition="all 0.2s"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;