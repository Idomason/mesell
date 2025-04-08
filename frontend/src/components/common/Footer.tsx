import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">About Mesell</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A secure and trusted pre-order ecommerce platform built for the
              Nigerian market.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>Products</li>
              <li>Orders</li>
              <li>Cart</li>
              <li>Account</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mesell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
