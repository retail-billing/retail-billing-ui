import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {useCategory} from "@/context/CategoryContext.tsx";
import CategoryCard from "@/components/category/CategoryCard.tsx";
import {deleteCategory} from "@/service/CategoryService.ts";

const CategoryList = () => {
    const {categories} = useCategory()

    return <div className="flex flex-col w-full space-y-6">
        <div className="font-bold underline">
            Category List
        </div>
        <ScrollArea className="w-full rounded-md border p-4 pb-8">
            <div
                className="flex flex-row space-x-6 pb-2">
                {categories?.map((category) => (
                    <CategoryCard
                        key={category.categoryId}
                        id={category.categoryId}
                        categoryName={category.name}
                        imageUrl={category.imageUrl}
                        description={category.description}
                        backgroundColor={""}
                        onDelete={() => {
                            deleteCategory(category.categoryId);
                        }}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    </div>
}

export default CategoryList