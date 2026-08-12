import * as React from "react";

import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./interface";
import {
  StyledCard,
  StyledCardContent,
  StyledCardDescription,
  StyledCardFooter,
  StyledCardHeader,
  StyledCardTitle,
} from "./styled";

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <StyledCard ref={ref} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => (
  <StyledCardHeader ref={ref} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>((props, ref) => (
  <StyledCardTitle ref={ref} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  (props, ref) => <StyledCardDescription ref={ref} {...props} />,
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>((props, ref) => (
  <StyledCardContent ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>((props, ref) => (
  <StyledCardFooter ref={ref} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
