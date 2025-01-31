import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex max-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <main className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
