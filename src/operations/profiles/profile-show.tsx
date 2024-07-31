import { CircularProgress } from "@mui/material"
import { ProfileLayout } from "@/common/components"
import { User } from "@/gen/client"
import { useWhoami } from "@/security/hooks"
import { useGetOne } from "react-admin";

export const ProfileShow = () => {
  const { id } = useWhoami();
  const { data: user, isLoading } = useGetOne<Required<User>>("profiles", { id: id! });

  if (isLoading) {
    return <CircularProgress sx={{ mx: "auto" }} />
  }

  return (
    <ProfileLayout user={user!} />
  )
}
