import Image from "next/image";

export type AvatarProps = {
  user: ElisionUser;
  size?: number;
};

export const Avatar = ({ user, size }: AvatarProps) => {
  const defaultSize = 32;

  return (
    <div className="select-none">
      {!user.avatarURL ? (
        <Image
          className="rounded-full"
          alt={`${user.username}'s avatar`}
          src={"user.avatarURL"}
          width={size ?? defaultSize}
          height={size ?? defaultSize}
        />
      ) : (
        <div
          className={
            "bg-blue-200 flex justify-center items-center rounded-full"
          }
          style={{
            width: size ?? defaultSize,
            height: size ?? defaultSize,
          }}
        >
          <h1 className="font-bold">{user.username[0]}</h1>
        </div>
      )}
    </div>
  );
};
