"use client";

import {
  Column,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { format } from "date-fns";
import { ArrowUpDown, File, Folder } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionMenu from "./ActionMenu";
import StarButton from "./StarButton";
import formatFileSize from "@/utils/formatFileSize";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

interface TableViewProps<TData> {
  data: TData[];
}

export function TableView<TData, TValue>({ data }: TableViewProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const { showDetails, toggleShowDetails, setSelectedFile } = useOptionContext() as OptionContextType;

  const columns: any[] = [
    {
      id: "type-icon",
      cell: ({ row }: { row: Row<TData> }) =>
        row.getValue("type") === "folder" ? <Folder fill="white" /> : <File />,
    },
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<TData> }) => {
        return (
          <button
            className="flex items-center cursor-pointer hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "size",
      header: ({ column }: { column: Column<TData> }) => {
        return (
          <button
            className="flex items-center cursor-pointer hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Size
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }: { row: Row<TData> }) => {
        return row.getValue("size") === 0
          ? "-----"
          : formatFileSize(row.getValue("size"));
      },
    },
    {
      accessorKey: "lastModification",
      header: ({ column }: { column: Column<TData> }) => {
        return (
          <button
            className="flex items-center cursor-pointer hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Modification
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }: { row: Row<TData> }) => {
        return row.getValue("lastModification")
          ? format(row.getValue("lastModification"), "dd MMM yyyy")
          : "-----";
      },
    },
    {
      id: "actions",
      cell: ({ row }: { row: Row<TData> }) => {
        const rowData = row.original as FileType;

        return (
          <div className="flex items-center gap-2">
            <div
              className={`${
                rowData.type === "folder" ? "invisible" : "visible"
              }`}
            >
              <StarButton path={rowData.path} />
            </div>
            <ActionMenu row={rowData} direction="horizontal" />
          </div>
        );
      },
    },
  ];
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const handleClickRow = (row: Row<TData>) => {
    if (row.getValue("type") === "folder") {
      return router.push(pathname + "/" + row.getValue("name"));
    }

    if (!showDetails) toggleShowDetails();

    setSelectedFile(data[row.index] as FileType);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="cursor-pointer"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.id.includes("actions"))
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );

                  return (
                    <TableCell
                      onClick={() => handleClickRow(row)}
                      onDoubleClick={() => handleClickRow(row)}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
