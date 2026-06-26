"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
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

export default function AdminTransactionsPage() {
  const { isPending } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;
        const res = await fetch("/api/payments/transactions", {
          headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        });
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : []);
      } catch {
        setTransactions([]);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);

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

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
        </div>
      ) : (
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
                <TableRow key={txn._id} className="border-white/10">
                  <TableCell className="font-medium text-zinc-900 dark:text-white">
                    {txn.userEmail}
                  </TableCell>
                  <TableCell>${txn.amount}</TableCell>
                  <TableCell>
                    {txn.paidAt
                      ? new Date(txn.paidAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600">
                      {txn.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {txn.transactionId}
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
