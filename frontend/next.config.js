module.exports = {
    env: {
        CLOUDINARY: process.env.CLOUDINARY,
        PRESET: process.env.PRESET,
        LOCALHOST: process.env.LOCALHOST,
        STRIPE: process.env.STRIPE,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },

    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
      ) {
        return {
          '/': { page: '/' },
          '/auth/cart': { page: '/auth/cart' },
        }
      },
    
  };