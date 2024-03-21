import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Layout } from "./components/Layout";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <>
      {/* <Layout> */}
      <div className="flex w-full flex-col font-ovo">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </div>
      {/* </Layout> */}
    </>
  );
}

export default App;
