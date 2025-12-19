import clsx from "clsx";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  text?: string;
  underline?: boolean;
  className?: string;
}

const Link = ({ text, href, underline, className, children }: LinkProps) => {
  return (
    <a
      // target="_blank"
      rel="noopener noreferrer nofollow"
      className={clsx(className, {
        "underline decoration-gray-a4 decoration-1": underline,
      })}
      href={href}
    >
      {text || children}
    </a>
  );
};

export default Link;
