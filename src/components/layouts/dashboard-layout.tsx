import { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false); 
   const [customer, setCustomers] = useState<any>([]);
  const [see, setSee] = useState(window.innerWidth >= 768); // Mobile ya desktop check
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
const userRole = "Admin"
  // Simple menu items (role-based condition hata di)
  const menuItems = [
    { key: "/", icon: <DashboardIcon />, label: "Dashboard" },
    { key: "/franchise-list", icon: <ShoppingBagIcon />, label: "Franchise" },
    { key: "/account", icon: <PersonIcon />, label: "Account" },
  ];
  const CustomersMenu =  [
    { key: "/customer", icon: <DashboardIcon />, label: "Dashboard" },
   
  ]
  // Window resize pe responsiveness handle karna
  useEffect(() => {
    const handleResize = () => setSee(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    if(userRole === "Customer") {
      setCustomers(CustomersMenu)
    }
    else if(userRole === "Admin") {
      setCustomers(menuItems)

    }
    return () => window.removeEventListener("resize", handleResize);
  }, [userRole]);

  // Token check karna
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/admin/login");
  //   } else if (location.pathname === "/admin/login" && token) {
  //     navigate("/");
  //   }
  // }, [navigate, location]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

//  const menuItems = [
//     { key: "/customer", icon: <DashboardIcon />, label: "Dashboard" },
//     { key: "/franchise", icon: <ShoppingBagIcon />, label: "Franchise" },
//     { key: "/account", icon: <PersonIcon />, label: "Account" },
//   ];
  return (
    <Box sx={{ display: "flex", minHeight: "100vh"}}>
      {/* Sidebar (Drawer) */}
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? 70 : 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? 70 : 240,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            transition: "width 0.3s",
          },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Toolbar />
        <List>
            {customer?.map((item,ind) => (
            <ListItem component="button" key={ind} sx={{ color: "#fff" }} onClick={() => {
                navigate(item?.key);
                // setCollapsed(false);
              }}>
              <ListItemIcon
                sx={{ color: "#fff", minWidth: collapsed ? "40px" : "auto" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ display: collapsed ? "none" : "block" }}
              />
            </ListItem>
          ))} 
        
          <ListItem
            component="button"
            onClick={handleLogout}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ display: collapsed ? "none" : "block" }}
            />
          </ListItem>
        </List>
        
      </Drawer>
      {/* {on small width icon} */}
      <Drawer
        variant="temporary"
        open={collapsed}
        onClose={() => setCollapsed(false)}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 240 },
        }}
      >
        <List>
          {customer?.map((item) => (
            <ListItem
              component="button"
              key={item.key}
              // onClick={() => navigate(item.key)} // Navigate to the item's key (route path)
              onClick={() => {
                navigate(item.key);
                setCollapsed(false);
              }}
              className="!text-blue-700 border-2"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItemButton
            onClick={() => {
              handleLogout();
              setCollapsed(false);
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        {/* //Header */}

        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer }}
          className="!bg-white"
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setCollapsed(!collapsed)}
              sx={{
                mr: 2,
                display: { xs: "block", md: "none" }, // Show on xs and sm, hide on md and above
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className="!text-blue-700">
              PricePatrol.pk
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <ToggleButton
              value="left"
              aria-label="left aligned"
              onClick={() => setCollapsed(!collapsed)}
              sx={{ display: { xs: "none", sm: "block" } }}
              className="border-[1px] border-white"
            >
              <FormatAlignLeftIcon className=" text-blue-600" />
            </ToggleButton>
            {/* <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>

        {/* // Main content area Body*/}

        <Box component="main" sx={{ mt: "64px" }} className="">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
// import { useState, useEffect } from "react";
// import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Button, InputBase, Menu, MenuItem } from "@mui/material";
// import { Menu as MenuIcon, Dashboard as DashboardIcon, ShoppingBag as ShoppingBagIcon, Inventory2 as Inventory2Icon, Task as TaskIcon, Receipt as ReceiptIcon, Person as PersonIcon, Lock as LockIcon, Logout as LogoutIcon } from "@mui/icons-material";
// import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
// import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
// import dayjs from "dayjs";
// import { jwtDecode } from "jwt-decode";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//   },
// });

// const DashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [currentPage, setCurrentPage] = useState("");
//   const [see, setSee] = useState(true);
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const themeContext = useTheme();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken"); // Adjust token service
//     if (token) {
//       try {
//         const decodedToken = jwtDecode<{ exp: number }>(token);
//         const currentTime = dayjs().unix();
//         if (decodedToken.exp < currentTime) {
//           localStorage.removeItem("accessToken");
//           navigate("/admin/login");
//         }
//       } catch (error) {
//         navigate("/admin/login");
//       }
//     } else {
//       navigate("/admin/login");
//     }
//     const pathSegments = pathname.split("/").filter(Boolean);
//     if (pathSegments.length > 0) {
//       const cleanedSegment = pathSegments
//         .filter((segment) => !/^\d+$/.test(segment))
//         .join(" ");
//       const readableTitle = cleanedSegment
//         .replace(/-/g, " ")
//         .replace(/\b\w/g, (char) => char.toUpperCase());
//       setCurrentPage(readableTitle);
//     }
//     const handleResize = () => {
//       if (window.outerWidth < 768) {
//         setSee(false);
//       } else {
//         setSee(true);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [pathname, navigate]);

//   const getSiderWidth = () => {
//     if (!see && collapsed) return 0;
//     if (see && collapsed) return 70;
//     if (see && !collapsed) return 240;
//     if (!see && !collapsed) return 70;
//     return 220;
//   };

//   const getMarginLeft = () => {
//     if (!see && collapsed) return "ml-0";
//     if (see && collapsed) return "ml-[73px] mr-[0px]";
//     if (see && !collapsed && currentPage !== "Account Details")
//       return "ml-[235px] mr-[0px]";
//     if (see && !collapsed && currentPage === "Account Details")
//       return "ml-[5px] mr-[0px]";
//     if (!see && !collapsed) return "ml-[69px]";
//     return "ml-[220px]";
//   };

//   const handleButtonClick = () => {
//     navigate("/account-details");
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     navigate("/admin/login");
//   };

//   const changePassword = () => {
//     navigate("/admin/change-password");
//   };

//   const homeNavigate = () => {
//     navigate("/");
//   };

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={() => setCollapsed(!collapsed)}
//               sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
//               PricePatrol.pk
//             </Typography>
//             <div className="flex items-center">
//               {currentPage !== "Account Details" && (
//                 <>
//                   <IconButton color="inherit" sx={{ display: { xs: "none", sm: "flex" } }}>
//                     <img src="/msg.png" alt="msg" style={{ width: 16, height: 16 }} />
//                   </IconButton>
//                   <IconButton color="inherit">
//                     <img src="/notification.png" alt="notification" style={{ width: 16, height: 16 }} />
//                   </IconButton>
//                 </>
//               )}
//               <IconButton
//                 onClick={handleMenu}
//                 color="inherit"
//                 sx={{ p: 0, ml: 2 }}
//               >
//                 <img src="/profile.png" alt="profile" className="rounded-full" style={{ width: 40, height: 40 }} />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                   elevation: 0,
//                   sx: {
//                     overflow: "visible",
//                     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                     mt: 1.5,
//                     "& .MuiAvatar-root": {
//                       width: 32,
//                       height: 32,
//                       ml: -0.5,
//                       mr: 1,
//                     },
//                     "&:before": {
//                       content: '""',
//                       display: "block",
//                       position: "absolute",
//                       top: 0,
//                       right: 14,
//                       width: 10,
//                       height: 10,
//                       bgcolor: "background.paper",
//                       transform: "translateY(-50%) rotate(45deg)",
//                       zIndex: 0,
//                     },
//                   },
//                 }}
//                 transformOrigin={{ horizontal: "right", vertical: "top" }}
//                 anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//               >
//                 <MenuItem onClick={homeNavigate}>
//                   <PersonIcon /> Profile
//                 </MenuItem>
//                 <MenuItem onClick={changePassword}>
//                   <LockIcon /> Change Password
//                 </MenuItem>
//                 <MenuItem onClick={logout}>
//                   <LogoutIcon /> Logout
//                 </MenuItem>
//               </Menu>
//             </div>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: getSiderWidth(),
//             flexShrink: 0,
//             [`& .MuiDrawer-paper`]: {
//               width: getSiderWidth(),
//               boxSizing: "border-box",
//               backgroundColor: theme.palette.primary.main,
//               color: "#fff",
//             },
//             display: { xs: "none", sm: "block" },
//           }}
//         >
//           <Toolbar />
//           <List>
//             {[
//               { key: "/", icon: <DashboardIcon />, label: "Dashboard" },
//               { key: "/franchise-list", icon: <ShoppingBagIcon />, label: "Franchise Management" },
//               { key: "/customer-list", icon: <PersonIcon />, label: "Customer Management" },
//               { key: "/complaint", icon: <Inventory2Icon />, label: "Complaint Management" },
//               { key: "/service-list", icon: <TaskIcon />, label: "Service Management" },
//               { key: "/lead-list", icon: <ReceiptIcon />, label: "Lead Management" },
//               { key: "/account-details", icon: <DashboardIcon />, label: "Settings" },
//             ].map((item) => (
//               <ListItem button key={item.key} onClick={() => navigate(item.key)}>
//                 <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.label} />
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//         <Drawer
//           variant="temporary"
//           open={collapsed}
//           onClose={() => setCollapsed(false)}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
//           }}
//         >
//           <List>
//             {[
//               { key: "/", icon: <DashboardIcon />, label: "Dashboard" },
//               { key: "/franchise-list", icon: <ShoppingBagIcon />, label: "Franchise Management" },
//               { key: "/customer-list", icon: <PersonIcon />, label: "Customer Management" },
//               { key: "/complaint", icon: <Inventory2Icon />, label: "Complaint Management" },
//               { key: "/service-list", icon: <TaskIcon />, label: "Service Management" },
//               { key: "/lead-list", icon: <ReceiptIcon />, label: "Lead Management" },
//               { key: "/account-details", icon: <DashboardIcon />, label: "Settings" },
//             ].map((item) => (
//               <ListItem button key={item.key} onClick={() => { navigate(item.key); setCollapsed(false); }}>
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.label} />
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             mt: "64px",
//             ml: getMarginLeft().replace("ml-", "").replace("mr-[0px]", "").replace("px", "px !important"),
//             transition: "margin-left 0.3s",
//           }}
//         >
//           {currentPage === "Account Details" && (
//             <Box sx={{ ml: "239px" }}>
//               <Typography variant="h4" gutterBottom>
//                 Settings
//               </Typography>
//               <InputBase
//                 placeholder="Search in setting"
//                 sx={{ bgcolor: "#f8fafc", p: 1, width: "80%", borderRadius: 1 }}
//                 startAdornment={<img src="/preffixsearch.png" alt="search" style={{ marginRight: 8 }} />}
//               />
//               <Box sx={{ mt: 2 }}>
//                 <Button
//                   variant="text"
//                   startIcon={<img src="man.png" alt="" />}
//                   onClick={handleButtonClick}
//                   sx={{ color: "#1E293B", ...(currentPage === "Account Details" && { bgcolor: "#e2e8f0" }), width: "80%", justifyContent: "flex-start" }}
//                 >
//                   Accounts Details
//                 </Button>
//                 <Button
//                   variant="text"
//                   startIcon={<img src="security.png" alt="" />}
//                   sx={{ color: "#1E293B", width: "80%", justifyContent: "flex-start" }}
//                 >
//                   Security
//                 </Button>
//                 <Button
//                   variant="text"
//                   startIcon={<img src="notifications.png" alt="" />}
//                   sx={{ color: "#1E293B", width: "80%", justifyContent: "flex-start" }}
//                 >
//                   Notification
//                 </Button>
//                 <Button
//                   variant="text"
//                   startIcon={<img src="billing.png" alt="" />}
//                   sx={{ color: "#1E293B", width: "80%", justifyContent: "flex-start" }}
//                 >
//                   Plan & Billing
//                 </Button>
//               </Box>
//             </Box>
//           )}
//           <Outlet />
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default DashboardLayout;

// DashboardLayout.tsx
