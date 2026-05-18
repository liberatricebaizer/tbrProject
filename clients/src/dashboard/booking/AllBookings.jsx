import React, { useMemo } from "react";
import DataTable from "../components/DataTable";
import { getBookingsLocal } from "../../utility/localDb";

const AllBookings = () => {
  const bookings = getBookingsLocal();

  const columns = useMemo(() => [
    {
      header: "Booking ID",
      accessor: "_id",
      render: (row) => <span className="font-medium text-slate-700">{row._id?.slice(-8) || "—"}</span>,
    },
    {
      header: "Customer",
      accessor: "ownName",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
            {row.ownName ? row.ownName.charAt(0).toUpperCase() : "G"}
          </div>
          <span className="font-medium">{row.ownName || "Guest"}</span>
        </div>
      )
    },
    {
      header: "Property / Trip",
      accessor: "hotelName",
      render: (row) => row.hotelName || row.type || "—"
    },
    {
      header: "Date",
      accessor: "createdAt",
      render: (row) => new Date(row.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    },
    {
      header: "Payment",
      accessor: "paymentStatus",
      render: (row) => {
        const isPaid = String(row.paymentStatus).toLowerCase() === "paid";
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {row.paymentStatus || "Pending"}
          </span>
        );
      }
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
          {row.status || "Confirmed"}
        </span>
      )
    }
  ], []);

  return (
    <div className="space-y-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">All Bookings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track all reservations across the platform.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm shadow-indigo-200">
          + New Booking
        </button>
      </div>

      <div className="h-[calc(100vh-180px)]">
        <DataTable 
          title="Booking Records" 
          data={bookings} 
          columns={columns} 
        />
      </div>
    </div>
  );
};

export default AllBookings;
