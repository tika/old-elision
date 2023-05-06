import Image from "next/image";
import BoringAvatar from "boring-avatars";

export type AvatarProps = {
  user: ElisionUser;
  size?: number;
};

export const Avatar = ({ user, size }: AvatarProps) => {
  const defaultSize = 32;

  return (
    <div className="select-none">
      {user.avatarURL ? (
        <Image
          className="rounded-full"
          alt={`${user.username}'s avatar`}
          src={user.avatarURL}
          width={size ?? defaultSize}
          height={size ?? defaultSize}
        />
      ) : (
        <BoringAvatar
          size={size ?? defaultSize}
          name={user.id}
          variant="marble"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} // TODO: brand colors
        />
      )}
    </div>
  );
};
