import Room from "../components/Room";
import AddRoom from "../components/AddRoom";

export default function HomePage() {
  const rooms = [
    { name: "Livingroom", status: "online", theme: "livingroom" },
    { name: "Kitchen", status: "offline", theme: "kitchen" },
    { name: "Bedroom1", status: "offline", theme: "bedroom1" },
    { name: "Bedroom2", status: "offline", theme: "bedroom2" },
    { name: "Bathroom", status: "offline", theme: "livingroom" },
  ];

  return (
    <div className="bg-brand-bg min-h-screen w-full transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map(room =>
          <Room
            key={room.name}
            name={room.name}
            status={room.status}
            theme={room.theme}
          />
        )}
        <AddRoom
          name="Add Room"
          status="➕"
          theme="bathroom"
        />
      </div>
    </div>
  );
}
