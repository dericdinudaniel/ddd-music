import Background from "@/components/Background";
import { SlideFadeIn } from "@/components/SlideFadeIn";

export default function Home() {
  return (
    <div>
      <Background className="flex flex-col justify-center items-center align-middle">
        <div
          className="font-bold font-header tracking-[.2rem] flex gap-x-3 md:gap-x-4 xl:gap-x-5 items-center pt-10"
          data-text-cursor
        >
          <div className="text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl">
            <SlideFadeIn delay={0.12}>music</SlideFadeIn>
            <SlideFadeIn delay={0.06}>by</SlideFadeIn>
          </div>
          <SlideFadeIn
            delay={0}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl 2xl:text-9xl"
          >
            deric
          </SlideFadeIn>
        </div>
      </Background>
    </div>
  );
}
