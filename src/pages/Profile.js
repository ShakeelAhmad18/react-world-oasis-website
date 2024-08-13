import UpdateProfile from "../components/UpdateProfile";
import useRedirectLogoutUser from "../customeHook/useRedirectLogoutUser";


export default function Profile() {

    //without login it is not access able
    useRedirectLogoutUser('/login')
    
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

     <UpdateProfile/>
    </div>
  );
}
