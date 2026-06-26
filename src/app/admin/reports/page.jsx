"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal, Trash2, CheckCircle2, Loader2, MessageSquareText } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminReportsPage() {
  const { isPending } = useSession();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailReport, setDetailReport] = useState(null);

  const fetchReports = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const headers = { ...(token && { Authorization: `Bearer ${token}` }) };
      const res = await fetch("/api/reports", { headers });
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch {
      setReports([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDismiss = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      await fetch(`/api/reports/${id}/dismiss`, {
        method: "PATCH",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      setDetailReport(null);
      fetchReports();
    } catch {}
  };

  const handleRemoveRecipe = async (id) => {
    if (!confirm("Remove the reported recipe? This cannot be undone.")) return;
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      await fetch(`/api/reports/${id}/remove-recipe`, {
        method: "DELETE",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      setDetailReport(null);
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
                <TableHead>Message</TableHead>
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
                      {report.note ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDetailReport(report)}
                          className="rounded-xl text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                          <MessageSquareText className="mr-1.5 h-3.5 w-3.5" />
                          View Note
                        </Button>
                      ) : (
                        <span className="text-xs text-zinc-400">—</span>
                      )}
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

      <Dialog open={!!detailReport} onOpenChange={(open) => { if (!open) setDetailReport(null); }}>
        <DialogContent className="max-w-sm sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>

          {detailReport && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 rounded-xl border bg-muted/50 p-3.5">
                <div className="flex items-start gap-3 text-sm">
                  <span className="min-w-[4.5rem] text-muted-foreground">Recipe</span>
                  <span className="font-medium">{detailReport.recipeId?.recipeName || "Unknown Recipe"}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="min-w-[4.5rem] text-muted-foreground">Reporter</span>
                  <span className="font-medium break-all">{detailReport.reporterEmail}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="min-w-[4.5rem] text-muted-foreground">Reason</span>
                  <Badge variant="outline" className="rounded-full">{detailReport.reason}</Badge>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 rounded-xl border border-amber-200/60 bg-amber-50/70 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                  Reporter's Note
                </p>
                <p className="text-sm leading-6 text-amber-900 dark:text-amber-200">
                  {detailReport.note || "No additional note provided."}
                </p>
              </div>

              {detailReport.status === "pending" ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDismiss(detailReport._id)}
                    className="rounded-xl"
                  >
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                    Dismiss Report
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveRecipe(detailReport._id)}
                    className="rounded-xl"
                  >
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                    Remove Recipe
                  </Button>
                </div>
              ) : (
                <p className="text-center text-xs text-muted-foreground">
                  This report has already been handled.
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
