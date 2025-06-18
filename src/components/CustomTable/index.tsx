"use client";

import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { IResponse } from "@/interfaces/comum";
// import { usePermission } from "@/context/permission";
// import { TableBodyEmpty } from "../TableBodyEmpty/table-body-empty";

const tailwindMinWidthMap: Record<string, string> = {
  xs: "min-w-[20rem]", // 320px
  sm: "min-w-[24rem]", // 384px
  md: "min-w-[28rem]", // 448px
  lg: "min-w-[32rem]", // 512px
  xl: "min-w-[36rem]", // 576px
  "2xl": "min-w-[42rem]", // 672px
  "3xl": "min-w-[48rem]", // 768px
  "4xl": "min-w-[56rem]", // 896px
};

type TailwindWidthKeyword =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

type MinWidthProp = TailwindWidthKeyword | `${number}px`;

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sorted: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DropdownsConfig<T> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
  permission?: string;
  color?: string;
  disabled?: (row: T) => boolean;
  render?: (row: T) => React.ReactNode;
  onClick?: (row: T, actionName: string) => void;
}

export interface TableActions<T> {
  onUpdate?: (id: string, row: T) => void;
  onDelete?: (id: string, row: T) => void;
  onDetails?: (id: string, row: T) => void;
  onAttachment?: (id: string, row: T) => void;
  onCustomAction?: (actionName: string, id: string, row: T) => void;
}

type CustomTableProps<T> = {
  data: IResponse<T>;
  columns: ColumnConfig<T>[];
  minWidth?: MinWidthProp;
  actionsReference?: string;
  dropdowns?: DropdownsConfig<T>[];
  order: string;
  type: string;
  onOrderChange: (column: string) => void;
  onRowClick?: (row: T) => void;
  actions?: TableActions<T>;
};

export default function CustomTable<T>({
  data,
  columns,
  minWidth = "md",
  actionsReference = "id",
  dropdowns,
  order,
  type,
  onOrderChange,
  onRowClick,
  actions,
}: CustomTableProps<T>) {
  const handleAction = (actionName: string, row: T) => {
    const id = String((row as Record<string, any>)[actionsReference]);

    const dropdown = dropdowns?.find((d) => d.name === actionName);
    if (dropdown?.onClick) {
      dropdown.onClick(row, actionName);
      return;
    }

    switch (actionName) {
      case "update":
        actions?.onUpdate?.(id, row);
        break;
      case "delete":
        actions?.onDelete?.(id, row);
        break;
      case "details":
        actions?.onDetails?.(id, row);
        break;
      case "anexo":
        actions?.onAttachment?.(id, row);
        break;
      default:
        actions?.onCustomAction?.(actionName, id, row);
        break;
    }
  };

  return (
    <div
      className={`overflow-x-hidden rounded-lg border ${
        data.items.length == 0 ? "h-full" : ""
      }`}
    >
      <Table
        className={clsx(
          "table-fixed w-full h-full",
          tailwindMinWidthMap[minWidth]
        )}
        style={
          !tailwindMinWidthMap[minWidth] && minWidth
            ? {
                minWidth:
                  typeof minWidth === "number" ? `${minWidth}px` : minWidth,
              }
            : undefined
        }
      >
        <TableHeader className="bg-background-alt text-accent-foreground rounded-lg">
          <TableRow>
            {columns.map((col) => {
              const isActive = String(col.key) === order;
              return (
                <TableHead
                  key={String(col.key)}
                  className={clsx(
                    "h-9 text-left font-medium text-label",
                    col.headerClassName
                  )}
                >
                  {col.sorted ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onOrderChange(String(col.key))}
                        className={clsx(
                          "hover:bg-transparent cursor-pointer flex justify-between items-center gap-1",
                          isActive && "font-bold"
                        )}
                      >
                        {col.label}
                        {isActive && (
                          <ArrowDown
                            className={clsx(
                              "h-4 w-4 transition-transform duration-200",
                              isActive && type === "desc" && "rotate-180"
                            )}
                          />
                        )}
                      </button>
                    </div>
                  ) : (
                    col.label
                  )}
                </TableHead>
              );
            })}
            {dropdowns && (
              <TableHead className="h-9 text-center font-medium"></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.length > 0 ? (
            data.items.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  className={index % 2 ? "bg-background-alt" : "bg-white"}
                >
                  {columns.map((col) => (
                    <TableCell
                      onClick={() => (onRowClick ? onRowClick(row) : undefined)}
                      key={String(col.key)}
                      className={`py-0.5 border-r border-gray-200 truncate overflow-hidden whitespace-nowrap text-label ${
                        col.className ?? ""
                      }`}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </TableCell>
                  ))}
                  {/*Dropdown de ações da tabela*/}
                  {dropdowns && (
                    <TableCell className="py-0.5 text-start border-t border-gray-200">
                      <div className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4 text-label" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            {dropdowns.map((dropdown, index) => {
                              const content = dropdown.render ? (
                                dropdown.render(row)
                              ) : (
                                <>
                                  {dropdown.icon}
                                  {dropdown.label}
                                </>
                              );

                              return (
                                <DropdownMenuItem
                                  key={index}
                                  disabled={
                                    dropdown.disabled?.(row)
                                    // !havePermission(
                                    //   `${pathSegments[0].replaceAll(
                                    //     "-",
                                    //     "_"
                                    //   )}_${dropdown.permission}`
                                    // )
                                  }
                                  onClick={() =>
                                    handleAction(dropdown.name, row)
                                  }
                                  className={clsx(
                                    "cursor-pointer gap-2 text-label",
                                    dropdown.color &&
                                      `text-${dropdown.color} focus:text-${dropdown.color}`
                                  )}
                                >
                                  {content}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
