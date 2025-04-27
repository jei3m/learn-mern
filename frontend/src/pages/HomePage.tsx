import { useEffect } from 'react';
import { Container, VStack, Heading, Text, Link, SimpleGrid } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const {fetchProducts, products} = useProductStore()

  useEffect(() => {
    fetchProducts();
  },[]);

  const sortedProducts = [...products].sort((a, b) => {
    // Sort by updatedAt first
    const updatedAtDiff = new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
    
    // If updatedAt is the same, sort by createdAt
    if (updatedAtDiff !== 0) return updatedAtDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Container maxW={"container.xl"} py={8} px={{base: 4, md:8}}>
      <VStack spacing={8} align={'stretch'}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
          Current Products
        </Heading>

        <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          spacing={{base: 6, md: 8}}
          w={"full"}
          px={{base: 2, md: 4}}
          py={4}
        >

          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          
        </SimpleGrid>

        {!products.length &&
          <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
            No products found. {' '}
            <Link href="/create" color={'blue.500'}>
              Create one?
            </Link>
          </Text>
        }

      </VStack>
    </Container>
  )
}

export default HomePage;