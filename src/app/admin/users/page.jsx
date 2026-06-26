"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal, ShieldOff, ShieldCheck, Loader2 } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
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

export default function AdminUsersPage() {
  const { isPending } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const headers = { ...(token && { Authorization: `Bearer ${token}` }) };
      const res = await fetch("/api/users", { headers });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      await fetch(`/api/users/${id}/block`, {
        method: "PATCH",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      fetchUsers();
    } catch {}
  };

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

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
        </div>
      ) : (
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
                <TableRow key={user._id} className="border-white/10">
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
                        <Button variant="ghost" size="icon" className="rounded-xl">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem onClick={() => handleToggleBlock(user._id)}>
                          {user.isBlocked ? (
                            <>
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Unblock User
                            </>
                          ) : (
                            <>
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Block User
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
