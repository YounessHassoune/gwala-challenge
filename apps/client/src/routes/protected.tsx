import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            loading ...
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    // children: [
    //   { path: "/discussions/*", element: <DiscussionsRoutes /> },
    //   { path: "/users", element: <Users /> },
    //   { path: "/profile", element: <Profile /> },
    //   { path: "/", element: <Dashboard /> },
    //   { path: "*", element: <Navigate to="." /> },
    // ],
  },
];
