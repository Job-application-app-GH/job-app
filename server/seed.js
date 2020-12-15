const db = require('../server/db')
const {
  Candidate,
  Job,
  Match,
  Message,
  Organization,
  Skill,
  User,
} = require('../server/db/models')
const man1 =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80'
const man2 =
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80'
const man3 =
  'https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=670&q=80 '
const man4 =
  'https://images.unsplash.com/photo-1597346908500-28cda8acfe4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
const man5 =
  'https://images.unsplash.com/photo-1523477800337-966dbabe060b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
const woman1 =
  'https://images.unsplash.com/photo-1589525231707-f2de2428f59c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'

const woman2 =
  'https://images.unsplash.com/photo-1607569708758-0270aa4651bd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzI2fHxoZWFkc2hvdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
const woman3 =
  'https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
const woman4 =
  'https://images.unsplash.com/photo-1589729482945-ca6f3a235f7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
const woman5 =
  'https://images.unsplash.com/photo-1593579491833-457b2c451e38?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2853&q=80'

const org1 =
  'https://i.pinimg.com/originals/8e/a9/15/8ea915c2950a58cad7e184b94d6d4bac.jpg'

const org2 =
  'https://i.pinimg.com/600x315/9e/b1/10/9eb11081161d0dc751278a253b0e9cef.jpg'

const org3 =
  'https://us.123rf.com/450wm/mehmetbuma/mehmetbuma1807/mehmetbuma180700039/103980619-stock-vector-eagle-hunting-eagle-with-negative-space-on-white-background-vector-illustration-.jpg?ver=6'

const org4 = 'https://www.seoclerk.com/pics/513878-2XSS2p1487670205.png'

const org5 =
  'https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/08/Logo_Design_Process_jpg_4EOOtXuw.jpg?auto=format&q=60&w=1280&h=1280&fit=crop&crop=faces'

const userData = [
  {
    userType: 'CANDIDATE',
    email: 'dog@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'cat@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'cheetah@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'bird@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'fish@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'bear@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'a@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'b@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'c@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'd@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'e@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'f@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'lillie@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'vivian@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'shawna@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'frontstreetbakery@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'looneytunes@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'thesimpsons@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'christy@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'caleb@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'andy@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'soylent@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'initech@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'umbrella@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'jess@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'annie@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'liz@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'hooli@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'VehementCapitalPartners@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'MassiveDynamic@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'iris@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'larry@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'geraldine@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'openlane@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'yearin@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'goodsilron@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'marian@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'andres@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'cindy@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'condax@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'Opentech@gmail.com',
    password: '123',
  },
  {
    userType: 'ORGANIZATION',
    email: 'Golddex@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'ben@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'robyn@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'shirley@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'kelly@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'Theresa@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'Phillip@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'lillian@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'john@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'jean@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'steve@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'lois@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'juan@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'estelle@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'dustin@gmail.com',
    password: '123',
  },
  {
    userType: 'CANDIDATE',
    email: 'Guillermo@gmail.com',
    password: '123',
  },
]

