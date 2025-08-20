export const MainBackground = ({children,className}) => {
  return (
    <div className={`min-h-[calc(100vh-124px)]  bg-beige-200 ${className}`}>{children}</div>
  )
}
