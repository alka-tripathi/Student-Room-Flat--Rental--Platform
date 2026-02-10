import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("renter");

  return (
    <div className="min-h-screen flex font-sans">

      {/*left part*/}
      <div
        className="w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/9e/fc/aa/9efcaa6580ba6be8901114c1d8b7a701.jpg)",
        }}
      >
        {/* overlay*/}
        <div className="absolute inset-0 bg-black/40"></div>

        {/*Text of the left part*/}
        <div className="relative z-10 h-full flex items-center px-16 text-white">
          <div>
            <h1 className="text-6xl font-extrabold leading-tight uppercase">
              A place <br /> to call home
            </h1>
            <p className="mt-6 text-lg max-w-md text-gray-200">
              Find your perfect rental space and connect with the right people,
              all in one place.
            </p>
          </div>
        </div>
      </div>

      {/*right part*/}
   <div className="w-1/2 bg-gradient-to-br from-[#eee6db] to-[#dde3e0] flex items-center justify-center">


        {/* login container*/}
        <div className="w-[420px]">
          <h2 className="text-3xl font-semibold mb-10 text-gray-900 text-center">
            Login
           </h2>


          {/*email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border-b border-gray-300 py-3 mb-6 outline-none focus:border-teal-500"
          />

          {/*password*/}
          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray-300 py-3 mb-8 outline-none focus:border-teal-500"
          />

          {/*role*/}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setRole("renter")}
              className={`flex-1 py-2 rounded-md border transition ${
                role === "renter"
                  ? "bg-teal-500 text-white border-teal-500"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Renter
            </button>

            <button
              onClick={() => setRole("owner")}
              className={`flex-1 py-2 rounded-md border transition ${
                role === "owner"
                  ? "bg-teal-500 text-white border-teal-500"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Owner
            </button>
          </div>

          {/*Login button*/}
          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-semibold transition">
            Login
          </button>

          {/*footer*/}
          <p className="mt-6 text-sm text-gray-500 text-center">
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
}
