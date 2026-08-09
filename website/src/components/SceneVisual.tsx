type SceneVariant = 'before' | 'product' | 'system';

type SceneVisualProps = {
  variant: SceneVariant;
  src: string;
  alt: string;
  callouts: string[];
  secondarySrc?: string;
  secondaryAlt?: string;
  secondaryLabel?: string;
  priority?: boolean;
};

type Layer = {
  name: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const layers: Record<SceneVariant, Layer[]> = {
  before: [
    { name: 'screen', x: -1.2, y: -0.8, rotate: -0.35, scale: 0.99 },
    { name: 'architect', x: 1.8, y: 0.4, rotate: 0.4, scale: 0.99 },
    { name: 'desk', x: -0.8, y: 1.7, rotate: -0.3, scale: 0.995 },
  ],
  product: [
    { name: 'screen', x: -1.3, y: -0.7, rotate: -0.3, scale: 0.99 },
    { name: 'model', x: 0.4, y: -1.6, rotate: 0.25, scale: 0.985 },
    { name: 'architect', x: 1.9, y: 0.5, rotate: 0.35, scale: 0.99 },
  ],
  system: [
    { name: 'platform', x: 0, y: 1.8, rotate: -0.25, scale: 0.99 },
    { name: 'service', x: 0, y: -2, rotate: 0.3, scale: 0.98 },
    { name: 'infrastructure', x: -1.5, y: -1.2, rotate: -0.35, scale: 0.985 },
    { name: 'people', x: 1.5, y: -1.8, rotate: 0.35, scale: 0.98 },
  ],
};

export default function SceneVisual({
  variant,
  src,
  alt,
  callouts,
  secondarySrc,
  secondaryAlt,
  secondaryLabel,
  priority = false,
}: SceneVisualProps) {
  return (
    <figure className={`ms-layered-scene ms-layered-scene-${variant}`} data-layered-scene>
      <div className="ms-layered-image">
        <img
          className="ms-image-base"
          src={src}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
        {layers[variant].map((layer) => (
          <img
            className={`ms-image-layer ms-image-layer-${layer.name}`}
            src={src}
            alt=""
            aria-hidden="true"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            data-x={layer.x}
            data-y={layer.y}
            data-rotate={layer.rotate}
            data-scale={layer.scale}
            key={layer.name}
          />
        ))}
        <span className="ms-image-sheen" aria-hidden="true" />
      </div>

      <div className="ms-scene-callouts" aria-hidden="true">
        {callouts.map((callout, index) => (
          <span className={`ms-scene-callout ms-scene-callout-${index + 1}`} key={callout}>
            <i />{callout}
          </span>
        ))}
      </div>

      {secondarySrc && secondaryAlt && (
        <div className="ms-detail-shot">
          <img src={secondarySrc} alt={secondaryAlt} loading="lazy" decoding="async" />
          {secondaryLabel && <span>{secondaryLabel}</span>}
        </div>
      )}

      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
