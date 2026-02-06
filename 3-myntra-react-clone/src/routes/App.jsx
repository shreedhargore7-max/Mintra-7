import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import FetchItems from "../components/Fetchitems";
import LoadingSpinner from "../components/LoadingSpinner";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <>
      <Header></Header>
      <FetchItems></FetchItems>
      {fetchStatus.currentlyFetching ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <Outlet></Outlet>
      )}
      <Footer></Footer>
    </>
  );
}

export default App;
