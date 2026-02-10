import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res)
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  
  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center space-y-4">
          <div className="text-6xl opacity-30">:/</div>
          <h2 className="text-2xl font-bold text-base-content/70">No connections yet</h2>
          <p className="text-base-content/50">Start exploring to find your people!</p>
        </div>
      </div>
    );
  }

return (
    <div data-theme="night" className="min-h-screen">
      

      <div className=" sticky top-0  backdrop-blur-md bg-opacity-90">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-base-content">Connections</h1>
            <p className="text-sm text-base-content/50 mt-0.5">
              {connections.length} {connections.length === 1 ? "person" : "people"} in your network
            </p>
          </div>
          <div className="badge badge-primary badge-lg font-semibold gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {connections.length}
          </div>
        </div>
      </div>

      

      
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="card card-side bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300/50 hover:border-primary/20"
            >
              <figure className="pl-6 py-6 shrink-0">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                    <img
                      alt={firstName + " " + lastName}
                      src={photoUrl || "/placeholder.svg"}
                      className="object-cover"
                    />
                  </div>
                </div>
              </figure>

              <div className="card-body py-5 gap-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="card-title text-lg text-base-content">
                      {firstName + " " + lastName}
                    </h2>

                    {age && gender && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge badge-ghost badge-sm">{age} yrs</span>
                        <span className="badge badge-ghost badge-sm">{gender}</span>
                      </div>
                    )}

                    {about && (
                      <p className="text-sm text-base-content/60 mt-2 line-clamp-2 leading-relaxed">
                        {about}
                      </p>
                    )}
                  </div>

                  <div className="card-actions shrink-0 self-center">
                    <a href={"/chat/" + _id} className="btn btn-primary btn-sm gap-1.5 no-underline">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Connections;