import { useEffect, useState } from 'react';
import { getAllRoutes, updateRoute } from '../services/routeService';
import { supabase } from '../services/supabase';
import AdminLayout from './AdminLayout';

export default function RouteManager() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createValues, setCreateValues] = useState({
    name: '',
    origin: '',
    destination: '',
    distance: 150,
    travel_time: '3 hours',
    one_way_price: 2500,
    round_trip_price: 4500,
    description: '',
    status: 'active',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    const loadRoutes = async () => {
      const data = await getAllRoutes();
      setRoutes(data);
      setLoading(false);
    };

    loadRoutes();
  }, []);

  const startEdit = (route) => {
    setEditing(route.id);
    setEditValues({
      one_way_price: route.one_way_price,
      round_trip_price: route.round_trip_price,
      distance: route.distance,
      travel_time: route.travel_time,
      description: route.description,
    });
  };

  const saveEdit = async (id) => {
    try {
      const result = await updateRoute(id, editValues);

      if (result.success) {
        setRoutes(
          routes.map((r) => (r.id === id ? { ...r, ...editValues } : r))
        );
        setEditing(null);
        showMessage('Route updated successfully!', 'success');
      } else {
        showMessage('Error updating route: ' + result.error, 'error');
      }
    } catch (err) {
      console.error('Error saving:', err);
      showMessage('Error updating route', 'error');
    }
  };

  const handleCreateRoute = async () => {
    if (
      !createValues.name ||
      !createValues.origin ||
      !createValues.destination ||
      !createValues.one_way_price
    ) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    const generatedSlug =
      `${createValues.origin.toLowerCase()}-to-${createValues.destination.toLowerCase()}`.replace(
        /\s+/g,
        '-'
      );

    try {
      const { data, error } = await supabase
        .from('routes')
        .insert([
          {
            name: createValues.name,
            slug: generatedSlug,
            origin: createValues.origin,
            destination: createValues.destination,
            distance: parseInt(createValues.distance),
            travel_time: createValues.travel_time,
            one_way_price: parseFloat(createValues.one_way_price),
            round_trip_price: parseFloat(createValues.round_trip_price),
            description: createValues.description,
            status: createValues.status,
          },
        ])
        .select();

      if (error) {
        showMessage('Error creating route: ' + error.message, 'error');
        return;
      }

      setRoutes([...routes, data[0]]);
      setShowCreateForm(false);
      setCreateValues({
        name: '',
        origin: '',
        destination: '',
        distance: 150,
        travel_time: '3 hours',
        one_way_price: 2500,
        round_trip_price: 4500,
        description: '',
        status: 'active',
      });
      showMessage('Route created successfully!', 'success');
    } catch (err) {
      console.error('Error creating:', err);
      showMessage('Error creating route', 'error');
    }
  };

  const handleDeleteRoute = async (id, name) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase.from('routes').delete().eq('id', id);

      if (error) {
        showMessage('Error deleting route: ' + error.message, 'error');
        return;
      }

      setRoutes(routes.filter((r) => r.id !== id));
      showMessage('Route deleted successfully!', 'success');
    } catch (err) {
      console.error('Error deleting:', err);
      showMessage('Error deleting route', 'error');
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-s font-mono tracking-widest text-gray-500 uppercase">
          Loading Route Configurations...
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
            Route Management
          </h1>
          <p className="text-s text-gray-500 font-mono tracking-wider mt-1">
            Configure intercity corridors, travel durations, and pricing
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black px-4 py-2.5 rounded-md font-bold text-s uppercase tracking-wider transition-all active:scale-[0.98]"
        >
          {showCreateForm ? 'Cancel Form' : '+ Add New Route'}
        </button>
      </div>

      {/* Message Banner */}
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

      {/* Create Form */}
      {showCreateForm && (
        <div className="mb-8 bg-white dark:bg-[#0a0a0a] p-6 sm:p-8 rounded-md border border-gray-200 dark:border-[#222] shadow-sm">
          <h2 className="text-lg font-bold text-black dark:text-white mb-6 uppercase tracking-wider text-s">
            Add New Route Specification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Route Name *
              </label>
              <input
                type="text"
                value={createValues.name}
                onChange={(e) =>
                  setCreateValues({ ...createValues, name: e.target.value })
                }
                placeholder="e.g., Pune to Mumbai"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Origin *
              </label>
              <input
                type="text"
                value={createValues.origin}
                onChange={(e) =>
                  setCreateValues({ ...createValues, origin: e.target.value })
                }
                placeholder="e.g., Pune"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Destination *
              </label>
              <input
                type="text"
                value={createValues.destination}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    destination: e.target.value,
                  })
                }
                placeholder="e.g., Mumbai"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Distance (km)
              </label>
              <input
                type="number"
                value={createValues.distance}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    distance: parseInt(e.target.value),
                  })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Travel Time
              </label>
              <input
                type="text"
                value={createValues.travel_time}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    travel_time: e.target.value,
                  })
                }
                placeholder="e.g., 3 hours"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                One Way Price (₹) *
              </label>
              <input
                type="number"
                value={createValues.one_way_price}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    one_way_price: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Round Trip Price (₹)
              </label>
              <input
                type="number"
                value={createValues.round_trip_price}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    round_trip_price: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Description
              </label>
              <textarea
                value={createValues.description}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    description: e.target.value,
                  })
                }
                placeholder="Route description and details"
                rows="3"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s leading-relaxed"
              />
            </div>
          </div>

          <button
            onClick={handleCreateRoute}
            className="mt-6 bg-black text-white hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black px-6 py-2.5 rounded-md font-bold text-s uppercase tracking-wider transition-all active:scale-[0.98]"
          >
            Create Route
          </button>
        </div>
      )}

      {/* Routes Table */}
      <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] rounded-md overflow-x-auto shadow-sm dark:shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#111]">
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Route Corridor
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Distance
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Travel Time
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                One Way (₹)
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Round Trip (₹)
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#1a1a1a]">
            {routes.map((route) => (
              <tr
                key={route.id}
                className="hover:bg-gray-50 dark:hover:bg-[#111] transition-colors"
              >
                <td className="px-4 py-4 text-s font-semibold text-black dark:text-white">
                  {route.origin} &rarr; {route.destination}
                </td>
                <td className="px-4 py-4 text-s text-gray-600 dark:text-gray-300 font-mono">
                  {editing === route.id ? (
                    <input
                      type="number"
                      value={editValues.distance}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          distance: parseInt(e.target.value),
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s font-mono w-20 focus:outline-none"
                    />
                  ) : (
                    `${route.distance} km`
                  )}
                </td>
                <td className="px-4 py-4 text-s text-gray-600 dark:text-gray-300">
                  {editing === route.id ? (
                    <input
                      type="text"
                      value={editValues.travel_time}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          travel_time: e.target.value,
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s w-28 focus:outline-none"
                    />
                  ) : (
                    route.travel_time
                  )}
                </td>
                <td className="px-4 py-4 text-s font-mono font-bold text-black dark:text-white">
                  {editing === route.id ? (
                    <input
                      type="number"
                      value={editValues.one_way_price}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          one_way_price: parseFloat(e.target.value),
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s font-mono w-24 focus:outline-none"
                      step="0.01"
                    />
                  ) : (
                    `₹${route.one_way_price.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-4 text-s font-mono font-bold text-black dark:text-white">
                  {editing === route.id ? (
                    <input
                      type="number"
                      value={editValues.round_trip_price}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          round_trip_price: parseFloat(e.target.value),
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s font-mono w-24 focus:outline-none"
                      step="0.01"
                    />
                  ) : (
                    `₹${route.round_trip_price.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-4 text-s text-right space-x-2">
                  {editing === route.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(route.id)}
                        className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded text-[10px] uppercase font-mono font-bold tracking-wider transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="px-3 py-1 bg-transparent border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded text-[10px] uppercase font-mono tracking-wider transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(route)}
                        className="px-3 py-1.5 bg-transparent border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white rounded-md text-[10px] uppercase font-mono tracking-wider transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteRoute(
                            route.id,
                            `${route.origin} → ${route.destination}`
                          )
                        }
                        className="px-3 py-1.5 bg-transparent border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white text-gray-500 hover:text-black dark:hover:text-white rounded-md text-[10px] uppercase font-mono tracking-wider transition-all"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer Bar */}
      <div className="mt-8 p-4 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] rounded-md flex items-center justify-between text-s text-gray-500 dark:text-gray-400 font-mono shadow-sm">
        <span>
          Total Configured Routes:{' '}
          <strong className="text-black dark:text-white">
            {routes.length}
          </strong>
        </span>
        <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">
          Route Services Dynamic
        </span>
      </div>
    </AdminLayout>
  );
}
