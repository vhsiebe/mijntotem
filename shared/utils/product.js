import totems from '../../data/totems.json' with { type: 'json' }

export const mapProduct = (product) => {
  // Extract unique colors from variant options
  const colors = []
  const sizes = []
  const features = generateFeatures(product.categories?.[0]?.name)
  
  product.variants.forEach(variant => {
    variant.options.forEach(option => {
      if (option.option.title === 'kleur' && !colors.includes(option.value)) {
        colors.push(option.value)
      }
      if (option.option.title === 'maat' && !sizes.includes(option.value)) {
        sizes.push(option.value)
      }
    })
  })
  
  const imagesPerColors = product.images.reduce((acc, image) => {
    colors.forEach(color => {
      if (image.url.toLowerCase().includes(color.toLowerCase()) && image.url.includes("back")) {
        acc[color] = image
      }
    })
    return acc
  }, {})

  return {
    ...product,
    sizes,
    colors,
    features,
    images: product.images,
    imagesPerColors,
    price: product.variants[0].calculated_price.calculated_amount,
    originalPrice: product.variants[0].calculated_price.calculated_amount,
    description: getDescription(product.handle),
  }
}

const generateFeatures = (category) => {
  const features =  []

  features.push({
    title: 'Materiaal',
    description: category === 'Hoodies' ? '80% Katoen, 20% Polyester' : '100% Katoen',
  })
  features.push({
    title: 'Gewicht',
    description: category === 'tshirts' ? '180 g/m2' : '300 g/m2',
  })

  features.push({
    title: 'Wasvoorschrift',
    description: 'Wassen bij 40°C, Binnenstebuiten strijken, niet in droger',
  })

  features.push({
    title: 'Duurzaamheid',
    description: '100% Ecologisch verantwoord',
  })

  features.push({
    title: 'Levering',
    description: '1 tot 2 weken',
  })

  features.push({
    title: 'Veilig betalen',
    description: 'Betaal eenvoudig en veilig via Mollie',
  })

  return features
}

const getDescription = (handle) => {
  const [totemName, product] = handle.split('-')
  const totem = totems[totemName]
  return totem?.[product] || ''
}
  