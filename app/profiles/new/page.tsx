import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import AddProfileForm from '@/components/AddProfileForm'

export default async function NewProfilePage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Profile</h1>
          <AddProfileForm userId={session.user!.id!} />
        </div>
      </div>
    </div>
  )
}
