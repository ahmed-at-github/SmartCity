import { useState } from "react";
import { COLORS, RADIUS } from "../utils/COLORS";
import { TEXT } from "../utils/TEXT"; // Assuming TEXT object has profile-related translations
import { PrimaryButton } from "../components/custom/PrimaryButton";
import { PillButton } from "../components/custom/PillButton"; // Reusing PillButton for preferences

import {
  User,
  Mail,
  Edit,
  Save,
  LogOut,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon, // Renamed to avoid conflict with Image from Next.js or others
  AlertTriangle,
  Lock,
} from "lucide-react";

import { Outlet } from "react-router";

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123 456 7890",
    profilePic: "https://avatar.iran.liara.run/public/24", // Placeholder image URL
  });
  const [showPreferences, setShowPreferences] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would involve an API call to update the profile
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
    // Simulate API call success feedback if needed
  };

  const handleLogout = () => {
    // In a real app, this would clear user session/token and redirect
    console.log("Logging out...");
    alert("Logged out successfully!");
  };

  const handleProfilePicUpload = () => {
    // Simulate opening file picker
    alert("Profile picture upload functionality (not implemented)");
    // In a real app, this would involve file input and image upload logic
  };

  return (
    <div>
      <div className=" h-full w-full flex flex-col bg-[#FAFAFA] p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#333333]">
          {TEXT.en.profileTitle || "Profile"} /{" "}
          {TEXT.bn.profileTitle || "প্রোফাইল"}
        </h1>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <div
            className={`relative w-32 h-32 rounded-full overflow-hidden mb-3 border-4 border-[#FF6B35] shadow-md`}
          >
            <img
              src={profileData.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <button
                onClick={handleProfilePicUpload}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity"
                title="Change Profile Picture"
              >
                <ImageIcon size={30} className="mr-1" /> Upload
              </button>
            )}
          </div>
          <h2 className="text-xl font-semibold text-[#333333]">
            {profileData.name}
          </h2>
          <p className="text-gray-500 text-sm">{profileData.email}</p>
        </div>

        {/* Profile Details (Editable Inputs) */}
        <div className="space-y-4 mb-6">
          {/* Name Input */}
          <div
            className={`flex items-center p-3 bg-white ${RADIUS} shadow-sm border border-[#E8E8E8]`}
          >
            <User size={20} className="text-gray-500 mr-2" />
            <input
              name="name"
              placeholder="Name / নাম"
              className="flex-1 focus:outline-none text-[#333333]"
              value={profileData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          {/* Email Input */}
          <div
            className={`flex items-center p-3 bg-white ${RADIUS} shadow-sm border border-[#E8E8E8]`}
          >
            <Mail size={20} className="text-gray-500 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email / ইমেল"
              className="flex-1 focus:outline-none text-[#333333]"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          {/* Phone Input */}
          <div
            className={`flex items-center p-3 bg-white ${RADIUS} shadow-sm border border-[#E8E8E8]`}
          >
            <Lock size={20} className="text-gray-500 mr-2" />{" "}
            {/* Using Lock icon for phone, as it's often more private */}
            <input
              name="phone"
              type="tel"
              placeholder="Phone / ফোন"
              className="flex-1 focus:outline-none text-[#333333]"
              value={profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          {isEditing ? (
            <PrimaryButton
              onClick={handleSave}
              className="flex-1 flex items-center justify-center"
            >
              <Save size={20} className="mr-2" /> Save Profile
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => setIsEditing(true)}
              className="flex-1 flex items-center justify-center"
            >
              <Edit size={20} className="mr-2" /> Edit Profile
            </PrimaryButton>
          )}
          <button
            onClick={handleLogout}
            className={`flex-1 flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 font-semibold ${RADIUS} hover:bg-gray-300 transition`}
          >
            <LogOut size={20} className="mr-2" /> Logout
          </button>
        </div>

        {/* Preferences Section (Collapsible) */}
        <div
          className={`bg-white ${RADIUS} shadow-md p-4 mt-auto border border-[$#E8E8E8]`}
        >
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="w-full flex justify-between items-center text-lg font-semibold text-[#333333]"
          >
            {TEXT.en.preferences || "Preferences"} /{" "}
            {TEXT.bn.preferences || "পছন্দ"}
            {showPreferences ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          {showPreferences && (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600 mb-2">
                Notification Settings:
              </p>
              <div className="flex gap-2">
                <PillButton isActive={true}>Email</PillButton>
                <PillButton>SMS</PillButton>
                <PillButton>Push</PillButton>
              </div>
              <p className="text-sm text-gray-600 mt-4 mb-2">Theme:</p>
              <div className="flex gap-2">
                <PillButton isActive={true}>Light</PillButton>
                <PillButton>Dark</PillButton>
              </div>
              {/* More preferences can go here */}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};
