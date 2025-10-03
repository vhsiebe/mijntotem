export default defineEventHandler(async (event) => {

  const reviews = [
    {
      id: 1,
      name: "Cindy S.",
      role: "Mama van Gidsen",
      location: "Diepenbeek",
      rating: 5,
      text: "Vlot contact, mooie truien, aanpassingen bespreekbaar. Heel leuk concept. Onze scouts waren aangenaam verrast met hun trui!",
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocLPqpJJTBb8bSFO5zz4nyypKrazxrpAdQtMXxVtVFvFj27YbQ=s36-c-rp-mo-br100",
      link: "https://maps.app.goo.gl/GLs5SWaspGho8zQK7",
    },
    {
      id: 2,
      name: "Jennifer B.",
      role: "Leidster",
      location: "Geel",
      rating: 5,
      text: "Het was een heel fijne ervaring voor het bestellen. Wanneer we als scouts wisten dat we een groepsaankoop gingen doen werd ik heel snel geholpen via whatsapp. De communicatie was heel goed en heel vlot op al onze vragen werd er direct een antwoord gegeven. Vond het zeer fijn ook fijn om dan eerst een vb te krijgen van onze truien voor bestelling. Het was ook heel snel gegaan. Jammer dat het enkel door Bpost niet vlot is gegaan. Maar na het te laten weten aan MijnTotem en een klacht aan Bpost te sturen, was het wel goed gegaan. Ondanks onze kapotte doos door Bpost. We zijn allemaal content van onze hoodies!!!!",
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ88u0mN9gZs1diOmTNtR2L6kLUNcLieFMWywr1n963Ef1Wiw=w72-h72-p-rp-mo-br100",
      link: "https://maps.app.goo.gl/ExL6VLCQp7vHoaxJ6",
    },
  ]

  return {
    reviews,
    total: reviews.length
  }
})
