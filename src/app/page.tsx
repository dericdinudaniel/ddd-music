import Background from "@/components/Background";
import { SlideFadeIn } from "@/components/SlideFadeIn";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div>
      <Background className="flex flex-col justify-center items-center align-middle">
        <div className="font-bold font-header tracking-[.2rem] flex gap-x-3 md:gap-x-4 xl:gap-x-5 items-center pt-10">
          <div className="text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl">
            <SlideFadeIn delay={0.12}>
              <h1
                className="text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl w-min"
                data-text-cursor
              >
                music
              </h1>
            </SlideFadeIn>
            <SlideFadeIn delay={0.06}>
              <h1
                className="text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl w-min"
                data-text-cursor
              >
                by
              </h1>
            </SlideFadeIn>
          </div>
          <SlideFadeIn delay={0}>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl 2xl:text-9xl"
              data-text-cursor
            >
              deric
            </h1>
          </SlideFadeIn>
        </div>
        <SocialLinks />
      </Background>
    </div>
  );
}
