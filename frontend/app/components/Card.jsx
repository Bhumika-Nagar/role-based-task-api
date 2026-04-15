export default function Card({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}