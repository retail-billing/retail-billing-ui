import ItemList from "@/components/item/ItemList.tsx";
import {ItemForm} from "@/components/item/ItemForm.tsx";


const ManageItem = () => {
    return (<div
        className={`flex flex-col lg:flex-row min-h-screen w-full py-8 px-4 bg-gray-50 items-center justify-center font-sans`}>
        <div
            className={`Category Form flex-1 w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg lg:border-r lg:pr-8 mb-6 lg:mb-0`}>
            <div className={`mb-12 font-bold underline`}>Create Item</div>
            <ItemForm/>
        </div>
        <div className={`category-list flex-1 w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg lg:pl-8`}>
            <ItemList/>
        </div>
    </div>)
}

export default ManageItem