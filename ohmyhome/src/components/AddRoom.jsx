import { useNavigate } from "react-router-dom";
import "../styles/room.css"; // Custom style overrides per room

// Props: name (string), status ("online" | "offline"), theme (string: "livingroom", "kitchen", etc.)
export default function Room({ name, status, theme }) {
  const navigate = useNavigate();

  // Handles navigation to <RoomName>.jsx page when clicked
  const handleClick = () => {
    navigate(`/${name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`room-card ${theme} cursor-pointer rounded-xl shadow-md flex flex-col justify-center items-center p-6 m-4 transition hover:scale-105`}
    >
      <h2 className="text-2xl font-bold mb-2 text-brand-primary">
        {name}
      </h2>
      <span
        className={`room-status font-bold mt-1 px-3 py-1 text-lg rounded-full`}
        >
        {status}
    </span>

    </div>
  );
}
