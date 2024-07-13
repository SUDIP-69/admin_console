// components/TableComponent.jsx
import { useState } from 'react';

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const data = [
    {
      id: 1,
      date: '2024-07-13',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      status: 'Pending',
    },
    {
      id: 2,
      date: '2024-07-14',
      name: 'Sudip',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      status: 'Verified',
    },
    // Add more rows as needed
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  const filteredData = data.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeFilter === 'All' || row.status === activeFilter)
    );
  });

  return (
    <div className=" border-black">
      <div className="mb-4 flex items-center">
        {/* <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md mr-4"
        /> */}
        {['All', 'Pending', 'Verified', 'Accepted'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-t-lg ${
              activeFilter === filter ? 'bg-white text-black border-b-white border-t border-r border-l border-black' : 'bg-transparent border-none text-black'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto text-black -mt-[1.07rem] rounded-b-xl rounded-e-lg border border-black shadow-lg">
        <table className="min-w-full bg-transparent">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b bg-white">Sl No.</th>
              <th className="px-4 py-2 border-b bg-white">Date</th>
              <th className="px-4 py-2 border-b bg-white">Name</th>
              <th className="px-4 py-2 border-b bg-white">Email</th>
              <th className="px-4 py-2 border-b bg-white">Phone No.</th>
              <th className="px-4 py-2 border-b bg-white">Address</th>
              <th className="px-4 py-2 border-b bg-white">Status</th>
              <th className="px-4 py-2 border-b bg-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id}>
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{row.date}</td>
                <td className="px-4 py-2 border-b">{row.name}</td>
                <td className="px-4 py-2 border-b">{row.email}</td>
                <td className="px-4 py-2 border-b">{row.phone}</td>
                <td className="px-4 py-2 border-b">{row.address}</td>
                <td className="px-4 py-2 border-b">{row.status}</td>
                <td className="px-4 py-5 border-b flex items-center justify-center gap-2">
                  <span className="bg-transparent text-amber-500 px-2 py-1 cursor-pointer border-2 rounded-full text-sm hover:scale-110 duration-500">Verify</span>
                  <span className="bg-transparent text-lime-500 px-2 py-1 cursor-pointer border-2 rounded-full text-sm hover:scale-110 duration-500">Accept</span>
                  <span className="bg-transparent text-rose-500 px-2 py-1 cursor-pointer border-2 rounded-full text-sm hover:scale-110 duration-500">Reject</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
