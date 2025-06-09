import axios from 'axios';
import type {Category} from "@/context/CategoryContext.tsx";

const token = localStorage.getItem('token');

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
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const deleteCategory = async (categoryId: string) => {
    return await axios.delete<void>(`http://localhost:8080/v1/admin/categories/${categoryId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

export const fetchCategories = async () => {
    const response = await axios.get<Category[]>('http://localhost:8080/v1/categories', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
}