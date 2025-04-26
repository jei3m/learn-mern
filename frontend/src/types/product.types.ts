export interface Product {
    _id: string;
    name: string;
    image: string;
    price: string;
    description: string;
}

export interface CreateProduct {
    name: string;
    image: string;
    price: string;
    description: string;
}
  
interface CreateProductResponse {
    success: boolean;
    message: string;
}

export interface ProductStore {
    products: Product[];
    setProducts: (products: any[]) => void;
    createProduct: (newProduct: CreateProduct) => Promise<CreateProductResponse>;
    fetchProducts: () => Promise<CreateProductResponse>;
    deleteProduct: (pid: string) => Promise<CreateProductResponse>;
}