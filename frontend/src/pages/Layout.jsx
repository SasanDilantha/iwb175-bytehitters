import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Navbar />
			<div className="pt-20">{children}</div>
			<Footer></Footer>
		</React.Fragment>
	);
};

export default Layout;
