export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Mesell
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Your trusted platform for pre-ordering products in Nigeria. Secure,
          reliable, and convenient.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/products" className="btn-primary">
            Browse Products
          </a>
          <a href="/about" className="btn-secondary">
            Learn more
          </a>
        </div>
      </section>
    </div>
  );
}
