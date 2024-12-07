// import React, { useState } from "react";
// import {
//   FaHome,
//   FaUser,
//   FaCogs,
//   FaSignOutAlt,
//   FaBars,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// const SideBar = () => {
//   const [activeItem, setActiveItem] = useState("home");
//   const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const menuItems = [
//     { id: "home", label: "Home", icon: <FaHome /> },
//     { id: "profile", label: "Profile", icon: <FaUser /> },
//     { id: "settings", label: "Settings", icon: <FaCogs /> },
//     { id: "logout", label: "Logout", icon: <FaSignOutAlt /> },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`bg-purple-600 text-white transition-all duration-300 ${
//           isSidebarMinimized ? "w-20" : "w-64"
//         } ${isMobileMenuOpen ? "block" : "hidden"} md:block fixed md:static h-screen z-50`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between px-4 py-6 overflow-hidden">
//           <h2
//             className={`text-xl font-bold truncate ${
//               isSidebarMinimized ? "hidden" : "block"
//             } hidden md:block`}
//           >
//             My Dashboard
//           </h2>
//           {/* Sidebar Toggle Button */}
//           <button
//             onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
//             className="text-white text-xl hidden md:flex items-center justify-center"
//           >
//             {isSidebarMinimized ? <FaChevronRight /> : <FaChevronLeft />}
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="mt-4">
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li key={item.id}>
//                 <button
//                   onClick={() => setActiveItem(item.id)}
//                   className={`flex items-center px-4 py-3 rounded-lg w-full text-left transition ${
//                     activeItem === item.id
//                       ? "bg-purple-800"
//                       : "hover:bg-purple-700"
//                   }`}
//                 >
//                   <span className="text-xl">{item.icon}</span>
//                   <span
//                     className={`ml-3 truncate ${
//                       isSidebarMinimized ? "hidden" : "block"
//                     }`}
//                   >
//                     {item.label}
//                   </span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Mobile Menu Toggle */}
//       <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className={`${
//           isMobileMenuOpen ? "text-white" : "text-purple-600"
//         } md:hidden p-4 fixed top-0 left-0 z-50`}
//       >
//         <FaBars className="text-3xl" />
//       </button>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 p-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             {menuItems.find((item) => item.id === activeItem)?.label || "Dashboard"}
//           </h1>
//         </div>
//         <p className="text-gray-600">
//           Welcome to your dashboard! This is the main content area.
//         </p>
//       </main>
//     </div>
//   );
// };

// export default SideBar;
