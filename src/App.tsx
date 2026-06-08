import Hero from "./sections/Hero/Hero";
import About  from "./sections/About/About";
import TimerSection from "./sections/Timer/Timer";
import Schedule from "./sections/Schedule/Schedule";
import Location from "./sections/Location/Location";
import RSVP from "./sections/RSVP/RSVP";

export default function App() {
  return (
    <div>
      <main>
        <Hero />
        <About />
        <TimerSection />
        <Schedule />
        <Location />
        <RSVP />
      </main>
    </div>
  );
}