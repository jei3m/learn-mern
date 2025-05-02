export interface Product {
    _id: string;
    name: string;
    image: string;
    count: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
}

export interface NoIDProduct {
    name: string;
    image: string;
    count: string;
    description: string;
}
  
interface ProductResponse {
    success: boolean;
    message: string;
}

export interface ProductStore {
    products: Product[];
    setProducts: (products: any[]) => void;
    createProduct: (newProduct: NoIDProduct) => Promise<ProductResponse>;
    fetchProducts: () => Promise<ProductResponse>;
    deleteProduct: (pid: string) => Promise<ProductResponse>;
    updateProduct: (pid: string, updatedProduct: NoIDProduct) => Promise<ProductResponse>;
}