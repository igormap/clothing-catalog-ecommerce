"use client";

import * as S from "@radix-ui/react-select";
import classNames from "classnames";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React from "react";

interface Props {
  onChange: (value: string) => void;
  value: string;
  options: string[];
}

export function Select({ onChange, options, value }: Props) {
  return (
    <S.Root onValueChange={onChange} value={value}>
      <S.Trigger
        className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
        aria-label="Categoria"
      >
        <S.Value placeholder="Selecione" />
        <S.Icon className="text-violet11">
          <ChevronDownIcon />
        </S.Icon>
      </S.Trigger>
      <S.Portal>
        <S.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <S.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronUpIcon />
          </S.ScrollUpButton>
          <S.Viewport className="p-[5px]">
            <S.Group>
              {options.map((category) => (
                <S.SelectItem key={category} value={category}>
                  {category}
                </S.SelectItem>
              ))}
            </S.Group>
            <S.Separator className="m-[5px] h-px bg-violet6" />
          </S.Viewport>
          <S.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronDownIcon />
          </S.ScrollDownButton>
        </S.Content>
      </S.Portal>
    </S.Root>
  );
}

type SelectItemProps = React.PropsWithChildren<{
  className?: string; // Define que className é opcional
  value: string;
}>;

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <S.Item
        className={classNames(
          "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <S.ItemText>{children}</S.ItemText>
        <S.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </S.ItemIndicator>
      </S.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
