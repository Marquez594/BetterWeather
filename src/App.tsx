import DisplayWeather from "./displayWeather";
import Nav from "./nav";
import { WeatherProvider } from "./weatherContext";

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen flex flex-col w-screen ">
        <Nav></Nav>
          <DisplayWeather></DisplayWeather>
      </div>
    </WeatherProvider>
  );
}

export default App;
