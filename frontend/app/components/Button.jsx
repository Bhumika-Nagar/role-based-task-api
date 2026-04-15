export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-medium"
    >
      {children}
    </button>
  );
}