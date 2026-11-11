import { BackgroundCanvas } from "./background-canvas";
import { EmblemWatermark } from "./emblem-watermark";

export function SiteBackground() {
  return (
    <div className="site-background" aria-hidden="true">
      <div className="background-poster" />
      <BackgroundCanvas />
      <EmblemWatermark />
    </div>
  );
}

