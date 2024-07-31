import { FC } from "react"
import { User } from "@/gen/client"
import { FlexBox } from "./box"

export const ProfileLayout: FC<{ user: User }> = ({ user }) => {
  return (
    <FlexBox sx={{ width: "100%" }}>
      Hello world
      {JSON.stringify(user)};
    </FlexBox>
  )
}
