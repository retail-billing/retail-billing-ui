import axios from "axios";
import { toast } from "sonner";

const API_URL = 'http://localhost:8080/v1/auth';
export interface LoginProps {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    email: string;
    role: string;
}

export const login = async (data: LoginProps): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
            email: data.email,
            password: data.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            return response.data;
        } else {
            throw new Error('Login failed: Invalid response');
        }
    } catch (error: unknown) {
        let message = 'Failed to login';
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            if (typeof error.response.data === 'object' && error.response.data.message) {
                message = error.response.data.message;
            }
        }
        toast.error(message);
        throw new Error(message);
    }
}
