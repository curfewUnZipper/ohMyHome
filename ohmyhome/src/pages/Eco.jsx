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
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Page Header */}
        <div className="mb-8 flex items-center gap-3">
          <span className="text-4xl">🌱</span>
          <div>
            <h1 className="text-3xl font-bold text-brand-primary">
              Eco Efficiency Report
            </h1>
            <p className="text-gray-400">Track your energy consumption and savings</p>
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="p-6 rounded-lg border border-brand-primary bg-brand-bg hover:bg-brand-hover transition">
            <div className="text-sm text-gray-400 mb-1">Energy Difference</div>
            <div className="text-2xl font-bold text-brand-primary">
              {data.summary.difference_kwh} kWh
            </div>
          </div>

          <div className="p-6 rounded-lg border border-green-500 bg-brand-bg hover:bg-brand-hover transition">
            <div className="text-sm text-gray-400 mb-1">Money Saved</div>
            <div className="text-2xl font-bold text-green-400">
              ₹{data.summary.money_saved_inr}
            </div>
          </div>

          <div className="p-6 rounded-lg border border-blue-500 bg-brand-bg hover:bg-brand-hover transition">
            <div className="text-sm text-gray-400 mb-1">Total Usage</div>
            <div className="text-2xl font-bold text-blue-400">
              {data.summary.total_actual_kwh} kWh
            </div>
          </div>

          <div className="p-6 rounded-lg border border-yellow-500 bg-brand-bg hover:bg-brand-hover transition">
            <div className="text-sm text-gray-400 mb-1">Usage Period</div>
            <div className="text-2xl font-bold text-yellow-400 capitalize">
              {data.summary.period}
            </div>
          </div>

        </div>

        {/* Room-wise Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.keys(groupedByRoom).map((room) => (
            <div key={room} className="bg-brand-bg border border-brand-hover rounded-lg overflow-hidden">
              
              {/* Room Header */}
              <div className="bg-brand-hover border-b border-brand-primary px-6 py-3">
                <h2 className="text-lg font-semibold text-brand-primary capitalize">
                  {room.replace(/_/g, " ")}
                </h2>
              </div>

              {/* Appliances Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-brand-hover text-brand-text">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Appliance</th>
                      <th className="px-4 py-3 text-right font-medium">Actual</th>
                      <th className="px-4 py-3 text-right font-medium">Baseline</th>
                      <th className="px-4 py-3 text-right font-medium">Saved</th>
                      <th className="px-4 py-3 text-center font-medium">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {groupedByRoom[room].map((item, i) => (
                      <tr 
                        key={i} 
                        className="border-t border-brand-hover hover:bg-brand-hover transition"
                      >
                        <td className="px-4 py-3 capitalize font-medium">
                          {item.appliance.replace(/_/g, " ")}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-400">
                          {item.actual_kwh} kWh
                        </td>
                        <td className="px-4 py-3 text-right text-gray-400">
                          {item.baseline_kwh} kWh
                        </td>
                        <td className="px-4 py-3 text-right text-green-400">
                          ₹{item.money_saved_inr}
                        </td>
                        <td className={`px-4 py-3 text-center font-semibold ${getStatusColor(item.status)}`}>
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

      </div>
    </div>
  );
}