import React, {createContext, useState, type ReactNode, useContext, useEffect} from 'react';
import {fetchCategories} from "@/service/CategoryService.ts";

export interface Category {
    categoryId: string;
    name: string;
    description: string;
    bgColor: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryContextType {
    categories: Category[] | null;
    setCategories: (categories: Category[] | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<Category[] | null>(null);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetchCategories();
            setCategories(response);
        };
        getCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};