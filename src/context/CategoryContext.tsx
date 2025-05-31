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

// 2. Define the shape of your context value
interface CategoryContextType {
    categories: Category[] | null; // The current category, can be null initially
    setCategories: (categories: Category[] | null) => void; // Function to update the category
}

// 3. Create the context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// 4. Create the Provider Component
interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<Category[] | null>(null);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetchCategories(); // Call your API function
            setCategories(response); // Populate categories
        };
        getCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

// 5. Create a custom hook for easy consumption
export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};