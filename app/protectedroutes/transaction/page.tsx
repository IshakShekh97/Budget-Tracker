"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import TransactionTable from "./_components/TransactionTable";

const Transactionpage = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <>
      <div className="border-b backdrop-blur-[3px] backdrop-brightness-200 backdrop-saturate-200">
        <div className="container flex justify-between flex-wrap items-end gap-6 py-8">
          <h2 className="text-3xl font-bold">Transactions History</h2>
          <div className="flex items-center gap-3">
            <DateRangePicker
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
              showCompare={false}
              onUpdate={(values) => {
                const { from, to } = values.range;

                if (!from || !to) return;
                if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                  toast.error(
                    `Date range is too big!, Max Allowed Range is ${MAX_DATE_RANGE_DAYS} days`
                  );
                  return;
                }
                setDateRange({ from, to });
              }}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </>
  );
};

export default Transactionpage;
