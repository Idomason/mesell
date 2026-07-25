"use client";

import * as React from "react";
import { Checkbox } from "@workspace/ui/components/ui/checkbox";
import { Badge } from "@workspace/ui/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/ui/select";
import { Button } from "@workspace/ui/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  GripVertical,
  CheckCircle2,
  XCircle,
  PackageCheck,
  Loader,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// 1. Core Data Type Schema
export type PreOrderRecord = {
  id: string;
  date: string;
  orderStatus: "Ordered" | "Fulfilled" | "Delivered" | "Cancelled";
  orderNumber: string;
  seller: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  product: string;
  amount: number;
  price: string;
};

// 2. 5 Distinct E-Commerce Pre-Order Items
const initialOrders: PreOrderRecord[] = [
  {
    id: "ord-1",
    date: "2026-06-22",
    orderStatus: "Ordered",
    orderNumber: "MS-9081",
    seller: "Altech Electronics",
    paymentStatus: "Paid",
    product: "PlayStation 6 Slim Pro",
    amount: 1,
    price: "₦1,200,000",
  },
  {
    id: "ord-2",
    date: "2026-06-20",
    orderStatus: "Fulfilled",
    orderNumber: "MS-8432",
    seller: "Nike Official Store",
    paymentStatus: "Paid",
    product: "Air Max 2026 Edition",
    amount: 2,
    price: "₦350,000",
  },
  {
    id: "ord-3",
    date: "2026-06-15",
    orderStatus: "Delivered",
    orderNumber: "MS-7719",
    seller: "FurniCo Ltd",
    paymentStatus: "Paid",
    product: "Ergonomic Mesh Office Chair",
    amount: 5,
    price: "₦180,000",
  },
  {
    id: "ord-4",
    date: "2026-05-29",
    orderStatus: "Cancelled",
    orderNumber: "MS-6102",
    seller: "GadgetHub",
    paymentStatus: "Refunded",
    product: "Wireless Noise-Cancelling Earbuds",
    amount: 1,
    price: "₦95,000",
  },
  {
    id: "ord-5",
    date: "2026-05-10",
    orderStatus: "Ordered",
    orderNumber: "MS-5541",
    seller: "Apex Publishers",
    paymentStatus: "Pending",
    product: "The Tech Revolution (Hardcover)",
    amount: 3,
    price: "₦25,000",
  },
];

