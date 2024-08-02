import { FC } from "react"
import { User } from "@/gen/client"
import { FlexBox } from "./box"
import { useIsDarkTheme, usePalette } from "../hooks"

export const ProfileLayout: FC<{ user: User }> = ({ user }) => {
  const isDarkTheme = useIsDarkTheme();
  const { palette, getPaletteColorValue } = usePalette();

  return (
    <FlexBox sx={{ mt: 1, p: 5, width: "100%", borderRadius: "8px", bgcolor: isDarkTheme ? getPaletteColorValue(palette.black, 700) : "white" }}>
      <FlexBox sx={{ flex: 1, p: 4 }}>
        <img src={user.photoId} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
      </FlexBox>
      <FlexBox sx={{ flex: 1, p: 4 }}>
      </FlexBox>
    </FlexBox>
  )
}
