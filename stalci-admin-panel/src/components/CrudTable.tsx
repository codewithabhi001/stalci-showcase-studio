import React, { Suspense } from "react";
import DataTable, { DataTableProps } from "./DataTable";

export default function CrudTable(props: DataTableProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted">Loading...</div>}>
      <DataTable {...props} />
    </Suspense>
  );
}

export type { Column, FormField, DataTableProps } from "./DataTable";
