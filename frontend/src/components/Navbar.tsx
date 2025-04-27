import { 
  Container, 
  Flex, 
  Text, 
  Link, 
  HStack, 
  Button, 
  useColorMode, 
  IconButton,
  Box,
  useColorModeValue,
  Show,
  Hide
} from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("blue.600", "gray.800");
  const textColor = useColorModeValue("white", "whiteAlpha.900");
  const hoverBg = useColorModeValue("blue.700", "gray.700");

  return (
    <Box 
      as="nav" 
      position="sticky" 
      top={0} 
      zIndex="sticky" 
      w="full"
      bg={bgColor}
      boxShadow="md"
      borderBottom="1px"
      borderColor={useColorModeValue("blue.700", "gray.700")}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo/Brand */}
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <Flex alignItems="center">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                textTransform="uppercase"
                color={textColor}
                mr={2}
              >
                Product Management
              </Text>
            </Flex>
          </Link>

          {/* Desktop Navigation */}
          <Show above="md">
            <HStack spacing={4}>
              <Link href="/create">
                <Button 
                  leftIcon={<PlusSquareIcon />}
                  colorScheme="blue"
                  variant="solid"
                  size="md"
                  _hover={{ transform: "translateY(-1px)" }}
                >
                  Add Product
                </Button>
              </Link>
              
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <IoMoon /> : <LuSun />}
                onClick={toggleColorMode}
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                size="md"
              />
            </HStack>
          </Show>

          {/* Mobile Navigation */}
          <Hide above="md">
            <HStack spacing={2}>
              <IconButton
                aria-label="Add product"
                icon={<PlusSquareIcon />}
                as={Link}
                href="/create"
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                size="md"
              />

              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <IoMoon /> : <LuSun />}
                onClick={toggleColorMode}
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                size="md"
              />

            </HStack>
          </Hide>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;