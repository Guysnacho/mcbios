import { Card, CardBody, CardProps } from "@chakra-ui/react";

export default function EmbeddedVideo(
  props: { src: string; className?: string | undefined } & CardProps
) {
  return (
    <Card {...props}>
      <CardBody>
        <iframe
          className="mx-auto"
          src={props.src}
          width="100%"
          allow="autoplay"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </CardBody>
    </Card>
  );
}
