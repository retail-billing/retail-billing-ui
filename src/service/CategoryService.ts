import axios from 'axios';
import type {Category} from "@/context/CategoryContext.tsx";

export const addCategory = async (category: Omit<Category, "categoryId" | "createdAt" | "updatedAt" | "imageUrl">, file?: File) => {
    const formData = new FormData();
    formData.append('categoryRequestJson', JSON.stringify(category));
    if (file) {
        formData.append('file', file);
    }
    console.log(formData);
    const response = await axios.post('http://localhost:8080/v1/admin/categories', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        }
    });
    return response.data;
};

export const deleteCategory = async (categoryId: string) => {
    return await axios.delete<void>(`http://localhost:8080/v1/admin/categories/${categoryId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        }
    });
}

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>('http://localhost:8080/v1/categories', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        },
    });
    return response.data;
}