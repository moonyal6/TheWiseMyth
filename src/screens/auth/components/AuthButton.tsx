import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import tw from "../../../utils/tailwind";
import { COLORS } from "../../../constants/theme";

interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "filled" | "outlined";
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  variant = "filled",
  loading = false,
  style,
  disabled,
  ...props
}) => {
  const buttonStyles = [
    tw`rounded-[10px] items-center justify-center w-full h-[56px]`,
    variant === "filled" ? styles.filledButton : styles.outlinedButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    tw`text-lg font-semibold`,
    variant === "filled" ? styles.filledText : styles.outlinedText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "filled" ? "white" : COLORS.primary.purple}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filledButton: {
    backgroundColor: COLORS.primary.purple,
  },
  outlinedButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: COLORS.primary.purple,
  },
  disabledButton: {
    opacity: 0.5,
  },
  filledText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  outlinedText: {
    color: COLORS.primary.purple,
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default AuthButton;
