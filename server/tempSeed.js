'use strict'
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
const SOLID_STYLE = 'Solids'
const FLORAL_STYLE = 'Florals'
const PATTERNED_STYLE = 'Patterned'
const usersData = [
  {
    firstName: 'Archie',
    lastName: 'B',
    email: 'archieB@gmail.com',
    password: '123',
  },
  {
    firstName: 'Broo',
    lastName: 'P',
    email: 'brooP@gmail.com',
    password: '123',
  },
  {
    firstName: 'Nadie',
    lastName: 'C',
    email: 'nadieC@gmail.com',
    password: '123',
  },
  {
    firstName: 'Torrie',
    lastName: 'J',
    email: 'torrieJ@gmail.com',
    password: '123',
  },
  {
    firstName: 'Yuhoo',
    lastName: 'M',
    email: 'yohooM@gmail.com',
    password: '123',
  },
  {
    firstName: 'Cinnamon',
    lastName: 'Admin',
    email: 'cinnamonA@gmail.com',
    password: '123',
    isAdmin: true,
  },
]
const masksData = [
  {
    name: 'Wavy Set',
    description:
      'Our 3-pack of reusable face masks are machine washable and made from 100% Organic Quilter’s Cotton.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0851/3262/products/Ear_Loop_Mask_Cotton_Forest_Floor_Set_01_1280x1600_crop_center.progressive.jpg?v=1603733270',
    style: FLORAL_STYLE,
    price: 25,
    inventoryQty: 50,
  },
  {
    name: 'Constellation Set',
    description:
      'Our non-medical Covid-19 masks are made locally in Overland Park, KS with 100% Liberty of London cotton fabric and 100% washed cotton muslin lining.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0851/3262/products/Ear_Loop_Mask_Cotton_Constellation_Set_01_f27daa17-4d1c-4865-92a7-e0302c7218d5_1280x1600_crop_center.progressive.jpg?v=1603733390',
    style: FLORAL_STYLE,
    price: 30,
    inventoryQty: 50,
  },
  {
    name: 'Jersey Set',
    description:
      'Our non-medical Covid-19 masks are made locally in Overland Park, KS with 100% Liberty of London cotton fabric and 100% washed cotton muslin lining.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0851/3262/products/Ear_Loop_Mask_Cotton_Daisy_Set_01_3af429a3-abb2-4e36-b1bf-2df45f65ce74_1280x1600_crop_center.progressive.jpg?v=1600209338',
    style: FLORAL_STYLE,
    price: 27,
    inventoryQty: 50,
  },
  {
    name: 'Gingham Set',
    description:
      'Cotton fabric, Pack of 3. Each mask will come pre-filled with one filter and 2 additional filters.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0851/3262/products/Ear_Loop_Mask_Cotton_Leopard_Set_01_08e65d4c-0a94-4c35-a1f6-e7b1b7aeef14_1280x1600_crop_center.progressive.jpg?v=1601943528',
    style: PATTERNED_STYLE,
    price: 45,
    inventoryQty: 50,
  },
  {
    name: 'Cactus Set',
    description:
      'Our 3-pack of reusable face masks are machine washable and made from 100% Organic Quilter’s Cotton.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0851/3262/products/Ear_Loop_Mask_Cotton_Cactus_Set_01_6847a643-7732-4456-86cf-e2cd356bfd23_800x1000_crop_center.progressive.jpg?v=1600969910',
    style: SOLID_STYLE,
    price: 45,
    inventoryQty: 50,
  },
  {
    name: 'Twilight Set',
    description:
      'Our 3-pack of reusable face masks are machine washable and made from 100% Organic Quilter’s Cotton.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0851/3262/products/Ear_Loop_Mask_Cotton_Twilight_Set_01_e265d1c3-8414-47a9-84da-51520931242c_800x1000_crop_center.progressive.jpg?v=1600208827',
    style: SOLID_STYLE,
    price: 45,
    inventoryQty: 50,
  },
  {
    name: 'Earth Set',
    description:
      'Our 3-pack of reusable face masks are machine washable and made from 100% Organic Quilter’s Cotton.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0851/3262/products/Ear_Loop_Mask_Cotton_Clay_Set_01_ee723418-dae4-4308-a021-3b39c29a304c_800x1000_crop_center.progressive.jpg?v=1600209593',
    style: SOLID_STYLE,
    price: 45,
    inventoryQty: 50,
  },
  {
    name: 'Peace Mask',
    description:
      'Peace Face Covering elastic ear loops (1mm) due to the dying process. \n All silk components use only 100% elongated fibre Mulberry Silk Charmeuse.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0501/1669/products/038-13UMSK1_BLACKTIEDYE_2_1080x.jpg?v=1590025820',
    style: PATTERNED_STYLE,
    price: 15,
    inventoryQty: 50,
  },
  {
    name: 'Tangerine Mask',
    description:
      'Tangerine Face Covering elastic ear loops (1mm) due to the dying process. \n All silk components use only 100% elongated fibre Mulberry Silk Charmeuse.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0501/1669/products/038-13UMSK1_TANGERINETYEDIE_2_900x.jpg?v=1590025849',
    style: PATTERNED_STYLE,
    price: 15,
    inventoryQty: 50,
  },
  {
    name: 'Blue Skies Mask',
    description:
      'Blue Skies Face Covering elastic ear loops (1mm) due to the dying process. \n All silk components use only 100% elongated fibre Mulberry Silk Charmeuse.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0501/1669/products/038-13UMSK1_BLUETYEDIE_2_900x.jpg?v=1590025837',
    style: PATTERNED_STYLE,
    price: 15,
    inventoryQty: 50,
  },
]
const ordersData = [
  {shippingAddress: 'New york city', isSubmitted: true},
  {shippingAddress: 'Edison, NJ', isSubmitted: true},
  {shippingAddress: 'North Carolina', isSubmitted: true},
  {shippingAddress: 'Hawaii', isSubmitted: true},
  {isSubmitted: false}, // this order is for sample cart for a logged in user
]
// const orderDetails = [{}]
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'}),
  // ])
  const [users, masks, orders] = await Promise.all([
    User.bulkCreate(usersData, {returning: true}),
    Mask.bulkCreate(masksData, {returning: true}),
    Order.bulkCreate(ordersData, {returning: true}),
  ])
  //Now connect the orders with users
  await users[0].addOrder(orders[0])
  await users[1].addOrder(orders[1])
  await users[0].addOrder(orders[2])
  await users[0].addOrder(orders[3])
  await users[0].addOrder(orders[4]) // this one is actually the persistent cart for users[0]
  //Now let's add masks to these orders
  await orders[0].addMask(masks[0], {
    through: {
      price: 45,
      quantity: 2,
    },
  })
  await orders[0].addMask(masks[1], {
    through: {
      price: 29,
      quantity: 1,
    },
  })
  await orders[1].addMask(masks[3], {
    through: {
      price: 18,
      quantity: 5,
    },
  })
  await orders[2].addMask(masks[1], {
    through: {
      price: 25,
      quantity: 3,
    },
  })
  await orders[3].addMask(masks[4], {
    through: {
      price: 10,
      quantity: 2,
    },
  })
  await orders[3].addMask(masks[2], {
    through: {
      price: 20,
      quantity: 1,
    },
  })
  // Lastly let's create some temporary cart for first user, users[0]
  await orders[4].addMask(masks[1], {
    through: {
      price: 20,
      quantity: 3,
    },
  })
  await orders[4].addMask(masks[3], {
    through: {
      price: 45,
      quantity: 1,
    },
  })
  // await users[0].addMask(masks[1], {through: {quantity: 3}})
  // await users[0].addMask(masks[3], {through: {quantity: 1}})
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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
// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
