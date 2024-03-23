"use client";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import StyledComponentsRegistry from "../lib/registry";
import styled from "styled-components";
import { AuthenticatorContextWrapper } from "@/hooks/AuthenticatorContext";

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

  top: 180px;
  left: 556px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 400px;

  cursor: default;
`;

const StyledTitle = styled.h1`
  font-weight: bold;
  font-size: 40px;

  color: #316fea;
`;
