import { Input } from "@workspace/ui/components/ui/input";
import type { AddressProps } from "../Checkout";

export default function Address({ address, setAddress }: AddressProps) {
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
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Email"
          value={address.email}
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Phone Number"
          value={address.phoneNumber}
          onChange={(e) =>
            setAddress({ ...address, phoneNumber: e.target.value })
          }
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Address Line 1"
          value={address.addressLine1}
          onChange={(e) =>
            setAddress({ ...address, addressLine1: e.target.value })
          }
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Address Line 2"
          value={address.addressLine2}
          onChange={(e) =>
            setAddress({ ...address, addressLine2: e.target.value })
          }
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="State/Province"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Postal Code"
          value={address.postalCode}
          onChange={(e) =>
            setAddress({ ...address, postalCode: e.target.value })
          }
        />
        <Input
          className="bg-white shadow-inner"
          type="text"
          placeholder="Country"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
        />
      </form>{" "}
    </div>
  );
}
