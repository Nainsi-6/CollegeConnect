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
  const [passedOutBatch, setPassedOutBatch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setBatch('');
    setRegNumber('');
    setFacultyId('');
    setDepartment('');
    setCompany('');
    setPassedOutBatch('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Ensure required fields are filled based on role
    if (role === "student" && (!batch || !regNumber)) {
      alert("❌ Batch and Registration Number are required for students.");
      setLoading(false);
      return;
    } else if (role === "faculty" && (!facultyId || !department)) {
      alert("❌ Faculty ID and Department are required for faculty.");
      setLoading(false);
      return;
    } else if (role === "alumni" && (!company || !passedOutBatch)) {
      alert("❌ Company and Passed Out Batch are required for alumni.");
      setLoading(false);
      return;
    }
  
    const userDetails = {
      username: username.trim(), // Use username as this is what your frontend uses
      email: email.trim(),
      password,
      role,
      batch: role === "student" ? batch.trim() : "",
      regNumber: role === "student" ? regNumber.trim() : "",
      facultyId: role === "faculty" ? facultyId.trim() : "",
      department: role === "faculty" ? department.trim() : "",
      company: role === "alumni" ? company.trim() : "",
      passedOutBatch: role === "alumni" ? passedOutBatch.trim() : "",
    };
  
    try {
      const response = await fetch('http://localhost:5005/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
  
      const data = await response.json();
      setLoading(false);
  
      if (response.ok) {
        alert('✅ Signup Successful! Please log in.');
        navigate('/login');
      } else {
        alert(`❌ Signup Failed: ${data.message}`);
      }
    } catch (error) {
      setLoading(false);
      console.error('Signup Error:', error);
      alert('❌ An error occurred. Please try again.');
    }
  };
  
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.freecreatives.com/wp-content/uploads/2016/04/Solid-Black-Website-Background.jpg')" }}
    >
      <div className="w-100 border-2 rounded-xl border-blue-600 p-10 bg-black bg-opacity-60 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Signup</h2>
        <form className="flex flex-col" onSubmit={handleSignup}>
          <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-full"
            type="text" placeholder="Enter Username" value={username} autoComplete="off" onChange={(e) => setUsername(e.target.value)} />
          <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-full"
            type="email" placeholder="Enter Email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
          <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-full"
            type="password" placeholder="Enter Password" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />

          {/* Role Selection */}
          <select required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-black rounded-lg py-2 px-6 w-full"
            value={role} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="alumni">Alumni</option>
          </select>

          {/* Student Fields */}
          {role === 'student' && (
            <div className="flex space-x-4">
              <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                type="text" placeholder="Enter Batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
              <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                type="text" placeholder="Enter Registration Number" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
            </div>
          )}

          {/* Faculty Fields */}
          {role === 'faculty' && (
            <div className="flex space-x-4">
              <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                type="text" placeholder="Enter Faculty ID" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} />
              <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                type="text" placeholder="Enter Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>
          )}

          {/* Alumni Fields */}
          {role === 'alumni' && (
            <div className="flex space-x-4">
              <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                type="text" placeholder="Enter Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
              <input required className="border-2 border-blue-600 mb-4 text-lg text-white outline-none bg-transparent rounded-lg py-2 px-6 placeholder-gray-400 w-1/2"
                type="text" placeholder="Enter Passed Out Batch" value={passedOutBatch} onChange={(e) => setPassedOutBatch(e.target.value)} />
            </div>
          )}

          <button type="submit" className="mt-4 text-lg bg-blue-600 py-2 rounded-lg hover:bg-blue-700 text-white" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
