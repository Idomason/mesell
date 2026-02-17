import { Input } from "@/components/ui/input";

export default function Address() {
  return (
    <div className="px-4 pb-8 h-fit">
      <div className="w-full py-5 text-primary font-semibold">
        <h2 className="font-semibold text-base">Your Location</h2>
        <span className="block text-sm text-gray-500 font-light">
          Enter all the necesssary infomation for speedy delivery
        </span>
      </div>
      <form className="grid grid-cols-1 gap-4 mt-4">
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Full Name"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Email"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Phone Number"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Address Line 1"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Address Line 2"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="City"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="State/Province"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Postal Code"
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Country"
        />
      </form>{" "}
    </div>
  );
}
