"use client";

import { useRouter } from "next/navigation";

import { LogOut, PencilIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import toast from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export const UserProfile = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-muted h-8 w-8 rounded-lg">
          <AvatarImage
            src={user?.image ?? ""}
            alt="avatar"
            className="mix-blend-multiply"
          />
          <AvatarFallback className="rounded-lg">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="bg-muted/80 flex items-center gap-2 rounded-lg px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user?.image ?? ""}
                alt="avatar"
                className="mix-blend-multiply"
              />
              <AvatarFallback className="rounded-lg">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/profile">
              <PencilIcon />
              Edit Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  toast.success("Logged out successfully");
                  router.push("/");
                },
                onError: ({ error }) => {
                  toast.error(error.message);
                },
              },
            })
          }
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
