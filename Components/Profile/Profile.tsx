import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Profile.module.css";
import profile from "../../public/assets/profile.jpg";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined" || user === "null") {
      router.push("/login"); // Redirect to login if not authenticated or invalid data
    } else {
      try {
        const parsedUser = JSON.parse(user);

        if (!parsedUser._id) {
          console.warn("User ID is missing. Redirecting to login.");
          localStorage.removeItem("user"); // Clear corrupted data
          router.push("/login");
          return;
        }

        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user"); // Clear corrupted data
        router.push("/login");
      }
    }
  }, [router]);

  const handleEditClick = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
    setIsModified(true);
  };

  const handleSave = async () => {
    if (isModified) {
      try {
        const response = await fetch(`/api/CRUD?id=${userData._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to update user.");
        }

        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser.updatedUser)); // Save updated data
        setUserData(updatedUser.updatedUser);

        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error: any) {
        console.error("Error updating profile:", error.message);
        toast.error(`Error: ${error.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsModified(false);
      }
    } else {
      toast.info("No changes were made.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setIsEditing({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    router.push("/login"); // Redirect to login page
  };

  const handleUploadImage = () => {
    toast.info("Upload image functionality coming soon!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className={styles.profileContainer}>
      <ToastContainer />
      <div className={styles.headerProfile}>
        <div className={styles.userTokens}>
          <span className={styles.tokenSymbol}>✂</span>
          <span className={styles.tokenQuantity}>50Tokens</span>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={styles.contentProfile}>
        <div className={styles.imageProfile}>
          <Image src={profile} alt="Profile Image" width={150} height={150} />
          <button className={styles.uploadButton} onClick={handleUploadImage}>
            Upload Image
          </button>
        </div>

        <div className={styles.infoProfile}>
          <h1>Profile Information</h1>
          <p className={styles.userEmail}>{userData.email || "No email available"}</p>
        </div>

        <div className={styles.formInputs}>
          {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
            <div key={field} className={styles.formGroup}>
              <input
                type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                value={userData[field as keyof typeof userData]}
                onChange={(e) => handleChange(e, field)}
                readOnly={!isEditing[field as keyof typeof isEditing]}
              />
              <span
                className={styles.editSymbol}
                onClick={() => handleEditClick(field)}
                role="button"
                tabIndex={0}
              >
                ✎
              </span>
            </div>
          ))}
        </div>

        <button className={styles.buttonSave} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
