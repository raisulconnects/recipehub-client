"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const transactions = [
  {
    id: "txn_001",
    user: "sophia@example.com",
    amount: "$4.99",
    date: "2026-06-21",
    status: "success",
  },
  {
    id: "txn_002",
    user: "ayaan@example.com",
    amount: "$9.99",
    date: "2026-06-22",
    status: "success",
  },
];

export default function AdminTransactionsPage() {
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
        title="Transactions"
        description="Track support payments and premium purchases across the platform."
      />

      <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transaction ID</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id} className="border-white/10">
                <TableCell className="font-medium text-zinc-900 dark:text-white">
                  {txn.user}
                </TableCell>
                <TableCell>{txn.amount}</TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>
                  <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600">
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{txn.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
