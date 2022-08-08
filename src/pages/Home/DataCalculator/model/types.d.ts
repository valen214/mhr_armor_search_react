
import type { CSSProperties } from "react";
import type { ParamsType } from "../../../../lib/search_algo/types"

/*
https://betterprogramming.pub/runtime-data-
validation-from-typescript-interfaces-1001ad22e775
*/

export type ParamsDescriptionType<Default = false> = (
  Default extends true ? {} : { id: string }
) & {
  width?: number
} & ({
  type: "number"
  text: string
  param: keyof ParamsType | string
} | {
  type: "toggle",
  text: string,
  param: keyof ParamsType | string
  default?: boolean
} | {
  type: "options",
  text: string,
  param: keyof ParamsType | string,
  default: number | string
  options: Array<number | string | {
    text: string,
    value: number | string,
    default?: boolean
  }>
} | {
  type: "mul-val-options",
  text: string,
  params: Array<keyof ParamsType | string>,
  defaultIndex: number
  options: Array<{
    text: string,
    values: Array<number | string>,
    style?: string | CSSProperties
  }>
} | {
  type: "other",
  text: string,
  component: () => JSX.Element
})