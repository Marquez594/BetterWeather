import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useWeather } from "./weatherContext";

export default function Nav() {
  const [hoverTab, setHoverTab] = useState<
    "Today" | "Hourly" | "10days" | null
  >();
  const { location, tab, setTab, setLocation } = useWeather();
  const [locationMenu, setLocationMenu] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(newLocation);
    setNewLocation("");
    setLocationMenu(false);
  };
  return (
    <nav className="flex items-center w-fit bg-transparent justify-center mt-4 gap-10 fixed top-0 left-1/2 -translate-x-1/2 *:shadow-lg z-10">
      <div className="bg-white p-1 rounded-full relative">
        {/**Location */}
        <button
          className="bg-black p-3 px-6 rounded-full text-white hover:cursor-pointer flex gap-2 items-center"
          onClick={() => setLocationMenu(!locationMenu)}
        >
          {location}
          <FontAwesomeIcon icon={faLocationArrow}></FontAwesomeIcon>
        </button>
        {locationMenu && (
          <div className="bg-white w-96 h-fit absolute top-full mt-5 left-2 rounded-2xl border-2 p-2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Change Location</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                placeholder="Enter City"
                className="bg-gray-200 w-full rounded-md p-2"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              ></input>
              <div className="flex gap-4 justify-end *:hover:cursor-pointer">
                <button
                  className="bg-gray-200 p-2 text-black rounded-xl"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-black p-2 text-white rounded-xl"
                  type="submit"
                >
                  Change
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="bg-white p-1 flex gap-3 rounded-full *:hover:cursor-pointer *:font-bold *:active:bg-gray-300 *:transition-all *:duration-200">
        <button
          className={`px-6 p-3 rounded-full ${tab == "Today" || hoverTab == "Today" ? "bg-gray-200" : "bg-white"}`}
          onClick={() => setTab("Today")}
          onMouseEnter={() => setHoverTab("Today")}
          onMouseLeave={() => setHoverTab(null)}
        >
          Today
        </button>
        <button
          className={`px-6 p-3 rounded-full ${tab == "Hourly" || hoverTab == "Hourly" ? "bg-gray-200" : "bg-white"}`}
          onClick={() => setTab("Hourly")}
          onMouseEnter={() => setHoverTab("Hourly")}
          onMouseLeave={() => setHoverTab(null)}
        >
          Hourly
        </button>
        <button
          className={`px-6 p-3 rounded-full ${tab == "10days" || hoverTab == "10days" ? "bg-gray-200" : "bg-white"}`}
          onClick={() => setTab("10days")}
          onMouseEnter={() => setHoverTab("10days")}
          onMouseLeave={() => setHoverTab(null)}
        >
          10 Days
        </button>
      </div>
    </nav>
  );
}
