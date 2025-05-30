import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < 768
  );

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.appLayout}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`${styles.content} ${
          isSidebarCollapsed ? styles.sidebarCollapsed : ""
        }`}
      >
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
