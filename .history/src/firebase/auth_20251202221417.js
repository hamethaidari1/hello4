import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "./config.js";
import { logUserLogin } from "../modules/security.js";

/**
 * Yeni kullanıcı kaydı oluşturur
 * @param {string} email 
 * @param {string} password 
 * @param {string} fullName - Kullanıcının tam adı
 */
export const registerUser = async (email, password, fullName) => {
  try {
    // Email ve şifre ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kullanıcının profil adını güncelle
    await updateProfile(user, {
      displayName: fullName
    });
    
    // İlk giriş (kayıt olduktan sonra otomatik giriş) için güvenlik kaydı oluştur
    await logUserLogin(user);
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message, code: error.code };
  }
};

/**
 * Var olan kullanıcı ile giriş yapar
 * @param {string} email 
 * @param {string} password 
 */
export const loginUser = async (email, password) => {
  try {
    // Email ve şifre ile giriş yap
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Güvenlik kaydı oluştur
    // UI yavaşlamasın diye await kullanmıyoruz
    logUserLogin(userCredential.user);

    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message, code: error.code };
  }
};

/**
 * Google hesabı ile giriş yapar
 */
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    
    // Standart Google giriş davranışı için özel ayarlar kaldırıldı

    // Google popup ile giriş
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Giriş işlemini güvenlik sistemine kaydet
    await logUserLogin(user);

    return { success: true, user };
  } catch (error) {
    // UI’nin hata mesajını gösterebilmesi için error.code döndürülüyor
    return { success: false, error: error.message, code: error.code };
  }
};

/**
 * Kullanıcıyı sistemden çıkarır
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Kullanıcı oturum durumunu dinler
 * Kullanıcı giriş yaptığında veya çıkış yaptığında callback tetiklenir
 * @param {Function} callback - Kullanıcı değiştiğinde çalışacak fonksiyon
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
