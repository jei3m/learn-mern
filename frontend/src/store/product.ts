import {create} from "zustand";
import { ProductStore } from "../types/product.types";

// global state
export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct: { name: string; image: string; price: string; description: string }) => {
        
        if(!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.description) {
            return {success:false, message:"Please fill in all fields."}
        }

        try {
            const res = await fetch('/api/products', {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newProduct)
            })
    
            const data = await res.json();
            set((state) => ({products:[...state.products, data.data]}));
            return {success:true, message:"Product created successfully!"};

        } catch (error) {
            return {success:false, message:"Failed to create product"};
        }
    },
    fetchProducts: async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            set({products:data.data});
            return {success:true, message:"Products fetched successfully!"};
        } catch (error) {
            return {success:false, message:"Failed to fetch products"};
        }
    },
    deleteProduct: async (pid: string) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method:"DELETE",
            })
            const data = await res.json();

            if(!data.success) {
                return {success:false, message:"Failed to delete product"};
            }

            // To filter recently deleted product
            set(state => ({products:state.products.filter(product => product._id !== pid)}));
            return {success:true, message:"Product deleted successfully!"};
        } catch (error) {
            return {success:false, message:"Failed to delete product"};
        }
    },
    updateProduct: async (pid: string, updatedProduct: { name: string; image: string; price: string; description: string }) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(updatedProduct)
            })
            const data = await res.json();

            if(!data.success) {
                return {success:false, message:"Failed to update product"};
            }

            set((state) => ({
                products: state.products.map((product) => product._id === pid ? data.data : product),
            }));

            return {success:true, message:"Product updated successfully!"};

        } catch (error) {
            return {success:false, message:"Failed to update product"};
        }
    }
}))