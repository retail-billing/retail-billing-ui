import axios from "axios";
import {toast} from "sonner";

const token = localStorage.getItem("token");

export interface Item {
    itemId: string,
    name: string,
    description: string,
    categoryId: string,
    categoryName: string,
    price: number,
    quantity: number
    imageUrl: string
}

export const addItem = async (item: Omit<Item, "categoryName" | "itemId" | "imageUrl">, file?: File) => {
    try {
        const formData = new FormData();
        formData.append('itemRequestJson', JSON.stringify(item));
        if (file) {
            formData.append('file', file);
        }
        console.log(formData);
        const response = await axios.post('http://localhost:8080/v1/admin/items', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error: unknown) {
        let message = 'Failed to add item';
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            if (typeof error.response.data === 'object' && error.response.data.message) {
                message = error.response.data.message;
            }
        }
        toast.error(message);
    }
}

export const deleteItem = async (itemId: string) => {
    return await axios.delete<void>(`http://localhost:8080/v1/admin/items/${itemId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

export const fetchItems = async () => {
    const response = await axios.get<Item[]>('http://localhost:8080/v1/items', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
}

export const fetchItemById = async (itemId: string) => {
    const response = await axios.get<Item>(`http://localhost:8080/v1/items/${itemId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
}