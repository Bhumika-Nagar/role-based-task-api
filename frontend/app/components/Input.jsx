export default function Input({ label, type = "text", placeholder,name, value, onChange }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}