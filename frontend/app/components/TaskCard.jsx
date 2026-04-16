import Card from "./Card";
import Button from "./Button";

export default function TaskCard({ title, description, status,onDelete,onEdit }) {
  const statusColor =
    status === "completed"
      ? "bg-green-600"
      : status === "pending"
      ? "bg-yellow-600"
      : "bg-gray-600";

  return (
    <Card className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
          {status}
        </span>
      </div>

      <p className="text-gray-400 text-sm">{description}</p>

      <div className="flex justify-end space-x-2">
        <Button onClick={onEdit} className="bg-blue-500 hover:bg-blue-600">Edit</Button>
        <Button onClick={onDelete}className="bg-red-500 hover:bg-red-600">Delete</Button>
      </div>
    </Card>
  );
}