import { formatDate, formatDateRelative } from "@/utils/handle-date";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../ui/data-table";
import { useStore } from "@nanostores/react";
import { configs } from "@/stores/configs";
import { useTranslation } from "@/i18n";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { TTooltip } from "../ui/tooltip";

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
        <span className="dark:text-secondary bg-indigo-50 font-medium p-1 px-1.5 rounded-sm">
          {row.getValue("task")}
        </span>
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
              <span className={tailwindcss.status("bg-green-400")}>
                {t(`tasks.status.${value}`)}
              </span>
            );
          case "canceled":
            return (
              <span className={tailwindcss.status("bg-red-400")}>
                {t(`tasks.status.${value}`)}
              </span>
            );
          case "failed":
            return (
              <span className={tailwindcss.status("bg-red-700")}>
                {t(`tasks.status.${value}`)}
              </span>
            );
          case "queued":
            return (
              <span className={tailwindcss.status("bg-orange-400")}>
                {t(`tasks.status.${value}`)}
              </span>
            );
          default:
            return (
              <span className={tailwindcss.status()}>
                {t(`tasks.status.${value}`)}
              </span>
            );
        }
      },
    },
    {
      accessorKey: "date",
      header: t("headers.date"),
      cell: ({ row }) => (
        <TTooltip
          trigger={formatDate(new Date(row.getValue("date")), $language)}
          content={formatDateRelative(
            new Date(row.getValue("date")),
            $language,
          )}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("headers.createdAt"),
      cell: ({ row }) => (
        <TTooltip
          trigger={formatDate(new Date(row.getValue("createdAt")), $language)}
          content={formatDateRelative(
            new Date(row.getValue("createdAt")),
            $language,
          )}
        />
      ),
    },
    {
      accessorKey: "updatedAt",
      header: t("headers.updatedAt"),
      cell: ({ row }) => (
        <TTooltip
          trigger={formatDate(new Date(row.getValue("updatedAt")), $language)}
          content={formatDateRelative(
            new Date(row.getValue("updatedAt")),
            $language,
          )}
        />
      ),
    },
  ];

  const dropDownContent = (task: Task) => (
    <>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          window.location.assign(`/tasks/${task.id}`);
        }}
      >
        {t("tasks.dropdown.open")}
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(task.id);
        }}
      >
        {t("tasks.dropdown.copyId")}
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={task.status != "Created"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
