import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex max-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          <main className="mb-10 min-h-[calc(100vh-8rem)]">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
