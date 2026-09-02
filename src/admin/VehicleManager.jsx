import { useEffect, useState } from 'react';
import {
  getVehicles,
  updateVehicle,
  createVehicle,
  deleteVehicle,
} from '../services/vehicleService';
import AdminLayout from './AdminLayout';

export default function VehicleManager() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createValues, setCreateValues] = useState({
    name: '',
    vehicle_type: 'Sedan',
    fuel_type: 'Petrol',
    transmission: 'Manual',
    seating_capacity: 4,
    price: 2500,
    luggage_capacity: '200L',
    description: '',
    suitable_for: '',
    air_conditioned: true,
    status: 'active',
    image: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    const loadVehicles = async () => {
      const data = await getVehicles();
      setVehicles(data);
      setLoading(false);
    };

    loadVehicles();
  }, []);

  const startEdit = (vehicle) => {
    setEditing(vehicle.id);
    setEditValues({
      name: vehicle.name,
      price: vehicle.price,
      fuel_type: vehicle.fuel_type,
      transmission: vehicle.transmission,
      seating_capacity: vehicle.seating_capacity,
      luggage_capacity: vehicle.luggage_capacity,
      description: vehicle.description,
    });
  };

  const saveEdit = async (id) => {
    try {
      const result = await updateVehicle(id, editValues);

      if (result.success) {
        setVehicles(
          vehicles.map((v) => (v.id === id ? { ...v, ...editValues } : v))
        );
        setEditing(null);
        showMessage('Vehicle updated successfully!', 'success');
      } else {
        showMessage('Error updating vehicle: ' + result.error, 'error');
      }
    } catch (err) {
      console.error('Error saving:', err);
      showMessage('Error updating vehicle', 'error');
    }
  };

  const handleCreateVehicle = async () => {
    if (!createValues.name || !createValues.price) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    const generatedSlug = createValues.name.toLowerCase().replace(/\s+/g, '-');

    try {
      const result = await createVehicle({
        ...createValues,
        slug: generatedSlug,
        price: parseFloat(createValues.price),
        seating_capacity: parseInt(createValues.seating_capacity),
      });

      if (result.success) {
        setVehicles([...vehicles, result.data]);
        setShowCreateForm(false);
        setCreateValues({
          name: '',
          vehicle_type: 'Sedan',
          fuel_type: 'Petrol',
          transmission: 'Manual',
          seating_capacity: 4,
          price: 2500,
          luggage_capacity: '200L',
          description: '',
          suitable_for: '',
          air_conditioned: true,
          status: 'active',
          image: '',
        });
        showMessage('Vehicle created successfully!', 'success');
      } else {
        showMessage('Error creating vehicle: ' + result.error, 'error');
      }
    } catch (err) {
      console.error('Error creating:', err);
      showMessage('Error creating vehicle', 'error');
    }
  };

  const handleDeleteVehicle = async (id, name) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const result = await deleteVehicle(id);

      if (result.success) {
        setVehicles(vehicles.filter((v) => v.id !== id));
        showMessage('Vehicle deleted successfully!', 'success');
      } else {
        showMessage('Error deleting vehicle: ' + result.error, 'error');
      }
    } catch (err) {
      console.error('Error deleting:', err);
      showMessage('Error deleting vehicle', 'error');
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
          Loading Fleet Directives...
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
            Vehicle Management
          </h1>
          <p className="text-s text-gray-500 font-mono tracking-wider mt-1">
            Configure fleet specs, comfort classes, and pricing tiers
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black px-4 py-2.5 rounded-md font-bold text-s uppercase tracking-wider transition-all active:scale-[0.98]"
        >
          {showCreateForm ? 'Cancel Form' : '+ Add New Vehicle'}
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
            Add New Vehicle Specification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Vehicle Name *
              </label>
              <input
                type="text"
                value={createValues.name}
                onChange={(e) =>
                  setCreateValues({ ...createValues, name: e.target.value })
                }
                placeholder="e.g., Honda City (Petrol Automatic)"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Vehicle Type
              </label>
              <select
                value={createValues.vehicle_type}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    vehicle_type: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s cursor-pointer"
              >
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  Sedan
                </option>
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  MUV
                </option>
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  Group Transport
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Fuel Type
              </label>
              <select
                value={createValues.fuel_type}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    fuel_type: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s cursor-pointer"
              >
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  CNG
                </option>
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  Petrol
                </option>
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  Diesel
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Transmission
              </label>
              <select
                value={createValues.transmission}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    transmission: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s cursor-pointer"
              >
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  Manual
                </option>
                <option className="bg-white text-black dark:bg-black dark:text-white">
                  Automatic
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Seating Capacity
              </label>
              <input
                type="number"
                value={createValues.seating_capacity}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    seating_capacity: parseInt(e.target.value),
                  })
                }
                min="1"
                max="20"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Base Price (₹) *
              </label>
              <input
                type="number"
                value={createValues.price}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    price: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Luggage Capacity
              </label>
              <input
                type="text"
                value={createValues.luggage_capacity}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    luggage_capacity: e.target.value,
                  })
                }
                placeholder="e.g., 200L"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Image URL
              </label>
              <input
                type="text"
                value={createValues.image}
                onChange={(e) =>
                  setCreateValues({ ...createValues, image: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono"
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
                placeholder="Brief description of the vehicle"
                rows="3"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s leading-relaxed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-1.5">
                Suitable For (comma-separated)
              </label>
              <input
                type="text"
                value={createValues.suitable_for}
                onChange={(e) =>
                  setCreateValues({
                    ...createValues,
                    suitable_for: e.target.value,
                  })
                }
                placeholder="e.g., Solo travelers, couples, business travel"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s"
              />
            </div>
          </div>

          <button
            onClick={handleCreateVehicle}
            className="mt-6 bg-black text-white hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black px-6 py-2.5 rounded-md font-bold text-s uppercase tracking-wider transition-all active:scale-[0.98]"
          >
            Create Vehicle
          </button>
        </div>
      )}

      {/* Vehicles Table */}
      <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] rounded-md overflow-x-auto shadow-sm dark:shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#111]">
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Vehicle Name
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Fuel
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Gearbox
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Seats
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Price (₹)
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#1a1a1a]">
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="hover:bg-gray-50 dark:hover:bg-[#111] transition-colors"
              >
                <td className="px-4 py-4 text-s font-semibold text-black dark:text-white">
                  {vehicle.name}
                </td>
                <td className="px-4 py-4 text-s text-gray-500 dark:text-gray-400">
                  {vehicle.vehicle_type}
                </td>
                <td className="px-4 py-4 text-s text-gray-600 dark:text-gray-300 font-mono">
                  {editing === vehicle.id ? (
                    <select
                      value={editValues.fuel_type}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          fuel_type: e.target.value,
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s font-mono focus:outline-none"
                    >
                      <option className="bg-white text-black dark:bg-black dark:text-white">
                        CNG
                      </option>
                      <option className="bg-white text-black dark:bg-black dark:text-white">
                        Petrol
                      </option>
                      <option className="bg-white text-black dark:bg-black dark:text-white">
                        Diesel
                      </option>
                    </select>
                  ) : (
                    vehicle.fuel_type
                  )}
                </td>
                <td className="px-4 py-4 text-s text-gray-600 dark:text-gray-300">
                  {editing === vehicle.id ? (
                    <select
                      value={editValues.transmission}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          transmission: e.target.value,
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s focus:outline-none"
                    >
                      <option className="bg-white text-black dark:bg-black dark:text-white">
                        Manual
                      </option>
                      <option className="bg-white text-black dark:bg-black dark:text-white">
                        Automatic
                      </option>
                    </select>
                  ) : (
                    vehicle.transmission
                  )}
                </td>
                <td className="px-4 py-4 text-s text-gray-600 dark:text-gray-300 font-mono">
                  {editing === vehicle.id ? (
                    <input
                      type="number"
                      value={editValues.seating_capacity}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          seating_capacity: parseInt(e.target.value),
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s font-mono w-14 focus:outline-none"
                    />
                  ) : (
                    `${vehicle.seating_capacity} Seats`
                  )}
                </td>
                <td className="px-4 py-4 text-s font-mono font-bold text-black dark:text-white">
                  {editing === vehicle.id ? (
                    <input
                      type="number"
                      value={editValues.price}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="px-2 py-1 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded text-black dark:text-white text-s font-mono w-24 focus:outline-none"
                      step="0.01"
                    />
                  ) : (
                    `₹${vehicle.price.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-4 text-s text-right space-x-2">
                  {editing === vehicle.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(vehicle.id)}
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
                        onClick={() => startEdit(vehicle)}
                        className="px-3 py-1.5 bg-transparent border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white rounded-md text-[10px] uppercase font-mono tracking-wider transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteVehicle(vehicle.id, vehicle.name)
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
          Total Fleet Active:{' '}
          <strong className="text-black dark:text-white">
            {vehicles.length}
          </strong>
        </span>
        <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">
          Fleet Registry Active
        </span>
      </div>
    </AdminLayout>
  );
}
