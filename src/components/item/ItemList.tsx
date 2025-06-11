import {useItem} from "@/context/ItemContext";
import ItemCard from "@/components/item/ItemCard";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {deleteItem, fetchItems} from "@/service/ItemService";
import {toast} from "sonner";
import {useState} from "react";

const ItemList = () => {
    const {items, setItems} = useItem();
    const [search, setSearch] = useState("");

    const handleDelete = async (itemId: string) => {
        await deleteItem(itemId);
        const updatedItems = await fetchItems();
        setItems(updatedItems);
        toast.success("Item deleted successfully");
    };

    const filteredItems = items?.filter(item => {
        return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase()) ||
            item.categoryName.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="flex flex-col w-full space-y-6">
            <div className="font-bold underline">Item List</div>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Search Items..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="w-full">
                <ScrollArea className="w-full rounded-md border p-4">
                    <div className="flex gap-4 pb-4">
                        {filteredItems?.map((item) => (
                            <div key={item.itemId} className="min-w-[240px] max-w-[300px] sm:min-w-[280px]">
                                <ItemCard
                                    itemId={item.itemId}
                                    name={item.name}
                                    description={item.description}
                                    categoryName={item.categoryName}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
};

export default ItemList;