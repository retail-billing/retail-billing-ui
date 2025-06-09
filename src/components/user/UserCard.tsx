import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

interface UserCardProps {
  userId: string;
  name: string;
  email: string;
  role: string;
  onDelete?: (userId: string) => void;
}

const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length === 1) return names[0][0]?.toUpperCase() || "U";
  return (
    (names[0][0] || "").toUpperCase() + (names[1][0] || "").toUpperCase()
  );
};

const UserCard = ({ userId, name, email, role, onDelete }: UserCardProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-md bg-white shadow-sm">
      <Avatar>
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1">
        <span className="font-semibold text-base">{name}</span>
        <span className="text-sm text-gray-500">{email}</span>
        <span className="text-xs text-gray-400">{role}</span>
      </div>
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
                This action cannot be undone. This will permanently delete the user <span className="font-bold">{name}</span> and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(userId)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default UserCard;

