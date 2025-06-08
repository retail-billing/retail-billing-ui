import ItemList from "@/components/item/ItemList.tsx";
import {ItemForm} from "@/components/item/ItemForm.tsx";


const ManageItem = () => {
    return (<div
        className={`flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg`}>
        <div
            className={`Category Form flex-1 w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg m-2 lg:pr-8`}>
            <div className={`mb-12 font-bold underline`}>Create Item</div>
            <ItemForm/>
        </div>
        <div className={`category-list flex-1 w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg m-2 lg:pl-8`}>
            <ItemList/>
        </div>
    </div>)
}

export default ManageItem