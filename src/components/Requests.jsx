import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (<div className="card bg-base-100 shadow-sm">
            <div className="card-body items-center text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-base-content/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <h3 className="text-lg font-semibold text-base-content/50">No pending requests</h3>
              <p className="text-sm text-base-content/40">
                {"When someone sends you a connection request, it'll appear here."}
              </p>
            </div>
          </div>)

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-base-content tracking-tight">
            Connection Requests
          </h1>
          <p className="text-base-content/60 mt-2">
            Review and manage your pending requests
          </p>
          <div className="divider max-w-xs mx-auto" />
        </div>

        
        <div className="flex flex-col gap-5">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div key={_id} className="card card-side bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                <figure className="pl-6 py-6 shrink-0">
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={photoUrl || "/placeholder.svg"} alt={firstName + " " + lastName} />
                    </div>
                  </div>
                </figure>

                <div className="card-body py-5 gap-1">
                  <h2 className="card-title text-lg text-base-content">
                    {firstName + " " + lastName}
                  </h2>

                  {age && gender && (
                    <div className="flex gap-2">
                      <span className="badge badge-outline badge-sm">{age} yrs</span>
                      <span className="badge badge-outline badge-sm">{gender}</span>
                    </div>
                  )}

                  <p className="text-sm text-base-content/70 line-clamp-2 mt-1">
                    {about}
                  </p>

                  <div className="card-actions justify-end mt-3">
                    <button
                      className="btn btn-error btn-sm btn-outline"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>       
      </div>
    </div>
  );
};
export default Requests;