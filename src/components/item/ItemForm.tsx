"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button.tsx"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {addItem, fetchItems} from "@/service/ItemService.ts";
import {useItem} from "@/context/ItemContext.tsx";
import {useCategory} from "@/context/CategoryContext.tsx";

const formSchema = z.object({
    image: z.any().optional(), // Or z.instanceof(File).optional() if you directly pass File objects
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    category: z.string(),
    price: z.number().nonnegative("Price must be a non-negative number."),
    quantity: z.number().min(1, "Quantity must be at least 1.").int("Quantity must be an integer."),
})

export function ItemForm() {
    const {categories} = useCategory();
    const {setItems} = useItem();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: undefined,
            name: "",
            description: "",
            category: "",
            price: undefined,
            quantity: 1,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const file = values.image?.[0];
        const itemPayload = {
            name: values.name,
            description: values.description,
            categoryId: values.category,
            price: values.price,
            quantity: values.quantity,
        };
        console.log(itemPayload);
        await addItem(itemPayload, file);
        const updatedItems = await fetchItems();
        setItems(updatedItems);
        form.reset();
        console.log(values)
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="image"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Input
                                        id="picture"
                                        type="file"
                                        onChange={e => field.onChange(e.target.files)}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="refrigerator" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="home appliance" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.categoryId} value={category.categoryId}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="1000"
                                    {...field}
                                    onChange={(e) => field.onChange(+e.target.value)}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="2"
                                    {...field}
                                    onChange={(e) => field.onChange(+e.target.value)}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Add Item</Button>
            </form>
        </Form>
    )
}
