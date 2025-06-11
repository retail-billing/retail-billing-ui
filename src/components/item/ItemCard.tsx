import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ItemCardProps {
  itemId: string;
  name: string;
  description: string;
  categoryName: string;
  price: number;
  imageUrl?: string;
  onDelete?: (itemId: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ itemId, name, description, categoryName, price, imageUrl, onDelete }) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {imageUrl && (
            <div className="relative w-full h-40 overflow-hidden rounded-md mt-2">
              <img
                src={imageUrl}
                alt={name}
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
        <div className="mt-2">
          <span className="text-xs text-gray-400 block">{categoryName}</span>
          <span className="text-sm font-medium text-gray-700">₹{price}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete {name}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the item
                  <span className="font-bold"> {name}</span> and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(itemId)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;

