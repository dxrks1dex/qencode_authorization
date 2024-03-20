import styled from "styled-components";
import Link from "next/link";

export const StyledInput = styled.input`
  width: 376px;
  height: 48px;

  top: 494px;
  left: 556px;

  padding: 0 12px 0 12px;

  gap: 6px;

  border-radius: 6px;
  border: 1.2px solid #d3d8dc;

  cursor: pointer;

  &:focus {
    transition: 0.2s;

    outline: none;

    border: 1px solid #316fea;
    box-shadow: 0 0 2px 1px #537cc5;
  }
`;

export const StyledForm = styled.form`
  width: 400px;
  //height: 476px;

  margin-top: 30px;

  display: grid;

  grid-gap: 30px;
`;

export const StyledApplyButton = styled.button`
  width: 400px;
  height: 48px;

  border-radius: 8px;

  background-color: #316fea;
  color: #ffff;

  border: 1px solid #316fea;

  font-family:
    Basis Grotesque Pro,
    serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;

  cursor: pointer;
`;

export const StyledSubTitle = styled.h3`
  font-size: 30px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0;
  text-align: center;

  color: #1a1919;
`;

export const StyledLink = styled(Link)`
  color: #316fea;

  font-family:
    Basis Grotesque Pro,
    serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: right;

  text-decoration: none;
`;

export const StyledButtons = styled.button`
  border-radius: 5px;

  border: 1px solid #d3d8dc;
  outline: none;

  background-color: snow;

  font-weight: 550;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    transition: 0.4s;
    border: 1px solid #316fea;
  }
`;

export const StyledPasswordInputContainer = styled.div`
  display: flex;

  align-items: center;
`;

export const StyledShowPasswordIconContainer = styled.div`
  position: absolute;

  margin-left: 92%;
`;
