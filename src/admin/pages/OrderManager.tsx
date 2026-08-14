import React, { useState } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { useAdminConfig } from '../context/AdminConfigContext';
import type { Order } from '../../types';

export const OrderManager: React.FC = () => {
  const { config, updateOrderStatus } = useAdminConfig();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses: Order['status'][] = [
    'Order Received',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ];

  const filteredOrders = config.orders.filter((order) => {
    const matchStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.phone.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Fulfillment Pipeline</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Customer Orders &amp; Dispatch Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor incoming grocery orders, advance delivery stages, and verify delivery addresses.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, customer name, phone number..."
            className="w-full h-10 pl-10 pr-4 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
          >
            <option value="ALL">All Statuses ({config.orders.length})</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200/80">
                <th className="py-3 px-4">Order ID &amp; Date</th>
                <th className="py-3 px-4">Customer &amp; Phone</th>
                <th className="py-3 px-4">Delivery Address</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-purple-700">{order.id}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{order.date}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{order.deliveryAddress.name}</div>
                    <div className="text-[11px] text-slate-500">{order.deliveryAddress.phone}</div>
                  </td>

                  <td className="py-3.5 px-4 max-w-[200px] truncate">
                    <div className="text-slate-800 font-medium truncate">{order.deliveryAddress.street}</div>
                    <div className="text-[10px] text-slate-400">{order.deliveryAddress.city}, {order.deliveryAddress.pincode}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-black text-slate-900">₹{order.finalAmount}</span>
                    {order.discount > 0 && (
                      <span className="text-[10px] text-emerald-600 block">(-₹{order.discount} off)</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-[10px] text-slate-700">
                      {order.paymentMethod}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Out for Delivery'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className="h-8 px-2 text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200 rounded-lg focus:outline-none cursor-pointer"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
