export default function({ redirect, store }) {
  if (!store.getters.isAuthenticated) {
    redirect('/admin/auth')
  }
}
