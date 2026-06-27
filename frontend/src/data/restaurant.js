export const RESTAURANT = {
  name: 'MBOA Restaurant',
  tagline: 'Cuisine Camerounaise & Africaine · Chessy',
  address: '3 Rue d\'Orsonville, 77700 Chessy',
  phone: '07 53 81 17 30',
  email: 'bouyesaturnin@yahoo.fr',
  hours: {
    'Tous les jours': '12h00 – 00h00 (minuit)',
  },
  menu: {
    entrees: [
      {
        id: 'e1',
        name: 'Ailes de Poulet',
        price: 12,
        desc: 'Ailes de poulet marinées aux épices africaines, accompagnées de frites de plantains croustillantes',
        tags: ['sans gluten'],
        allergens: ['volaille'],
      },
    ],
    plats: [
      {
        id: 'p1',
        name: 'Ailes de Poulet + Frites de Plantains',
        price: 16,
        desc: 'Ailes de poulet marinées et grillées aux épices du terroir camerounais, servies avec des frites de plantains maison',
        tags: ['sans gluten'],
        allergens: ['volaille'],
      },
      {
        id: 'p2',
        name: 'Ndolé + Bâton de Manioc',
        price: 18,
        desc: 'Plat emblématique camerounais à base de feuilles de ndolé mijotées aux arachides, préparé au choix avec du poisson fumé ou de la viande de bœuf. Servi avec du bâton de manioc traditionnel.',
        tags: [],
        allergens: ['arachides', 'poisson'],
      },
      {
        id: 'p3',
        name: 'Taro à la Sauce Jaune',
        price: 15,
        desc: 'Taro cuit à la perfection, nappé d\'une sauce jaune onctueuse aux épices africaines',
        tags: ['végétarien', 'sans gluten'],
        allergens: [],
      },
      {
        id: 'p4',
        name: 'Poisson Braisé + Frites de Plantains',
        price: 20,
        desc: 'Poisson frais braisé au feu de bois, assaisonné d\'épices et d\'herbes africaines, accompagné de frites de plantains',
        tags: ['sans gluten'],
        allergens: ['poisson'],
      },
      {
        id: 'p5',
        name: 'Héro + Watafoufou',
        price: 18,
        desc: 'Plat festif originaire du Sud-Ouest Cameroun, préparé à partir de feuilles d\'Eru (Okok), de waterleafs, de viande de bœuf, de poisson séché et de crevettes séchées. Un plat convoité, servi lors des grandes occasions — simple dans ses ingrédients, extraordinaire en saveurs !',
        tags: ['sans gluten'],
        allergens: ['poisson', 'crustacés'],
      },
    ],
    desserts: [
      {
        id: 'd1',
        name: 'Beignets Maison',
        price: 6,
        desc: 'Beignets moelleux faits maison, légèrement sucrés',
        tags: ['végétarien'],
        allergens: ['gluten', 'œufs', 'lait'],
      },
    ],
    boissons: [
      {
        id: 'b1',
        name: 'Eau Minérale',
        price: 3,
        desc: 'Plate ou gazeuse',
        tags: ['vegan', 'sans gluten'],
        allergens: [],
      },
      {
        id: 'b2',
        name: 'Jus de Bissap',
        price: 5,
        desc: 'Jus d\'hibiscus maison, légèrement sucré et rafraîchissant',
        tags: ['vegan', 'sans gluten'],
        allergens: [],
      },
      {
        id: 'b3',
        name: 'Jus de Gingembre',
        price: 5,
        desc: 'Jus de gingembre frais, tonique et épicé',
        tags: ['vegan', 'sans gluten'],
        allergens: [],
      },
      {
        id: 'b4',
        name: 'Boissons Africaines',
        price: 5,
        desc: 'Sélection de boissons africaines — demandez notre carte du moment',
        tags: ['vegan'],
        allergens: [],
      },
    ],
  },
}

export const MENU_CATEGORIES = [
  { key: 'entrees', label: 'Entrées' },
  { key: 'plats', label: 'Plats' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'boissons', label: 'Boissons' },
]

export const DIETARY_FILTERS = [
  { key: 'all', label: 'Tout' },
  { key: 'végétarien', label: '🌿 Végétarien' },
  { key: 'vegan', label: '🌱 Vegan' },
  { key: 'sans gluten', label: '🚫 Sans Gluten' },
]
