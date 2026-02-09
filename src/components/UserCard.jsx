import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card w-96 bg-base-200 shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      {/* ── Image ────────────────────────────────── */}
      <figure className="relative h-80 overflow-hidden">
        <img
          src={photoUrl || "/placeholder.svg"}
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
        />

        {/* gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-base-200 via-transparent to-transparent" />

        {/* name overlay pinned to bottom of image */}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-4">
          <h2 className="text-2xl font-bold text-base-content drop-shadow-lg">
            {firstName + " " + lastName}
          </h2>

          {age && gender && (
            <div className="mt-1 flex items-center gap-2">
              <span className="badge badge-outline badge-sm text-base-content/80">
                {age}
              </span>
              <span className="badge badge-outline badge-sm text-base-content/80">
                {gender}
              </span>
            </div>
          )}
        </div>
      </figure>

      <div className="card-body gap-4 px-6 pt-4 pb-6">
        <p className="text-sm leading-relaxed text-base-content/70">{about}</p>

        <div className="divider my-0" />

        <div className="card-actions justify-between">
          <button
            className="btn btn-outline btn-error flex-1 gap-2"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Ignore
          </button>

          <button
            className="btn btn-primary flex-1 gap-2"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
