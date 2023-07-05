type NavbarRoute = {
  path: string | (() => string)
  i18nKey: string
  /**
   * @default false
   * @description If true, the user must be authenticated to view this route.
   */
  requiresAuth?: boolean
  icon?: string
  /**
   * @deprecated text will be removed in the future in favor of i18nKey
   */
  text: string
}

const NavbarRoutes: NavbarRoute[] = [
  {
    path: "/",
    text: "Home",
    i18nKey: "navbar.home",
  },

  {
    path: "#",
    text: "What is Ada",
    i18nKey: "navbar.what_is_ada",
    requiresAuth: false,
  },
]

export default NavbarRoutes