export function OrderTable({ initialData }) {
  const [orders, setOrders] = React.useState<PreOrderRecord[]>(initialData);
  const [selectedRows, setSelectedRows] = React.useState<
    Record<string, boolean>
  >({});
  const [pageSize, setPageSize] = React.useState("10");

  const totalRows = initialData.length; // Mocked total to match layout design specs
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;

  // Selection state handling handlers
  const handleSelectAll = (checked: boolean) => {
    const updated: Record<string, boolean> = {};
    if (checked) {
      orders.forEach((o) => {
        updated[o.id] = true;
      });
    }
    setSelectedRows(updated);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((prev) => ({ ...prev, [id]: checked }));
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(orders);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOrders(items);
  };

  // Status Layout badge render rules
  const getOrderStatusBadge = (status: PreOrderRecord["orderStatus"]) => {
    switch (status) {
      case "Ordered":
        return (
          <Badge
            variant="outline"
            className="rounded-full border-blue-200 bg-blue-50 text-blue-700 gap-1 font-normal px-2.5 py-0.5"
          >
            <Loader className="h-3 w-3 animate-spin" /> Processing
          </Badge>
        );
      case "Fulfilled":
        return (
          <Badge
            variant="outline"
            className="rounded-full border-purple-200 bg-purple-50 text-purple-700 gap-1 font-normal px-2.5 py-0.5"
          >
            <PackageCheck className="h-3 w-3" /> Fulfilled
          </Badge>
        );
      case "Delivered":
        return (
          <Badge
            variant="outline"
            className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 gap-1 font-normal px-2.5 py-0.5"
          >
            <CheckCircle2 className="h-3 w-3 fill-emerald-700 text-emerald-50" />{" "}
            Delivered
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge
            variant="outline"
            className="rounded-full border-red-200 bg-red-50 text-red-700 gap-1 font-normal px-2.5 py-0.5"
          >
            <XCircle className="h-3 w-3" /> Cancelled
          </Badge>
        );
    }
  };

  const getPaymentStatusBadge = (status: PreOrderRecord["paymentStatus"]) => {
    switch (status) {
      case "Paid":
        return (
          <Badge className="rounded-full bg-emerald-100 text-emerald-800 border-none px-3 py-0.5 hover:bg-emerald-100 font-medium">
            Paid
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="rounded-full bg-amber-100 text-amber-800 border-none px-3 py-0.5 hover:bg-amber-100 font-medium">
            Pending
          </Badge>
        );
      case "Refunded":
        return (
          <Badge className="rounded-full bg-gray-100 text-gray-700 border-none px-3 py-0.5 hover:bg-gray-100 font-medium">
            Refunded
          </Badge>
        );
    }
  };

  return (
    <div className="w-full rounded-md border bg-white shadow-sm overflow-visible">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Table className="overflow-visible">
          {/* ---- TABLE HEADER ---- */}
          <TableHeader className="bg-gray-50/70">
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedCount === orders.length && orders.length > 0}
                  onCheckedChange={(v) => handleSelectAll(!!v)}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">
                Date
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">
                Order Status
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">
                Order Number
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">
                Seller
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">
                Payment Status
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">
                Product
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-center text-primary">
                Amount
              </TableHead>
              <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary ">
                Price
              </TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>

          {/* ---- TABLE BODY ---- */}
          <Droppable droppableId="order-rows">
            {(provided) => (
              <TableBody
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="overflow-visible"
              >
                {orders.map((order, index) => (
                  <Draggable
                    key={order.id}
                    draggableId={order.id}
                    index={index}
                  >
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={
                          provided.draggableProps.style as React.CSSProperties
                        }
                        className="hover:bg-gray-50/50 group transition-colors overflow-visible"
                      >
                        {/* Drag Handle Container */}
                        <TableCell className="p-0 text-center align-middle">
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center justify-center cursor-grab text-muted-foreground/30 group-hover:text-muted-foreground/80 transition-colors py-4"
                          >
                            <GripVertical className="h-4 w-4" />
                          </div>
                        </TableCell>

                        {/* Individual Checkbox */}
                        <TableCell>
                          <Checkbox
                            checked={!!selectedRows[order.id]}
                            onCheckedChange={(v) =>
                              handleSelectRow(order.id, !!v)
                            }
                          />
                        </TableCell>

                        {/* Order Attributes */}
                        <TableCell className="text-gray-600 whitespace-nowrap text-sm">
                          {order.date}
                        </TableCell>
                        <TableCell>
                          {getOrderStatusBadge(order.orderStatus)}
                        </TableCell>
                        <TableCell className="font-mono font-medium text-gray-900 text-sm">
                          {order.orderNumber}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm whitespace-nowrap">
                          {order.seller}
                        </TableCell>
                        <TableCell>
                          {getPaymentStatusBadge(order.paymentStatus)}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 text-sm max-w-[200px] truncate">
                          {order.product}
                        </TableCell>
                        <TableCell className="text-gray-600 text-sm font-medium text-center">
                          {order.amount}
                        </TableCell>
                        <TableCell className="text-gray-900 font-semibold text-sm whitespace-nowrap">
                          {order.price}
                        </TableCell>

                        {/* Actions Trigger Dropdown Cell - Fixed Layering Contexts */}
                        <TableCell className="relative overflow-visible">
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">
                                  Open actions menu
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[160px] z-[100] bg-white shadow-md border border-gray-200"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer text-purple-700 focus:text-purple-800 focus:bg-purple-50">
                                Mark as Fulfilled
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-emerald-700 focus:text-emerald-800 focus:bg-emerald-50">
                                Mark as Delivered
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-red-50">
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>

          {/* ---- TABLE FOOTER ---- */}
          <tfoot className="border-t border-gray-200 bg-white">
            <TableRow className="hover:bg-transparent">
              {/* colSpan={11} matches the total number of column cells in your table row */}
              <TableCell colSpan={11} className="p-0">
                <div className="flex items-center justify-between px-6 py-4 text-sm text-muted-foreground select-none">
                  {/* Left Metrics */}
                  <div className="text-gray-500 font-medium text-sm">
                    {selectedCount} of {totalRows} row(s) selected.
                  </div>

                  {/* Right Pagination Controls */}
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 font-medium text-sm">
                        Rows per page
                      </span>
                      <Select value={pageSize} onValueChange={setPageSize}>
                        <SelectTrigger className="w-[70px] h-8 text-xs border-gray-200 rounded bg-white shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-gray-900 font-medium text-sm min-w-[80px] text-center">
                      Page 1 of {pageSize}
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-200 bg-white p-0 shadow-none hover:bg-gray-50"
                        disabled
                      >
                        <ChevronsLeft className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-200 bg-white p-0 shadow-none hover:bg-gray-50"
                        disabled
                      >
                        <ChevronLeft className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-200 bg-white p-0 shadow-none hover:bg-gray-50"
                      >
                        <ChevronRight className="h-4 w-4 text-gray-700" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-200 bg-white p-0 shadow-none hover:bg-gray-50"
                      >
                        <ChevronsRight className="h-4 w-4 text-gray-700" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </DragDropContext>
    </div>
  );
}