const candidateData = [
  {
    name: 'Archana',
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AZA318E6-46c74a95e013-512',
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Student',
    currentCompany: 'Grace Hopper',
  },
  {
    name: 'Mackenzie',
    img: 'https://ca.slack-edge.com/T024FPYBQ-U017W20F9D4-dd652129cf3c-512',
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Student',
    currentCompany: 'Grace Hopper',
  },
  {
    name: 'Maria',
    img: 'https://ca.slack-edge.com/T024FPYBQ-U01AJHRCK2T-b11a13f36d63-512',
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Student',
    currentCompany: 'Grace Hopper',
  },
  {
    name: 'Ashley Lindsay',
    img: woman1,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Google',
  },
  {
    name: 'Montague Reeves',
    img: man1,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Facebook',
  },
  {
    name: 'Aniyah Lozano',
    img: woman2,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Etsy',
  },
  {
    name: 'Lillie Christensen',
    img: woman2,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Facebook',
  },
  {
    name: 'Vivian Welch',
    img: woman1,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Facebook',
  },
  {
    name: 'Shawna Barton',
    img: woman1,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Facebook',
  },
  {
    name: 'Christy Mason',
    img: woman2,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Senior Software Engineer',
    currentCompany: 'Target',
  },
  {
    name: 'Caleb Osborne',
    img: man1,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Frontend Engineer',
    currentCompany: 'Twitter',
  },
  {
    name: 'Andy Leonard',
    img: man1,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Bloomberg',
  },
  {
    name: 'Jess Leonard',
    img: woman2,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Bloomberg',
  },
  {
    name: 'Annie King',
    img: woman3,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Bloomberg',
  },
  {
    name: 'Liz Lemon',
    img: woman3,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'TGS',
  },
  {
    name: 'Iris Shelton',
    img: woman3,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Verizon',
  },
  {
    name: 'Larry Mckenzie',
    img: man3,
    description: "I'm a current software engineer looking for a job!",
    location: 'Chicago',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'AT&T',
  },
  {
    name: 'Geraldine Barrett',
    img: woman3,
    description: "I'm a current software engineer looking for a job!",
    location: 'Los Angeles',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Goop',
  },
  {
    name: 'Marian Ross',
    img: woman4,
    description: "I'm a current software engineer looking for a job!",
    location: 'Los Angeles',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Goop',
  },
  {
    name: 'Andres Arnold',
    img: woman4,
    description: "I'm a current software engineer looking for a job!",
    location: 'Los Angeles',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Goop',
  },
  {
    name: 'Cindy Freeman',
    img: woman4,
    description: "I'm a current software engineer looking for a job!",
    location: 'Los Angeles',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Goop',
  },
  {
    name: 'Benjamin Ramsey',
    img: man4,
    description: "I'm a current software engineer looking for a job!",
    location: 'Los Angeles',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'REI',
  },
  {
    name: 'Robyn Nunez',
    img: woman4,
    description: "I'm a current software engineer looking for a job!",
    location: 'Los Angeles',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Chase',
  },
  {
    name: 'Shirley Bates',
    img: woman5,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Barkbox',
  },
  {
    name: 'Kelly Scott',
    img: man5,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'New York Times',
  },
  {
    name: 'Theresa Jenkins',
    img: woman5,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'New York Times',
  },
  {
    name: 'Phillip Williams',
    img: man5,
    description: "I'm a current software engineer looking for a job!",
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'New York Times',
  },
  {
    name: 'Lillian Anderson',
    img: woman2,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'New York Times',
  },
  {
    name: 'John Cook',
    img: man5,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'New York Times',
  },
  {
    name: 'Jean Adams',
    img: woman4,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Uber',
  },
  {
    name: 'Steve Gonzales',
    img: man2,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Uber',
  },
  {
    name: 'Lois Gray',
    img: woman1,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Uber',
  },
  {
    name: 'Juan Perry',
    img: man3,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Uber',
  },
  {
    name: 'Estelle Morton',
    img: woman4,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Fullstack Academy',
  },
  {
    name: 'Dustin Fields',
    img: man3,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Fullstack Academy',
  },
  {
    name: 'Guillermo Alvarado',
    img: man1,
    description:
      'I just attended a bootcamp and I am excited to start my career as a Software Engineer!',
    location: 'New York',
    isRemote: true,
    currentRole: 'Software Engineer',
    currentCompany: 'Fullstack Academy',
  },
]

