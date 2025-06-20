import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to stores page
  redirect("/dashboard")
}
