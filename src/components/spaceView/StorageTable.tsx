"use client";

import {
  Column,
  Row,
  SortingState,
  Table as TableType,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import StorageButtons from "./StorageButtons";
import StarButton from "../dataView/StarButton";
import ActionMenu from "../dataView/ActionMenu";
import formatFileSize from "@/utils/formatFileSize";

type TableViewProps<TData> = {
  data: TData[];
};

const StorageTable = <TData, TValue>({ data }: TableViewProps<TData>) => {
  const columns: any[] = [
    {
      id: "select",
      header: ({ table }: { table: TableType<TData> }) => (
        <Checkbox
          className={
            table.getFilteredSelectedRowModel().rows.length === 0
              ? "hidden"
              : "block"
          }
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: Row<TData> }) => (
        <Checkbox
          className={
            table.getFilteredSelectedRowModel().rows.length === 0
              ? "hidden"
              : "block"
          }
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: () => {
        return (
          <button className="flex items-center cursor-pointer hover:text-foreground">
            Name
          </button>
        );
      },
    },
    {
      accessorKey: "size",
      header: ({ column }: { column: Column<TData> }) => {
        return (
          <button
            className="flex items-center cursor-pointer hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? "Lowest Size" : "Highest Size"}
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

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "size",
      desc: true,
    },
  ]);

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const handleClickRow = (row: Row<TData>) => {
    const key = row.index.toString();
    //@ts-expect-error
    setRowSelection({ ...rowSelection, [key]: !rowSelection[key] });
  };

  return (
    <div>
      <StorageButtons
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        data={data}
      />
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
              table
                .getRowModel()
                .rows.slice(0, 9)
                .map((row) => (
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StorageTable;
