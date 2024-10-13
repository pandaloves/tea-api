let productId = 16;

const products = [
  {
    id: 1,
    name: "Jasmine te",
    image:
      "https://blog.piquelife.com/wp-content/uploads/2020/08/Jasmine-Tea-Benefits-5-Research-Backed-Benefits-of-Jasmine-Tea.png",
    effect:
      "hjälper till att lugna, förbättra mental klarhet och stärka ditt immunförsvar",
    caffeine: "Låg koffein",
    type: "Grönt, svart & vitt",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Matcha",
    image:
      "https://media.post.rvohealth.io/wp-content/uploads/2020/08/matcha-green-tea-732x549-thumbnail.jpg",
    effect:
      "minska risken för flera kroniska sjukdomar, förbättra uppmärksamhet, minne och reaktionstid",
    caffeine: "Medium koffein",
    type: "Grönt",
    categoryId: 1,
  },
  {
    id: 3,
    name: "Yogi te green tea matcha lemon",
    image: "https://www.foodfolder.se/media/5807/img_8874.jpg",
    effect: "Hög koncentration av antioxidanter",
    caffeine: "Låg koffein",
    type: "Grönt",
    categoryId: 1,
  },
  {
    id: 4,
    name: "Longjing te",
    image:
      "https://htgetrid.com/assets/uploads/2018/03/poleznye-svojstva-i-protivopokazanija-chaja-lunczin.jpg",
    effect: "Renar blodet",
    caffeine: "Låg koffein",
    type: "Grönt",
    categoryId: 1,
  },
  {
    id: 5,
    name: "Earl grey",
    image:
      "https://portfoliocoffee.ca/cdn/shop/articles/benefits-of-earl-grey-tea.jpg",
    effect: "Ökad energi",
    caffeine: "Hög koffein",
    type: "Svart",
    categoryId: 2,
  },
  {
    id: 6,
    name: "Chai te/Masala chai",
    image:
      "https://www.thespicehouse.com/cdn/shop/articles/Chai_Masala_Tea_1200x1200.jpg",
    effect: "Fördelar för hjärthälsa",
    caffeine: "Hög koffein",
    type: "Svart (Indiskt)",
    categoryId: 2,
  },
  {
    id: 7,
    name: "Litchi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiG0ICI8xUy0Ju5ok6ZsZ49nnKnJ0LG8iSkg",
    effect: "Välgörande för huden",
    caffeine: "Hög koffein",
    type: "Svart",
    categoryId: 2,
  },
  {
    id: 8,
    name: "Rooibos",
    image: "https://www.thes-traditions.com/img/cms/bienfaits-rooibos.jpg",
    effect: "Innehåller antioxidanter",
    caffeine: "Inget koffein",
    type: "Rött",
    categoryId: 3,
  },
  {
    id: 9,
    name: "Skogsglänta Rooibos",
    image:
      "https://media.delitea.se/product-images/XL/arvid-nordquist-skogsglanta-rooibos-17st-2.jpg",
    effect: "Lugnande",
    caffeine: "Inget koffein",
    type: "Rött",
    categoryId: 3,
  },
  {
    id: 10,
    name: "White Cassis",
    image:
      "https://www.teacultures.com/cache/white-cassis-1_10085/white-cassis-1-800-600-1250-625.jpg",
    effect: "Lugnande",
    caffeine: "Inget koffein",
    type: "Vitt",
    categoryId: 4,
  },
  {
    id: 11,
    name: "Jasmin silver needle",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxmRhyN1GjGMoEycRZfpb9b4ahFBlH_H9Vrg",
    effect: "Lugnande",
    caffeine: "Inget koffein",
    type: "Vitt",
    categoryId: 4,
  },
  {
    id: 12,
    name: "Formosa Jade Oolong te",
    image:
      "https://www.schwarzenbach.ch/wp-content/uploads/2023/06/Tee-Oolong-Formosa-Jade-Dung-Tin.jpg",
    effect: "Förbättrar fettcellernas funktioner",
    caffeine: "Mellan koffein",
    type: "Oolong",
    categoryId: 5,
  },
  {
    id: 13,
    name: "Pukka night time",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF3DI1j9GDEJk69X6MyCrCmqXla1B7tlce6w",
    effect: "Gynnar nattsömnen",
    caffeine: "Inget koffein",
    type: "Örtte",
    categoryId: 5,
  },
  {
    id: 14,
    name: "Ginseng Oolongte",
    image:
      "https://teasenz.eu/cdn/shop/files/gingsheng.jpg?v=1692527694&width=416",
    effect: "Bra för magen",
    caffeine: "Mellan koffein",
    type: "Oolong",
    categoryId: 5,
  },
  {
    id: 15,
    name: "Krysantemumte",
    image:
      "https://thumbs.dreamstime.com/b/kinesiskt-krysantemumte-p%C3%A5-gammalt-tr%C3%A4-57014906.jpg",
    effect: "Bra för en rosslig hals",
    caffeine: "Inget koffein",
    type: "Örtte",
    categoryId: 5,
  },
];

const categoryHandler = require("../domain/category_handler.js");

exports.create = (product) => {
  const categories = categoryHandler.readAll();
  const category = categories.find((cat) => cat.id == product.categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  product = { id: productId++, ...product };
  products.push(product);

  category.products.push(product);

  return product;
};

exports.readAll = () => {
  return products;
};

exports.read = (id) => {
  return products.find((product) => product.id == id);
};

exports.update = (id, product) => {
  const savedProduct = products.find((speProduct) => speProduct.id == id);
  if (!savedProduct) return null;

  const categories = categoryHandler.readAll(); 

  if (product.hasOwnProperty("name")) {
    savedProduct.name = product.name;
  }
  if (product.hasOwnProperty("image")) {
    savedProduct.image = product.image;
  }
  if (product.hasOwnProperty("effect")) {
    savedProduct.effect = product.effect;
  }
  if (product.hasOwnProperty("type")) {
    savedProduct.type = product.type;
  }
  if (product.hasOwnProperty("caffeine")) {
    savedProduct.caffeine = product.caffeine;
  }

  if (product.hasOwnProperty("categoryId")) {
    const oldCategory = categories.find(
      (cat) => cat.id == savedProduct.categoryId
    );
    const newCategory = categories.find((cat) => cat.id == product.categoryId);

    if (oldCategory && newCategory && oldCategory.id !== newCategory.id) {
      oldCategory.products = oldCategory.products.filter(
        (prod) => prod.id !== savedProduct.id
      );

      newCategory.products.push(savedProduct);
      savedProduct.categoryId = product.categoryId;
    }
  }

  return savedProduct;
};

exports.delete = (id) => {
  const indx = products.findIndex((product) => product.id == id);
  if (indx === -1) return null;

  const deletedProduct = products.splice(indx, 1)[0];

  const categories = categoryHandler.readAll();

  const category = categories.find(
    (cat) => cat.id == deletedProduct.categoryId
  );
  if (category) {
    category.products = category.products.filter(
      (prod) => prod.id !== deletedProduct.id
    );
  }

  return deletedProduct;
};
