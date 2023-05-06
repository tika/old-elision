import Image from "next/image";

export type AvatarProps = {
  username: string;
  googleAvatar?: GoogleAvatar;
  size?: number;
};

type GoogleAvatar = {
  url: string;
  name: string;
};

export const Avatar = ({ username, googleAvatar, size }: AvatarProps) => {
  return (
    <div>
      {googleAvatar ? (
        <Image
          className="rounded-full"
          alt={googleAvatar.name}
          src={googleAvatar.url}
          width={size ?? 32}
          height={size ?? 32}
        />
      ) : (
        <div>
          <h1>{username}</h1>
        </div>
      )}
    </div>
  );
};
