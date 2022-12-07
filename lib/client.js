import imageUrlBuilder from '@sanity/image-url'
const sanityClient = require('@sanity/client')


export const client = sanityClient({
    projectId: "mf5rnynb",
    dataset: "production",
    apiVersion:"2022-11-13",
    useCdn: true,
    token: process.env.NEXT_SANITY_TOKEN
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) =>builder.image(source)

