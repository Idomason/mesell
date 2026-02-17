export default function notfound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-4">
        The page you are looking for does not exist.
      </p>

      <div className="mt-6">
        <a href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    </div>
  );
}
