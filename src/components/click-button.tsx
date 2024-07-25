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

  console.log("disabled", disabled);

  return (
    <Button
      className={clsx(props.className, { "opacity-50": disabled })}
      onClick={(e) => {
        if (clickToDisable) {
          setDisabled(true);
        }

        props.onClick?.(e);
      }}
      {...props}
    />
  );
}
