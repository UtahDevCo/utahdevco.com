"use client";
import clsx from "clsx";
import { Button, ButtonProps } from "./ui/button";
import { useState } from "react";

type ClickButtonProps = Readonly<{
  clickToDisable?: boolean;
}> &
  ButtonProps;

export function ClickButton({ clickToDisable, ...props }: ClickButtonProps) {
  const [disabled, setDisabled] = useState(false);

  return (
    <Button
      disabled={disabled}
      className={clsx(props.className, { "disabled:opacity-50": disabled })}
      onClick={(e) => {
        if (clickToDisable) {
          setTimeout(() => {
            setDisabled(true);
          });
        }

        props.onClick?.(e);
      }}
      {...props}
    />
  );
}
