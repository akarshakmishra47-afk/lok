import { createRootRoute, Outlet } from '@tanstack/react-router'
import { PageShell } from '../components/folklore'

export const Route = createRootRoute({
  component: () => (
    <PageShell>
      <Outlet />
    </PageShell>
  ),
})
