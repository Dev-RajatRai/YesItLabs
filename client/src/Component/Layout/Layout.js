import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, discription, keywords, author }) => {
  return (
    <div>
      <Header />
      <Helmet>
        <meta name="description" content={discription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main style={{ minHeight: "90vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Yes It Labs ",
  discription: "MERN stack web Application ",
  keywords: "Yes It Labs",
  author: "Rajat Rai",
};
export default Layout;
