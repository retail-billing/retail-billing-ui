import axios from 'axios';
import type {Category} from "@/context/CategoryContext.tsx";

export const addCategory = async (category: Omit<Category, "categoryId" | "createdAt" | "updatedAt" | "imageUrl">, file?: File) => {
    const formData = new FormData();
    formData.append('categoryRequestJson', JSON.stringify(category));
    if (file) {
        formData.append('file', file);
    }
    console.log(formData);
    const response = await axios.post('http://localhost:8080/v1/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deleteCategory = async (categoryId: string) => {
    return await axios.delete<void>(`http://localhost:8080/v1/categories/${categoryId}`);
}

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>('http://localhost:8080/v1/categories');
    return response.data;
}