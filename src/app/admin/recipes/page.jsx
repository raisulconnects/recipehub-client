"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2, Star, Loader2 } from "lucide-react";
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

export default function AdminRecipesPage() {
  const router = useRouter();
  const { isPending } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = () => {
    fetch("/api/recipes?limit=100&showAll=true")
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleToggleFeature = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      await fetch(`/api/recipes/${id}/feature`, {
        method: "PATCH",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      fetchRecipes();
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      fetchRecipes();
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
        title="Manage Recipes"
        description="Edit, delete, or feature recipes that should appear on the homepage."
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
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe._id} className="border-white/10">
                  <TableCell className="font-medium text-zinc-900 dark:text-white">
                    {recipe.recipeName}
                  </TableCell>
                  <TableCell>{recipe.authorName}</TableCell>
                  <TableCell>{recipe.category}</TableCell>
                  <TableCell>
                    {recipe.isFeatured ? (
                      <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600">
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="rounded-full">
                        Not Featured
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
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/dashboard/edit-recipe/${recipe._id}`)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Recipe
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleToggleFeature(recipe._id)}>
                          <Star className="mr-2 h-4 w-4" />
                          {recipe.isFeatured
                            ? "Remove from Featured"
                            : "Feature Recipe"}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDelete(recipe._id)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Recipe
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
