import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {useCategory} from "@/context/CategoryContext.tsx";
import CategoryCard from "@/components/category/CategoryCard.tsx";
import {deleteCategory, fetchCategories} from "@/service/CategoryService.ts";
import { useState } from "react";
import { toast } from "sonner";

const CategoryList = () => {
    const {categories, setCategories} = useCategory()
    const [search, setSearch] = useState("");

    const filteredCategories = categories?.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase())
    );

    return <div className="flex flex-col w-full space-y-6">
        <div className="font-bold underline">
            Category List
        </div>
        <div className="mb-2">
            <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
        </div>
        <ScrollArea className="w-full rounded-md border p-4 pb-8">
            <div
                className="flex flex-row space-x-6 pb-2">
                {filteredCategories?.map((category) => (
                    <CategoryCard
                        key={category.categoryId}
                        id={category.categoryId}
                        categoryName={category.name}
                        imageUrl={category.imageUrl}
                        description={category.description}
                        backgroundColor={category.bgColor}
                        onDelete={async () => {
                            await deleteCategory(category.categoryId);
                            const updatedCategories = await fetchCategories();
                            setCategories(updatedCategories);
                            toast.success("Category deleted successfully");
                        }}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    </div>
}

export default CategoryList