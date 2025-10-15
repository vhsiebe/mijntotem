const MEDUSA_API_URL = "https://backend.mijntotem.be/admin";
const MEDUSA_ADMIN_TOKEN = "sk_fd5313c145a84b8087bcacd3d9be63a7ae49277413d090a10f2714046412c0de";

const headers = {
  Authorization: `Basic ${Buffer.from(`${MEDUSA_ADMIN_TOKEN}:`).toString("base64")}`,
  "Content-Type": "application/json",
};

console.log(headers);
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const productMaterial = {
  Tshirt: "100% ringgesponnen Biologisch Katoen",
  Hoodie: "80% Biologisch Katoen - 20% gerecycleerd Polyester",
  Sweater: "80% Biologisch Katoen - 20% gerecycleerd Polyester",
};

const productPrice = {
  Tshirt: 25.00,
  Hoodie: 45.00,
  Sweater: 45.00,
};

export async function createProducts(totems, colors, variants) {
  Object.values(totems).forEach(async (totem) => {
    if (totem.processed) {
      return;
    }
    const collection = await createCollection(totem.title);
    console.log(collection);
    const collectionId = collection.collection.id;
    for (const variant of variants) {
      const response = await saveProduct(totem, variant, colors, collectionId);
      console.log(response);
    }
  });
}

const saveProduct = async (totem, variant, colors, collectionId) => {
  try {
    const images = productImages(totem.title, variant, colors);
    const response = await fetch(`${MEDUSA_API_URL}/products`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        title: `${totem.title} ${variant}`,
        handle: `${totem.title.toLocaleLowerCase().replace(' ', '_')}-${variant.toLocaleLowerCase().replace(' ', '_')}`,
        description: totem[variant],
        collection_id: collectionId,
        images: images,
        thumbnail: images[0].url,
        status: "published",
        options: [{
          title: "kleur",
          values: colors,
        },
        {
          title: "maat",
          values: sizes,
        }],
        sales_channels: [{
          id: "sc_01JS3WXW6HYMYMFFMNJ6ERVCTK"
        }],
        shipping_profile_id: "sp_01JS3WXEDAZP9C2EQ03W8RGW49",
        material: productMaterial[variant],
        origin_country: "Bangladesh",
        variants: productVariants(totem.title, variant, colors),
      }),
    });

    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

const createCollection = async (totem) => {
  const response = await fetch(`${MEDUSA_API_URL}/collections`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      title: totem,
    }),
  });
  return response.json();
};

function productVariants(totem, variant, colors) {
  const variants = [];
  colors.forEach(color => {
    sizes.forEach(size => {
      variants.push({
        title: `${color} / ${size}`,
        sku: `mijntotem-${totem.toLocaleLowerCase().replace(' ', '_')}-${variant.toLocaleLowerCase().replace(' ', '_')}-${color.toLocaleLowerCase().replace(' ', '_')}-${size.toLocaleLowerCase().replace(' ', '_')}`,
        manage_inventory: false,
        options: {
          kleur: color,
          maat: size,
        },
        prices: [{
          amount: productPrice[variant],
          currency_code: "eur",
        },{
          amount: productPrice[variant],
          currency_code: "eur",
          region_id: "reg_01JS3WXWCY45CX19K5W7NQM0WR",
          rules: {
            region_id: "reg_01JS3WXWCY45CX19K5W7NQM0WR",
          },       
         }],
      });
    });
  });
  return variants;
}

function productImages(totem, variant, colors) {
  const images = [];
  // shuffle colors
  const shuffledColors = colors.sort(() => Math.random() - 0.5);
  for (const color of shuffledColors) {
    images.push({
      url: `https://images.mijntotem.be/${totem.toLocaleLowerCase().replace(' ', '_')}/${variant.toLocaleLowerCase()}-${totem.toLocaleLowerCase().replace(' ', '_')}-${color.toLocaleLowerCase().replace(' ', '_')}-back.jpg`,
    });
    images.push({
      url: `https://images.mijntotem.be/${totem.toLocaleLowerCase().replace(' ', '_')}/${variant.toLocaleLowerCase()}-${totem.toLocaleLowerCase().replace(' ', '_')}-${color.toLocaleLowerCase().replace(' ', '_')}-front.jpg`,
    });
  }
  return images;
}


