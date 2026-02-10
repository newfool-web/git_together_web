import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((store) => store.user);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-200">
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        
        
        <img
          src="src\assets\img1.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

    
    

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

       
       
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <p className="mb-4 text-xl font-semibold  tracking-[0.25em] text-primary/80 pt-7">
              GitTogether
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight pt-25">
              Start something epic<span className="text-primary">.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80">
              Meet developers who share your stack, interests, and ambition. Match,
              collaborate, and build your next big thing together.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {!user && (
                <>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-lg rounded-full px-10 text-base font-semibold shadow-lg shadow-primary/40"
                  >
                    Create account
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-ghost btn-lg rounded-full px-8 border-white/40 text-white hover:border-primary/60 hover:bg-white/10"
                  >
                    Log in
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    to="/feed"
                    className="btn btn-primary btn-lg rounded-full px-10 text-base font-semibold shadow-lg shadow-primary/40"
                  >
                    Go to feed
                  </Link>
                  <Link
                    to="/profile"
                    className="btn btn-ghost btn-lg rounded-full px-8 border-white/40 text-white hover:border-primary/60 hover:bg-white/10"
                  >
                    View profile
                  </Link>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-white/70">
              <span>Register to find collaborators, mentors, and co-founders.</span>
              
              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;


