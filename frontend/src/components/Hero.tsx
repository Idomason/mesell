import Image from "next/image";
import Link from "next/link";
import { customers } from "@/data/customer";

export default function Hero() {
  return (
    <section
      className="relative min-h-[85vh] overflow-hidden font-sans"
      aria-label="Hero section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-gradient-shift"></div>

        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse-slow"></div>
        </div>

        {/* Grid pattern with reduced opacity */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float-slower"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 h-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-12">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-primary relative inline-flex animate-text-gradient direction-reverse bg-gradient-to-r from-[#ff85b9] via-[#ff004f] to-[#ffd6e8] bg-[200%_auto] bg-clip-text text-transparent">
                  Pre-order
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20 rounded-full"></span>
                </span>{" "}
                with{" "}
                <span className=" relative inline-block mt-1.5 animate-background-shine delay-1000 bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent">
                  Confidence
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/10 rounded-full"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Nigeria&apos;s trusted pre-order platform. Secure payments,
                verified sellers, and guaranteed delivery. Join thousands of
                satisfied customers.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 transition-transform hover:scale-110 hover:z-10"
                    >
                      <Image
                        src={customer.image}
                        alt={customer.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  2k+ Happy Customers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-muted-foreground">
                  4.9/5 Rating
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="btn-primary cursor-pointer text-lg px-8 py-4 flex items-center justify-center group relative overflow-hidden"
                aria-label="Start shopping"
              >
                <span className="relative z-10 flex items-center">
                  Start Shopping
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              </Link>
              <Link
                href="/how-it-works"
                className="btn-secondary border border-primary/25 cursor-pointer text-lg px-8 py-4 flex items-center justify-center hover:bg-primary/5 transition-colors"
                aria-label="Learn how it works"
              >
                How It Works
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 group">
                <svg
                  className="w-5 h-5 text-accent group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-sm group-hover:text-primary transition-colors">
                  Secure Payments
                </span>
              </div>
              <div className="flex items-center space-x-2 group">
                <svg
                  className="w-5 h-5 text-accent group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm group-hover:text-primary transition-colors">
                  Verified Sellers
                </span>
              </div>
              <div className="flex items-center space-x-2 group">
                <svg
                  className="w-5 h-5 text-accent group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm group-hover:text-primary transition-colors">
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl animate-pulse-slow"></div>
              <div className="relative">
                <Image
                  src="/images/mesell-2.png"
                  alt="Happy Customer Shopping"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-background p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">2,500+ Active Users</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-background p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">
                  4.9/5 Customer Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
