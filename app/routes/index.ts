interface Routes {
  HOMEPAGE: string
  ISSUES: {
    MAIN: string
    LIST: string
    EDIT: string
    NEW: string
  }
  API: {
    ISSUES: string
  }
}

const routes: Routes = {
  HOMEPAGE: '/',
  ISSUES: {
    MAIN: '/issues',
    LIST: '/issues/list',
    EDIT: '/issues/edit',
    NEW: '/issues/new',
  },
  API: {
    ISSUES: '/api/issues',
  },
}

export default routes
