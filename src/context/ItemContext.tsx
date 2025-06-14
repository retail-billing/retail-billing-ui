import React, {createContext, useState, type ReactNode, useEffect, useContext} from 'react';
import {type Item, fetchItems } from '@/service/ItemService';

interface ItemContextType {
    items: Item[] | null;
    setItems: (items: Item[] | null) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

interface ItemProviderProps {
    children: ReactNode;
}

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
    const [items, setItems] = useState<Item[] | null>(null);

    useEffect(() => {
        const getItems = async () => {
            const response = await fetchItems();
            setItems(response);
        };
        getItems();
    }, []);

    return (
        <ItemContext.Provider value={{ items, setItems }}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => {
    const context = useContext(ItemContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};

