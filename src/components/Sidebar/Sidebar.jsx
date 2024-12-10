import ls from "localstorage-slim";
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import LineAsset from "../../assets/svg/LineAsset.svg?react";
import Menu from "../../assets/svg/MenuItem.svg?react";
import styles from "./Sidebar.module.scss";
import RequestWidget from "../../assets/svg/RequestWidget.svg?react";

const Header = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		ls.clear();
		navigate("/");
	};
	return (
		<div className={styles.Sidebar}>
			<div className={styles.Logo}>
				<img src={Logo} alt="Logo" title="Logo" height={"100%"} width={"100%"} loading="eager" />
			</div>
			<div className={styles.LineAsset}>
				<LineAsset />
			</div>
			<Link to="/dashboard" className={pathname === "/dashboard" ? styles.active : ""}>
				<span>
					<Menu />
				</span>
				Dashboard
			</Link>
			<Link to="/dashboard-test" className={pathname === "/dashboard-test" ? styles.active : ""}>
				<span>
					<Menu />
				</span>{" "}
				Dashboard Test
			</Link>
			<Link to="/multi-dashboard" className={pathname === "/multi-dashboard" ? styles.active : ""}>
				<span>
					<Menu />
				</span>{" "}
				Multi dashboard
			</Link>

			<Link to="/request-widget" className={pathname === "/request-widget" ? styles.active : ""}>
				<span>
					<RequestWidget />
				</span>
				Request Widget
			</Link>

			<div className={styles.SidebarItem} onClick={handleLogout}>
				<span>
					<IoMdLogOut />
				</span>
				Logout
			</div>
		</div>
	);
};

export default Header;
