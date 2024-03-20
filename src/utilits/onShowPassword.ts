import { Dispatch, SetStateAction } from "react";

interface Props {
  field: "newPassword" | "confirmNewPassword";
  setShowPassword: Dispatch<
    SetStateAction<{ newPassword: boolean; confirmNewPassword: boolean }>
  >;
}

export const onShowPassword = ({ field, setShowPassword }: Props) => {
  setShowPassword((prevState) => ({
    ...prevState,
    [field]: !prevState[field],
  }));
};
