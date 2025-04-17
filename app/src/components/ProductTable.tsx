'use client';

import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { provideGlobalGridOptions } from 'ag-grid-community';
import { TextFilterModule, ITextFilterParams, NumberFilterModule } from 'ag-grid-community';

// Import AG Grid and theme styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, TextFilterModule, NumberFilterModule]);

provideGlobalGridOptions({
  theme: "legacy"
});

const textFilterParams: ITextFilterParams = {
  filterOptions: ["contains", "notContains"],
  textFormatter: (r) => {
    if (r == null) return null;

    return r
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/æ/g, "ae")
      .replace(/ç/g, "c")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/ñ/g, "n")
      .replace(/[òóôõö]/g, "o")
      .replace(/œ/g, "oe")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ýÿ]/g, "y");
  },
  debounceMs: 200,
  maxNumConditions: 1,
};

type ProductRow = {
  id: number;
  title: string;
  product_type: string;
  tags: string;
  price: string;
  available: boolean;
};

export default function ProductTable() {
  const [rowData, setRowData] = useState<ProductRow[]>([]);
  const [columnDefs] = useState([
    { headerName: 'Title', minWidth: 400, field: 'title', sortable: true, filter: true, filterParams: textFilterParams },
    { headerName: 'Type', minWidth: 75, field: 'product_type', sortable: true, filter: 'agTextColumnFilter', filterParams: textFilterParams },
    {
      headerName: 'Price (£)',
      minWidth: 100,
      field: 'price',
      sortable: true,
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['greaterThan', 'lessThan', 'equals'],
        suppressAndOrCondition: true,
        inRangeInclusive: true,
      },
      valueParser: (params: any) => parseFloat(params.newValue.replace(/[^0-9.-]+/g, '')),
      comparator: (valueA: any, valueB: any) => valueA - valueB,
    },
    { 
      headerName: 'Available',
      minWidth: 100,
      field: 'available',
      sortable: true,
      filter: true,
      valueGetter: (params: any) => (params.data.available === 1 ? 'Available' : 'Not Available'),
      filterParams: {
        filterOptions: ['contains', 'notContains'],
        textFormatter: (value: string | null) => value?.toLowerCase(),
      }
    },
  ]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setRowData(data));
  }, []);

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: '100%', width: '100%', maxWidth: 1200 }} // Added maxWidth and centering
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        enableFilter={true}
      />
    </div>
  );
}