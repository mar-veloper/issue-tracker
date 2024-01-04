const routes = {
  HOMEPAGE: '/',
  ISSUES: {
    MAIN: '/issues',
    LIST: '/issues/list',
    EDIT: '/issues/edit',
    NEW: '/issues/new',
  },
  API: {
    ISSUES: {
      MAIN: '/api/issues',
      LATEST: '/api/issues/latest',
    },
    AUTH: {
      SIGN_IN: '/api/auth/signin',
      SIGN_OUT: '/api/auth/signout',
    },
    USERS: '/api/users',
  },
}

export default routes
