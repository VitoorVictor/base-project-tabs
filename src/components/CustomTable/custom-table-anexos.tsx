"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Lottie from "react-lottie";
import clsx from "clsx";
import animationData from "../../../public/lottiefiles/empty.json";
import { IAnexo } from "@/interfaces/anexo";
import { usePermissionStore } from "@/store/permissionStore";
import { Button } from "../ui/button";
import { Eye, Trash } from "lucide-react";
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

type CustomTableAnexosProps<T> = {
  data: IAnexo[];
  columns: ColumnConfig<IAnexo>[];
  minWidth?: MinWidthProp;
};

export function CustomTableAnexos<T>({
  data,
  columns,
  minWidth = "md",
}: CustomTableAnexosProps<T>) {
  const { hasPermission } = usePermissionStore();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={`overflow-x-hidden rounded-md border  ${
        data.length == 0 ? "h-full" : ""
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
        <TableHeader className="bg-background-sidebar text-accent-foreground rounded-md">
          <TableRow>
            {columns.map((col) => {
              return (
                <TableHead
                  key={col.key}
                  className={clsx(
                    "h-9 text-left font-medium text-label",
                    col.headerClassName
                  )}
                >
                  {col.label}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length <= 0 && (
            <TableRow className="hover:bg-white ">
              <TableCell colSpan={columns.length} className="text-center py-10">
                <div className="flex justify-center items-center mt-2">
                  <Lottie options={defaultOptions} width={240} />
                </div>
                <h1 className="text-center mt-12 text-xl">
                  Opss... Não encontramos nenhum registro na consulta.
                </h1>
              </TableCell>
            </TableRow>
          )}
          {data.map((row, index) => {
            return (
              <TableRow
                key={index}
                className={index % 2 ? "bg-background-sidebar" : "bg-white"}
              >
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={`py-0.5 border-r border-gray-200 text-label break-words whitespace-pre-wrap ${col.className}`}
                  >
                    <span className="max-w-full w-full text-wrap">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
