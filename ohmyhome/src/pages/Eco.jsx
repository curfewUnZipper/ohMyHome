import { useEffect, useState } from "react";

export default function Eco() {

  const data = {
    appliance_breakdown: [
      {
        "actual_kwh": 0.0,
        "appliance": "light",
        "baseline_kwh": 0.1,
        "difference_kwh": -0.1,
        "money_saved_inr": 0.85,
        "room": "living_room",
        "status": "⭐ Efficient"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "fan",
        "baseline_kwh": 0.1,
        "difference_kwh": -0.1,
        "money_saved_inr": 0.85,
        "room": "living_room",
        "status": "⭐ Efficient"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "ac",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "living_room",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "tv",
        "baseline_kwh": 0.1,
        "difference_kwh": -0.1,
        "money_saved_inr": 0.85,
        "room": "living_room",
        "status": "⭐ Efficient"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "speaker",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "living_room",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "grinder",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "kitchen",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "oven",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "kitchen",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "toaster",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "kitchen",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "refrigerator",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "kitchen",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "lamp",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_1",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "light",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_1",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "fan",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_1",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "ac",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_1",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.033,
        "appliance": "lamp",
        "baseline_kwh": 0.1,
        "difference_kwh": -0.067,
        "money_saved_inr": 0.57,
        "room": "bedroom_2",
        "status": "⭐ Efficient"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "light",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_2",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "fan",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_2",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "ac",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_2",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "tv",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bedroom_2",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "geyser",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bathroom",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "light",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bathroom",
        "status": "⚖ Normal"
      },
      {
        "actual_kwh": 0.0,
        "appliance": "exhaust_fan",
        "baseline_kwh": 0,
        "difference_kwh": 0.0,
        "money_saved_inr": 0.0,
        "room": "bathroom",
        "status": "⚖ Normal"
      }
    ],

    summary: {
      difference_kwh: -0.367,
      money_saved_inr: 3.12,
      period: "day",
      total_actual_kwh: 0.033,
      total_baseline_kwh: 0.4
    }
  };


  // Group by rooms
  const groupedByRoom = data.appliance_breakdown.reduce((acc, item) => {
    if (!acc[item.room]) acc[item.room] = [];
    acc[item.room].push(item);
    return acc;
  }, {});

  const getStatusColor = (status) => {
    if (status.includes("Efficient")) return "text-green-400";
    if (status.includes("Normal")) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="p-6 text-brand-text bg-brand-bg">
      
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-brand-primary mb-6">
        Eco 🌱 Efficiency Report
      </h1>

      {/* Summary Box */}
    <div className="p-4 rounded-lg mb-6 border border-brand-hover bg-brand-bg hover:bg-brand-hover transition">
        <p><span className="font-semibold">Energy Difference:</span> {data.summary.difference_kwh} kWh</p>
        <p><span className="font-semibold">Money Saved:</span> ₹{data.summary.money_saved_inr}</p>
        <p><span className="font-semibold">Usage Period:</span> {data.summary.period}</p>
        <p><span className="font-semibold">Total Usage:</span> {data.summary.total_actual_kwh} kWh</p>
      </div>

      {/* Appliance Breakdown */}
      {Object.keys(groupedByRoom).map((room) => (
        <div key={room} className="mb-6">
          
          {/* Room Title */}
          <h2 className="text-xl font-semibold mb-3 underline">
            {room.replace("_", " ").toUpperCase()}
          </h2>

        {/* Table */}
            <div className="border border-brand-hover rounded-lg overflow-hidden bg-brand-bg">
            <table className="w-full text-left text-sm bg-brand-bg">
                <thead className="bg-brand-table-header text-brand-text">
                <tr>
                    <th className="p-2">Appliance</th>
                    <th className="p-2">Actual (kWh)</th>
                    <th className="p-2">Baseline (kWh)</th>
                    <th className="p-2">Saved (₹)</th>
                    <th className="p-2">Status</th>
                </tr>
                </thead>


              <tbody>
                {groupedByRoom[room].map((item, i) => (
                  <tr key={i} className="border-t border-brand hover:bg-brand-table-row transition">
                    <td className="p-2 capitalize">{item.appliance.replace("_", " ")}</td>
                    <td className="p-2">{item.actual_kwh}</td>
                    <td className="p-2">{item.baseline_kwh}</td>
                    <td className="p-2">₹{item.money_saved_inr}</td>
                    <td className={`p-2 font-bold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
