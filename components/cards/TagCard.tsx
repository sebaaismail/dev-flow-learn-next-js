import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  icon?: string;
  typeIcon?: string;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  icon,
  typeIcon,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const content = (
    <>
      <Badge
        className="subtle-medium background-light800_dark300
      text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase"
      >
        <div className="flex-center space-x-2">
          <i
            className={`devicon-${icon ? icon : name}-${typeIcon ? typeIcon : "original"} colored text-sm`}
          />

          <span>{name}</span>
        </div>
        {remove && (
          <Image
            src="/icons/close.svg"
            alt="Remove"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}+</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button
        className="flex justify-between gap-2"
        onClick={(e) => e.preventDefault()}
      >
        {content}
      </button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  }
};

export default TagCard;
