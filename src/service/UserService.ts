import axios from "axios";
import {toast} from "sonner";

const token = localStorage.getItem('token');

export interface User {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export const addUser = async (user: Omit<User, "userId" | "createdAt" | "updatedAt">) => {
    try {
        const response = await axios.post<User>('http://localhost:8080/v1/admin/users/register', user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error: unknown) {
        let message = 'Failed to add user';
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            if (typeof error.response.data === 'object' && error.response.data.message) {
                message = error.response.data.message;
            }
        }
        toast.error(message);
    }
};

export const deleteUser = async (userId: string) => {
    return await axios.delete<void>(`http://localhost:8080/v1/admin/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const fetchUsers = async () => {
    const response = await axios.get<User[]>('http://localhost:8080/v1/admin/users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchUserById = async (userId: string) => {
    const response = await axios.get<User>(`http://localhost:8080/v1/admin/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};