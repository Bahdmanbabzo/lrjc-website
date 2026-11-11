import { Emblem } from "./emblem";

export function EmblemWatermark() {
  return (
    <div className="emblem-watermark" aria-hidden="true">
      <Emblem className="h-full w-full" />
    </div>
  );
}

