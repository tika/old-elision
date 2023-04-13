import Image from "next/image";

export type AvatarProps = {
  url: string;
  name: string;
  size?: number;
};

export const Avatar = ({ url, name, size }: AvatarProps) => {
  return (
    <div>
      <Image
        className="rounded-full"
        alt={name}
        src={url}
        width={size ?? 32}
        height={size ?? 32}
      />
    </div>
  );
};
