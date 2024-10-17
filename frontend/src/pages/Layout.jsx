import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Navbar />
			<div className="pt-10">{children}</div>
		</React.Fragment>
	);
};

export default Layout;
