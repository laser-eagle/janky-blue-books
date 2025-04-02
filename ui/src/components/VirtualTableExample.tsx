import { useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

const columnHelper = createColumnHelper<{ name: string; age: number }>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("age", { header: "Age" }),
];

const data = new Array(10000).fill(0).map((_, i) => ({
  name: `Person ${i}`,
  age: 20 + (i % 50),
}));

export function VirtualTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Table Header */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {table.getHeaderGroups()[0].headers.map((header) => (
          <div
            key={header.id}
            style={{ flex: 1, padding: "0.5rem", fontWeight: "bold" }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        ))}
      </div>

      {/* Scrollable Rows */}
      <div
        ref={parentRef}
        style={{
          flex: 1,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "flex",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} style={{ flex: 1, padding: "0.5rem" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
