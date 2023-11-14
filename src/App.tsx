import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routerRoot from "./routes/root";

function App() {
  return (
    <>
      <Toaster
        position="top-left"
        toastOptions={{
          success: {
            style: {
              border: "1px solid green",
            },
          },
          error: {
            style: {
              border: "1px solid red",
            },
          },
        }}
      />
      <RouterProvider router={routerRoot} />
    </>
  );
}
export default App;
