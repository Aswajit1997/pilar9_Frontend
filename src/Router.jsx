import { Suspense, lazy, useEffect } from "react";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./assets/scss/Styles.module.scss";
import { clearCacheData } from "./components/Hooks/clearCacheData";

import ls from "localstorage-slim";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./components/Hooks/ScrollToTop";
import LoadingPopup from "./components/Loading/LoadingPopup";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/Topbar/TopBar";
import DataTable from "./pages/DataTable/DataTable";
import Login from "./pages/Login/Login";
import { fetchUserFromLocal } from "./redux/slice/userSlice";

const DashboardNew = lazy(() => import("./pages/Dashboard/DashboardNew"));
const MultiDashboardNew = lazy(() => import("./pages/MultiDashboardNew/MultiDashboardNew"));
const RequestWidget = lazy(() => import("./pages/RequestWidget/RequestWidget"));
const DynamicDashboard = lazy(() => import("./pages/DynamicDashboard.jsx/DynamicDashboard"));
const Home = lazy(() => import("./pages/Home/Home"));
const Page404 = lazy(() => import("./pages/Page404/Page404"));

const App = () => {
	const location = useLocation();
	clearCacheData();

	return (
		<>
			<ScrollToTop />

			<ToastContainer
				position="top-center"
				autoClose={3000}
				limit={4}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover
			/>

			{/* <AnimatePresence> */}
			<Routes location={location} key={location.pathname}>
				<Route path="*" element={<Page404 />} />
				<Route path="/" element={<Login />} />
				<Route element={<Wrapper />}>
					<Route path="/dashboard-test" element={<Home />} />
					<Route path="/dashboard" element={<DashboardNew />} />
					<Route path="/multi-dashboard" element={<MultiDashboardNew />} />
					<Route path="/data-table" element={<DataTable />} />
					<Route path="/request-widget" element={<RequestWidget />} />
					<Route path="/dynamic-dashboard" element={<DynamicDashboard />} />
				</Route>
			</Routes>
			{/* </AnimatePresence> */}
		</>
	);
};

export default App;

const Wrapper = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { openLoadingPopup } = useSelector((state) => state.temp);
	useEffect(() => {
		dispatch(fetchUserFromLocal());
	}, []);

	useEffect(() => {
		if (!ls.get("Pilar9_Token")) navigate("/");
	}, []);
	return (
		<div className={styles.Wrapper}>
			{openLoadingPopup && <LoadingPopup />}
			<Suspense fallback={<LoadingIndicator />}>
				<Sidebar />

				<div className={styles.MainWrapper}>
					<TopBar />
					<Outlet />
				</div>
			</Suspense>
		</div>
	);
};
