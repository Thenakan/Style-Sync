import Navbar from "../../../Components/Navbar/Navbar";
import Admin from "../../../Components/Admin/Admin";
import Styleline from "../../../Components/Styleline/Styleline";
import './style.css';

const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <Admin />
      <Styleline />
    </div>
  );
};

export default AdminPage;
