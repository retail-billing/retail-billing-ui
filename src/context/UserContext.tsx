import React, {createContext, useState, type ReactNode, useEffect, useContext} from 'react';
import { type User, fetchUsers } from '@/service/UserService';

interface UserContextType {
    users: User[] | null;
    setUsers: (users: User[] | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetchUsers();
            setUsers(response);
        };
        getUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};

