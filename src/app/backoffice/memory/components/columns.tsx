/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client"

import { type MissionVector } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@ui/badge"
import { Checkbox } from "@ui/checkbox"
import {
  AlertCircle,
  ArrowDownCircle,
  ArrowRightCircle,
  ArrowUpCircle,
  CheckCircle,
  CircleDot,
  CircleOff,
  type LucideIcon,
} from "lucide-react"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const StatusIcons: {
  [key in MissionVector["status"]]: LucideIcon
} = {
  PENDING: CircleDot,
  APPROVED: CheckCircle,
  REJECTED: CircleOff,
}

export const PriorityIcons: {
  [key in MissionVector["priority"]]: LucideIcon
} = {
  LOW: ArrowDownCircle,
  MEDIUM: ArrowRightCircle,
  HIGH: ArrowUpCircle,
  URGENT: AlertCircle,
}

const scoreToTailwindColor = (score: number) => {
  if (score < 50) return "text-destructive"
  if (score < 75) return "text-warning"
  if (score < 90) return "text-secondary"
  return "text-primary"
}

export const columns: ColumnDef<MissionVector>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const { source: label, sourceUrl: labelLink } = row.original

      return (
        <div className="flex space-x-2">
          {label && (
            <Badge
              onClick={() =>
                labelLink &&
                window.open(labelLink, "_blank", "noopener noreferrer")
              }
              variant="outline"
            >
              {label}
            </Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original

      const StatusIcon = StatusIcons[status]
      return (
        <div className="flex w-[100px] items-center">
          <StatusIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="capitalize">{status}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const { priority } = row.original

      const PriorityIcon = PriorityIcons[priority]
      return (
        <div className="flex items-center">
          <PriorityIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="capitalize">{priority}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "aiQualityScore",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AI Quality Score" />
    ),
    cell: ({ row }) => {
      const { aiQualityScore } = row.original

      return (
        <span className={`font-medium ${scoreToTailwindColor(aiQualityScore)}`}>
          {aiQualityScore}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
