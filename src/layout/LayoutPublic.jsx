import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <img
                src="/uploads/logo.png"
                alt="Congreso TIC's"
                className="h-14 w-auto"
              />
              <span className="ml-4 text-2xl font-semibold text-gray-900">
                Congreso TIC's
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPublic;
