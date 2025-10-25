const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Get all users
  const users = await prisma.user.findMany()
  
  if (users.length === 0) {
    console.log('No users found. Please run npm run create:admin first')
    return
  }

  const userId = users[0].id

  console.log('Seeding sample profiles...')

  const profiles = [
    {
      name: 'Priya Sharma',
      age: 28,
      education: 'Master of Computer Science',
      occupation: 'Software Engineer at Google',
      location: 'Bangalore, India',
      contact: '+91 98765 43210',
      bio: 'Outgoing personality, loves traveling and reading. Family-oriented and traditional.',
      photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'],
      status: 'NEW',
      addedBy: userId,
    },
    {
      name: 'Anjali Patel',
      age: 26,
      education: 'MBA in Finance',
      occupation: 'Investment Banker',
      location: 'Mumbai, India',
      contact: '+91 98765 12345',
      bio: 'Ambitious and career-focused. Enjoys classical music and dance.',
      photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'],
      status: 'PENDING',
      addedBy: userId,
    },
    {
      name: 'Meera Nair',
      age: 27,
      education: 'Bachelor of Medicine',
      occupation: 'Doctor',
      location: 'Chennai, India',
      contact: '+91 98765 67890',
      bio: 'Compassionate and dedicated. Loves helping others and cooking.',
      photos: ['https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400'],
      status: 'ACCEPTED',
      addedBy: userId,
    },
    {
      name: 'Kavya Reddy',
      age: 29,
      education: 'Master of Business Administration',
      occupation: 'Marketing Manager',
      location: 'Hyderabad, India',
      contact: '+91 98765 98765',
      bio: 'Creative and innovative. Passionate about marketing and branding.',
      photos: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400'],
      status: 'REJECTED',
      rejectedBy: 'GIRL_SIDE',
      rejectionReason: 'Looking for someone from the same community',
      addedBy: userId,
    },
    {
      name: 'Divya Menon',
      age: 25,
      education: 'Bachelor of Engineering',
      occupation: 'IT Consultant',
      location: 'Pune, India',
      contact: '+91 98765 54321',
      bio: 'Tech enthusiast and problem solver. Enjoys coding and hiking.',
      photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'],
      status: 'NEW',
      addedBy: userId,
    },
  ]

  for (const profile of profiles) {
    await prisma.profile.create({
      data: profile,
    })
    console.log(`Created profile: ${profile.name}`)
  }

  console.log('✅ Sample profiles created successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
