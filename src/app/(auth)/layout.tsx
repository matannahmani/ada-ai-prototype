export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-1 flex items-center justify-center py-16 sm:container">
      {children}
    </div>
  )
}
