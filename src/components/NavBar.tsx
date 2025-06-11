import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Link} from "react-router-dom"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return <div className={`flex ml-4 mt-4 mb-4 space-x-4 items-center`}>
        <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/dashboard">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Dashboard
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/explore">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Explore
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/items">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Manage Items
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/categories">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Manage Categories
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/users">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Manage Users
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1" />
        <Button variant="outline" onClick={handleLogout} className="mr-4">
            Logout
        </Button>
    </div>
}

