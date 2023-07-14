/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"
import { Button } from "@ui/button"
import { Input } from "@ui/input"

import { PriorityIcons, StatusIcons } from "./columns"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={Object.keys(StatusIcons).map((status) => ({
              label: status,
              value: status,
              icon: StatusIcons[status as keyof typeof StatusIcons],
            }))}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={Object.keys(PriorityIcons).map((priority) => ({
              label: priority,
              value: priority,
              icon: PriorityIcons[priority as keyof typeof PriorityIcons],
            }))}
          />
        )}
        {/* @TODO: ADD server side filtering */}
        {/* {
          table.getColumn("aiQualityScore") && (
            <DataTableFacetedFilter
            column={table.getColumn("aiQualityScore")}
            title="AI Quality Score"
            options={[
              { label: "High", value: "50" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
          />
          )
        } */}
        <div>
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
