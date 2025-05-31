import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Link} from "react-router-dom"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"


export default function NavBar() {
    return <div className={`flex ml-4 mt-4 mb-4 space-x-4`}>
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
    </div>
}