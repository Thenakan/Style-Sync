import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Profile.module.css';
import profile from '../../public/assets/profile.jpg';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    
    if (!user || user === 'undefined' || user === 'null') {
      router.push('/login'); // Redirect to login if not authenticated or invalid data
    } else {
      try {
        setUserData(JSON.parse(user)); // Load user data from localStorage
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push('/login'); // Redirect to login if parsing fails
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

  const handleSave = () => {
    if (isModified) {
      localStorage.setItem('user', JSON.stringify(userData)); // Save updated profile data
      toast.success('Profile saved successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setIsModified(false);
    } else {
      toast.info('No changes were made.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    setIsEditing({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
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
      </div>

      <div className={styles.contentProfile}>
        <div className={styles.imageProfile}>
          <Image src={profile} alt="Profile Image" width={150} height={150} />
        </div>

        <div className={styles.infoProfile}>
          <h1>Profile Information</h1>
          <p className={styles.userEmail}>{userData.email || 'No email available'}</p>
        </div>

        <div className={styles.formInputs}>
          {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
            <div key={field} className={styles.formGroup}>
              <input
                type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
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
