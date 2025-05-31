import {CategoryForm} from "@/components/category/CategoryForm.tsx";
import CategoryList from "@/components/category/CategoryList.tsx";

const ManageCategory = () => {
    return (<div
        className={`flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg`}>
        <div
            className={`Category Form flex-1 w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg m-2 lg:pr-8`}>
            <div className={`mb-12 font-bold underline`}>Create Category</div>
            <CategoryForm/>
        </div>
        <div className={`category-list flex-1 w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg m-2 lg:pl-8`}>
            <CategoryList/>
        </div>
    </div>)
}

export default ManageCategory