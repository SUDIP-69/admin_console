import { useState } from 'react';

const Signup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const data = [
    {
      id: 1,
      date: '2024-07-13',
      resturant_name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      status: 'Pending',
    },
    {
      id: 2,
      date: '2024-07-14',
      resturant_name: 'Sudip',
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
      row.resturant_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
              activeFilter === filter ? 'bg-slate-300/30 text-blue-500 font-semibold' : 'bg-transparent border-none text-black'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto -mt-4 rounded-b-xl rounded-e-lg shadow-lg">
        <table className="min-w-full bg-transparent">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b bg-slate-600">Sl No.</th>
              <th className="px-4 py-2 border-b bg-slate-600">Date</th>
              <th className="px-4 py-2 border-b bg-slate-600">Name</th>
              <th className="px-4 py-2 border-b bg-slate-600">Email</th>
              <th className="px-4 py-2 border-b bg-slate-600">Phone No.</th>
              <th className="px-4 py-2 border-b bg-slate-600">Address</th>
              <th className="px-4 py-2 border-b bg-slate-600">Status</th>
              <th className="px-4 py-2 border-b bg-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id} className='hover:bg-[#FFF0E3]'>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer">{index + 1}</td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer">{row.date}</td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer">{row.resturant_name}</td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer">{row.email}</td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer">{row.phone}</td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer">{row.address}</td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer">{row.status}</td>
                <td className="px-4 py-5 text-zinc-600 border-b hover:cursor-pointer flex items-center justify-center gap-2">
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

export default Signup;
