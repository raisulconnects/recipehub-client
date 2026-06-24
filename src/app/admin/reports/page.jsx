"use client";

import { useEffect, useState } from "react";
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

export default function AdminReportsPage() {
  const { isPending } = useSession();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = () => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then((data) => {
        setReports(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDismiss = async (id) => {
    try {
      await fetch(`/api/reports/${id}/dismiss`, { method: "PATCH" });
      fetchReports();
    } catch {}
  };

  const handleRemoveRecipe = async (id) => {
    if (!confirm("Remove the reported recipe? This cannot be undone.")) return;
    try {
      await fetch(`/api/reports/${id}/remove-recipe`, { method: "DELETE" });
      fetchReports();
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
        title="Recipe Reports"
        description="Review user reports and take moderation action when necessary."
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
                <TableHead>Recipe</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reports.map((report) => {
                const recipeName =
                  report.recipeId?.recipeName || "Unknown Recipe";
                return (
                  <TableRow key={report._id} className="border-white/10">
                    <TableCell className="font-medium text-zinc-900 dark:text-white">
                      {recipeName}
                    </TableCell>
                    <TableCell>{report.reporterEmail}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full">
                        {report.reason}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {report.status === "pending" ? (
                        <Badge className="rounded-full bg-amber-500 text-white hover:bg-amber-600">
                          {report.status}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="rounded-full text-zinc-500"
                        >
                          {report.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {report.status === "pending" && (
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
                            <DropdownMenuItem
                              onClick={() => handleDismiss(report._id)}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Dismiss Report
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleRemoveRecipe(report._id)}
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Recipe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
