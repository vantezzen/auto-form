"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { CaptionProps, DayPicker, useNavigation } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  customCaption = true,
  ...props
}: CalendarProps & {
  customCaption?: boolean;
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="size-4" />,
        IconRight: () => <ChevronRight className="size-4" />,
        Caption: customCaption ? CustomCaption : undefined,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

function CustomCaption(props: CaptionProps) {
  const { goToMonth } = useNavigation();
  const currentYear = props.displayMonth.getFullYear();
  const maxYear = new Date().getFullYear();
  const currentMonth = props.displayMonth.getMonth() + 1;
  // 100 years before
  const years = Array.from({ length: 100 }, (_, i) => maxYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const convertMonth = (month: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  };

  const setDate = (year: number, month: number, date: number) => {
    return new Date(year, month, date, 0, 0, 0, 0);
  };

  return (
    <div className="flex flex-row space-x-1">
      <Select
        value={currentYear.toString()}
        onValueChange={(value) => {
          goToMonth(
            setDate(
              parseInt(value),
              props.displayMonth.getMonth(),
              props.displayMonth.getDate()
            )
          );
        }}
      >
        <SelectTrigger className="w-full rounded-none">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {years.map((year) => {
            return (
              <SelectItem value={year.toString()} key={year}>
                {year}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select
        value={currentMonth.toString()}
        onValueChange={(value) => {
          goToMonth(
            setDate(
              props.displayMonth.getFullYear(),
              parseInt(value) - 1,
              props.displayMonth.getDate()
            )
          );
        }}
      >
        <SelectTrigger className="w-full rounded-none">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => {
            return (
              <SelectItem value={month.toString()} key={month}>
                {convertMonth(month - 1)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
