import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/dashboard/dashboard";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Navigate } from "react-router-dom";

// import ProtectedRoute from "./protected-routes";
import ChangePassword from "@/pages/auth/change-password";
import ResetNewPassword from "@/pages/auth/reset-new-password";
import AccountDetails from "@/pages/account-details/account-details";
import FranchiseList from "@/pages/franchise/franchise-list";
import ComplainDetails from "@/pages/complaint-details/complain-details";
import FranchiseCreate from "@/components/modules/franchise/franchise-create";
import CreateNewService from "@/components/modules/service/create-new-service";
import { PaymentDetails } from "@/pages/payment-details/payment-details";
import LeadList from "@/pages/lead-management/lead-management";
import SendQuotation from "@/pages/send-quotation/send-quotation";
import ComplaintList from "@/pages/complaint-details/complaint-list";
import ServiceList from "@/pages/service-management/service-list";
import ProtectedRoute from "./protected-routes";
import FranchiseUpdate from "@/components/modules/franchise/franchise-update";
import ServiceDetails from "@/components/modules/service/update-service";
import CustomerList from "@/pages/customer-management/customer-list";
import ForGetPassword from "@/pages/auth/forget-password";
import LoginPage from "@/pages/auth/login-page";
import FranchiseLeadList from "@/pages/lead-management/targeted-franchise-lead-list";
import FranchiseSendQuotation from "@/pages/send-quotation/franchise-send-quotation";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsCondition from "@/pages/terms-condition";
import FranchiseComplaintList from "@/pages/complaint-details/franchise-complaint-list";
import FranchiseDashboardPage from "@/pages/dashboard/dashboard";
// import AddressAutocomplete from "@/pages/location";

const router = createBrowserRouter([
  {
    path: "/admin/reset-password/:token",
    element: <ResetNewPassword />,
    index: true,
  },
  {
    element: <ProtectedRoute roleAllowed={["Admin", "Franchise"]} />,
    children: [
      {
        path: "/admin/login",
        element: <LoginPage />,
        index: true,
      },
      {
        path: "/admin/privacy-policy",
        element: <PrivacyPolicy />,
        index: true,
      },
      {
        path: "/admin/terms-condition",
        element: <TermsCondition />,
        index: true,
      },
      {
        path: "/admin/change-password",
        element: <ChangePassword />,
        index: true,
      },
      {
        path: "/admin/forgot-password",
        element: <ForGetPassword />,
        index: true,
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> }, // 👈 added this
          { path: "/dashboard", element: <FranchiseDashboardPage /> },
          { path: "/franchise-lead/:id", element: <FranchiseSendQuotation /> },
          { path: "/lead", element: <FranchiseLeadList /> },
          { path: "/complaint-list", element: <FranchiseComplaintList /> },
          { path: "/account-details", element: <AccountDetails /> },
          { path: "/complaint-details/:id", element: <ComplainDetails /> },

          { path: "/payment-recieved/:id", element: <PaymentDetails /> },
          { path: "/send-quotation/:id", element: <SendQuotation /> },
        ],
      },
    ],
  },

  // Admin-only routes
  {
    element: <ProtectedRoute roleAllowed={["Admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // { path: "/", element: <DashboardPage /> },

          { path: "/account-details", element: <AccountDetails /> },
          { path: "/create-franchise", element: <FranchiseCreate /> },
          { path: "/franchise-edit/:id", element: <FranchiseUpdate /> },
          { path: "/franchise-list", element: <FranchiseList /> },
          // { path: "/complaint-details/:id", element: <ComplainDetails /> },
          { path: "/complaint", element: <ComplaintList /> },
          { path: "/add-new-service", element: <CreateNewService /> },
          { path: "/service-details/:id", element: <ServiceDetails /> },
          { path: "/lead-list", element: <LeadList /> },
          { path: "/send-quotation/:id", element: <SendQuotation /> },

          { path: "/customer-list", element: <CustomerList /> },
          { path: "/service-list", element: <ServiceList /> },
        ],
      },
    ],
  },

  // Catch-all for 404 errors
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
]);

export default router;
