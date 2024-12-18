import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdModeEdit } from "react-icons/md";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("edit"); // State to track active tab

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "edit":
        return <EditProfileForm />;
      case "preferences":
        return <Preferences />;
      case "security":
        return <Security />;
      default:
        return <EditProfileForm />;
    }
  };

  return (
    <div className="bg-white lg:p-8 p-4 rounded-lg w-full">
      <div className="">
        {/* Tabs */}
        <div className="flex mb-10 border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "edit"
                ? "border-b-2 border-black font-medium"
                : "text-blue-950 font-medium opacity-75"
            }`}
            onClick={() => setActiveTab("edit")}
          >
            Edit Profile
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "preferences"
                ? "border-b-2 border-black font-medium"
                : "text-blue-950 font-medium opacity-75"
            }`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "security"
                ? "border-b-2 border-black font-medium"
                : "text-blue-950 font-medium opacity-75"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        {/* Render content dynamically */}
        {renderContent()}
      </div>
    </div>
  );
};

// Edit Profile Form Component
const EditProfileForm = () => {
  const [dob, setDob] = useState(new Date()); // State for Date of Birth
  const [image, setImage] = useState("https://i.pravatar.cc/60?img=1"); // State for profile image

  // States for form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleSaveClick = () => {
    setModalVisible(true); // Show modal on save
    setTimeout(() => setModalVisible(false), 3000); // Auto-close modal after 3 seconds
  };

  return (
    <div className="flex lg:justify-start lg:items-start justify-center items-center flex-wrap w-full">
      <div className="w-[150px] flex justify-center">
        <div className="w-20 h-20 relative bg-gray-100 rounded-full">
          <img src={image} alt="profile" className="rounded-full object-contain w-20 h-20" />
          <label className="bg-black rounded-full text-white p-2 absolute bottom-0 right-0 cursor-pointer" htmlFor="file-upload">
            <MdModeEdit />
          </label>
          <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange}/>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 grid-cols-1 gap-4 lg:flex-1 w-full">
        <div>
          <label className="block text-gray-700 mb-1">Your Name</label>
          <input type="text" placeholder="Charlene Reed" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">User Name</label>
          <input type="text" placeholder="Charlene Reed" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="charlenereed@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>

        <div className="w-full">
          <label className="block text-gray-700 mb-1">Date of Birth</label>
          <DatePicker selected={dob} onChange={(date) => setDob(date)} // onChange to update the dob state
            dateFormat="MMMM d yyyy"
            className="w-full border border-gray-300 rounded-md p-2" // Ensure w-full is applied here
            calendarClassName="bg-white absolute right-0 border border-gray-300 rounded-md shadow-lg p-4"
            dayClassName={(date) =>
              "text-center p-2 rounded-full hover:bg-indigo-100 transition ease-in-out w-full"
            }
            popperClassName="shadow-lg border border-gray-200 rounded-lg"
            wrapperClassName="w-full" // Add this to wrap the DatePicker with full width
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Present Address</label>
          <input type="text" placeholder="San Jose, California, USA" value={presentAddress} onChange={(e) => setPresentAddress(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Permanent Address</label>
          <input type="text" placeholder="San Jose, California, USA" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">City</label>
          <input type="text" placeholder="San Jose" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Postal Code</label>
          <input type="text" placeholder="45962" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Country</label>
          <input type="text" placeholder="USA" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
      </div>

      <div className="col-span-2 mt-6 flex justify-end w-full">
        <button
          onClick={handleSaveClick}
          className="bg-black w-[200px] font-medium text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-all"
        >
          Save
        </button>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-green-600">Success!</h2>
            <p className="text-gray-700 mt-2">Your account has been updated successfully.</p>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Preferences Component
const Preferences = () => (
  <div className="text-gray-700">
    <h2 className="text-lg font-semibold mb-4">Preferences</h2>
    <p>Manage your preferences here.</p>
  </div>
);

// Security Component
const Security = () => (
  <div className="text-gray-700">
    <h2 className="text-lg font-semibold mb-4">Security</h2>
    <p>Manage your security settings here.</p>
  </div>
);

export default Settings;
