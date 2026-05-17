import { Hero } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { ThreePillars } from "@/components/home/ThreePillars";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { PatientStories } from "@/components/home/PatientStories";
import { BottomCta } from "@/components/home/BottomCta";
import { Reveal } from "@/components/shared/Reveal";
import { StickyCallBar } from "@/components/shared/StickyCallBar";

export default function HomePage() {
  return (
    <>
      <StickyCallBar />
      <Hero />
      <Reveal><Proof /></Reveal>
      <Reveal><ThreePillars /></Reveal>
      <Reveal><WhoWeServe /></Reveal>
      <Reveal><PatientStories /></Reveal>
      <Reveal><BottomCta /></Reveal>
    </>
  );
}
