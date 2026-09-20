import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { folkloreService } from '@/lib/folklore-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Feather, Sparkles, Eye, EyeOff } from 'lucide-react'

export const Route = createFileRoute('/auth')({
  component: AuthPage,
})

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    
    try {
      if (isLogin) {
        await folkloreService.signIn(email, password)
        navigate({ to: '/' })
      } else {
        const data = await folkloreService.signUp(email, password)
        if (data.session) {
          navigate({ to: '/' })
        } else {
          setSuccess('Registration successful! Please check your email inbox to verify your account.')
          setEmail('')
          setPassword('')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-140px)] max-w-7xl place-items-center px-5 py-12 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 grid size-12 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
            {isLogin ? <Feather size={20} /> : <Sparkles size={20} />}
          </div>
          <h1 className="font-display text-4xl">{isLogin ? 'Welcome back' : 'Join the archive'}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {isLogin 
              ? 'Enter your credentials to continue exploring.' 
              : 'Create an account to share stories and memories.'}
          </p>
        </div>

        <Card className="border-border bg-card/50 p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded border border-red-900/50 bg-red-900/20 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded border border-green-900/50 bg-green-900/20 p-3 text-sm text-green-200">
                {success}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="nomad@example.com"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
                className="border-border bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="border-border bg-background/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? 'Register here' : 'Login instead'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
