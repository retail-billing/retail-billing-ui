import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {useCategory} from "@/context/CategoryContext.tsx";

const Explore = () => {
    const {categories} = useCategory();
    console.log(categories);

    return (
        <div className="flex flex-col h-screen w-screen p-4">
            <ResizablePanelGroup direction={"horizontal"} className="bg-gray-100 rounded-lg shadow-lg flex-grow">
                <ResizablePanel defaultSize={60} className="flex flex-col p-4 md:p-6 bg-white rounded-lg shadow-md m-2">
                    <ResizablePanelGroup direction={`vertical`} className="flex-grow">
                        <ResizablePanel defaultSize={50}
                                        className="flex-1 bg-gray-100 p-4 rounded-lg mb-4 flex font-semibold underline">
                            Categories
                        </ResizablePanel>
                        <ResizableHandle/>
                        <ResizablePanel defaultSize={50}
                                        className="flex-1 bg-gray-100 p-4 rounded-lg flex font-semibold underline">
                            Items
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={40} className="flex flex-col p-4 md:p-6 bg-white rounded-lg shadow-md m-2">
                    <ResizablePanelGroup direction={`vertical`} className="flex-grow">
                        <ResizablePanel defaultSize={25}
                                        className="flex-1 bg-gray-100 p-4 rounded-lg mb-4 flex font-semibold underline">
                            Customer Form
                        </ResizablePanel>
                        <ResizableHandle/>
                        <ResizablePanel defaultSize={50}
                                        className="flex-1 bg-gray-100 p-4 rounded-lg mb-4 flex font-semibold underline">
                            Cart Items
                        </ResizablePanel>
                        <ResizableHandle/>
                        <ResizablePanel defaultSize={25}
                                        className="flex-1 bg-gray-100 p-4 rounded-lg flex font-semibold underline">
                            Cart Summary
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Explore;