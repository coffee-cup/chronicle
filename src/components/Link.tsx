import NLink from "next/link";
import * as React from "react";
import { Link as TLink } from "theme-ui";
import { SystemStyleObject } from "@styled-system/css";

export interface Props {
  to?: string;
  href?: string;
  target?: string;
  variant?: string;
  className?: string;
  sx?: SystemStyleObject;
}

const isExternalLink = (href: string): boolean =>
  href.startsWith("http://") || href.startsWith("https://");

const Link: React.FC<Props> = props => {
  const href = props.href || props.to;
  if (isExternalLink(href)) {
    return (
      <TLink href={href} target="_blank" rel="noopener" {...props}>
        {props.children}
      </TLink>
    );
  }

  return (
    <NLink href={href}>
      <TLink {...props}>{props.children}</TLink>
    </NLink>
  );
};

export default Link;
