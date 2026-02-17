"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
const months = [
  // { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];
const years = [
  // { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
];

export default function Payment() {
  const [paymentOption, setPaymentOption] = useState("transfer");

  return (
    <div className="p-4 mx-auto pb-8">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full py-5 text-primary font-semibold">
          <h2 className="font-semibold text-base">Payment Details</h2>
          <span className="block text-sm text-gray-500 font-light">
            All transactions are secure and encrypted
          </span>
        </div>
        {/* Payment option switching buttons */}
        <div className="bg-gray-200 p-1 rounded-full flex w-fit">
          {/* <div className="absolute mt-6 bg-gray-200 p-1 max-w-fit rounded-full flex items-center justify-center"> */}
          <div className="bg-gray-200 max-w-fit rounded-full flex items-center justify-center">
            <button
              onClick={() => setPaymentOption("card")}
              className={`${paymentOption === "card" ? "bg-primary text-white font-semibold" : "bg-white text-gray-700 shadow-inner"} px-8 md:px-12 py-1 rounded-full transition-colors duration-300 ease-in-out`}
            >
              Card
            </button>
            <button
              onClick={() => setPaymentOption("paystack")}
              className={`${paymentOption === "paystack" ? "bg-primary text-white font-semibold" : "bg-white text-gray-700 shadow-inner"} px-4 md:px-8 py-1 rounded-full ml-2 transition-colors duration-300 ease-in-out`}
            >
              PayStack
            </button>
            <button
              onClick={() => setPaymentOption("transfer")}
              className={`${paymentOption === "transfer" ? "bg-primary text-white font-semibold" : "bg-white text-gray-700 shadow-inner"} px-4 md:px-8 py-1 rounded-full ml-2 transition-colors duration-300 ease-in-out`}
            >
              Transfer
            </button>
          </div>
        </div>
        {/* Card Payment */}
        {paymentOption === "card" && (
          <div className="w-full max-w-2xl overflow-visible bg-white p-4 rounded-md shadow-inner mt-4">
            <form>
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Card Payment Method</FieldLegend>
                  <FieldDescription>
                    All transactions are secure and encrypted
                  </FieldDescription>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="checkout-card-name">
                        Name on Card
                      </FieldLabel>
                      <Input
                        id="checkout-card-name"
                        placeholder="Ananu  Odoba"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="checkout-card-number">
                        Card Number
                      </FieldLabel>
                      <Input
                        id="checkout-card-number"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <FieldDescription>
                        Enter your 16-digit card number
                      </FieldDescription>
                    </Field>
                    <div className="grid grid-cols-3 gap-4">
                      <Field>
                        <FieldLabel htmlFor="checkout-exp-month">
                          Month
                        </FieldLabel>
                        <Select>
                          <SelectTrigger id="checkout-exp-month">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectGroup>
                              {months.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="checkout-exp-year">
                          Year
                        </FieldLabel>
                        <Select>
                          <SelectTrigger id="checkout-exp-year">
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {years.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="checkout-cvv">CVV</FieldLabel>
                        <Input id="checkout-cvv" placeholder="123" required />
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                  <FieldLegend>Billing Address</FieldLegend>
                  <FieldDescription>
                    The billing address associated with your payment method
                  </FieldDescription>
                  <FieldGroup>
                    <Field orientation="horizontal">
                      <Checkbox
                        id="checkout-same-as-shipping-address"
                        defaultChecked
                      />
                      <FieldLabel
                        htmlFor="checkout-same-as-shipping-address"
                        className="font-normal"
                      >
                        Same as shipping address
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="checkout-optional-comments">
                        Comments
                      </FieldLabel>
                      <Textarea
                        id="checkout-optional-comments"
                        placeholder="Add any additional comments"
                        className="resize-none"
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                  <Button type="submit">Submit</Button>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </div>
        )}

        {/* Transfer */}
        {paymentOption === "transfer" && (
          <div className="px-4 py-16 mt-4 w-full max-w-2xl bg-white shadow-inner rounded-md">
            <div className="py-2">
              <h3 className="text-lg font-semibold text-primary">
                Bank Transfer Details
              </h3>
              <p className="text-sm text-gray-500">
                Please transfer the total amount to the following bank account:
                <span className="text-2xl ml-2">👇🏾</span>
              </p>
              <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-inner flex flex-col gap-2">
                <p className="text-sm text-gray-700">
                  <strong>Bank Name:</strong> Example Bank
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Account Number:</strong> 1234567890
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Account Name:</strong> Mesell Company Ltd.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
