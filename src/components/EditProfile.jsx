import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const FIELDS = [
  { label: "First Name", key: "firstName", placeholder: "", half: true },
  { label: "Last Name", key: "lastName", placeholder: "", half: true },
  { label: "Photo URL", key: "photoUrl", placeholder: "" },
  { label: "Age", key: "age", placeholder: "", half: true },
  { label: "Gender", key: "gender", placeholder: "", half: true },
  { label: "About", key: "about", placeholder: "" },
];


  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {    
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data)); //Agar ye line nhi likhoge toh bs refresh krne pe nav bar mein update hoga aur kuch kaam nhi hai kyuki body re-render hogi toh waha se update ho hjayega fir.
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
    const stateMap = {
    firstName: { value: firstName, setter: setFirstName },
    lastName: { value: lastName, setter: setLastName },
    photoUrl: { value: photoUrl, setter: setPhotoUrl },
    age: { value: age, setter: setAge },
    gender: { value: gender, setter: setGender },
    about: { value: about, setter: setAbout },
  };  

  // Group fields into rows: two half-width fields share a row
  const rows = [];
  let i = 0;
  while (i < FIELDS.length) {
    if (FIELDS[i].half && i + 1 < FIELDS.length && FIELDS[i + 1].half) {
      rows.push([FIELDS[i], FIELDS[i + 1]]);
      i += 2;
    } else {
      rows.push([FIELDS[i]]);
      i += 1;
    }
  }

 return (
    <div
      data-theme="dark"
      className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4"
    >
      <div className="flex flex-col lg:flex-row gap-10 items-start w-full max-w-4xl">
        {/* ─── Edit Profile Card ─── */}
        <div className="card bg-base-100 shadow-2xl w-full lg:max-w-md">
          <div className="card-body gap-5">
            {/* Header with avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={photoUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + (firstName || "U")}
                    alt="Profile avatar"
                  />
                </div>
              </div>
              <h2 className="card-title text-2xl font-bold tracking-tight">
                Edit Profile
              </h2>
              <p className="text-base-content/50 text-sm">
                Update your personal information below
              </p>
            </div>

            <div className="divider my-0" />

            {/* Dynamic field rows */}
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={row.length === 2 ? "flex gap-4" : undefined}
              >
                {row.map((field) => (
                  <label key={field.key} className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-medium">
                        {field.label}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={stateMap[field.key].value}
                      className="input input-bordered w-full focus:input-primary transition-colors"
                      onChange={(e) =>
                        stateMap[field.key].setter(e.target.value)
                      }
                    />
                  </label>
                ))}
              </div>
            ))}

            {/* Error */}
            {error && (
              <div className="alert alert-error py-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Save button */}
            <div className="card-actions justify-center mt-2">
              <button
                className="btn btn-primary btn-wide gap-2"
                onClick={saveProfile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* ─── Live Preview Card ─── */}
        <div className="card bg-base-100 shadow-2xl w-full lg:max-w-sm">
          <div className="card-body items-center text-center gap-4">
            <h3 className="font-semibold text-base-content/70 uppercase tracking-wider text-xs">
              Live Preview
            </h3>
            <div className="divider my-0" />
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img
                  src={photoUrl}
                  alt="Preview avatar"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {firstName || ""} {lastName || ""}
              </h2>
              {(age || gender) && (
                <p className="text-base-content/60 text-sm mt-1">
                  {age && <span>{age} years old</span>}
                  {age && gender && <span> &middot; </span>}
                  {gender && <span>{gender}</span>}
                </p>
              )}
            </div>
            {about && (
              <>
                <div className="divider my-0" />
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {about}
                </p>
              </>
            )}
            <div className="flex gap-2 mt-2">
              
              {gender && <div className="badge badge-outline badge-secondary">{gender}</div>}
              {age && <div className="badge badge-outline">{`Age ${age}`}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Toast ─── */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;