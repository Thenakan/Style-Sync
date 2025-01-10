import Image from 'next/image';
import styles from './Profile.module.css'; // Assuming you renamed your CSS file to use module styles
import profile from '../../public/assets/profile.jpg';

function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.headerProfile}>
        <div className={styles.userTokens}>
          <span className={styles.tokenSymbol}>⚡</span>
          <span className={styles.tokenQuantity}>50Tokens</span>
        </div>
      </div>

      <div className={styles.contentProfile}>
        <div className={styles.imageProfile}>
          <Image src={profile} alt="Profile Image" width={150} height={150} />
        </div>

        <div className={styles.infoProfile}>
          <h1>Profile Information</h1>
          <p className={styles.userEmail}>example@email.com</p>

          <button className={styles.buttonEdit}>Edit</button>
        </div>

        <div className={styles.formInputs}>
          <div className={styles.formGroup}>
            <input type="text" placeholder="Your First Name" />
            <span className={styles.editSymbol}>✎</span>
          </div>

          <div className={styles.formGroup}>
    <div className={styles.inputWrapper}>
        <input type="text" placeholder="Your Last Name" />
    </div>
    <span className={styles.editSymbol}>✎</span>
</div>


          <div className={styles.formGroup}>
            <input type="email" placeholder="Your Email" />
            <span className={styles.editSymbol}>✎</span>
          </div>

          <div className={styles.formGroup}>
            <input type="tel" placeholder="Your Phone" />
            <span className={styles.editSymbol}>✎</span>
          </div>
        </div>

        <button className={styles.buttonSave}>Save</button>
      </div>
    </div>
  );
}

export default Profile;
