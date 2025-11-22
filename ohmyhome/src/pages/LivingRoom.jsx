import Appliance from "../components/Appliance";

export default function LivingRoom({ lightStatus, setManualOverride }) {
  const devices = ["Lights", "AC", "TV", "Fan", "Speakers"];

  return (
    <div className="bg-brand-bg min-h-screen w-full flex flex-col items-center px-2 py-14">
      <h2 className="text-3xl font-bold mb-8 text-brand-primary">Living Room Appliances</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {devices.map(device => (
          <Appliance
            key={device}
            name={device}
            status={device === "Lights" ? lightStatus : undefined}
            setManualOverride={device === "Lights" ? setManualOverride : undefined}
          />
        ))}
      </div>
    </div>
  );
}
