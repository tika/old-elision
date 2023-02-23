import { Color } from "@/lib/color";
import Link from "next/link";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: JSX.Element;
  href?: string;
  color?: Color;
};

export function Button(props: ButtonProps) {
  return (
    <>
      {props.href ? (
        <Link
          href={props.href}
          className="flex justify-center items-center gap-2 border rounded-lg px-3 py-1 transition duration-200 hover:bg-gray-100 hover:bg-opacity-50"
        >
          {props.icon}{" "}
          <span className="flex items-center h-full">{props.children}</span>
        </Link>
      ) : (
        <button
          onClick={props.onClick}
          className="flex justify-center items-center gap-2 border rounded-lg px-3 py-1 transition duration-200 hover:bg-gray-100 hover:bg-opacity-50"
        >
          {props.icon}{" "}
          <span className="flex items-center h-full">{props.children}</span>
        </button>
      )}
    </>
  );
}
