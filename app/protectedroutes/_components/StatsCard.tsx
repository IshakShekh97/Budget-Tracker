"use client";

import { getBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card } from "@/components/ui/card";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React, { ReactNode, useCallback, useMemo } from "react";
import CountUp from "react-countup";

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}
const StatsCard = ({ from, to, userSettings }: Props) => {
  const statsQuery = useQuery<getBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;
  const balance = income - expense;

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      {/* Income */}
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          value={income}
          title="Income"
          formatter={formatter}
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10 " />
          }
        />
      </SkeletonWrapper>

      {/* Expense */}
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          value={expense}
          title="Expense"
          formatter={formatter}
          icon={
            <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10 " />
          }
        />
      </SkeletonWrapper>

      {/* Balance */}
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <StatCard
          value={balance}
          title="Balance"
          formatter={formatter}
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10 " />
          }
        />
      </SkeletonWrapper>
    </div>
  );
};

export default StatsCard;

function StatCard({
  formatter,
  value,
  title,
  icon,
}: {
  formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: string;
  value: number;
}) {
  const formatfn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );

  return (
    <Card className=" dark:bg-transparent/50 dark:backdrop-blur-[2px] container  flex h-24 w-full items-center justify-between max-md:justify-center max-md:gap-10  gap-2 py-4 px-10 max-sm:px-14 max-md:px-24 ">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatfn}
          className="text-2xl"
        />
      </div>
    </Card>
  );
}
