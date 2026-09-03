import { useEffect, useState } from 'react';
import { getEnquiries } from '../services/enquiryService';
import { supabase } from '../services/supabase';
import AdminLayout from './AdminLayout';

export default function EnquiryManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    const loadEnquiries = async () => {
      const data = await getEnquiries();
      setEnquiries(data);
      setLoading(false);
    };

    loadEnquiries();
  }, []);

  const updateEnquiryStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (!error) {
        setEnquiries(
          enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        showMessage(`Status updated to "${newStatus}"`, 'success');
      } else {
        showMessage('Error updating status', 'error');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      showMessage('Error updating status', 'error');
    }
    setUpdating(null);
  };

  const deleteEnquiry = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this enquiry? This cannot be undone.'
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);

      if (!error) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
        showMessage('Enquiry deleted successfully', 'success');
      } else {
        showMessage('Error deleting enquiry', 'error');
      }
    } catch (err) {
      console.error('Error deleting:', err);
      showMessage('Error deleting enquiry', 'error');
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new':
        return 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white';
      case 'contacted':
        return 'bg-gray-200 text-gray-800 border-gray-300 dark:bg-[#222] dark:text-gray-200 dark:border-[#333]';
      case 'confirmed':
        return 'bg-gray-800 text-white border-gray-700 dark:bg-[#111] dark:text-white dark:border-white/40';
      case 'closed':
        return 'bg-transparent text-gray-500 border-gray-300 dark:border-[#333]';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-[#111] dark:text-gray-400 dark:border-[#222]';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-s font-mono tracking-widest text-gray-500 uppercase">
          Loading Booking Enquiries...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
            Booking Enquiries
          </h1>
          <p className="text-s text-gray-500 font-mono tracking-wider mt-1">
            Real-time customer reservation requests
          </p>
        </div>

        {/* Minimal Metrics Pill */}
        <div className="flex items-center gap-4 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] px-4 py-2 rounded-md text-s font-mono shadow-sm">
          <span className="text-gray-500">
            Total:{' '}
            <strong className="text-black dark:text-white">
              {enquiries.length}
            </strong>
          </span>
          <span className="text-gray-300 dark:text-[#333]">|</span>
          <span className="text-gray-500">
            New:{' '}
            <strong className="text-black dark:text-white">
              {enquiries.filter((e) => e.status === 'new').length}
            </strong>
          </span>
        </div>
      </div>

      {/* Status Alert Banner */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-md border text-s font-mono tracking-wide ${
            messageType === 'success'
              ? 'bg-gray-100 dark:bg-[#111] border-gray-300 dark:border-white/20 text-black dark:text-white'
              : 'bg-red-50 dark:bg-black border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400'
          }`}
        >
          <p>{message}</p>
        </div>
      )}

      {/* Enquiries Table Display */}
      {enquiries.length === 0 ? (
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] p-12 rounded-md text-center">
          <p className="text-s uppercase font-mono tracking-widest text-gray-500">
            No booking enquiries recorded
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] rounded-md overflow-x-auto shadow-sm dark:shadow-2xl transition-colors">
          <table className="w-full min-w-[760px] lg:min-w-0 text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#111]">
                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Cus_ID
                </th>
                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Customer
                </th>
                <th className="hidden md:table-cell px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Contact
                </th>
                <th className="hidden sm:table-cell px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Route
                </th>
                <th className="hidden lg:table-cell px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Travel Date
                </th>
                <th className="hidden lg:table-cell px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 text-center">
                  Passengers
                </th>
                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Fare
                </th>
                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#1a1a1a]">
              {enquiries.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className="hover:bg-gray-50 dark:hover:bg-[#111] transition-colors"
                >
                  <td className="px-4 py-4 text-s font-mono font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    #{enquiry.id}
                  </td>
                  <td className="px-4 py-4 text-s font-semibold text-black dark:text-white max-w-[150px] truncate">
                    {enquiry.name}
                  </td>
                  <td className="hidden md:table-cell px-4 py-4 text-s space-y-1">
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {enquiry.phone}
                    </a>
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="block text-[11px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      {enquiry.email}
                    </a>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-4 text-s">
                    <span className="text-black dark:text-white font-medium">
                      {enquiry.pickup}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 block text-[10px] mt-0.5">
                      &rarr; {enquiry.drop}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 py-4 text-s text-gray-600 dark:text-gray-300 font-mono">
                    {new Date(enquiry.travel_date).toLocaleDateString()}
                  </td>
                  <td className="hidden lg:table-cell px-4 py-4 text-s text-center font-mono font-semibold text-black dark:text-white">
                    {enquiry.passengers}
                  </td>
                  <td className="px-4 py-4 text-s whitespace-nowrap">
                    <div className="font-bold text-black dark:text-white">
                      {enquiry.total_fare != null
                        ? `₹${Number(enquiry.total_fare).toLocaleString('en-IN')}`
                        : '—'}
                    </div>
                    {enquiry.total_fare != null && (
                      <div className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                        One Way ₹
                        {Number(enquiry.one_way_fare || 0).toLocaleString(
                          'en-IN'
                        )}
                        {Number(enquiry.waiting_charge || 0) > 0 && (
                          <>
                            {' '}
                            · Wait ₹
                            {Number(enquiry.waiting_charge).toLocaleString(
                              'en-IN'
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-4 text-s">
                    <select
                      value={enquiry.status}
                      onChange={(e) =>
                        updateEnquiryStatus(enquiry.id, e.target.value)
                      }
                      disabled={updating === enquiry.id}
                      className={`px-3 py-1 rounded-md text-[11px] uppercase font-mono tracking-wider font-bold border cursor-pointer focus:outline-none disabled:opacity-50 transition-all ${getStatusBadgeClass(enquiry.status)}`}
                    >
                      <option
                        value="new"
                        className="bg-white text-black dark:bg-black dark:text-white"
                      >
                        New
                      </option>
                      <option
                        value="contacted"
                        className="bg-white text-black dark:bg-black dark:text-white"
                      >
                        Contacted
                      </option>
                      <option
                        value="confirmed"
                        className="bg-white text-black dark:bg-black dark:text-white"
                      >
                        Confirmed
                      </option>
                      <option
                        value="closed"
                        className="bg-white text-black dark:bg-black dark:text-white"
                      >
                        Closed
                      </option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-s text-right whitespace-nowrap">
                    <button
                      onClick={() => deleteEnquiry(enquiry.id)}
                      className="px-3 py-1.5 bg-transparent border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-md text-[10px] uppercase font-mono tracking-wider transition-all active:scale-[0.98]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Footer Bar */}
      <div className="mt-8 p-4 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] rounded-md flex flex-wrap items-center justify-between text-s text-gray-500 dark:text-gray-400 font-mono gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-6">
          <span>
            New:{' '}
            <strong className="text-black dark:text-white">
              {enquiries.filter((e) => e.status === 'new').length}
            </strong>
          </span>
          <span>
            Contacted:{' '}
            <strong className="text-black dark:text-white">
              {enquiries.filter((e) => e.status === 'contacted').length}
            </strong>
          </span>
          <span>
            Confirmed:{' '}
            <strong className="text-black dark:text-white">
              {enquiries.filter((e) => e.status === 'confirmed').length}
            </strong>
          </span>
          <span>
            Closed:{' '}
            <strong className="text-black dark:text-white">
              {enquiries.filter((e) => e.status === 'closed').length}
            </strong>
          </span>
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">
          DeccanRide Database Sync Active
        </span>
      </div>
    </AdminLayout>
  );
}
