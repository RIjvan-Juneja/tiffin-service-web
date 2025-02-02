import { Suspense } from "react";
import { ErrorBoundary } from "../utils/ErrorBoundary";
import { useRoutes } from "react-router-dom";
import Login from "@/pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
const lazyLoad = (Component: React.ComponentType) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

const routeConfig = [
  {
    path: "/login",
    element: lazyLoad(Login),
  },
  {
    element : <ProtectedRoute />,
    children : [
      {
        path: "/home"
      }
    ]
  }
];

// const routeConfig = [
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         element: <ProtectedRoute attribute="view_data" level="project" />,
//         children: [
//           { path: "/", element: <Dashboard /> },
//           {
//             path: "dashboard",
//             children: [
//               { index: true, element: <DashboardPage /> },
//               { path: ":dashboardId", element: <DashboardPage /> },
//               {
//                 element: (
//                   <ProtectedRoute attribute="manage_features" level="project" />
//                 ),
//                 children: [{ path: "new", element: <NewDashboard /> }],
//               },
//             ],
//           },
//         ],
//       },

//       {
//         element: <ProtectedRoute attribute="view_data" level="project" />,
//         children: [
//           {
//             path: "settings",
//             element: lazyLoad(Settings),

//             children: [
//               {
//                 path: "organization",
//                 element: <OrganizationSettings />,
//                 children: [
//                   {
//                     path: "projects",
//                     element: <ProjectsSettings />,
//                   },
//                   {
//                     path: "users",
//                     element: <UserSettings />,
//                   },
//                   {
//                     path: "groups",
//                     element: <GroupSettings />,
//                   },
//                 ],
//               },
//               {
//                 element: (
//                   <ProtectedRoute attribute="manage_users" level="customer" />
//                 ),

//                 children: [
//                   {
//                     path: "customer",
//                     children: [
//                       {
//                         path: "members",
//                         element: <CustomerUsers />,
//                       },
//                       {
//                         path: "groups",
//                         element: <CustomerGroups />,
//                       },
//                     ],
//                   },
//                 ],
//               },
//               {
//                 path: "sensor-templates",
//                 element: <SensorTemplateSettings />,
//               },
//               {
//                 path: "*",
//                 element: <NotFound />,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         element: <ProtectedRoute attribute="manage_imports" level="project" />,
//         children: [
//           {
//             path: "imports",
//             element: lazyLoad(ImportsLayout),
//             children: [
//               {
//                 path: "imports",
//                 element: <Imports />,
//               },
//               {
//                 path: "sensors",
//                 element: <Sensors />,
//               },
//               {
//                 path: "location",
//                 element: <Locations />,
//               },
//               {
//                 path: "*",
//                 element: <NotFound />,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         element: (
//           <ProtectedRoute
//             attribute="manage_alarms"
//             level="project"
//             feature="alarm"
//           />
//         ),
//         children: [{ path: "/alarms", element: lazyLoad(AlarmsLayout) }],
//       },

//       {
//         path: "/no-access",
//         element: <NotFound />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/verify",
//     element: <Verify />,
//   },

//   {
//     path: "/*",
//     element: <NotFound />,
//   },
// ];

const Routes = () => {
  const routes = useRoutes(routeConfig);
  return routes;
};

export default Routes;
