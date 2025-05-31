import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface CategoryCardProps {
    id: string; // Unique ID for the category, useful for deletion
    categoryName: string;
    imageUrl: string;
    description: string;
    backgroundColor: string;
    onDelete: (categoryId: string) => void; // Callback function for deletion
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, categoryName, imageUrl, description, backgroundColor, onDelete }) => {
    return (
        <Card className={`w-[300px]`} style={{backgroundColor: backgroundColor}}>
            <CardHeader>
                <CardTitle>{categoryName}</CardTitle>
                <CardDescription>
                    {imageUrl && (
                        <div className="relative w-full h-40 overflow-hidden rounded-md mt-2">
                            <img
                                src={imageUrl}
                                alt={categoryName}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">
                    {description}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete {categoryName}</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                <span className="font-bold"> {categoryName}</span> category and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};

export default CategoryCard;