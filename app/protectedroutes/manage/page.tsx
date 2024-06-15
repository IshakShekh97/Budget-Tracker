"use client";

import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from "lucide-react";
import CreateCategoryDialog from "../_components/CreateCategoryDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import DeleteCategoryDialog from "../_components/DeleteCategoryDialog";

const page = () => {
  return (
    <>
      <div className="border-b backdrop-blur-[3px] backdrop-brightness-200 backdrop-saturate-200">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div className="">
            <p className="text-3xl font-bold ">Manage</p>
            <p className="text-muted-foreground">
              Manage your account settings and Categories
            </p>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-4 p-4">
        <Card className="dark:bg-transparent/50 dark:backdrop-blur-[2px]">
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set Your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </>
  );
};

export default page;

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvalable = categoriesQuery.data && categoriesQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card className="dark:bg-transparent/50 dark:backdrop-blur-[2px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "expense" ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500" />
              ) : (
                <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
              )}

              <div className="">
                {type === "income" ? "Incomes" : "Expenses"} Categories{" "}
                <div className="text-xs text-muted-foreground">
                  Sorted By Name
                </div>
              </div>
            </div>
            <CreateCategoryDialog
              type={type}
              successCallback={() => {
                categoriesQuery.refetch();
              }}
              trigger={
                <Button variant={"outline"} className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create Category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvalable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p className="">
              No
              <span
                className={cn(
                  "m-1",
                  type === "income" ? "text-emerald-500" : "text-red-500"
                )}
              >
                {type}
              </span>
              categories yet
            </p>

            <p className="text-center text-muted-foreground">
              Create one to get started
            </p>
          </div>
        )}

        {dataAvalable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            variant={"outline"}
            className="flex w-full border-separate items-center gap-2 rounded-none text-muted-foreground hover:bg-amber-700 hover:text-black hover:rounded-md hover:font-bold"
          >
            <TrashIcon className="h-4 w-4" /> Remove
          </Button>
        }
      />
    </div>
  );
}
