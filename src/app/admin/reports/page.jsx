"use client";

import { MoreHorizontal, Trash2, CheckCircle2, Loader2 } from "lucide-react";
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

const reports = [
  {
    id: "r1",
    recipe: "Spicy Chicken Ramen",
    reporter: "nadia@example.com",
    reason: "Spam",
    status: "pending",
  },
  {
    id: "r2",
    recipe: "Butter Chicken Bowl",
    reporter: "lucas@example.com",
    reason: "Copyright Issue",
    status: "pending",
  },
];

export default function AdminReportsPage() {
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
        title="Recipe Reports"
        description="Review user reports and take moderation action when necessary."
      />

      <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Recipe</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="border-white/10">
                <TableCell className="font-medium text-zinc-900 dark:text-white">
                  {report.recipe}
                </TableCell>
                <TableCell>{report.reporter}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-full">
                    {report.reason}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="rounded-full bg-amber-500 text-white hover:bg-amber-600">
                    {report.status}
                  </Badge>
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
                      <DropdownMenuItem>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Dismiss Report
                      </DropdownMenuItem>

                      <DropdownMenuItem className="text-red-500 focus:text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Recipe
                      </DropdownMenuItem>
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
