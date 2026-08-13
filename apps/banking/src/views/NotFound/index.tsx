"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Content, HomeLink, Message, NotFoundRoot, Title } from "./styled";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <NotFoundRoot>
      <Content>
        <Title>404</Title>
        <Message>Página não encontrada</Message>
        <HomeLink href="/">Voltar ao início</HomeLink>
      </Content>
    </NotFoundRoot>
  );
};

export default NotFound;
