import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/ui/table";

export default function TableActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-primary font-medium md:text-base">
            Date
          </TableHead>
          <TableHead className="text-primary font-medium md:text-base">
            Order status
          </TableHead>
          <TableHead className="text-primary font-medium md:text-base">
            Order number
          </TableHead>
          <TableHead className="text-primary font-medium md:text-base">
            Seller
          </TableHead>
          <TableHead className="text-primary font-medium md:text-base">
            Payment status
          </TableHead>
          <TableHead className="text-primary font-medium md:text-base">
            Product
          </TableHead>
          <TableHead className="text-primary font-medium md:text-base">
            Amount
          </TableHead>
          <TableHead className="text-primary font-medium md:text-base">
            Price
          </TableHead>
          <TableHead className="text-right text-primary font-medium text-base">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">12-03-2026</TableCell>
          <TableCell className="font-medium">
            <span className="px-2 py-1 text-xs font-medium rounded-full ring-orange-400 ring-1 text-orange-500 bg-orange-100 tracking-wider">
              Confirmed
            </span>
          </TableCell>
          <TableCell>
            <span className="">#8utuis94ks ...</span>
          </TableCell>
          <TableCell>Isha Steps</TableCell>
          <TableCell>
            <span className="w-full px-2 py-0.5 inline-block text-center text-xs font-medium rounded-full ring-green-400 ring-1 text-green-500 bg-green-100 tracking-wide">
              Paid
            </span>
          </TableCell>
          <TableCell className="font-medium">Kente Material</TableCell>
          <TableCell className="font-medium">20</TableCell>
          <TableCell>₦29.99</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">12-03-2026</TableCell>
          <TableCell className="font-medium">
            <span className="px-2 py-1 text-xs font-medium rounded-full ring-orange-400 ring-1 text-orange-500 bg-orange-100 tracking-wider">
              Confirmed
            </span>
          </TableCell>
          <TableCell>
            <span className="">#8utuis94ks ...</span>
          </TableCell>
          <TableCell>Isha Steps</TableCell>
          <TableCell>
            <span className="w-full px-2 py-0.5 inline-block text-center text-xs font-medium rounded-full ring-green-400 ring-1 text-green-500 bg-green-100 tracking-wider">
              Paid
            </span>
          </TableCell>
          <TableCell className="font-medium">Weaven dress</TableCell>
          <TableCell className="font-medium">20</TableCell>
          <TableCell>₦29.99</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">12-03-2026</TableCell>
          <TableCell className="font-medium">
            <span className="px-2 py-1 text-xs font-medium rounded-full ring-orange-400 ring-1 text-orange-500 bg-orange-100 tracking-wide">
              Confirmed
            </span>
          </TableCell>
          <TableCell>
            <span className="">#8utuis94ks ...</span>
          </TableCell>
          <TableCell>Isha Steps</TableCell>
          <TableCell>
            <span className="w-full inline-block text-center px-2 py-0.5 font-medium text-xs rounded-full ring-green-400 ring-1 text-green-500 bg-green-100 tracking-wide">
              Paid
            </span>
          </TableCell>
          <TableCell className="font-medium">USB-C Hub</TableCell>
          <TableCell className="font-medium">20</TableCell>
          <TableCell>₦29.99</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">12-03-2026</TableCell>
          <TableCell className="font-medium">
            <span className="text-center px-2 py-1 text-xs rounded-full ring-orange-400 ring-1 text-orange-500 bg-orange-100 tracking-wide">
              Confirmed
            </span>
          </TableCell>
          <TableCell>
            <span className="">#8utuis94ks ...</span>
          </TableCell>
          <TableCell>Isha Steps</TableCell>
          <TableCell>
            <span className="w-full inline-block px-2 py-0.5 font-medium text-xs text-center rounded-full ring-green-400 ring-1 text-green-500 bg-green-100 tracking-wide">
              Paid
            </span>
          </TableCell>
          <TableCell className="font-medium">Mechanical Keyboard</TableCell>
          <TableCell className="font-medium">20</TableCell>
          <TableCell>₦29.99</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
