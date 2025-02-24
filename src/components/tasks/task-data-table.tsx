import dateFormatter from "@/utils/date-formatter";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../ui/data-table";
import { useStore } from "@nanostores/react";
import { configs } from "@/stores/configs";
import { useTranslation } from "@/i18n";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export interface Template {
  id: string;
  name: string;
  body?: string;
  receivers: string[];
}

export interface Task {
  id: string;
  task: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  template?: Template;
}

interface Props {
  tasks: Task[];
}

export default function TaskDataTable({ tasks }: Props) {
  const $language = useStore(configs).locale;
  const t = useTranslation($language);
  const tailwindcss = {
    status: (bg: string = "bx-indigo-200") =>
      `flex justify-center ${bg} text-black p-1 rounded-sm font-medium text-white`,
  };
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "task",
      header: t("headers.task"),
      cell: ({ row }) => (
        <div className="dark:text-secondary bg-indigo-50 font-medium p-1 px-1.5 rounded-sm">
          {row.getValue("task")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("headers.status"),
      cell: ({ row }) => {
        const value: string = (row.getValue("status") as string).toLowerCase();

        switch (value) {
          case "completed":
            return (
              <div className={tailwindcss.status("bg-green-400")}>
                {t(`tasks.status.${value}`)}
              </div>
            );
          case "canceled":
            return (
              <div className={tailwindcss.status("bg-red-400")}>
                {t(`tasks.status.${value}`)}
              </div>
            );
          case "failed":
            return (
              <div className={tailwindcss.status("bg-red-700")}>
                {t(`tasks.status.${value}`)}
              </div>
            );
          case "queued":
            return (
              <div className={tailwindcss.status("bg-orange-400")}>
                {t(`tasks.status.${value}`)}
              </div>
            );
          default:
            return (
              <div className={tailwindcss.status()}>
                {t(`tasks.status.${value}`)}
              </div>
            );
        }
      },
    },
    {
      accessorKey: "date",
      header: t("headers.date"),
      cell: ({ row }) => dateFormatter(new Date(row.getValue("date"))),
    },
    {
      accessorKey: "createdAt",
      header: t("headers.createdAt"),
      cell: ({ row }) => dateFormatter(new Date(row.getValue("createdAt"))),
    },
    {
      accessorKey: "updatedAt",
      header: t("headers.updatedAt"),
      cell: ({ row }) => dateFormatter(new Date(row.getValue("updatedAt"))),
    },
  ];
  const dropDownContent = (task: Task) => (
    <>
      <DropdownMenuItem
        onClick={() => window.location.assign(`/tasks/${task.id}`)}
      >
        {t("tasks.dropdown.open")}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>
        {t("tasks.dropdown.copyId")}
      </DropdownMenuItem>
      <DropdownMenuItem disabled={task.status != "Created"}>
        {t("tasks.dropdown.cancel")}
      </DropdownMenuItem>
    </>
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={tasks}
        dropDownContent={dropDownContent}
        redirect="/tasks"
      />
    </>
  );
}
