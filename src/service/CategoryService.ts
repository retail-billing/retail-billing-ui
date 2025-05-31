import axios from 'axios';
import type {Category} from "@/context/CategoryContext.tsx";

export const addCategory = async (category: Category) => {
    return await axios.post<Category>('http://localhost:8080/v1/categories', category);
}

export const deleteCategory = async (categoryId: string) => {
    return await axios.delete<void>(`http://localhost:8080/v1/categories/${categoryId}`);
}

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>('http://localhost:8080/v1/categories');
    return response.data;
}