import LightDarkMode from "@/components/LightDarkMode";
import Sidebar, {
  SellerRefineProvider,
} from "@/components/seller/refine-provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import Image from "next/image";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SellerRefineProvider>
      <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md px-4 py-1.5 flex items-center justify-between border border-b border-white/30">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="h-5">
            <Image
              src={"/images/logo.png"}
              width={100}
              height={100}
              alt="Logo"
            />
          </div>

          {/* Searchbar */}
          <form
            action=""
            className="px-2 ml-12 border border-gray-200 rounded-full flex items-center py-1.5 w-[30rem] "
          >
            <Search size={18} />
            <input
              className="w-full bg-transparent outline-none border-none ml-2"
              type="text"
              name="searchbar"
              placeholder="Search by Store ID, E-mail, Keyword"
            />
          </form>
        </div>
        <div className="flex flex-1 items-center gap-6 justify-end">
          {/* Language */}
          <Select>
            <SelectTrigger className="w-full max-w-36">
              <SelectValue placeholder="Select lang." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="igbo">Igbo</SelectItem>
                <SelectItem value="hausa">Hausa</SelectItem>
                <SelectItem value="yoruba">Yoruba</SelectItem>
                <SelectItem value="khosa">Khosa</SelectItem>
                <SelectItem value="swahili">Swahili</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Theme Switcher */}
          <LightDarkMode />

          <span>Jamie Adams</span>

          {/* Profile Image */}
          <div className="w-10 h-10 rounded-full border border-primary shadow overflow-hidden">
            <Image
              className="h-full w-full object-cover"
              src={"/images/customers/mesell-customer-2.png"}
              width={50}
              height={50}
              alt="Admin Profile Image"
            />
          </div>
        </div>
      </header>
      <div className="flex min-h-screen pt-[54px]">
        {/* Your custom sidebar or header can go here */}
        <Sidebar />
        <main className="w-full flex-1 p-6 bg-[#d7d7d7]">{children}</main>
      </div>
    </SellerRefineProvider>
  );
}
