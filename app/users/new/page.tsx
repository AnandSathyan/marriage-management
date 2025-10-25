import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import AddUserForm from '@/components/AddUserForm'

export default async function NewUserPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const user = session.user as any
  if (user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="px-6 py-8 ml-64">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New User</h1>
            <AddUserForm />
          </div>
        </div>
      </div>
    </>
  )
}
