const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testAuth() {
  try {
    // Get the admin user
    const user = await prisma.user.findUnique({
      where: { email: 'admin@marriage.com' }
    })

    if (!user) {
      console.log('User not found')
      return
    }

    console.log('User found:', user.email)
    console.log('Stored password hash:', user.password)

    // Test password comparison
    const password = 'admin123'
    const isValid = await bcrypt.compare(password, user.password)
    
    console.log('Password "admin123" is valid:', isValid)

    // Also test with a new hash
    const newHash = await bcrypt.hash(password, 10)
    console.log('New hash for "admin123":', newHash)
    console.log('New hash matches:', await bcrypt.compare(password, newHash))

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAuth()
