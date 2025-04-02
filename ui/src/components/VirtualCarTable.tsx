import { useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

export type Car = {
  ID: number;
  Price: number;
  Levy: string;
  Manufacturer: string;
  Model: string;
  ProdYear: number;
  Category: string;
  LeatherInterior: string;
  FuelType: string;
  EngineVolume: string;
  Mileage: string;
  Cylinders: number;
  GearBoxType: string;
  DriveWheels: string;
  Doors: string;
  Wheel: string;
  Color: string;
  Airbags: number;
};

export type CarColumnKey =
  | "ID"
  | "Price"
  | "Levy"
  | "Manufacturer"
  | "Model"
  | "ProdYear"
  | "Category"
  | "LeatherInterior"
  | "FuelType"
  | "EngineVolume"
  | "Mileage"
  | "Cylinders"
  | "GearBoxType"
  | "DriveWheels"
  | "Doors"
  | "Wheel"
  | "Color"
  | "Airbags";

export const carColumns: { key: CarColumnKey; width: number }[] = [
  { key: "ID", width: 70 },
  { key: "Price", width: 80 },
  { key: "Levy", width: 60 },
  { key: "Manufacturer", width: 130 },
  { key: "Model", width: 120 },
  { key: "ProdYear", width: 90 },
  { key: "Category", width: 100 },
  { key: "LeatherInterior", width: 110 },
  { key: "FuelType", width: 80 },
  { key: "EngineVolume", width: 100 },
  { key: "Mileage", width: 90 },
  { key: "Cylinders", width: 80 },
  { key: "GearBoxType", width: 110 },
  { key: "DriveWheels", width: 90 },
  { key: "Doors", width: 80 },
  { key: "Wheel", width: 80 },
  { key: "Color", width: 90 },
  { key: "Airbags", width: 80 },
];

const columnHelper = createColumnHelper<Car>();

const columns = carColumns.map((col) =>
  columnHelper.accessor(col.key, {
    header: col.key,
    size: col.width,
  })
);

export function VirtualCarTable({ data }: { data: Car[] }) {
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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {table.getHeaderGroups()[0].headers.map((header) => (
          <div
            key={header.id}
            style={{
              width: header.column.getSize(),
              padding: "0.5rem",
              fontWeight: "bold",
            }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        ))}
      </div>

      <div ref={parentRef} style={{ flex: 1, overflow: "auto" }}>
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
                  whiteSpace: "nowrap",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      padding: "0.5rem",
                    }}
                  >
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
