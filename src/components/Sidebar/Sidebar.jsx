import { NavLink } from "react-router-dom";
import {  Archive, Trash2, Lightbulb } from "lucide-react";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { name: "Notes", icon: Lightbulb, path: "/home" },
    { name: "Archive", icon: Archive, path: "/archive" },
    { name: "Trash", icon: Trash2, path: "/trash" },
  ];

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            onClick={() => window.innerWidth < 768 && toggleSidebar()}
          >
            <item.icon size={22} className={styles.icon} />
            {!isCollapsed && <span className={styles.label}>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;