"use client";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import StyledComponentsRegistry from "../lib/registry";
import styled from "styled-components";
import { AuthenticatorContextWrapper } from "@/context/AuthenticatorContext";
import { size } from "@/components/styled/sizes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>
            <AuthenticatorContextWrapper>
              <StyledContainer>
                <StyledTitle>Qencode</StyledTitle>
                {children}
              </StyledContainer>
            </AuthenticatorContextWrapper>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

const StyledContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 400px;

  cursor: default;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  @media (max-width: ${size.mobile}) {
    left: 0;

    transform: translate(0%, -50%);
  }
`;

const StyledTitle = styled.h1`
  font-weight: bold;
  font-size: 40px;

  color: #316fea;
`;
