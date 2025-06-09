import {useUser} from "@/context/UserContext";
import UserCard from "@/components/user/UserCard";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {useState} from "react";
import {deleteUser, fetchUsers} from "@/service/UserService";
import {toast} from "sonner";

const UserList = () => {
    const {users, setUsers} = useUser()
    const [search, setSearch] = useState("");

    const handleDelete = async (userId: string) => {
        await deleteUser(userId);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
        toast.success("User deleted successfully");
    };

    const filteredUsers = users?.filter(user => {
        return user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <div className="flex flex-col w-full space-y-6">
            <div className="font-bold underline">User List</div>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Search Users..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <ScrollArea className="w-full h-96 rounded-md border p-4">
                <div className="flex flex-col space-y-4 pb-2">
                    {filteredUsers?.map((user) => (
                        <UserCard
                            key={user.userId}
                            userId={user.userId}
                            name={user.name}
                            email={user.email}
                            role={user.role}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
                <ScrollBar orientation="vertical"/>
            </ScrollArea>
        </div>
    );
};
export default UserList;

