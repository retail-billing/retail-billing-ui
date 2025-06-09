"use client"

import { addCategory, fetchCategories } from "@/service/CategoryService.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button.tsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import {ColorPicker} from "@/components/ui/color-picker.tsx";
import {useCategory} from "@/context/CategoryContext.tsx";

const formSchema = z.object({
    image: z.any().optional(), // Or z.instanceof(File).optional() if you directly pass File objects
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Please enter a valid hex color code (e.g., #RRGGBB or #RGB).",
    }),
})

export function CategoryForm() {
    const {setCategories} = useCategory()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            backgroundColor: "",
            image: undefined
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const file = values.image?.[0];
        const categoryPayload = {
            name: values.name,
            description: values.description,
            bgColor: values.backgroundColor,
        };
        await addCategory(categoryPayload, file);
        const updatedCategories = await fetchCategories();
        setCategories(updatedCategories);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="home appliance" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="home appliance" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="backgroundColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background Color</FormLabel>
                            <FormControl>
                                {/* Use your custom ColorPicker component */}
                                <ColorPicker value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Add Category</Button>
            </form>
        </Form>
    )
}
