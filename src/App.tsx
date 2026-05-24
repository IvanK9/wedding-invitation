import Hero from "./sections/Hero/Hero";
import About  from "./sections/About/About";
import TimerSection from "./sections/Timer/Timer";
import Schedule from "./sections/Schedule/Schedule";
import Location from "./sections/Location/Location";
import RSVP from "./sections/RSVP/RSVP";

export default function App() {
  return (
    <main className="w-full min-h-screen bg-wedding-bg selection:bg-wedding-accent selection:text-white">
      <Hero />
      <About />
      <TimerSection />
      <Schedule />
      <Location />
      <RSVP />
    </main>
  );
}