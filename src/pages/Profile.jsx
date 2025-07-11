import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const getColorMode = () => localStorage.getItem('themeMode') || 'Light';

const Profile = () => {
  const { user, setUser } = useStateContext();
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.profileImage || '');
  const [colorMode, setColorMode] = useState(getColorMode());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.name || '');
    setImage(user?.profileImage || '');
    setColorMode(getColorMode());
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG and PNG files are allowed.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setUser({ ...user, profileImage: reader.result });
      // Also update in users array for future logins
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const idx = users.findIndex(u => u.email === user.email);
      if (idx !== -1) {
        users[idx].profileImage = reader.result;
        localStorage.setItem('users', JSON.stringify(users));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setUser({ ...user, name, profileImage: image });
    // Also update in users array for future logins
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx].name = name;
      users[idx].profileImage = image;
      localStorage.setItem('users', JSON.stringify(users));
    }
    setTimeout(() => setSaving(false), 500);
  };

  const bg = colorMode === 'Dark'
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
    : 'bg-gradient-to-br from-blue-100 via-white to-blue-200';

  const cardBg = colorMode === 'Dark'
    ? 'dark:bg-[#32373e] bg-[#32373e] text-white'
    : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bg} px-2 py-8`}>
      <form
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col items-center ${cardBg}`}
        onSubmit={handleSave}
      >
        <h2 className="text-3xl font-bold mb-2 text-center">My Profile</h2>
        <p className="mb-4 text-lg">Hello, <span className="font-semibold">{name || (user?.email ? user.email.split('@')[0] : 'User')}</span>!</p>
        <div className="mb-4">
          <img
            src={image || avatar}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
          <input
            id="name"
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded"
            value={user?.email || ''}
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block mb-2 font-semibold">Bio</label>
          <textarea
            id="bio"
            className="w-full p-2 border rounded"
            rows="3"
            value={user?.bio || ''}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
        </div>
        <label htmlFor="profile-image" className="mb-4 w-full flex flex-col items-center">
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => setUser({ ...user, profileImage: e.target.result });
                reader.readAsDataURL(file);
              }
            }}
          />
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow mb-2"
            onClick={() => document.getElementById('profile-image').click()}
          >
            Change Picture
          </button>
        </label>
        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold bg-green-600 hover:bg-green-700 shadow"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;