"use client";

import { useState } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <p className="py-10 text-center text-sm text-zinc-500">
        You must be logged in to view this page.
      </p>
    );
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);

    const payload = {};
    if (name.trim() && name.trim() !== user.name) payload.name = name.trim();
    if (image.trim() && image.trim() !== user.image) payload.image = image.trim();

    if (Object.keys(payload).length === 0) {
      setSaving(false);
      setSuccess(true);
      return;
    }

    const { error: updateError } = await updateUser(payload);
    setSaving(false);
    if (updateError) {
      setError(updateError.message || "Failed to update profile");
      return;
    }

    setSuccess(true);
    refetch();
  };

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Profile"
        description="Update your personal details and profile image."
      />

      <div className="rounded-[2rem] border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Avatar className="h-24 w-24 border border-white/20 dark:border-white/10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-lg text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {user.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {user.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Profile updated successfully.
            </div>
          )}

          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              defaultValue={user.image || ""}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <Button
            type="submit"
            disabled={saving}
            className="w-fit rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
