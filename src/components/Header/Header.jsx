import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  Settings,
  RotateCw,
  LayoutGrid,
  UserPen,
  LogOut,
  Loader2,
} from "lucide-react";
import styles from "./Header.module.scss";
import { useAuth } from "../../context/AuthContext";
import profile from "../../assets/profile.jpg";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";

const Header = ({ toggleSidebar }) => {
  const { user, setUser } = useAuth();

  const { fetchNotes, isRefreshing } = useNotes();

  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const decodedToken = jwtDecode(user);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const [searchFocused, setSearchFocused] = useState(false);

  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handleProfileClick = () => {
    setIsProfileDropDownOpen((prev) => !prev);
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchNotes();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsProfileDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/notes")) return "Notes";
    if (path.startsWith("/archive")) return "Archive";
    if (path.startsWith("/trash")) return "Trash";

    return "Keep";
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button
          onClick={toggleSidebar}
          className={styles.iconButton}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className={styles.logoContainer}>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="Google Keep logo"
            className={styles.logo}
          />
          <span className={styles.logoText}>{getPageTitle()}</span>
        </div>
      </div>

      <div
        className={`${styles.searchContainer} ${
          searchFocused ? styles.focused : ""
        }`}
      >
        <div className={styles.searchIconWrapper}>
          <Search size={18} className={styles.searchIcon} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      <div className={styles.headerRight}>
        <button
          className={`${styles.iconButton} ${styles.search}`}
          aria-label="Search"
          title="Search"
        >
          <Search size={20} />
        </button>
        <button
          className={styles.iconButton}
          aria-label="Refresh"
          title={loading || isRefreshing ? "Refreshing..." : "Refresh"}
          onClick={handleRefresh}
          disabled={loading || isRefreshing}
        >
          {isRefreshing || loading ? (
            <Loader2 size={20} className={styles.animateSpin} />
          ) : (
            <RotateCw size={20} />
          )}
        </button>
        <button
          className={styles.iconButton}
          aria-label="Settings"
          title="Change Layout"
        >
          <LayoutGrid size={20} />
        </button>
        <button
          className={styles.iconButton}
          aria-label="Settings"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>
      <div className={styles.profileContainer} ref={dropDownRef}>
        <button
          className={`${styles.iconButton} ${styles.profile}`}
          aria-label="Profile"
          title="Profile"
          onClick={handleProfileClick}
        >
          <UserPen size={20} />
        </button>
        {isProfileDropDownOpen && (
          <div className={styles.dropDownMenu}>
            <div className={styles.profileInfo}>
              <img
                src={profile}
                alt="Profile"
                className={styles.profilePicture}
              />
              <span className={styles.userEmail}>{decodedToken.Email}</span>
            </div>
            <button className={styles.dropDownItem} onClick={logout}>
              <LogOut size={16} className={styles.dropDownIcon} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
