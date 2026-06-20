"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  Globe2,
  IdCard,
  MapPin,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { paymentApi } from "@/app/api/payments";
import { toast } from "sonner";

const countryOptions = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Ivory Coast",
  "Uganda",
  "Other Africa",
];

const businessCategories = [
  "Fashion & Apparel",
  "Electronics",
  "Beauty & Wellness",
  "Home & Living",
  "Food & Beverage",
  "General Trade",
  "Other",
];

const bankOptions = [
  "Access Bank",
  "GTBank",
  "Zenith Bank",
  "First Bank",
  "UBA",
  "Stanbic IBTC",
  "Ecobank",
  "Other Bank",
];

const identityOptions: Record<string, string[]> = {
  Nigeria: ["BVN", "NIN"],
  Ghana: ["Ghana Card", "Passport"],
  Kenya: ["Kipande", "Passport"],
  "South Africa": ["SMART ID", "Passport"],
  "Ivory Coast": ["CNI", "Passport"],
  Uganda: ["Ndaga ID", "Passport"],
  "Other Africa": ["National ID", "Passport"],
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{9,15}$/;

export default function page() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdSeller, setCreatedSeller] = useState<any | null>(null);
  const [identityVerified, setIdentityVerified] = useState(false);
  const [accountResolved, setAccountResolved] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessCategory: "",
    country: "Nigeria",
    identityType: "BVN",
    identityNumber: "",
    otpCode: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stepLabels = [
    "Personal Details",
    "Identity Verification",
    "Bank Setup",
    "Review & Activate",
  ];

  const identityTypeOptions = useMemo(
    () => identityOptions[form.country] ?? identityOptions["Other Africa"],
    [form.country],
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "country") {
      const nextType = identityOptions[value]?.[0] ?? "Passport";
      setForm((prev) => ({ ...prev, identityType: nextType }));
    }

    if (name === "accountNumber" || name === "bankName") {
      setAccountResolved(false);
      setForm((prev) => ({ ...prev, accountName: "" }));
    }
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
      if (!form.email.trim() || !emailRegex.test(form.email)) {
        nextErrors.email = "Enter a valid email address.";
      }
      if (!form.phone.trim() || !phoneRegex.test(form.phone)) {
        nextErrors.phone = "Enter a valid phone number.";
      }
      if (!form.businessName.trim()) {
        nextErrors.businessName = "Business name is required.";
      }
      if (!form.businessCategory.trim()) {
        nextErrors.businessCategory = "Choose a business category.";
      }
      if (!form.country.trim()) {
        nextErrors.country = "Choose your country.";
      }
    }

    if (step === 2) {
      if (!form.identityType) {
        nextErrors.identityType = "Select a verification type.";
      }
      if (!form.identityNumber.trim()) {
        nextErrors.identityNumber = "Identity number is required.";
      } else if (form.identityNumber.length < 6) {
        nextErrors.identityNumber = "Enter a valid identity number.";
      }
      if (!identityVerified) {
        nextErrors.identityVerification =
          "Verify your identity before continuing.";
      }
    }

    if (step === 3) {
      if (!form.bankName.trim()) {
        nextErrors.bankName = "Choose a bank.";
      }
      if (!form.accountNumber.trim() || form.accountNumber.length < 9) {
        nextErrors.accountNumber = "Enter a valid account number.";
      }
      if (!accountResolved) {
        nextErrors.accountName = "Resolve account details to continue.";
      }
      if (accountResolved && form.accountName.trim() !== form.fullName.trim()) {
        nextErrors.accountName =
          "Account name should match the verified seller name.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, 4));
  };

  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleVerifyIdentity = () => {
    const isValid = form.identityNumber.trim().length >= 6;
    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        identityNumber: "Enter a valid identity number before verifying.",
      }));
      return;
    }
    setIdentityVerified(true);
    setErrors((prev) => ({ ...prev, identityVerification: "" }));
  };

  const handleResolveAccount = () => {
    if (!form.bankName || form.accountNumber.trim().length < 9) {
      setErrors((prev) => ({
        ...prev,
        accountNumber: "Enter a valid bank and account number.",
      }));
      return;
    }

    const resolvedName = form.fullName.trim() || "Verified Seller";
    setForm((prev) => ({ ...prev, accountName: resolvedName }));
    setAccountResolved(true);
    setErrors((prev) => ({ ...prev, accountName: "" }));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const payload = {
        business_name: form.businessName,
        settlement_bank: form.bankName,
        account_number: form.accountNumber,
        currency: "NGN",
        percentage_charge: 0,
        primary_contact_email: form.email,
        primary_contact_name: form.fullName,
        primary_contact_phone: form.phone,
      };

      const res = await paymentApi.createSellerSubaccount(payload);
      setCreatedSeller(res.data ?? res);
      setSubmitted(true);
      if ((res || res.data) && createdSeller) {
        toast.success("Seller account created successfully");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create subaccount";
      setErrors((prev) => ({ ...prev, submit: message }));
      toast.error("Failed to create seller account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/90">
                Seller onboarding
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Launch your seller storefront on Mesell
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                A focused, four-step setup for business details, identity
                verification, payout setup, and account activation.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                  Secure verification built for African sellers
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <Zap className="h-5 w-5" />
                  Smooth account activation with Paystack-ready payout details
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50 px-6 py-5">
            <div className="grid gap-4 md:grid-cols-4">
              {stepLabels.map((label, index) => {
                const stepIndex = index + 1;
                const active = step === stepIndex;
                const complete = step > stepIndex;
                return (
                  <div key={label} className="flex flex-col items-start gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                        complete
                          ? "border-primary bg-primary text-white"
                          : active
                            ? "border-primary bg-white text-primary"
                            : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      {complete ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        stepIndex
                      )}
                    </div>
                    <div className="space-y-1">
                      <p
                        className={`text-xs font-semibold ${active ? "text-slate-900" : "text-slate-500"}`}
                      >
                        {label}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {stepIndex === 1 && "Business details"}
                        {stepIndex === 2 && "KYC verification"}
                        {stepIndex === 3 && "Payout destination"}
                        {stepIndex === 4 && "Confirm setup"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-6 py-8">
            {submitted ? (
              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-slate-900">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                      Application submitted
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                      Your seller application is pending approval
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600">
                      We’ve received your onboarding details. Admin review is
                      required before seller dashboard access is granted.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-900">
                      <Zap className="h-6 w-6" />
                      <span className="text-sm font-semibold">
                        Pending admin review
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Business
                    </p>
                    <p className="text-sm text-slate-600">
                      {form.businessName} • {form.businessCategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Identity
                    </p>
                    <p className="text-sm text-slate-600">
                      {form.identityType} • {form.identityNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Payout account
                    </p>
                    <p className="text-sm text-slate-600">
                      {form.bankName} • {form.accountNumber}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <div>
                      <p className="font-semibold text-slate-900">Step 1</p>
                      <p>
                        Admin reviews your application and verifies seller
                        eligibility.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400" />
                    <div>
                      <p className="font-semibold text-slate-900">Step 2</p>
                      <p>
                        Approval is granted when your business, identity, and
                        payout details are confirmed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400" />
                    <div>
                      <p className="font-semibold text-slate-900">Step 3</p>
                      <p>
                        Once approved, your seller dashboard access will be
                        enabled automatically.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                  <p className="font-semibold text-slate-900">
                    What happens next
                  </p>
                  <ul className="mt-3 space-y-2 list-disc pl-5">
                    <li>We notify the admin team immediately.</li>
                    <li>Admin verifies your business and KYC details.</li>
                    <li>
                      You get access to the seller dashboard after approval.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <section className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-primary">
                        <Users className="h-5 w-5" />
                        <h2 className="text-xl font-semibold text-slate-900">
                          Personal & business details
                        </h2>
                      </div>
                      <p className="max-w-2xl text-sm text-slate-600">
                        Start with the basics so we can provision your seller
                        profile and keep verification aligned.
                      </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Full Name
                        </label>
                        <Input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Email
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@business.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+234 810 123 4567"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Country
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <Globe2 className="h-5 w-5" />
                          </div>
                          <select
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {countryOptions.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.country && (
                          <p className="text-sm text-destructive">
                            {errors.country}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Business Name
                        </label>
                        <Input
                          name="businessName"
                          value={form.businessName}
                          onChange={handleChange}
                          placeholder="Example Stores"
                        />
                        {errors.businessName && (
                          <p className="text-sm text-destructive">
                            {errors.businessName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Business Category
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <select
                            name="businessCategory"
                            value={form.businessCategory}
                            onChange={handleChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Select category</option>
                            {businessCategories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.businessCategory && (
                          <p className="text-sm text-destructive">
                            {errors.businessCategory}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-primary">
                        <IdCard className="h-5 w-5" />
                        <h2 className="text-xl font-semibold text-slate-900">
                          Identity verification
                        </h2>
                      </div>
                      <p className="max-w-2xl text-sm text-slate-600">
                        Verify your identity before we connect your seller
                        account. This step helps preserve trust for buyers and
                        aligns with Paystack KYC requirements.
                      </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Verification type
                        </label>
                        <select
                          name="identityType"
                          value={form.identityType}
                          onChange={handleChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {identityTypeOptions.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.identityType && (
                          <p className="text-sm text-destructive">
                            {errors.identityType}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Identity number
                        </label>
                        <Input
                          name="identityNumber"
                          value={form.identityNumber}
                          onChange={handleChange}
                          placeholder={
                            form.identityType === "BVN"
                              ? "11-digit BVN"
                              : "National ID / Passport"
                          }
                        />
                        {errors.identityNumber && (
                          <p className="text-sm text-destructive">
                            {errors.identityNumber}
                          </p>
                        )}
                      </div>

                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <div className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                Cross-match verification
                              </p>
                              <p className="mt-1 text-sm text-slate-600">
                                The identity name must match the name you
                                entered in step one. If this is a business
                                account, use the name linked to the selected ID.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Verification status
                            </label>
                            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                              {identityVerified ? (
                                <span className="inline-flex items-center gap-2 text-emerald-700">
                                  <CheckCircle2 className="h-4 w-4" /> Identity
                                  verified
                                </span>
                              ) : (
                                <span className="text-slate-500">
                                  Not verified yet
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-end justify-end">
                            <Button
                              variant="secondary"
                              onClick={handleVerifyIdentity}
                              className="w-full"
                            >
                              Verify identity
                            </Button>
                          </div>
                        </div>
                        {errors.identityVerification && (
                          <p className="mt-2 text-sm text-destructive">
                            {errors.identityVerification}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-primary">
                        <Building2 className="h-5 w-5" />
                        <h2 className="text-xl font-semibold text-slate-900">
                          Bank account setup
                        </h2>
                      </div>
                      <p className="max-w-2xl text-sm text-slate-600">
                        Add the payout account where your sales proceeds will
                        arrive. We will resolve the account name automatically
                        to reduce errors.
                      </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Bank name
                        </label>
                        <select
                          name="bankName"
                          value={form.bankName}
                          onChange={handleChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select bank</option>
                          {bankOptions.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                        {errors.bankName && (
                          <p className="text-sm text-destructive">
                            {errors.bankName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                          Account number
                        </label>
                        <Input
                          name="accountNumber"
                          value={form.accountNumber}
                          onChange={handleChange}
                          placeholder="1234567890"
                        />
                        {errors.accountNumber && (
                          <p className="text-sm text-destructive">
                            {errors.accountNumber}
                          </p>
                        )}
                      </div>

                      <div className="lg:col-span-2 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Resolved account name
                            </label>
                            <Input
                              name="accountName"
                              value={form.accountName}
                              readOnly
                              placeholder="Auto-filled after resolution"
                            />
                            {errors.accountName && (
                              <p className="text-sm text-destructive">
                                {errors.accountName}
                              </p>
                            )}
                          </div>
                          <div className="flex items-end justify-end">
                            <Button
                              variant="secondary"
                              onClick={handleResolveAccount}
                              className="w-full"
                            >
                              Resolve account
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500">
                          We recommend resolving your account details before
                          moving to activation. This ensures the payout account
                          is linked to your verified identity.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {step === 4 && (
                  <section className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-primary">
                        <CreditCard className="h-5 w-5" />
                        <h2 className="text-xl font-semibold text-slate-900">
                          Review & create subaccount
                        </h2>
                      </div>
                      <p className="max-w-2xl text-sm text-slate-600">
                        Confirm your seller information and submit the
                        onboarding flow. Once confirmed, Paystack can create the
                        subaccount and unlock your seller role.
                      </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-primary">
                          Personal info
                        </p>
                        <dl className="mt-4 space-y-3 text-sm text-slate-600">
                          <div>
                            <dt className="font-medium text-slate-800">
                              Full name
                            </dt>
                            <dd>{form.fullName || "—"}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Email
                            </dt>
                            <dd>{form.email || "—"}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Phone
                            </dt>
                            <dd>{form.phone || "—"}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-primary">
                          Business profile
                        </p>
                        <dl className="mt-4 space-y-3 text-sm text-slate-600">
                          <div>
                            <dt className="font-medium text-slate-800">
                              Business name
                            </dt>
                            <dd>{form.businessName || "—"}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Category
                            </dt>
                            <dd>{form.businessCategory || "—"}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Country
                            </dt>
                            <dd>{form.country || "—"}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-primary">
                          Identity verification
                        </p>
                        <dl className="mt-4 space-y-3 text-sm text-slate-600">
                          <div>
                            <dt className="font-medium text-slate-800">Type</dt>
                            <dd>{form.identityType}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Number
                            </dt>
                            <dd>{form.identityNumber || "—"}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Status
                            </dt>
                            <dd>
                              {identityVerified
                                ? "Verified"
                                : "Pending verification"}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-primary">
                          Bank payout
                        </p>
                        <dl className="mt-4 space-y-3 text-sm text-slate-600">
                          <div>
                            <dt className="font-medium text-slate-800">Bank</dt>
                            <dd>{form.bankName || "—"}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Account number
                            </dt>
                            <dd>{form.accountNumber || "—"}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-slate-800">
                              Account name
                            </dt>
                            <dd>{form.accountName || "—"}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-3 text-slate-800">
                        <Zap className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold">
                          Paystack subaccount creation
                        </p>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">
                        When you submit, the flow will create a Paystack
                        subaccount using your verified bank details and then
                        promote your user role to seller.
                      </p>
                    </div>
                  </section>
                )}
              </>
            )}
          </CardContent>

          {!submitted && (
            <CardFooter className="flex flex-col gap-4 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm text-slate-600">
                  Step {step} of 4 — {stepLabels[step - 1]}
                </p>
                <p className="text-xs text-slate-400">
                  {step === 1 && "Enter your core seller details first."}
                  {step === 2 &&
                    "Verify your identity before connecting payouts."}
                  {step === 3 &&
                    "Resolve the bank account to reduce payout errors."}
                  {step === 4 &&
                    "Review everything carefully before submission."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={handleNext}>Continue</Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Activate seller account
                  </Button>
                )}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  );
}
