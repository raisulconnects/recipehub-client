"use client";

import { MoreHorizontal, ShieldOff, ShieldCheck, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const users = [
  {
    id: "u1",
    name: "Sophia Carter",
    email: "sophia@example.com",
    role: "user",
    isPremium: true,
    isBlocked: false,
  },
  {
    id: "u2",
    name: "Ayaan Malik",
    email: "ayaan@example.com",
    role: "user",
    isPremium: false,
    isBlocked: true,
  },
  {
    id: "u3",
    name: "Raihan Mobasherul",
    email: "raihan@example.com",
    role: "admin",
    isPremium: true,
    isBlocked: false,
  },
];

export default function AdminUsersPage() {
  const { isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Manage Users"
        description="View users, review account status, and block or unblock access."
      />

      <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-white/10">
                <TableCell className="font-medium text-zinc-900 dark:text-white">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-full capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.isPremium ? (
                    <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600">
                      Premium
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="rounded-full border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300"
                    >
                      Free
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.isBlocked ? (
                    <Badge variant="destructive" className="rounded-full">
                      Blocked
                    </Badge>
                  ) : (
                    <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600">
                      Active
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="rounded-xl">
                      {user.isBlocked ? (
                        <DropdownMenuItem>
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Unblock User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                          <ShieldOff className="mr-2 h-4 w-4" />
                          Block User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
