import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [batch, setBatch] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignup = async () => {
    const userDetails = {
      name: username,
      email,
      password,
      role,
      batch,
      regNumber,
      facultyId,
      department,
      company,
    };

    try {
      const response = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup Successful! Please log in.');
        navigate('/login');
      } else {
        alert(`Signup Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Signup Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.freecreatives.com/wp-content/uploads/2016/04/Solid-Black-Website-Background.jpg')" }}
    >
      <div className="w-100 border-2 rounded-xl border-blue-600 p-10 bg-black bg-opacity-60 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Signup</h2>
        <form className="flex flex-col">
          <input
            required
            className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-full"
            type="text"
            placeholder="Enter Username"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-full"
            type="email"
            placeholder="Enter Email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-full"
            type="password"
            placeholder="Enter Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* Role Selection */}
          <select
            required
            className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-black rounded-lg py-2 px-6 w-full"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="alumni">Alumni</option>
          </select>

          {/* Additional Fields */}
          {role === 'student' && (
            <>
              <div className="flex space-x-4">
                <input
                  className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                  type="text"
                  placeholder="Enter Batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
                <input
                  className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                  type="text"
                  placeholder="Enter Registration Number"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            type="button"
            className="mt-4 text-lg bg-blue-600 py-2 rounded-lg hover:bg-blue-700 text-white"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