const organizationData = [
  {
    name: 'Mac Toys',
    img: org1,
    description:
      'We are a startup tech company that is looking for fresh, new talent.',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'Piper',
    img: org1,
    description:
      'We are a startup tech company that is looking for fresh, new talent.',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'Prestige',
    img: org1,
    description:
      'We are a startup tech company that is looking for fresh, new talent.',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'Rontech',
    img: org1,
    description:
      'We are a startup tech company that is looking for fresh, new talent.',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'Tyrell',
    img: org1,
    description:
      'We are a startup tech company that is looking for fresh, new talent.',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'CooperTech',
    img: org2,
    description:
      'We are a startup tech company that is looking for fresh, new talent.',
    location: 'Worldwide',
    isRemote: true,
  },
  {
    name: 'FrontTech',
    img: org2,
    description:
      'A trendy new bakery looking for someone to design their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'AcmeTech',
    img: org2,
    description: 'A startup looking for someone to design their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'Globex',
    img: org2,
    description: 'A startup looking for someone to design their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'Soylent',
    img: org3,
    description:
      'A trendy new bakery looking for someone to design their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'Initech',
    img: org3,
    description: 'A startup looking for someone to design their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'Umbrella',
    img: org3,
    description: 'A startup looking for someone to design their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'Hooli',
    img: org3,
    description:
      'We are a startup tech company that is looking for fresh, new talent.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'SanTech',
    img: org4,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'Dynamic',
    img: org4,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'Venice, CA',
    isRemote: true,
  },
  {
    name: 'Openlane',
    img: org4,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'Chicago',
    isRemote: true,
  },
  {
    name: 'Yearin',
    img: org4,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'Austin',
    isRemote: true,
  },
  {
    name: 'Goodsiron',
    img: org5,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'New York',
    isRemote: true,
  },
  {
    name: 'Condax',
    img: org5,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'Chicago',
    isRemote: true,
  },
  {
    name: 'Opentech',
    img: org5,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'Austin',
    isRemote: true,
  },
  {
    name: 'Golddex',
    img: org5,
    description:
      'A startup looking for someone to design and scale their website.',
    location: 'New York',
    isRemote: true,
  },
]

const jobData = [
  {
    title: 'Software Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'New York',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'New York',
    isRemote: true,
  },
  {
    title: 'Backend Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'New York',
    isRemote: true,
  },
  {
    title: 'Backend Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'New York',
    isRemote: true,
  },
  {
    title: 'Software Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'New York',
    isRemote: false,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'New York',
    isRemote: false,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'New York',
    isRemote: false,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'Chicago',
    isRemote: false,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a basic knowledge of programming languages.',
    location: 'Silicon Valley',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a talented and hard working Software Engineer to join our team.',
    location: 'New York',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a talented and hard working Software Engineer to join our team.',
    location: 'Miami',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a talented and hard working Software Engineer to join our team.',
    location: 'Chicago',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a team member with a strong foundation in computer science.',

    location: 'Los Angeles',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a team member with a strong foundation in computer science.',
    location: 'Miami',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a team member with a strong foundation in computer science.',
    location: 'Chicago',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a team member with a strong foundation in computer science.',
    location: 'Los Angeles',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a team member with a strong foundation in computer science.',
    location: 'Los Angeles',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for a team member with a strong foundation in computer science.',
    location: 'Los Angeles',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a knowledge of software principles.',
    location: 'Los Angeles',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a knowledge of software principles.',
    location: 'Los Angeles',
    isRemote: true,
  },
  {
    title: 'Frontend Engineer',
    description:
      'We are looking for someone with a knowledge of software principles.',
    location: 'Los Angeles',
    isRemote: true,
  },
]

