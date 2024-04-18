import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/react";

type BoardMemberCardProps = {
  name: string;
  image?: string;
  orgPosition?: string;
  title?: string;
  department?: string;
  affiliation?: string;
  formerMember?: boolean;
  index?: number;
};
const BoardMemberCard = (props: BoardMemberCardProps) => {
  return (
    <Card shadow="md" className="m-auto h-fit w-5/6 md:w-unit-7xl">
      {props.index !== undefined ? (
        <h6 className="mx-auto italic mt-2">#{props.index + 1}</h6>
      ) : undefined}
      <CardHeader>
        <strong className="mx-auto text-lg">{props.name}</strong>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="sm:flex gap-5">
          {props.image ? (
            <Image
              src={props.image}
              fallbackSrc={props.image}
              alt={props.name + " " + props.affiliation}
              className="object-cover aspect-square object-top mx-auto w-52"
              classNames={{
                wrapper: ["mx-auto", "aspect-square", "mb-5", "sm:mb-0"],
              }}
            />
          ) : undefined}
          <div className="text-medium my-auto">
            {props.orgPosition ? (
              <p className="font-bold">
                {props.orgPosition}, Mid-South Computational Biology &
                Bioinformatics Society
              </p>
            ) : undefined}
            <p>{props.title}</p>
            {props.title ? <Divider className="my-2" /> : undefined}
            <p>{props.department}</p>
            <p>{props.affiliation}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BoardMemberCard;
