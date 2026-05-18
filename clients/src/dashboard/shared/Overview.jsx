import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  FiTrendingUp, FiTrendingDown, FiCalendar, FiDollarSign, FiUsers,
  FiCheckCircle, FiNavigation, FiCreditCard
} from "react-icons/fi";
import { FaCar } from "react-icons/fa"; // we can just use FiTruck instead

const REVENUE_DATA = [
  { name: 'Jan', bookings: 20000, rentals: 15000, travel: 8000 },
  { name: 'Feb', bookings: 25000, rentals: 18000, travel: 12000 },
  { name: 'Mar', bookings: 35000, rentals: 28000, travel: 19000 },
  { name: 'Apr', bookings: 30000, rentals: 24000, travel: 17000 },
  { name: 'May', bookings: 45000, rentals: 32000, travel: 21000 },
  { name: 'Jun', bookings: 42000, rentals: 29000, travel: 20000 },
];

const PIE_DATA = [
  { name: 'Bookings', value: 1482, percentage: '55.2%', color: '#6366f1' },
  { name: 'Rentals', value: 892, percentage: '33.2%', color: '#22c55e' },
  { name: 'Travel', value: 312, percentage: '11.6%', color: '#3b82f6' },
];

const RECENT_ACTIVITIES = [
  { id: 1, action: "New booking BKG-2024-1452 created", time: "2 mins ago", icon: FiCalendar, color: "text-indigo-600", bg: "bg-indigo-50" },
  { id: 2, action: "Payment received from John Doe", time: "15 mins ago", icon: FiDollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: 3, action: "New rental request from Sarah Smith", time: "1 hour ago", icon: FaCar, color: "text-orange-600", bg: "bg-orange-50" },
  { id: 4, action: "New travel package added: Explore Bali", time: "2 hours ago", icon: FiNavigation, color: "text-blue-600", bg: "bg-blue-50" },
  { id: 5, action: "Refund processed for booking BKG-2024-1448", time: "3 hours ago", icon: FiCreditCard, color: "text-rose-600", bg: "bg-rose-50" },
];

const RECENT_BOOKINGS = [
  { id: "BKG-2024-1452", name: "John Doe", date: "May 12, 2024", status: "Confirmed", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: "BKG-2024-1451", name: "Sarah Smith", date: "May 12, 2024", status: "Pending", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: "BKG-2024-1450", name: "Michael Brown", date: "May 11, 2024", status: "Confirmed", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: "BKG-2024-1449", name: "Emily Davis", date: "May 11, 2024", status: "Canceled", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
];

const SPARK_DATA_UP = [
  {v: 10}, {v: 15}, {v: 13}, {v: 18}, {v: 25}, {v: 22}, {v: 30}
];
const SPARK_DATA_DOWN = [
  {v: 30}, {v: 28}, {v: 25}, {v: 26}, {v: 20}, {v: 18}, {v: 15}
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass, bgClass, sparkData }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justifybetween h-40">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${bgClass} ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend === 'up' ? (
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
          <FiTrendingUp className="w-3 h-3" /> +{trendValue}%
          {/* <span className="text-slate-400 font-normal ml-0.5">from last month</span> */}
        </div>
      ) : (
        <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600">
          <FiTrendingDown className="w-3 h-3" /> -{trendValue}%
          {/* <span className="text-slate-400 font-normal ml-0.5">from last month</span> */}
        </div>
      )}
    </div>
    
    <div className="mt-2 relative">
      <h4 className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">{title}</h4>
      <h2 className="text-2xl font-bold text-slate-800">{value}</h2>
      
      <div className="absolute -bottom-2 -right2 w-28 h-12 opacity-80 pointer-events-none">
        <LineChart width={112} height={48} data={sparkData}>
          <Line 
            type="monotone" 
            dataKey="v" 
            stroke={trend === 'up' ? '#10b981' : '#f43f5e'} 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </div>
    </div>
  </div>
);

