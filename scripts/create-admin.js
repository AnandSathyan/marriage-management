const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@marriage.com' },
    update: {},
    create: {
      email: 'admin@marriage.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      language: 'ENGLISH',
      privileges: ['all'],
      isActive: true,
    },
  })

  console.log('Admin user created:', admin)

  // Create a member user
  const memberPassword = await bcrypt.hash('member123', 10)
  const member = await prisma.user.upsert({
    where: { email: 'member@marriage.com' },
    update: {},
    create: {
      email: 'member@marriage.com',
      password: memberPassword,
      name: 'Member User',
      role: 'MEMBER',
      language: 'MALAYALAM',
      privileges: ['view_profiles', 'add_profiles'],
      isActive: true,
    },
  })

  console.log('Member user created:', member)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
