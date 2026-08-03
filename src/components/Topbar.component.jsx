import { useState, useRef, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useNotifications } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Topbar.styles.css";

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function Topbarcomponent() {
  const { searchTerm, setSearchTerm } = useSearch();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const { user, updateAvatar } = useUser();
  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleBellClick() {
    setShowNotifications((prev) => {
      const next = !prev;
      if (next) markAllRead();
      return next;
    });
  }

  function handleAvatarFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateAvatar(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="topbar">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search students, staff or fees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="search-clear" onClick={() => setSearchTerm("")} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>

      <div className="topbar-right">
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="icon-btn-wrap" ref={notifRef}>
          <button className="icon-btn" onClick={handleBellClick} aria-label="Notifications">
            🔔
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="glass-dropdown notif-dropdown">
              <div className="dropdown-header">Notifications</div>
              <div className="dropdown-list">
                {notifications.length === 0 && (
                  <div className="dropdown-empty">You're all caught up.</div>
                )}
                {notifications.map((n) => (
                  <div key={n.id} className="notif-item">
                    <span className={`notif-dot ${n.type}`} />
                    <div>
                      <div className="notif-message">{n.message}</div>
                      <div className="notif-time">{timeAgo(n.time)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="icon-btn-wrap" ref={profileRef}>
          <button className="user-chip" onClick={() => setShowProfileMenu((p) => !p)}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="avatar photo" />
            ) : (
              <div className="avatar letters">{user.initials}</div>
            )}
            <div>
              <div className="name">{user.name}</div>
              <div className="role">{user.role}</div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="glass-dropdown profile-dropdown">
              <button className="dropdown-item" onClick={() => fileInputRef.current?.click()}>
                Change photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarFile}
                hidden
              />
              <button className="dropdown-item">View profile</button>
              <button className="dropdown-item">Settings</button>
              <button className="dropdown-item logout">Log out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbarcomponent;