const Overview = () => {
  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-[11px] text-slate-500 mt-0.5">Welcome back, Admin! Here's what's happening with your platform.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
          May 12 - Jun 12, 2024
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <StatCard 
          title="Total Revenue" value="$248,890" icon={FiCalendar} 
          trend="up" trendValue="12.5" colorClass="text-indigo-600" bgClass="bg-indigo-50" 
          sparkData={SPARK_DATA_UP}
        />
        <StatCard 
          title="Active Bookings" value="1,482" icon={FiCheckCircle} 
          trend="up" trendValue="8.2" colorClass="text-emerald-600" bgClass="bg-emerald-50" 
          sparkData={SPARK_DATA_UP}
        />
        <StatCard 
          title="Active Rentals" value="892" icon={FaCar} 
          trend="up" trendValue="6.1" colorClass="text-orange-500" bgClass="bg-orange-50" 
          sparkData={SPARK_DATA_UP}
        />
        <StatCard 
          title="Upcoming Trips" value="312" icon={FiNavigation} 
          trend="up" trendValue="15.3" colorClass="text-blue-600" bgClass="bg-blue-50" 
          sparkData={SPARK_DATA_UP}
        />
        <StatCard 
          title="Pending Payments" value="$18,730" icon={FiCreditCard} 
          trend="down" trendValue="4.2" colorClass="text-rose-500" bgClass="bg-rose-50" 
          sparkData={SPARK_DATA_DOWN}
        />
        <StatCard 
          title="Total Users" value="24,532" icon={FiUsers} 
          trend="up" trendValue="9.7" colorClass="text-teal-500" bgClass="bg-teal-50" 
          sparkData={SPARK_DATA_UP}
        />
      </div>

      {/* Middle Row: Charts & Recent Bookings */}
      <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
        
        {/* Revenue Overview Line Chart */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Revenue Overview</h3>
            <select className="bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-1.5 outline-none">
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          
          <div className="flex items-center gap-6 mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-[11px] font-medium text-slate-500">Booking Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[11px] font-medium text-slate-500">Rental Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[11px] font-medium text-slate-500">Travel Revenue</span>
            </div>
          </div>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis 
                  axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} 
                  tickFormatter={(value) => value === 0 ? '$0' : `$${value/1000}K`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Line type="monotone" dataKey="bookings" stroke="#6366f1" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="rentals" stroke="#22c55e" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="travel" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Donut Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Bookings vs Rentals vs Travel</h3>
          
          <div className="flex-1 relative flex flex-col justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-500 font-medium">Total</span>
              <span className="text-2xl font-bold text-slate-800">2,686</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            {PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-800 mr-2">{item.value.toLocaleString()}</span>
                  <span className="text-[11px] text-slate-500 font-medium">({item.percentage})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Recent Bookings</h3>
            <button className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {RECENT_BOOKINGS.map((booking, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0">
                    <img src={booking.img} alt="Booking" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{booking.id}</h4>
                    <p className="text-[11px] font-medium text-slate-500">{booking.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{booking.date}</p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                  booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                  booking.status === 'Pending' ? 'bg-blue-50 text-blue-600' :
                  'bg-orange-50 text-orange-600'
                }`}>
                  {booking.status}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Top Destinations */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Top Destinations</h3>
            <button className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { flag: "🇫🇷", name: "Paris, France", bookings: 324, trend: "+12%" },
              { flag: "🇮🇩", name: "Bali, Indonesia", bookings: 298, trend: "+8%" },
              { flag: "🇦🇪", name: "Dubai, UAE", bookings: 276, trend: "+15%" },
              { flag: "🇹🇷", name: "Istanbul, Turkey", bookings: 210, trend: "+2%" },
              { flag: "🇬🇧", name: "London, UK", bookings: 189, trend: "+5%" },
            ].map((dest, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 w-3">{i + 1}</span>
                  <span className="text-xl">{dest.flag}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{dest.name}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500">{dest.bookings} Bookings</span>
                  <span className="text-xs font-bold text-emerald-600 w-10 text-right">{dest.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Recent Activities</h3>
            <button className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-5">
            {RECENT_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Platform Statistics</h3>
          <div className="space-y-6">
            
            {/* Total Bookings */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700">Total Bookings</span>
                <span className="text-xs font-medium text-slate-500">1,482 / 2,000</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>

            {/* Total Rentals */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700">Total Rentals</span>
                <span className="text-xs font-medium text-slate-500">892 / 1,500</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '59%' }}></div>
              </div>
            </div>

            {/* Total Trips */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700">Total Trips</span>
                <span className="text-xs font-medium text-slate-500">312 / 800</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '39%' }}></div>
              </div>
            </div>

            {/* Total Users */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700">Total Users</span>
                <span className="text-xs font-medium text-slate-500">24,532 / 50,000</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '49%' }}></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;
