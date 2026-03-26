export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  dietary: string[];
  popular?: boolean;
};

export type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  request: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
  photo?: string;
  approved: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'guest' | 'member';
};

export type Message = {
  id: string;
  type: 'Inquiry' | 'Newsletter';
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContentSettings = {
  heroTitle: string;
  promoText: string;
  footerNote: string;
  urgencyText: string;
  supportEmail: string;
  announcement: string;
};

export type RestaurantState = {
  content: ContentSettings;
  users: User[];
  menuItems: MenuItem[];
  reservations: Reservation[];
  reviews: Review[];
  messages: Message[];
};

export const ADMIN_CREDENTIALS = {
  email: 'admin@digitquo.com',
  password: 'digitquo@123'
};

export const defaultState: RestaurantState = {
  content: {
    heroTitle: 'Elevated hospitality for guests who notice every detail.',
    promoText: 'Autumn cellar dinner with six-course pairing',
    footerNote: 'Refined dining, private hospitality, and memorable evenings at the waterfront.',
    urgencyText: 'Limited seats available tonight',
    supportEmail: 'reservations@aureliohouse.com',
    announcement: 'Live jazz service on Fridays and Saturdays.'
  },
  users: [
    { id: 'u-admin', firstName: 'Admin', lastName: 'Digitquo', email: ADMIN_CREDENTIALS.email, phone: '+91 22 6800 2148', password: ADMIN_CREDENTIALS.password, role: 'admin' },
    { id: 'u-1', firstName: 'Ananya', lastName: 'Kapoor', email: 'ananya.kapoor@example.com', phone: '+91 98111 45521', password: 'guestpass123', role: 'guest' },
    { id: 'u-2', firstName: 'Rohan', lastName: 'Malik', email: 'rohan.malik@example.com', phone: '+91 98920 88412', password: 'guestpass123', role: 'guest' },
    { id: 'u-3', firstName: 'Sofia', lastName: 'DSouza', email: 'sofia.dsouza@example.com', phone: '+91 99200 31771', password: 'guestpass123', role: 'member' }
  ],
  menuItems: [
    { id: 'm1', name: 'Smoked Lobster Cappelletti', category: 'Starters', price: 1290, tags: ['Chef recommended', 'Signature'], dietary: ['Shellfish'], popular: true, description: 'Delicate pasta, shellfish reduction, citrus beurre blanc, and preserved fennel.' },
    { id: 'm2', name: 'Coal-Roasted Heirloom Carrot', category: 'Starters', price: 760, tags: ['Vegetarian'], dietary: ['Gluten-free'], description: 'Whipped chevre, toasted seeds, saffron honey, and herb ash.' },
    { id: 'm3', name: 'Black Garlic Tenderloin', category: 'Main Course', price: 2280, tags: ['Chef recommended', 'Popular'], dietary: ['Gluten-free'], popular: true, description: 'Grass-fed tenderloin, black garlic jus, confit shallots, and pomme puree.' },
    { id: 'm4', name: 'Charred Market Seabass', category: 'Main Course', price: 1960, tags: ['Signature'], dietary: ['Gluten-free'], popular: true, description: 'Green olive veloute, braised leek hearts, smoked lemon oil.' },
    { id: 'm5', name: 'Forest Truffle Risotto', category: 'Main Course', price: 1680, tags: ['Vegetarian', 'Chef recommended'], dietary: ['Vegetarian'], description: 'Aged carnaroli, shaved truffle, cultured butter, and parmesan foam.' },
    { id: 'm6', name: 'Dark Chocolate Marquise', category: 'Desserts', price: 680, tags: ['Popular'], dietary: ['Contains nuts'], popular: true, description: 'Single-origin chocolate, toasted hazelnut praline, and espresso cream.' },
    { id: 'm7', name: 'Vanilla Bean Mille-Feuille', category: 'Desserts', price: 640, tags: ['Chef recommended'], dietary: ['Vegetarian'], description: 'Crisp pastry, vanilla diplomat, and poached pear compote.' },
    { id: 'm8', name: 'Botanical Citrus Spritz', category: 'Beverages', price: 540, tags: ['Non-alcoholic'], dietary: ['Vegan'], description: 'White tea cordial, citrus oils, botanical tonic, and mint vapor.' },
    { id: 'm9', name: 'Reserve Old Fashioned', category: 'Beverages', price: 920, tags: ['Bar special'], dietary: [], popular: true, description: 'Small-batch bourbon, orange bitters, smoked sugar, and oak essence.' },
    { id: 'm10', name: 'Seven-Course Chef Degustation', category: 'Special Dishes', price: 4200, tags: ['Limited seats', 'Signature'], dietary: ['Chef tasting'], popular: true, description: 'A seasonal progression of the kitchen\'s most refined courses with optional cellar pairing.' }
  ],
  reservations: [
    { id: 'r1', name: 'Ananya Kapoor', email: 'ananya.kapoor@example.com', phone: '+91 98111 45521', date: '2026-03-27', time: '8:00 PM', guests: '2', occasion: 'Anniversary', request: 'Window table if available', status: 'Confirmed' },
    { id: 'r2', name: 'Rohan Malik', email: 'rohan.malik@example.com', phone: '+91 98920 88412', date: '2026-03-28', time: '9:00 PM', guests: '4', occasion: 'Business Dinner', request: 'Quiet corner table', status: 'Pending' },
    { id: 'r3', name: 'Sofia DSouza', email: 'sofia.dsouza@example.com', phone: '+91 99200 31771', date: '2026-03-29', time: '7:30 PM', guests: '3', occasion: 'Birthday', request: 'Vegetarian tasting', status: 'Confirmed' }
  ],
  reviews: [
    { id: 'rev1', name: 'Maya Sethi', rating: 5, comment: 'From the welcome to dessert service, every detail felt deliberate and premium. The black garlic tenderloin was exceptional.', avatar: 'MS', approved: true },
    { id: 'rev2', name: 'Karan Bedi', rating: 5, comment: 'A rare restaurant that feels luxurious without trying too hard. Excellent pacing, thoughtful staff, and a beautiful room.', avatar: 'KB', approved: true },
    { id: 'rev3', name: 'Nina Fernandes', rating: 4, comment: 'Booked for a birthday dinner and the team handled every detail elegantly. The sommelier pairing was especially strong.', avatar: 'NF', approved: false }
  ],
  messages: [
    { id: 'msg1', type: 'Inquiry', name: 'Aarav Shah', email: 'aarav.shah@example.com', phone: '+91 97660 22114', subject: 'Private dining for 16 guests', message: 'Looking for a private room and tasting menu proposal for an executive dinner next month.' },
    { id: 'msg2', type: 'Newsletter', name: 'Newsletter Lead', email: 'guestlist@example.com', phone: '-', subject: 'Newsletter signup', message: 'Requested to receive seasonal menus and event updates.' }
  ]
};

export const galleryItems = ['Candlelit dining room', 'Open-fire kitchen pass', 'Private suite styling', 'Sommelier reserve wall', 'Chef plating finish', 'Terrace evening service', 'Signature cocktail moment', 'Tasting menu presentation', 'Weekend live jazz setup'];

export const faqItems = [
  { question: 'Do you accommodate dietary requests?', answer: 'Yes. Vegetarian, vegan, gluten-free, and celebration-specific requests can be noted during booking and are reviewed before service.' },
  { question: 'Is there a private dining option?', answer: 'Yes. We offer intimate private suites and curated event packages for business hosting, anniversaries, and press dinners.' },
  { question: 'What is your cancellation window?', answer: 'For standard reservations, we request at least 24 hours notice. Private events follow a custom agreement.' },
  { question: 'Do you offer lunch service?', answer: 'Friday through Sunday lunch is available on selected dates alongside seasonal tasting and a la carte menus.' }
];

export const socialItems = [
  { title: '@aureliohouse', caption: 'A Friday night room reset before first seating.' },
  { title: 'Chef\'s pass', caption: 'Final herb finish on the seabass course.' },
  { title: 'Private dining', caption: 'An anniversary setup in the harbour suite.' }
];

export const analyticsData = [52, 74, 68, 88, 96, 72, 85];
export const timeSlots = ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/contact', label: 'Contact' },
  { href: '/reservation', label: 'Reservation' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
  { href: '/admin', label: 'Admin' }
];

