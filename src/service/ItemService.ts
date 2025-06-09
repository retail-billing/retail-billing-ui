import axios from "axios";

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
    const formData = new FormData();
    formData.append('itemRequestJson', JSON.stringify(item));
    if (file) {
        formData.append('file', file);
    }
    console.log(formData);
    const response = await axios.post('http://localhost:8080/v1/admin/items', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        }
    });
    return response.data;
}

export const deleteItem = async (itemId: string) => {
    return await axios.delete<void>(`http://localhost:8080/v1/admin/items/${itemId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        }
    });
}

export const fetchItems = async () => {
    const response = await axios.get<Item[]>('http://localhost:8080/v1/items', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        },
    });
    return response.data;
}

export const fetchItemById = async (itemId: string) => {
    const response = await axios.get<Item>(`http://localhost:8080/v1/items/${itemId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        },
    });
    return response.data;
}