const skillData = [
  {
    name: 'JavaScript',
  },
  {
    name: 'React',
  },
  {
    name: 'Redux',
  },
  {
    name: 'Sequelize',
  },
  {
    name: 'Express',
  },
  {
    name: 'Node.js',
  },
  {
    name: 'PostgreSQL',
  },
  {
    name: 'HTML',
  },
  {
    name: 'CSS',
  },
  {
    name: 'SQL',
  },
  {
    name: 'Angular',
  },
  {
    name: 'D3.js',
  },
  {
    name: 'OAuth',
  },
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [users, candidates, organizations, jobs, skills] = await Promise.all([
    User.bulkCreate(userData, {returning: true}),
    Candidate.bulkCreate(candidateData, {returning: true}),
    Organization.bulkCreate(organizationData, {returning: true}),
    Job.bulkCreate(jobData, {returning: true}),
    Skill.bulkCreate(skillData, {returning: true}),
  ])

  await users[0].setCandidate(candidates[0])
  await users[1].setCandidate(candidates[1])
  await users[2].setCandidate(candidates[2])
  await users[3].setOrganization(organizations[0])
  await users[4].setOrganization(organizations[1])
  await users[5].setOrganization(organizations[2])
  await users[6].setCandidate(candidates[3])
  await users[7].setCandidate(candidates[4])
  await users[8].setCandidate(candidates[5])
  await users[9].setOrganization(organizations[3])
  await users[10].setOrganization(organizations[4])
  await users[11].setOrganization(organizations[5])
  await users[12].setCandidate(candidates[6])
  await users[13].setCandidate(candidates[7])
  await users[14].setCandidate(candidates[8])
  await users[15].setOrganization(organizations[6])
  await users[16].setOrganization(organizations[7])
  await users[17].setOrganization(organizations[8])
  await users[18].setCandidate(candidates[9])
  await users[19].setCandidate(candidates[10])
  await users[20].setCandidate(candidates[11])
  await users[21].setOrganization(organizations[9])
  await users[22].setOrganization(organizations[10])
  await users[23].setOrganization(organizations[11])
  await users[24].setCandidate(candidates[12])
  await users[25].setCandidate(candidates[13])
  await users[26].setCandidate(candidates[14])
  await users[27].setOrganization(organizations[12])
  await users[28].setOrganization(organizations[13])
  await users[29].setOrganization(organizations[14])
  await users[30].setCandidate(candidates[15])
  await users[31].setCandidate(candidates[16])
  await users[32].setCandidate(candidates[17])
  await users[33].setOrganization(organizations[15])
  await users[34].setOrganization(organizations[16])
  await users[35].setOrganization(organizations[17])
  await users[36].setCandidate(candidates[18])
  await users[37].setCandidate(candidates[19])
  await users[38].setCandidate(candidates[20])
  await users[39].setOrganization(organizations[18])
  await users[40].setOrganization(organizations[19])
  await users[41].setOrganization(organizations[20])
  await users[42].setCandidate(candidates[21])
  await users[43].setCandidate(candidates[22])
  await users[44].setCandidate(candidates[23])
  await users[45].setCandidate(candidates[24])
  await users[46].setCandidate(candidates[25])
  await users[47].setCandidate(candidates[26])
  await users[48].setCandidate(candidates[27])
  await users[49].setCandidate(candidates[28])
  await users[50].setCandidate(candidates[29])
  await users[51].setCandidate(candidates[30])
  await users[52].setCandidate(candidates[31])
  await users[53].setCandidate(candidates[32])

  await candidates[0].addSkills([skills[0], skills[1], skills[2], skills[3]])
  await candidates[1].addSkills([skills[1], skills[2], skills[4], skills[5]])
  await candidates[2].addSkills([skills[0], skills[3], skills[4], skills[9]])
  await candidates[2].addSkills([skills[0], skills[3], skills[4], skills[11]])
  await candidates[2].addSkills([skills[0], skills[3], skills[4], skills[12]])
  await candidates[2].addSkills([skills[0], skills[3], skills[4], skills[10]])
  await candidates[3].addSkills([skills[1], skills[3], skills[4], skills[9]])
  await candidates[4].addSkills([skills[0], skills[4], skills[6], skills[9]])
  await candidates[5].addSkills([skills[0], skills[5], skills[6], skills[8]])
  await candidates[6].addSkills([skills[1], skills[3], skills[4], skills[7]])
  await candidates[7].addSkills([skills[0], skills[4], skills[6], skills[1]])
  await candidates[8].addSkills([skills[0], skills[5], skills[6], skills[7]])
  await candidates[9].addSkills([skills[5], skills[3], skills[4], skills[6]])
  await candidates[10].addSkills([skills[3], skills[4], skills[6], skills[10]])
  await candidates[11].addSkills([skills[4], skills[5], skills[6], skills[7]])
  await candidates[12].addSkills([skills[5], skills[3], skills[4], skills[11]])
  await candidates[13].addSkills([skills[3], skills[4], skills[6], skills[1]])
  await candidates[14].addSkills([skills[4], skills[5], skills[6], skills[7]])
  await candidates[15].addSkills([skills[5], skills[3], skills[4], skills[2]])
  await candidates[16].addSkills([skills[3], skills[4], skills[6], skills[8]])
  await candidates[17].addSkills([skills[3], skills[4], skills[6], skills[9]])
  await candidates[18].addSkills([skills[4], skills[5], skills[6], skills[7]])
  await candidates[19].addSkills([skills[5], skills[3], skills[4], skills[7]])
  await candidates[20].addSkills([skills[3], skills[4], skills[6], skills[5]])
  await candidates[21].addSkills([skills[3], skills[4], skills[6], skills[9]])
  await candidates[22].addSkills([skills[4], skills[5], skills[6], skills[7]])
  await candidates[23].addSkills([skills[5], skills[3], skills[4], skills[8]])
  await candidates[24].addSkills([skills[3], skills[4], skills[6], skills[2]])
  await candidates[25].addSkills([skills[3], skills[4], skills[6], skills[9]])
  await candidates[26].addSkills([skills[5], skills[3], skills[4], skills[7]])
  await candidates[27].addSkills([skills[3], skills[4], skills[6], skills[1]])
  await candidates[28].addSkills([skills[3], skills[4], skills[6], skills[1]])
  await organizations[0].addJobs(jobs[0])
  await organizations[1].addJobs(jobs[1])
  await organizations[2].addJobs(jobs[2])
  await organizations[3].addJobs(jobs[3])
  await organizations[4].addJobs(jobs[4])
  await organizations[5].addJobs(jobs[5])
  await organizations[6].addJobs(jobs[6])
  await organizations[7].addJobs(jobs[7])
  await organizations[8].addJobs(jobs[8])
  await organizations[9].addJobs(jobs[9])
  await organizations[10].addJobs(jobs[10])
  await organizations[11].addJobs(jobs[11])
  await organizations[12].addJobs(jobs[12])
  await organizations[13].addJobs(jobs[13])
  await organizations[14].addJobs(jobs[14])
  await organizations[15].addJobs(jobs[15])
  await organizations[16].addJobs(jobs[16])
  await organizations[17].addJobs(jobs[17])
  await organizations[18].addJobs(jobs[18])
  await organizations[19].addJobs(jobs[19])
  await organizations[20].addJobs(jobs[20])
  await jobs[0].addSkills([skills[0], skills[1], skills[2], skills[3]])
  await jobs[1].addSkills([skills[1], skills[2], skills[4], skills[8]])
  await jobs[2].addSkills([skills[0], skills[3], skills[4], skills[8]])
  await jobs[3].addSkills([skills[0], skills[3], skills[4], skills[8]])
  await jobs[4].addSkills([skills[0], skills[3], skills[4], skills[8]])
  await jobs[5].addSkills([skills[0], skills[3], skills[5], skills[1]])
  await jobs[6].addSkills([skills[0], skills[3], skills[4], skills[1]])
  await jobs[7].addSkills([skills[0], skills[3], skills[5], skills[2]])
  await jobs[8].addSkills([skills[0], skills[3], skills[5], skills[1]])
  await jobs[9].addSkills([skills[7], skills[8], skills[9], skills[10]])
  await jobs[10].addSkills([skills[6], skills[7], skills[8], skills[2]])
  await jobs[11].addSkills([skills[1], skills[3], skills[5], skills[4]])
  await jobs[12].addSkills([skills[0], skills[1], skills[2], skills[5]])
  await jobs[13].addSkills([skills[0], skills[1], skills[7], skills[9]])
  await jobs[14].addSkills([skills[0], skills[1], skills[6], skills[8]])
  await jobs[15].addSkills([skills[0], skills[1], skills[7], skills[9]])
  await jobs[16].addSkills([skills[0], skills[1], skills[6], skills[8]])
  await jobs[17].addSkills([skills[0], skills[1], skills[6], skills[8]])
  await jobs[18].addSkills([skills[0], skills[1], skills[7], skills[9]])
  await jobs[20].addSkills([skills[0], skills[1], skills[6], skills[8]])
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
