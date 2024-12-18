import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdModeEdit, MdEdit, MdSettings, MdSecurity } from "react-icons/md";
import { useTransition, animated } from "react-spring";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("edit");

  const transitions = useTransition(activeTab, {
    from: { opacity: 0, transform: "translateX(-20px)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(20px)" },
  });

  const tabs = [
    { key: "edit", label: "Edit Profile", icon: <MdEdit /> },
    { key: "preferences", label: "Preferences", icon: <MdSettings /> },
    { key: "security", label: "Security", icon: <MdSecurity /> },
  ];

  return (
    <div className="bg-white lg:p-8 p-4 rounded-lg w-full">
      {/* Tabs */}
      <div className="flex mb-10 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-2 py-2 px-4 transition-all duration-300 ${
              activeTab === tab.key
                ? "border-b-2 border-black font-medium text-black"
                : "text-gray-600 hover:text-black opacity-75"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Smooth transitions for content */}
      {transitions((style, item) => (
        <animated.div style={style}>
          {item === "edit" && <EditProfileForm />}
          {item === "preferences" && <Preferences />}
          {item === "security" && <Security />}
        </animated.div>
      ))}
    </div>
  );
};

// Edit Profile Form with Validation
const EditProfileForm = () => {
  const [dob, setDob] = useState(new Date());
  const [image, setImage] = useState("https://i.pravatar.cc/60?img=1");

  // Form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Validation state
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (
      !password ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.";
    }
    if (postalCode && isNaN(postalCode)) {
      newErrors.postalCode = "Postal code must be numeric.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const handleSaveClick = () => {
    if (validateForm()) {
      setModalVisible(true); // Show modal on save
      setTimeout(() => setModalVisible(false), 3000); // Auto-close modal after 3 seconds
    }
  };

  return (
    <div className="flex lg:justify-start lg:items-start justify-center items-center flex-wrap w-full">
      {/* Profile Image */}
      <div className="w-[150px] flex justify-center">
        <div className="w-20 h-20 relative bg-gray-100 rounded-full">
          <img src={image} alt="profile" className="rounded-full object-contain w-20 h-20"/>
          <label className="bg-black rounded-full text-white p-2 absolute bottom-0 right-0 cursor-pointer hover:bg-gray-800 transition-all"
            htmlFor="file-upload">
            <MdModeEdit />
          </label>
          <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImage(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="mt-6 grid md:grid-cols-2 grid-cols-1 gap-4 lg:flex-1 w-full">
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 mb-1">Your Name</label>
          <input type="text" placeholder="Charlene Reed" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"/>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">User Name</label>
          <input type="text" placeholder="Charlene Reed" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="charlenereed@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full border rounded-md p-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full border rounded-md p-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}/>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
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
        {/* Postal Code */}
        <div>
          <label className="block text-gray-700 mb-1">Postal Code</label>
          <input type="text" placeholder="45962" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={`w-full border rounded-md p-2 ${
              errors.postalCode ? "border-red-500" : "border-gray-300"
            }`}/>
          {errors.postalCode && (
            <p className="text-red-500 text-sm">{errors.postalCode}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Country</label>
          <input type="text" placeholder="USA" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"/>
        </div>
      </div>

      {/* Save Button */}
      <div className="col-span-2 mt-6 flex justify-end w-full">
        <button onClick={handleSaveClick}
          className="bg-black w-[200px] font-medium text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-all">
          Save
        </button>
      </div>
      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-20">
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
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <MdSettings className="text-blue-500" /> Preferences
    </h2>
    <p>Manage your preferences here.</p>
  </div>
);

// Security Component
const Security = () => (
  <div className="text-gray-700">
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <MdSecurity className="text-red-500" /> Security
    </h2>
    <p>Manage your security settings here.</p>
  </div>
);

export default Settings;
