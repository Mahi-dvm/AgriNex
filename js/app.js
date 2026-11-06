/**
 * AgriNex Application Engine
 * Implements strict 20-screen UI/UX navigation, comprehensive localization,
 * verified multi-step farmer onboarding, and synchronized cross-flow state.
 */

// Global State
const state = {
  currentScreen: 1,
  language: 'en', // Default language is English (can be changed to te, ta, kn, ml)
  farmerRegStep: 'mobile', // 'mobile' | 'otp' | 'details'
  tempPhone: '',
  farmer: {
    name: 'Mahendra',
    farmName: 'Mahendra Organic Farms',
    village: 'Tenali',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    crops: 'Tomatoes, Chillies, Greens',
    location: 'Guntur, Andhra Pradesh (4.5 Acres)',
    phone: '+91 98765 43210',
    bank: 'SBI A/c **** 4102'
  },
  customer: {
    name: '',
    phone: '',
    address: '',
    addressLine: '',
    area: '',
    district: '',
    state: '',
    pincode: '',
    registered: false
  },
  products: [
    {
      id: 1,
      names: {
        en: 'Fresh Country Tomatoes',
        te: 'తాజా దేశీ టమోటాలు',
        hi: 'ताज़ा देसी टमाटर',
        ta: 'புதிய நாட்டு தக்காளி',
        kn: 'ತಾಜಾ ನಾಡು ಟೊಮ್ಯಾಟೊಗಳು',
        ml: 'പുതിയ നാടൻ തക്കാളി'
      },
      category: 'vegetables',
      price: 20,
      unit: 'kg',
      stock: 50,
      farmer: 'Mahendra',
      location: 'Guntur, AP',
      distance: '18 km away',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
      badge: {
        en: 'Harvested Today',
        te: 'ఈరోజు తాజా పంట',
        hi: 'आज की ताज़ा फ़सल',
        ta: 'இன்றைய அறுவடை',
        kn: 'ಇಂದಿನ ಸುಗ್ಗಿ',
        ml: 'ഇന്നത്തെ വിളവെടുപ്പ്'
      },
      description: {
        en: 'Naturally grown and harvested fresh from the farm today. Crisp, juicy, and rich in natural flavor.',
        te: 'ఈరోజు పొలం నుండి సహజంగా పండించి తాజాగా కోసిన పంట. సహజ రుచితో నిండిన నాణ్యమైన ఉత్పత్తులు.',
        hi: 'आज खेत से ताज़ा काटी गई प्राकृतिक उपज। कुरकुरी, रसदार और शुद्ध प्राकृतिक स्वाद से भरपूर।',
        ta: 'இன்று பண்ணையில் இருந்து இயற்கை முறையில் அறுவடை செய்யப்பட்டது. புதிய சுவை மற்றும் தரம் நிறைந்தது.',
        kn: 'ಇಂದು ಹೊಲದಿಂದ ನೈಸರ್ಗಿಕವಾಗಿ ಕೊಯ್ಲು ಮಾಡಿದ ತಾಜಾ ಬೆಳೆ. ನೈಸರ್ಗಿಕ ರುಚಿ ಮತ್ತು ಗುಣಮಟ್ಟದಿಂದ ಕೂಡಿದೆ.',
        ml: 'ഇന്ന് തോട്ടത്തിൽ നിന്ന് പ്രകൃതിദത്തമായി വിളവെടുത്ത പുതിയ ഉൽപ്പന്നം. സ്വാഭാവിക രുചിയും ഗുണമേന്മയും.'
      },
      soldOut: false
    },
    {
      id: 2,
      names: {
        en: 'Organic Spinach',
        te: 'సేంద్రీయ పాలకూర',
        hi: 'जैविक पालक',
        ta: 'இயற்கை பசலைக்கீரை',
        kn: 'ಸಾವಯವ ಪಾಲಕ್',
        ml: 'ഓർഗാനിക് ചീര'
      },
      category: 'leafy',
      price: 15,
      unit: 'bunch',
      stock: 35,
      farmer: 'Mahendra',
      location: 'Guntur, AP',
      distance: '18 km away',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
      badge: {
        en: 'Chemical Free',
        te: 'రసాయన రహితం',
        hi: 'रसायन मुक्त',
        ta: 'இரசாயனமற்றது',
        kn: 'ರಾಸಾಯನಿಕ ಮುಕ್ತ',
        ml: 'രാസവസ്തു രഹിതം'
      },
      description: {
        en: 'Crisp green spinach leaves packed with iron and vitamins. 100% pesticide-free, grown with organic manure.',
        te: 'ఐరన్, విటమిన్లతో కూడిన తాజా పాలకూర. రసాయనాలు లేకుండా సేంద్రీయ ఎరువులతో పండించిన పంట.',
        hi: 'आयरन और विटामिन से भरपूर ताज़ा हरी पालक। जैविक खाद से उगाई गई शत-प्रतिशत रसायन मुक्त।',
        ta: 'இரும்புச்சத்து மற்றும் வைட்டமின்கள் நிறைந்த புதிய பசலைக்கீரை. பூச்சிக்கொல்லி இல்லாத இயற்கை விளைச்சல்.',
        kn: 'ಕಬ್ಬಿಣ ಮತ್ತು ಜೀವಸತ್ವಗಳಿಂದ ಸಮೃದ್ಧವಾಗಿರುವ ತಾಜಾ ಪಾಲಕ್. ನೈಸರ್ಗಿಕ ಗೊಬ್ಬರ ಬಳಸಿ ಬೆಳೆದ ರಾಸಾಯನಿಕ ಮುಕ್ತ ಬೆಳೆ.',
        ml: 'ഇരുമ്പും വിറ്റാമിനുകളും ധാരാളമുള്ള പച്ച ചീര. ജൈവവളം ഉപയോഗിച്ച് കൃഷി ചെയ്ത രാസവസ്തു രഹിത വിളവ്.'
      },
      soldOut: false
    },
    {
      id: 3,
      names: {
        en: 'Crisp Green Chillies',
        te: 'తాజా పచ్చిమిర్చి',
        hi: 'ताज़ा हरी मिर्च',
        ta: 'புதிய பச்சை மிளகாய்',
        kn: 'ತಾಜಾ ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ',
        ml: 'പുതിയ പച്ചമുളക്'
      },
      category: 'vegetables',
      price: 40,
      unit: 'kg',
      stock: 20,
      farmer: 'Ramesh Naidu',
      location: 'Warangal, TS',
      distance: '32 km away',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
      badge: {
        en: 'Fresh & Spicy',
        te: 'తాజా ఘాటైన పంట',
        hi: 'ताज़ी और तीखी',
        ta: 'புதிய காரம்',
        kn: 'ತಾಜಾ ಖಾರ',
        ml: 'പുതിയ എരിവ്'
      },
      description: {
        en: 'Fiery and fresh green chillies directly picked this morning. Excellent aroma and sharp taste for daily cooking.',
        te: 'ఈ ఉదయం కోసిన ఘాటైన తాజా పచ్చిమిర్చి. వంటకాలకు అద్భుతమైన రుచి, సువాసన అందిస్తుంది.',
        hi: 'आज सुबह तोड़ी गई ताज़ी और तीखी हरी मिर्च। दैनिक खाना पकाने के लिए बेहतरीन स्वाद और खुशबू।',
        ta: 'இன்று காலை பறிக்கப்பட்ட காரமான புதிய பச்சை மிளகாய். சமையலுக்கு அருமையான சுவையும் மணமும் தரும்.',
        kn: 'ಇಂದು ಬೆಳಿಗ್ಗೆ ಕೊಯ್ಲು ಮಾಡಿದ ತಾಜಾ ಖಾರದ ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ. ಅಡುಗೆಗೆ ಅತ್ಯುತ್ತಮ ಸುವಾಸನೆ ಮತ್ತು ಖಾರ ನೀಡುತ್ತದೆ.',
        ml: 'ഇന്ന് രാവിലെ പറിച്ചെടുത്ത എരിവുള്ള പുതിയ പച്ചമുളക്. ദൈനംദിന പാചകത്തിന് മികച്ച രുചിയും മണവും.'
      },
      soldOut: false
    },
    {
      id: 4,
      names: {
        en: 'Fresh Amaranth Leaves',
        te: 'తాజా తోటకూర',
        hi: 'ताज़ा चौलाई साग',
        ta: 'புதிய தண்டுக் கீரை',
        kn: 'ತಾಜಾ ದಂಟು ಸೊಪ್ಪು',
        ml: 'പുതിയ തണ്ട് ചീര'
      },
      category: 'leafy',
      price: 18,
      unit: 'bunch',
      stock: 45,
      farmer: 'Kiran Kumar',
      location: 'Kurnool, AP',
      distance: '45 km away',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
      badge: {
        en: 'Farm Fresh',
        te: 'పొలం నుండి తాజా',
        hi: 'खेत से ताज़ा',
        ta: 'பண்ணை பசுமை',
        kn: 'ಹೊಲದ ತಾಜಾ',
        ml: 'തോട്ടത്തിലെ പുതിയത്'
      },
      description: {
        en: 'Tender and nutrient-rich amaranth leaves harvested from local fertile soils. Freshly bundled for your kitchen.',
        te: 'సారవంతమైన నేలల్లో పండిన లేత తోటకూర. పోషకాలు మెండుగా ఉన్న ఆరోగ్యకరమైన తాజా ఆకుకూర.',
        hi: 'उपजाऊ मिट्टी में उगाई गई कोमल और पौष्टिक चौलाई। आपकी रसोई के लिए ताज़ा बंडल में उपलब्ध।',
        ta: 'வளமான மண்ணில் விளைந்த ஊட்டச்சத்துக்கள் நிறைந்த இளந்தண்டுக் கீரை. பண்ணையிலிருந்து நேரடியாக.',
        kn: 'ಫಲವತ್ತಾದ ಮಣ್ಣಿನಲ್ಲಿ ಬೆಳೆದ ಪೌಷ್ಟಿಕಾಂಶ ಸಮೃದ್ಧ ತಾಜಾ ದಂಟು ಸೊಪ್ಪು. ಅಡುಗೆಮನೆಗೆ ತಾಜಾ ಕಟ್ಟುಗಳು.',
        ml: 'ഫലഭൂയിഷ്ഠമായ മണ്ണിൽ വിളഞ്ഞ പോഷകസമൃദ്ധമായ തണ്ട് ചീര. തോട്ടത്തിൽ നിന്ന് നേരിട്ട് അടുക്കളയിലേക്ക്.'
      },
      soldOut: false
    },
    {
      id: 5,
      names: {
        en: 'Fresh Coriander',
        te: 'తాజా కొత్తిమీర',
        hi: 'ताज़ा हरा धनिया',
        ta: 'புதிய கொத்தமல்லி',
        kn: 'ತಾಜಾ ಕೊತ್ತಂಬರಿ',
        ml: 'പുതിയ മല്ലിയില'
      },
      category: 'leafy',
      price: 10,
      unit: 'bunch',
      stock: 60,
      farmer: 'Srinivas Rao',
      location: 'Rangareddy, TS',
      distance: '12 km away',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80',
      badge: {
        en: 'Aromatic',
        te: 'సువాసన భరితం',
        hi: 'सुगंधित ताज़ा',
        ta: 'நறுமணம்',
        kn: 'ಸುವಾಸನೆ',
        ml: 'സുഗന്ധം'
      },
      description: {
        en: 'Strong aroma and tender leaves, washed and bundled right after morning harvesting. Perfect seasoning for Indian curries.',
        te: 'గాఢమైన సువాసన గల లేత కొత్తిమీర. ఉదయం కోసిన వెంటనే శుభ్రపరిచి సిద్ధం చేసిన తాజా కట్టలు.',
        hi: 'तीव्र खुशबू और कोमल पत्तियों वाला ताज़ा हरा धनिया। भारतीय व्यंजनों में स्वाद और महक बढ़ाने के लिए उत्तम।',
        ta: 'அற்புதமான நறுமணம் கொண்ட புதிய கொத்தமல்லி தழை. இந்திய சமையலுக்கு ஏற்ற அருமையான சுவை.',
        kn: 'ಉತ್ತಮ ಸುವಾಸನೆ ಹೊಂದಿರುವ ತಾಜಾ ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು. ಸಾಂಬಾರ್ ಮತ್ತು ಅಡುಗೆಗಳ ಪರಿಮಳ ಹೆಚ್ಚಿಸಲು ಪರಿಪೂರ್ಣ.',
        ml: 'നല്ല സുഗന്ധമുള്ള പുതിയ മല്ലിയില. കറികൾക്ക് മികച്ച രുചിയും മണവും നൽകാൻ അനുയോജ്യം.'
      },
      soldOut: false
    }
  ],
  cart: [
    { productId: 1, quantity: 2 }
  ],
  orders: [
    {
      id: 'RD1001',
      customerName: 'Priya',
      customerPhone: '+91 91234 56789',
      address: 'Flat 402, Green Acres, Madhapur, Hyderabad',
      item: 'Fresh Country Tomatoes',
      quantity: '2 kg',
      price: 40,
      deliveryFee: 30,
      total: 70,
      status: 'Farmer Accepted',
      date: 'Today, 08:30 AM'
    }
  ],
  pendingProduct: {
    names: {
      en: 'Fresh Country Tomatoes',
      te: 'à°¤à°¾à°œà°¾ à°¦à±‡à°¶à±€ à°Ÿà°®à±‹à°Ÿà°¾à°²à±',
      hi: 'à¤¤à¤¾à¤œà¤¼à¤¾ à¤¦à¥‡à¤¸à¥€ à¤Ÿà¤®à¤¾à¤Ÿà¤°',
      ta: 'à®ªà¯à®¤à®¿à®¯ à®¨à®¾à®Ÿà¯à®Ÿà¯ à®¤à®•à¯à®•à®¾à®³à®¿',
      kn: 'à²¤à²¾à²œà²¾ à²¨à²¾à²¡à³ à²Ÿà³Šà²®à³à²¯à²¾à²Ÿà³Šà²—à²³à³',
      ml: 'à´ªàµà´¤à´¿à´¯ à´¨à´¾à´Ÿàµ» à´¤à´•àµà´•à´¾à´³à´¿'
    },
    category: 'vegetables',
    quantity: 50,
    price: 20,
    unit: 'kg',
    farmer: 'Mahendra',
    location: 'Guntur, AP',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
  },
  currentProductDetailId: 1,
  activeFilter: 'all',
  livePrototypeUrl: 'https://agrinex-demo.web.app',
  deliveryPartner: {
    name: 'Ramesh Kumar',
    phone: '+91 94400 12345',
    vehicle: 'Hero Electric (TS09 EQ 4412)',
    rating: '4.9 ★ (148 trips)',
    isOnline: true,
    todayCompletedCount: 5,
    todayEarnings: 275,
    pendingRequestId: 'RD1001',
    activeDeliveryId: null,
    rejectedRequestIds: [],
    recentActivity: [
      { id: 'RD0998', destination: 'Madhapur', items: '3 items', earnings: 45, time: '10:15 AM', status: 'Delivered' },
      { id: 'RD0995', destination: 'Hitec City', items: '2 items', earnings: 50, time: '09:30 AM', status: 'Delivered' },
      { id: 'RD0991', destination: 'Kondapur', items: '4 items', earnings: 60, time: '08:45 AM', status: 'Delivered' }
    ]
  },
  currentDeliveryDetailOrderId: 'RD1001'
};

// Strict 22-Screen Metadata Directory (Screens 1 to 22 in Exact Sequence)
const screenCatalog = [
  { id: 1, name: 'Splash', flow: 'Onboarding' },
  { id: 2, name: 'Language Selection', flow: 'Onboarding' },
  { id: 3, name: 'Welcome', flow: 'Onboarding' },
  { id: 4, name: 'Farmer Login / Sign Up', flow: 'Farmer Flow' },
  { id: 5, name: 'Farmer Dashboard', flow: 'Farmer Flow' },
  { id: 6, name: 'Add Product by Photo', flow: 'Farmer Flow' },
  { id: 7, name: 'Voice Add Product', flow: 'Farmer Flow' },
  { id: 8, name: 'Product Preview / Publish', flow: 'Farmer Flow' },
  { id: 9, name: 'My Products', flow: 'Farmer Flow' },
  { id: 10, name: 'Farmer Orders', flow: 'Farmer Flow' },
  { id: 11, name: 'Customer Home', flow: 'Customer Flow' },
  { id: 12, name: 'Voice Search', flow: 'Customer Flow' },
  { id: 13, name: 'Product Listing / Search', flow: 'Customer Flow' },
  { id: 14, name: 'Product Details', flow: 'Customer Flow' },
  { id: 15, name: 'Shopping Cart', flow: 'Customer Flow' },
  { id: 16, name: 'Checkout', flow: 'Customer Flow' },
  { id: 17, name: 'Order Confirmation', flow: 'Customer Flow' },
  { id: 18, name: 'Track Order', flow: 'Customer Flow' },
  { id: 19, name: 'Farmer Profile', flow: 'Farmer Flow' },
  { id: 20, name: 'Customer Profile', flow: 'Customer Flow' },
  { id: 21, name: 'Delivery Partner Order Notification', flow: 'Delivery Partner Flow' },
  { id: 22, name: 'Delivery Partner Home', flow: 'Delivery Partner Flow' }
];

// Comprehensive Single-Language Dictionaries (NO mixed languages or bracketed text)
const i18n = {
  en: {
    appName: 'AgriNex',
    tagline: 'Connecting Farms. Delivering Freshness.',
    splashTagline: 'From Farm to Your Home',
    splashSub: 'Connecting Farmers Directly with Consumers',
    continueToLang: 'Continue to Language Selection',
    continue: 'Continue',
    back: 'Back',
    close: 'Close',
    langSelectionTitle: 'Select Your Language',
    langSelectionSub: 'Choose your preferred language for a localized farm-to-table experience.',
    directMarketplaceBadge: '100% Direct Farmer to Consumer Marketplace',
    iamFarmer: 'I’m a Farmer',
    iamFarmerSub: 'List fresh harvest, set your price & sell directly',
    iamCustomer: 'I’m a Customer',
    iamCustomerSub: 'Buy farm-fresh vegetables & fruits from local growers',
    exploreLiveProto: 'Explore Live Prototype',
    farmerRegTitle: 'Farmer Registration',
    step1Of3: 'Step 1 of 3',
    step2Of3: 'Step 2 of 3',
    step3Of3: 'Step 3 of 3',
    mobileVerification: 'Mobile Verification',
    verifyPhone: 'Verify Phone',
    autoFillDemoOtp: 'Auto-fill Demo Code (1234)',
    selectState: 'Select State',
    mobileStepHeader: 'Enter Mobile Number',
    mobileStepSub: 'Enter your 10-digit mobile number to get started.',
    mobileInputLabel: 'Mobile Number',
    sendCodeBtn: 'Send Code',
    otpStepHeader: 'Verify Phone Number',
    otpStepSub: 'Enter the 4-digit code sent to your mobile.',
    otpSimulationNotice: 'Prototype Demo Simulation: Demo OTP is 1234. No SMS sent.',
    verifyBtn: 'Verify & Continue',
    resendCode: 'Resend Code',
    profileSetupTitle: 'Farmer Profile Setup',
    profileSetupSub: 'Tell us about your farm so local customers can discover your fresh produce.',
    fullNameLabel: 'Full Name (Required)',
    farmNameLabel: 'Farm Name (Optional)',
    villageLabel: 'Village / Town (Required)',
    districtLabel: 'District (Required)',
    stateLabel: 'State (Required)',
    cropsLabel: 'Farming Type / Crops Grown (Required)',
    farmLocationLabel: 'Farm Location / Acreage (Optional)',
    saveAndContinue: 'Save & Continue',
    errValidPhone: 'Please enter a valid 10-digit mobile number.',
    errInvalidOtp: 'Invalid verification code. Please enter demo code 1234.',
    errFillRequired: 'Please fill in all required fields (Full Name, Village, District, State, and Crops Grown).',
    speakToAddProduce: 'Speak to Add Produce',
    speakToAddSub: 'Say crop, weight and your price',
    myProducts: 'My Products',
    myOrders: 'My Orders',
    addByPhoto: 'Add by Photo',
    earnings: 'Earnings',
    mandiRates: 'Mandi Market Rate Today',
    mandiRatesSub: 'Tomato: ₹20-22/kg • Spinach: ₹15/bunch • Clear harvest weather (31°C)',
    takePhotoOrGallery: 'Take Photo or Choose from Gallery',
    clickToSimulatePhoto: 'Click to simulate camera capture of harvest',
    produceName: 'Produce Name',
    quantityKg: 'Quantity (kg)',
    pricePerKg: 'Price per kg (₹)',
    previewListing: 'Preview Listing',
    voiceAddTitle: 'Voice Add Produce',
    tapAndSpeak: 'Tap & Speak',
    voiceExampleHint: 'Say for example:',
    voiceExampleText: '“I have 50 kilograms of tomatoes. Rate 20 rupees per kilogram.”',
    parsedListing: 'Parsed Listing Details:',
    confirmListing: 'Confirm Listing',
    editDetails: 'Edit Details',
    publishToMarketplace: 'Publish to Marketplace',
    productPreviewPublish: 'Product Preview / Publish',
    stockLabel: 'Stock:',
    farmerLabel: 'Farmer:',
    availableStock: 'Available',
    deliveringTo: 'Delivering To',
    searchPlaceholder: 'Search farm fresh produce...',
    freshToday: 'Fresh Today',
    directFarmRates: 'Direct Farm Rates',
    categories: 'Categories',
    catAll: 'All',
    catVeg: 'Vegetables',
    catLeafy: 'Leafy Greens',
    catFruits: 'Fruits',
    catGrains: 'Grains',
    voiceSearchTitle: 'Voice Search',
    voiceSearchProduce: 'Voice Search Produce',
    voiceSearchSub: 'Say the name of any vegetable, leafy green, or fruit.',
    trySaying: 'Try saying one of these:',
    chipSpinach: 'Spinach',
    chipAmaranth: 'Amaranth',
    chipCoriander: 'Coriander',
    chipTomato: 'Tomato',
    listeningSpeakProduce: 'Listening... Speak produce name',
    recognizedSearchQuery: 'Recognized Produce Search Query',
    searchBtn: 'Search',
    cancelBtn: 'Cancel',
    productListingTitle: 'Product Listing / Search',
    nearbyFilter: 'Nearby (< 25 km)',
    priceLowHigh: 'Price: Low to High',
    availableNow: 'Available Now',
    filteredNearby: 'Filtered: Nearby farms within 25 km',
    filteredPriceLow: 'Filtered: Lowest price first',
    filteredInStock: 'Filtered: In Stock only',
    productDetailsTitle: 'Product Details',
    quantityUnitLabel: 'Quantity (kg/bunch):',
    adjustQuantity: 'Adjust quantity',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    billBreakdown: 'Bill Breakdown',
    itemsSubtotal: 'Items Subtotal',
    deliveryFee: 'Delivery Fee',
    totalToPay: 'Total to Pay',
    proceedToCheckout: 'Proceed to Checkout',
    checkoutTitle: 'Checkout',
    deliveryAddress: 'Delivery Address',
    editAddress: 'Edit Address',
    orderItems: 'Order Items',
    grandTotal: 'Grand Total',
    paymentMethod: 'Payment Method (Demo)',
    cashOnDelivery: 'Cash on Delivery',
    codSub: 'Pay cash when produce is delivered',
    upiDemo: 'UPI / QR (Demo Simulation)',
    upiSub: 'Google Pay, PhonePe, Paytm',
    placeOrder: 'Place Order',
    backToCart: 'Back to Cart',
    orderConfirmed: 'Order Placed Successfully!',
    orderConfirmedSub: 'The local farmer has received your harvest request.',
    orderIdLabel: 'Order ID:',
    estDeliveryLabel: 'Estimated Delivery:',
    paymentLabel: 'Payment:',
    estDeliveryVal: 'Today within 3 hours',
    trackOrder: 'Track Order',
    continueShopping: 'Continue Shopping',
    orderStatusTitle: 'Order Status',
    deliveryProgress: 'Delivery Progress',
    advanceDeliveryStatus: 'Advance Delivery Status (Simulation Test)',
    farmerProfileTitle: 'Farmer Profile',
    customerProfileTitle: 'Customer Profile',
    verifiedDirectFarmer: 'Verified Direct Farmer',
    profileDetailsTitle: 'Profile Details',
    locationFarmDetails: 'Location / Farm Details',
    bankAccountPayouts: 'Bank Account for Payouts',
    upcomingFeature: 'Upcoming Feature',
    demoBankAccount: 'Demo Bank Account: State Bank of India **** 4102',
    saveChanges: 'Save Changes',
    switchToCustomer: 'Switch to Customer App',
    switchToFarmer: 'Switch to Farmer Portal',
    logout: 'Logout',
    verifiedCustomerBadge: 'AgriNex Verified Customer',
    personalDetails: 'Personal Details',
    saveInfo: 'Save Information',
    orderHistory: 'Order History',
    deploymentUrl: 'Deployment URL',
    openUrl: 'Open URL',
    protoModalDesc: 'Configurable URL placeholder for your public deployed prototype.',
    msgPublished: 'Produce listing published successfully!',
    confirmDeleteListing: 'Delete this product listing?',
    msgAddedToCart: 'Added to cart!',
    msgCartEmpty: 'Cart is empty. Add produce first.',
    msgProfileUpdated: 'Profile updated successfully!',
    msgCustomerProfileUpdated: 'Customer Profile updated successfully!',
    showAll: 'Show All',
    noProduceFound: 'No produce found.',
    noOrdersReceived: 'No customer orders received yet.',
    noProductsListed: 'No products listed yet.',
    reactivate: 'Reactivate',
    soldOutBtn: 'Sold Out',
    deleteBtn: 'Delete',
    viewBtn: 'View',
    addBtn: '+ Add',
    navHome: 'Home',
    navProducts: 'Products',
    navOrders: 'Orders',
    navProfile: 'Profile',
    navCart: 'Cart',
    navCategories: 'Categories',
    step1Placed: 'Order Placed',
    step2Accepted: 'Farmer Accepted',
    step3Preparing: 'Preparing & Packing',
    step4Ready: 'Ready for Pickup',
    step5Out: 'Out for Delivery',
    step6Delivered: 'Delivered',
    step1Sub: 'Customer placed direct farm order',
    step2Sub: 'Farmer confirmed harvest availability',
    step3Sub: 'Fresh produce cleaned & boxed',
    step4Sub: 'Awaiting local delivery rider',
    step5Sub: 'Rider en route',
    step6Sub: 'Fresh harvest at your doorstep',
    customerSetupTitle: 'Customer Profile Setup',
    customerSetupSub: 'Enter your delivery details to browse and order fresh farm produce directly.',
    deliveryAddressHouse: 'Delivery Address / House No. (Required)',
    areaTownLabel: 'Village / Town / Area (Required)',
    pincodeLabel: 'PIN Code (Required)',
    errValidPincode: 'Please enter a valid 6-digit PIN code.',
    errFillRequiredCust: 'Please fill in all required customer details.',
    confirmDeliveryLocation: 'Confirm Delivery Location',
    confirmDeliveryLocationMsg: 'I confirm this delivery address is accurate',
    deliveryInstructions: 'Delivery Instructions (Optional)',
    saveAddress: 'Update Address',
    errAddressMissing: 'Please provide and confirm your delivery address before placing an order.',
    errConfirmAddress: 'Please confirm your delivery location checkbox before proceeding.',
    simBadge: 'Simulation Prototype',
    blueprintTitle: 'AgriNex 22-Screen Blueprint',
    jumpToScreen: 'Jump to Screen (1–22)',
    screenIndexTitle: 'AgriNex 22-Screen Index',
    shortcutsTitle: 'Shortcuts',
    manageListings: 'Manage listings',
    incomingOrder: '1 Incoming Order',
    snapCropPic: 'Snap crop picture',
    earningsMonth: '₹42,500 this month',
    aiDetectedTomato: 'AI Detected: Fresh Tomatoes (98% Confidence)',
    tapToSpeak: 'Tap microphone to speak',
    produceLabel: 'Produce:',
    quantityLabel: 'Quantity:',
    priceLabel: 'Price:',
    selectDeliveryArea: 'Select Delivery Area',
    customerLabel: 'Customer',
    itemLabel: 'Item',
    destinationLabel: 'Destination',
    acceptOrder: 'Accept Order',
    rejectOrder: 'Reject',
    startPacking: 'Start Packing',
    markReadyPickup: 'Mark Ready for Pickup',
    rejectedStatus: 'Rejected',
    kmAway: 'km away',
    justNow: 'Just now',
    todayMorning: 'Today, 08:30 AM',
    noNewNotifications: 'No new notifications at this moment.',
    noUnreadNotifications: 'No unread notifications.',
    monthlyEarningsAlert: 'Total monthly earnings: ₹42,500 from 28 completed direct orders.',
    demoOtpAlert: 'Demo OTP is 1234. Entered for your convenience.',
    orderStatusUpdated: 'Order status updated:',
    stateTelangana: 'Telangana',
    stateAP: 'Andhra Pradesh',
    stateKarnataka: 'Karnataka',
    stateTN: 'Tamil Nadu',
    stateKerala: 'Kerala',
    itemsUnit: 'items',
    availableLabel: 'available',
    farmerLabelInfo: 'Farmer',
    deliveryFree: 'FREE',
    deliveryNotesPlaceholder: 'e.g. Ring bell twice / Leave at gate',
    getStarted: 'Get Started',
    deliveryPartnerTitle: 'Delivery Partner Home',
    deliveryRequestTitle: 'Delivery Partner Order Notification',
    iamDeliveryPartner: 'I’m a Delivery Partner',
    iamDeliveryPartnerSub: 'Pick up fresh harvest from farms & deliver to doorsteps',
    viewRequest: 'View Request',
    acceptDelivery: 'Accept Delivery',
    rejectDelivery: 'Reject Delivery',
    onlineStatus: 'Online',
    offlineStatus: 'Offline',
    todayDeliveries: 'Today’s Deliveries',
    todayEarnings: 'Today’s Earnings',
    activeDeliveries: 'Active Deliveries',
    newOrderNotifications: 'New Order Notifications',
    markDelivered: 'Mark Delivered',
    recentActivity: 'Recent Delivery Activity',
    newDeliveryRequest: '⚡ Urgent Harvest Delivery Request',
    deliveryRoute: 'Delivery Route',
    pickupFarm: 'Pickup: Farm Location',
    deliveryDestination: 'Drop-off: Customer Address',
    packagePayoutDetails: 'Package & Payout Details',
    partnerEarnings: 'Your Delivery Payout:',
    switchToDelivery: 'Switch to Delivery Partner App',
    backToDeliveryHome: 'Back to Delivery Partner Home',
    pendingBadge: 'Pending',
    orderTotal: 'Order Total:'
  },
  te: {
    appName: 'AgriNex',
    tagline: 'పొలాలను కలుపుతూ. తాజాదనాన్ని అందిస్తూ.',
    splashTagline: 'పొలం నుండి మీ ఇంటికి',
    splashSub: 'రైతులను నేరుగా వినియోగదారులతో కలుపుతోంది',
    continueToLang: 'భాష ఎంపికకు కొనసాగించండి',
    continue: 'కొనసాగించండి',
    back: 'వెనుకకు',
    close: 'మూసివేయి',
    langSelectionTitle: 'మీ భాషను ఎంచుకోండి',
    langSelectionSub: 'వ్యవసాయ ఉత్పత్తుల కొనుగోలుకు మీకు అనుకూలమైన భాషను ఎంచుకోండి.',
    directMarketplaceBadge: '100% నేరుగా రైతు నుండి వినియోగదారుల మార్కెట్',
    iamFarmer: 'నేను రైతును',
    iamFarmerSub: 'తాజా పంటలను నమోదు చేయండి, ధర నిర్ణయించి నేరుగా అమ్మండి',
    iamCustomer: 'నేను వినియోగదారుడిని',
    iamCustomerSub: 'స్థానిక రైతుల నుండి తాజా కూరగాయలు, పండ్లు కొనండి',
    exploreLiveProto: 'ప్రత్యక్ష నమూనాను చూడండి',
    farmerRegTitle: 'రైతు నమోదు',
    step1Of3: 'దశ 1 (మొత్తం 3 లో)',
    step2Of3: 'దశ 2 (మొత్తం 3 లో)',
    step3Of3: 'దశ 3 (మొత్తం 3 లో)',
    mobileVerification: 'మొబైల్ ధృవీకరణ',
    verifyPhone: 'ఫోన్ ధృవీకరణ',
    autoFillDemoOtp: 'డెమో కోడ్ పూరించండి (1234)',
    selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
    mobileStepHeader: 'మొబైల్ నంబర్ నమోదు చేయండి',
    mobileStepSub: 'ప్రారంభించడానికి మీ 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.',
    mobileInputLabel: 'మొబైల్ నంబర్',
    sendCodeBtn: 'కోడ్ పంపండి',
    otpStepHeader: 'ధృవీకరణ కోడ్ నమోదు చేయండి',
    otpStepSub: 'మీ మొబైల్‌కు పంపిన 4 అంకెల కోడ్‌ను నమోదు చేయండి.',
    otpSimulationNotice: 'నమూనా ప్రదర్శన: డెమో ఓటీపీ 1234. ఎస్ఎంఎస్ పంపబడదు.',
    verifyBtn: 'ధృవీకరించి కొనసాగించండి',
    resendCode: 'కోడ్ మళ్లీ పంపండి',
    profileSetupTitle: 'రైతు వివరాల నమోదు',
    profileSetupSub: 'వినియోగదారులు మీ పంటలను తెలుసుకోవడానికి మీ వివరాలను నమోదు చేయండి.',
    fullNameLabel: 'పూర్తి పేరు (తప్పనిసరి)',
    farmNameLabel: 'పొలం పేరు (ఐచ్ఛికం)',
    villageLabel: 'గ్రామం / పట్టణం (తప్పనిసరి)',
    districtLabel: 'జిల్లా (తప్పనిసరి)',
    stateLabel: 'రాష్ట్రం (తప్పనిసరి)',
    cropsLabel: 'పండించే పంటలు (తప్పనిసరి)',
    farmLocationLabel: 'భూమి విస్తీర్ణం (ఐచ్ఛికం)',
    saveAndContinue: 'భద్రపరిచి కొనసాగించండి',
    errValidPhone: 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.',
    errInvalidOtp: 'చెల్లని ధృవీకరణ కోడ్. దయచేసి డెమో కోడ్ 1234 నమోదు చేయండి.',
    errFillRequired: 'దయచేసి అన్ని తప్పనిసరి వివరాలను (పూర్తి పేరు, గ్రామం, జిల్లా, రాష్ట్రం, పంటలు) నమోదు చేయండి.',
    speakToAddProduce: 'నోటి మాటతో పంటను జోడించండి',
    speakToAddSub: 'పంట, పరిమాణం మరియు మీ ధరను చెప్పండి',
    myProducts: 'నా ఉత్పత్తులు',
    myOrders: 'నా ఆర్డర్లు',
    addByPhoto: 'ఫోటో ద్వారా చేర్చండి',
    earnings: 'ఆదాయం',
    mandiRates: 'ఈరోజు మార్కెట్ ధరలు',
    mandiRatesSub: 'టమాటా: ₹20-22/కిలో • పాలకూర: ₹15/కట్ట • అనుకూల వాతావరణం (31°C)',
    takePhotoOrGallery: 'ఫోటో తీయండి లేదా గ్యాలరీ నుండి ఎంచుకోండి',
    clickToSimulatePhoto: 'కెమెరాతో పంట ఫోటో తీయడానికి క్లిక్ చేయండి',
    produceName: 'ఉత్పత్తి పేరు',
    quantityKg: 'పరిమాణం (కిలోలు)',
    pricePerKg: 'కిలో ధర (₹)',
    previewListing: 'జాబితాను పరిశీలించండి',
    voiceAddTitle: 'ధ్వని ద్వారా పంట నమోదు',
    tapAndSpeak: 'నొక్కి మాట్లాడండి',
    voiceExampleHint: 'ఉదాహరణకు చెప్పండి:',
    voiceExampleText: '“నా దగ్గర 50 కిలోల టమాటాలు ఉన్నాయి. కిలో 20 రూపాయలు.”',
    parsedListing: 'గుర్తించిన వివరాలు:',
    confirmListing: 'జాబితాను నిర్ధారించండి',
    editDetails: 'వివరాలను సవరించండి',
    publishToMarketplace: 'మార్కెట్‌లో ప్రచురించండి',
    productPreviewPublish: 'ఉత్పత్తి సమీక్ష / ప్రచురణ',
    stockLabel: 'స్టాక్:',
    farmerLabel: 'రైతు:',
    availableStock: 'అందుబాటులో ఉంది',
    deliveringTo: 'చేరవేసే ప్రాంతం',
    searchPlaceholder: 'తాజా వ్యవసాయ ఉత్పత్తులను శోధించండి...',
    freshToday: 'ఈరోజు తాజా పంట',
    directFarmRates: 'రైతు నేరుగా ఇచ్చే ధరలు',
    categories: 'విభాగాలు',
    catAll: 'అన్నీ',
    catVeg: 'కూరగాయలు',
    catLeafy: 'ఆకుకూరలు',
    catFruits: 'పండ్లు',
    catGrains: 'ధాన్యాలు',
    voiceSearchTitle: 'ధ్వని శోధన',
    voiceSearchProduce: 'ధ్వని ద్వారా పంట శోధన',
    voiceSearchSub: 'ఏదైనా కూరగాయలు, ఆకుకూరలు లేదా పండ్ల పేరు చెప్పండి.',
    trySaying: 'వీటిలో ఒకదాన్ని చెప్పి చూడండి:',
    chipSpinach: 'పాలకూర',
    chipAmaranth: 'తోటకూర',
    chipCoriander: 'కొత్తిమీర',
    chipTomato: 'టమాటా',
    listeningSpeakProduce: 'వింటోంది... పంట పేరు చెప్పండి',
    recognizedSearchQuery: 'గుర్తించిన శోధన పదం',
    searchBtn: 'శోధించండి',
    cancelBtn: 'రద్దు చేయండి',
    productListingTitle: 'ఉత్పత్తుల జాబితా / శోధన',
    nearbyFilter: 'సమీపంలోనివి (< 25 కి.మీ)',
    priceLowHigh: 'ధర: తక్కువ నుండి ఎక్కువ',
    availableNow: 'ఇప్పుడే అందుబాటులో ఉన్నవి',
    filteredNearby: 'సమీప పొలాలు (25 కి.మీ లోపు)',
    filteredPriceLow: 'తక్కువ ధర మొదట',
    filteredInStock: 'నిల్వ ఉన్నవి మాత్రమే',
    productDetailsTitle: 'ఉత్పత్తి పూర్తి వివరాలు',
    quantityUnitLabel: 'పరిమాణం (కిలో/కట్ట):',
    adjustQuantity: 'పరిమాణాన్ని మార్చండి',
    addToCart: 'కార్ట్‌కు జోడించండి',
    buyNow: 'ఇప్పుడే కొనండి',
    billBreakdown: 'బిల్లు వివరాలు',
    itemsSubtotal: 'ఉత్పత్తుల మొత్తం',
    deliveryFee: 'డెలివరీ రుసుము',
    totalToPay: 'చెల్లించాల్సిన మొత్తం',
    proceedToCheckout: 'చెల్లింపునకు కొనసాగించండి',
    checkoutTitle: 'ఆర్డర్ చెల్లింపు',
    deliveryAddress: 'చేరవేసే చిరునామా',
    editAddress: 'చిరునామా సవరణ',
    orderItems: 'ఆర్డర్ ఉత్పత్తులు',
    grandTotal: 'మొత్తం ఖరీదు',
    paymentMethod: 'చెల్లింపు విధానం (డెమో)',
    cashOnDelivery: 'క్యాష్ ఆన్ డెలివరీ',
    codSub: 'పంట అందినప్పుడు నగదు చెల్లించండి',
    upiDemo: 'యూపీఐ / క్యూఆర్ (డెమో నమూనా)',
    upiSub: 'గూగుల్ పే, ఫోన్‌పే, పేటీఎం',
    placeOrder: 'ఆర్డర్ చేయండి',
    backToCart: 'కార్ట్‌కు వెనుకకు',
    orderConfirmed: 'ఆర్డర్ విజయవంతంగా నమోదైంది!',
    orderConfirmedSub: 'రైతుకు మీ ఆర్డర్ వివరాలు చేరాయి.',
    orderIdLabel: 'ఆర్డర్ నంబర్:',
    estDeliveryLabel: 'అంచనా డెలివరీ సమయం:',
    paymentLabel: 'చెల్లింపు:',
    estDeliveryVal: 'ఈరోజు 3 గంటల్లో',
    trackOrder: 'ఆర్డర్ ట్రాక్ చేయండి',
    continueShopping: 'కొనుగోలు కొనసాగించండి',
    orderStatusTitle: 'ఆర్డర్ స్థితి',
    deliveryProgress: 'డెలివరీ పురోగతి',
    advanceDeliveryStatus: 'డెలివరీ స్థితిని ముందుకు జరపండి (పరీక్ష)',
    farmerProfileTitle: 'రైతు ప్రొఫైల్',
    customerProfileTitle: 'వినియోగదారుని ప్రొఫైల్',
    verifiedDirectFarmer: 'ధృవీకరించబడిన నేరుగా రైతు',
    profileDetailsTitle: 'ప్రొఫైల్ వివరాలు',
    locationFarmDetails: 'ప్రాంతం / పొలం వివరాలు',
    bankAccountPayouts: 'ఆదాయం కోసం బ్యాంక్ ఖాతా',
    upcomingFeature: 'త్వరలో రాబోయే ఫీచర్',
    demoBankAccount: 'డెమో బ్యాంక్ ఖాతా: స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా **** 4102',
    saveChanges: 'మార్పులను భద్రపరచండి',
    switchToCustomer: 'కస్టమర్ యాప్‌కు మారండి',
    switchToFarmer: 'రైతు పోర్టల్‌కు మారండి',
    logout: 'లాగ్ అవుట్',
    verifiedCustomerBadge: 'అగ్రినెక్స్ ధృవీకరించిన కస్టమర్',
    personalDetails: 'వ్యక్తిగత వివరాలు',
    saveInfo: 'సమాచారం భద్రపరచండి',
    orderHistory: 'ఆర్డర్ల చరిత్ర',
    deploymentUrl: 'డెప్లాయ్‌మెంట్ లింక్',
    openUrl: 'లింక్ తెరవండి',
    protoModalDesc: 'మీ ప్రత్యక్ష వెబ్ లింక్ కోసం నమూనా స్థలం.',
    msgPublished: 'మీ పంట విజయవంతంగా మార్కెట్‌లో ప్రచురించబడింది!',
    confirmDeleteListing: 'ఈ ఉత్పత్తిని తొలగించాలనుకుంటున్నారా?',
    msgAddedToCart: 'కార్ట్‌కు జోడించబడింది!',
    msgCartEmpty: 'కార్ట్ ఖాళీగా ఉంది. ముందుగా పంటను ఎంచుకోండి.',
    msgProfileUpdated: 'ప్రొఫైల్ వివరాలు భద్రపరచబడ్డాయి!',
    msgCustomerProfileUpdated: 'వినియోగదారుని ప్రొఫైల్ భద్రపరచబడింది!',
    showAll: 'అన్నీ చూపించు',
    noProduceFound: 'ఉత్పత్తులేవీ కనుగొనబడలేదు.',
    noOrdersReceived: 'ఆర్డర్లేవీ రాలేదు.',
    noProductsListed: 'ఉత్పత్తులేవీ నమోదు చేయలేదు.',
    reactivate: 'పునరుద్ధరించు',
    soldOutBtn: 'అమ్మబడింది',
    deleteBtn: 'తొలగించు',
    viewBtn: 'చూడండి',
    addBtn: '+ జోడించండి',
    navHome: 'హోమ్',
    navProducts: 'ఉత్పత్తులు',
    navOrders: 'ఆర్డర్లు',
    navProfile: 'ప్రొఫైల్',
    navCart: 'కార్ట్',
    navCategories: 'విభాగాలు',
    step1Placed: 'ఆర్డర్ నమోదైంది',
    step2Accepted: 'రైతు ఆమోదించారు',
    step3Preparing: 'ప్యాకింగ్ చేస్తున్నారు',
    step4Ready: 'రైడర్ పికప్ సిద్ధం',
    step5Out: 'డెలివరీకి బయలుదేరింది',
    step6Delivered: 'చేర్చబడింది',
    step1Sub: 'వినియోగదారు నేరుగా ఆర్డర్ చేసారు',
    step2Sub: 'రైతు పంట లభ్యతను ధృవీకరించారు',
    step3Sub: 'తాజా పంట శుభ్రం చేసి ప్యాక్ చేయబడింది',
    step4Sub: 'డెలివరీ రైడర్ కోసం వేచి ఉంది',
    step5Sub: 'రైడర్ మార్గంలో ఉన్నారు',
    step6Sub: 'తాజా పంట మీ ఇంటికి చేరింది',
    customerSetupTitle: 'వినియోగదారు ప్రొఫైల్ సెటప్',
    customerSetupSub: 'రైతుల నుండి నేరుగా తాజా పంటను ఆర్డర్ చేయడానికి మీ డెలివరీ వివరాలను నమోదు చేయండి.',
    deliveryAddressHouse: 'డెలివరీ చిరునామా / ఇంటి నంబర్ (తప్పనిసరి)',
    areaTownLabel: 'గ్రామం / పట్టణం / ప్రాంతం (తప్పనిసరి)',
    pincodeLabel: 'పిన్ కోడ్ (తప్పనిసరి)',
    errValidPincode: 'దయచేసి సరైన 6 అంకెల పిన్ కోడ్‌ను నమోదు చేయండి.',
    errFillRequiredCust: 'దయచేసి అన్ని తప్పనిసరి వినియోగదారు వివరాలను నమోదు చేయండి.',
    confirmDeliveryLocation: 'డెలివరీ చిరునామాను నిర్ధారించండి',
    confirmDeliveryLocationMsg: 'ఈ డెలివరీ చిరునామా ఖచ్చితమైనదని నేను నిర్ధారిస్తున్నాను',
    deliveryInstructions: 'డెలివరీ సూచనలు (ఐచ్ఛికం)',
    saveAddress: 'చిరునామాను నవీకరించండి',
    errAddressMissing: 'ఆర్డర్ ఇచ్చే ముందు దయచేసి మీ డెలివరీ చిరునామాను ధృవీకరించండి.',
    errConfirmAddress: 'కొనసాగడానికి దయచేసి డెలివరీ చిరునామా చెక్‌బాక్స్‌ను గుర్తించండి.',
    simBadge: 'నమూనా ప్రదర్శన',
    blueprintTitle: 'AgriNex 22-స్క్రీన్ల బ్లూప్రింట్',
    jumpToScreen: 'స్క్రీన్‌కి వెళ్లండి (1–22)',
    screenIndexTitle: 'AgriNex 22-స్క్రీన్ల సూచిక',
    shortcutsTitle: 'త్వరిత మార్గాలు',
    manageListings: 'జాబితాలను నిర్వహించండి',
    incomingOrder: '1 కొత్త ఆర్డర్',
    snapCropPic: 'పంట ఫోటో తీయండి',
    earningsMonth: 'ఈ నెలలో ₹42,500',
    aiDetectedTomato: 'AI గుర్తించింది: తాజా టమాటాలు (98% ఖచ్చితత్వం)',
    tapToSpeak: 'మాట్లాడటానికి మైక్రోఫోన్ నొక్కండి',
    produceLabel: 'ఉత్పత్తి:',
    quantityLabel: 'పరిమాణం:',
    priceLabel: 'ధర:',
    selectDeliveryArea: 'డెలివరీ ప్రాంతాన్ని ఎంచుకోండి',
    customerLabel: 'వినియోగదారు',
    itemLabel: 'వస్తువు',
    destinationLabel: 'గమ్యస్థానం',
    acceptOrder: 'ఆర్డర్ ఆమోదించండి',
    rejectOrder: 'తిరస్కరించండి',
    startPacking: 'ప్యాకింగ్ ప్రారంభించండి',
    markReadyPickup: 'పికప్‌కు సిద్ధంగా మార్క్ చేయండి',
    rejectedStatus: 'తిరస్కరించబడింది',
    kmAway: 'కి.మీ దూరంలో',
    justNow: 'ఇప్పుడే',
    todayMorning: 'ఈరోజు, 08:30 AM',
    noNewNotifications: 'ప్రస్తుతం కొత్త నోటిఫికేషన్‌లు లేవు.',
    noUnreadNotifications: 'చదవని నోటిఫికేషన్‌లు లేవు.',
    monthlyEarningsAlert: 'మొత్తం నెలవారీ ఆదాయం: పూర్తయిన 28 ప్రత్యక్ష ఆర్డర్ల నుండి ₹42,500.',
    demoOtpAlert: 'డెమో OTP 1234. మీ సౌలభ్యం కోసం పూరించబడింది.',
    orderStatusUpdated: 'ఆర్డర్ స్థితి నవీకరించబడింది:',
    stateTelangana: 'తెలంగాణ',
    stateAP: 'ఆంధ్రప్రదేశ్',
    stateKarnataka: 'కర్ణాటక',
    stateTN: 'తమిళనాడు',
    stateKerala: 'కేరళ',
    itemsUnit: 'వస్తువులు',
    availableLabel: 'అందుబాటులో ఉంది',
    farmerLabelInfo: 'రైతు',
    deliveryFree: 'ఉచితం',
    deliveryNotesPlaceholder: 'ఉదా. కాలింగ్ బెల్ రెండుసార్లు కొట్టండి / గేట్ వద్ద ఉంచండి',
    getStarted: 'ప్రారంభించండి',
    deliveryPartnerTitle: 'డెలివరీ భాగస్వామి హోమ్',
    deliveryRequestTitle: 'డెలివరీ ఆర్డర్ నోటిఫికేషన్',
    iamDeliveryPartner: 'నేను డెలివరీ భాగస్వామిని',
    iamDeliveryPartnerSub: 'పొలాల నుండి తాజా పంటను సేకరించి ఇళ్లకు చేర్చండి',
    viewRequest: 'అభ్యర్థనను వీక్షించండి',
    acceptDelivery: 'డెలివరీని ఆమోదించండి',
    rejectDelivery: 'డెలివరీని తిరస్కరించండి',
    onlineStatus: 'ఆన్‌లైన్',
    offlineStatus: 'ఆఫ్‌లైన్',
    todayDeliveries: 'నేటి డెలివరీలు',
    todayEarnings: 'నేటి ఆదాయం',
    activeDeliveries: 'ప్రస్తుత డెలివరీలు',
    newOrderNotifications: 'కొత్త ఆర్డర్ నోటిఫికేషన్‌లు',
    markDelivered: 'డెలివరీ అయినట్లు గుర్తించండి',
    recentActivity: 'ఇటీవలి డెలివరీ కార్యాచరణ',
    newDeliveryRequest: '⚡ అత్యవసర పంట డెలివరీ అభ్యర్థన',
    deliveryRoute: 'డెలివరీ మార్గం',
    pickupFarm: 'పికప్: పొలం స్థానం',
    deliveryDestination: 'డ్రాప్-ఆఫ్: కస్టమర్ చిరునామా',
    packagePayoutDetails: 'ప్యాకేజీ & చెల్లింపు వివరాలు',
    partnerEarnings: 'మీ డెలివరీ చెల్లింపు:',
    switchToDelivery: 'డెలివరీ భాగస్వామి యాప్‌కి మారండి',
    backToDeliveryHome: 'డెలివరీ భాగస్వామి హోమ్‌కి వెనుకకు',
    pendingBadge: 'వేచి ఉంది',
    orderTotal: 'ఆర్డర్ మొత్తం:'
  },
  hi: {
    appName: 'AgriNex',
    tagline: 'खेतों को जोड़ते हुए। ताज़गी पहुँचाते हुए।',
    splashTagline: 'सीधे खेत से आपके घर तक',
    splashSub: 'किसानों को सीधे उपभोक्ताओं से जोड़ना',
    continueToLang: 'भाषा चयन पर आगे बढ़ें',
    continue: 'आगे बढ़ें',
    back: 'वापस',
    close: 'बंद करें',
    langSelectionTitle: 'अपनी भाषा चुनें',
    langSelectionSub: 'स्थानीयकृत खेत-से-घर अनुभव के लिए अपनी पसंदीदा भाषा चुनें।',
    directMarketplaceBadge: '100% प्रत्यक्ष किसान से उपभोक्ता बाज़ार',
    iamFarmer: 'मैं एक किसान हूँ',
    iamFarmerSub: 'ताज़ी फ़सल सूचीबद्ध करें, अपनी कीमत तय करें और सीधे बेचें',
    iamCustomer: 'मैं एक ग्राहक हूँ',
    iamCustomerSub: 'स्थानीय किसानों से खेत की ताज़ा सब्ज़ियाँ और फल खरीदें',
    exploreLiveProto: 'लाइव प्रोटोटाइप देखें',
    farmerRegTitle: 'किसान पंजीकरण',
    step1Of3: 'चरण 1 का 3',
    step2Of3: 'चरण 2 का 3',
    step3Of3: 'चरण 3 का 3',
    mobileVerification: 'मोबाइल सत्यापन',
    verifyPhone: 'फ़ोन सत्यापित करें',
    autoFillDemoOtp: 'डेमो कोड स्वतः भरें (1234)',
    selectState: 'राज्य चुनें',
    mobileStepHeader: 'मोबाइल नंबर दर्ज करें',
    mobileStepSub: 'शुरू करने के लिए अपना 10 अंकों का मोबाइल नंबर दर्ज करें।',
    mobileInputLabel: 'मोबाइल नंबर',
    sendCodeBtn: 'कोड भेजें',
    otpStepHeader: 'फ़ोन नंबर सत्यापित करें',
    otpStepSub: 'अपने मोबाइल पर भेजा गया 4 अंकों का कोड दर्ज करें।',
    otpSimulationNotice: 'प्रोटोटाइप डेमो सिमुलेशन: डेमो OTP 1234 है। कोई SMS नहीं भेजा गया।',
    verifyBtn: 'सत्यापित करें और आगे बढ़ें',
    resendCode: 'कोड दोबारा भेजें',
    profileSetupTitle: 'किसान प्रोफ़ाइल सेटअप',
    profileSetupSub: 'अपने खेत के बारे में बताएं ताकि स्थानीय ग्राहक आपकी ताज़ा उपज खोज सकें।',
    fullNameLabel: 'पूरा नाम (आवश्यक)',
    farmNameLabel: 'खेत का नाम (वैकल्पिक)',
    villageLabel: 'गाँव / कस्बा (आवश्यक)',
    districtLabel: 'ज़िला (आवश्यक)',
    stateLabel: 'राज्य (आवश्यक)',
    cropsLabel: 'खेती का प्रकार / उगाई जाने वाली फ़सलें (आवश्यक)',
    farmLocationLabel: 'खेत का स्थान / रकबा (वैकल्पिक)',
    saveAndContinue: 'सहेजें और आगे बढ़ें',
    errValidPhone: 'कृपया एक मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।',
    errInvalidOtp: 'अमान्य सत्यापन कोड। कृपया डेमो कोड 1234 दर्ज करें।',
    errFillRequired: 'कृपया सभी आवश्यक फ़ील्ड भरें (पूरा नाम, गाँव, ज़िला, राज्य और उगाई जाने वाली फ़सलें)।',
    speakToAddProduce: 'उपज जोड़ने के लिए बोलें',
    speakToAddSub: 'फ़सल, वजन और अपनी कीमत बोलें',
    myProducts: 'मेरे उत्पाद',
    myOrders: 'मेरे ऑर्डर',
    addByPhoto: 'फोटो से जोड़ें',
    earnings: 'कमाई',
    mandiRates: 'आज का मंडी बाज़ार भाव',
    mandiRatesSub: 'टमाटर: ₹20-22/किग्रा • पालक: ₹15/गुच्छा • साफ़ कटाई मौसम (31°C)',
    takePhotoOrGallery: 'फोटो लें या गैलरी से चुनें',
    clickToSimulatePhoto: 'फ़सल की कैमरा तस्वीर सिमुलेट करने के लिए क्लिक करें',
    produceName: 'उपज का नाम',
    quantityKg: 'मात्रा (किग्रा)',
    pricePerKg: 'प्रति किग्रा मूल्य (₹)',
    previewListing: 'लिस्टिंग पूर्वावलोकन',
    voiceAddTitle: 'आवाज़ से उत्पाद जोड़ें',
    tapAndSpeak: 'टैप करें और बोलें',
    voiceExampleHint: 'उदाहरण के लिए कहें:',
    voiceExampleText: '“मेरे पास 50 किलो टमाटर हैं। कीमत 20 रुपये प्रति किलो है।”',
    parsedListing: 'पहचानी गई लिस्टिंग विवरण:',
    confirmListing: 'लिस्टिंग की पुष्टि करें',
    editDetails: 'विवरण संपादित करें',
    publishToMarketplace: 'बाज़ार में प्रकाशित करें',
    productPreviewPublish: 'उत्पाद पूर्वावलोकन / प्रकाशित करें',
    stockLabel: 'स्टॉक',
    farmerLabel: 'किसान',
    availableStock: 'उपलब्ध स्टॉक',
    deliveringTo: 'डिलीवरी का पता',
    searchPlaceholder: 'खेत की ताज़ा उपज खोजें...',
    freshToday: 'आज सुबह की ताज़ा कटाई',
    directFarmRates: 'सीधे खेत के भाव',
    categories: 'श्रेणियाँ',
    catAll: 'सभी',
    catVeg: 'सब्ज़ियाँ',
    catLeafy: 'हरी पत्तेदार',
    catFruits: 'फल',
    catGrains: 'अनाज',
    voiceSearchTitle: 'आवाज़ से खोज',
    voiceSearchProduce: 'जो चाहिए बोलें',
    voiceSearchSub: 'सब्ज़ियों, फलों या साग के नाम अपनी भाषा में बोलें',
    trySaying: 'बोलकर देखें:',
    chipSpinach: 'पालक',
    chipAmaranth: 'चौलाई',
    chipCoriander: 'धनिया',
    chipTomato: 'टमाटर',
    listeningSpeakProduce: 'सुन रहे हैं... उपज का नाम बोलें',
    recognizedSearchQuery: 'सफलतापूर्वक पहचाना गया: ताज़ा टमाटर',
    searchBtn: 'खोजें',
    cancelBtn: 'रद्द करें',
    productListingTitle: 'ताज़ा खेत उपज',
    nearbyFilter: 'आस-पास (<20 किमी)',
    priceLowHigh: 'कीमत: कम से अधिक',
    availableNow: 'अभी उपलब्ध',
    filteredNearby: 'आस-पास के खेत',
    filteredPriceLow: 'किफायती कीमत',
    filteredInStock: 'ताज़ा स्टॉक',
    productDetailsTitle: 'उत्पाद विवरण',
    quantityUnitLabel: 'मात्रा (किग्रा / गुच्छा)',
    adjustQuantity: 'मात्रा समायोजित करें',
    addToCart: 'कार्ट में जोड़ें',
    buyNow: 'अभी खरीदें',
    billBreakdown: 'बिल विवरण',
    itemsSubtotal: 'सामान का उप-योग',
    deliveryFee: 'सीधी खेत डिलीवरी शुल्क',
    totalToPay: 'कुल देय राशि',
    proceedToCheckout: 'चेकआउट पर आगे बढ़ें',
    checkoutTitle: 'ऑर्डर चेकआउट',
    deliveryAddress: 'डिलीवरी का पता',
    editAddress: 'पता बदलें',
    orderItems: 'ऑर्डर की गई वस्तुएं',
    grandTotal: 'कुल राशि',
    paymentMethod: 'भुगतान का तरीका',
    cashOnDelivery: 'डिलीवरी पर नकद (COD)',
    codSub: 'ताज़ा उपज मिलने पर नकद भुगतान करें',
    upiDemo: 'UPI / ऑनलाइन (डेमो सिमुलेशन)',
    upiSub: 'Google Pay, PhonePe, Paytm',
    placeOrder: 'ऑर्डर दें (डेमो)',
    backToCart: 'कार्ट पर वापस',
    orderConfirmed: 'ऑर्डर की पुष्टि हो गई!',
    orderConfirmedSub: 'आपका सीधा खेत ऑर्डर प्राप्त हो गया है और किसान को सूचित कर दिया गया है।',
    orderIdLabel: 'ऑर्डर आईडी',
    estDeliveryLabel: 'अनुमानित डिलीवरी',
    paymentLabel: 'भुगतान',
    estDeliveryVal: 'आज सुबह 11:30 बजे तक',
    trackOrder: 'ऑर्डर ट्रैक करें',
    continueShopping: 'खरीदारी जारी रखें',
    orderStatusTitle: 'ऑर्डर स्थिति',
    deliveryProgress: 'डिलीवरी प्रगति',
    advanceDeliveryStatus: 'डिलीवरी स्थिति आगे बढ़ाएं (सिमुलेशन टेस्ट)',
    farmerProfileTitle: 'किसान प्रोफ़ाइल',
    customerProfileTitle: 'ग्राहक प्रोफ़ाइल',
    verifiedDirectFarmer: 'सत्यापित प्रत्यक्ष किसान',
    profileDetailsTitle: 'प्रोफ़ाइल विवरण',
    locationFarmDetails: 'स्थान और खेत विवरण',
    bankAccountPayouts: 'बैंक खाता और भुगतान',
    upcomingFeature: 'आगामी सुविधा',
    demoBankAccount: 'डेमो बैंक खाता',
    saveChanges: 'परिवर्तन सहेजें',
    switchToCustomer: 'ग्राहक दृश्य पर स्विच करें',
    switchToFarmer: 'किसान दृश्य पर स्विच करें',
    logout: 'लॉग आउट',
    verifiedCustomerBadge: 'सत्यापित प्रत्यक्ष खरीदार',
    personalDetails: 'व्यक्तिगत विवरण',
    saveInfo: 'जानकारी सहेजें',
    orderHistory: 'ऑर्डर इतिहास',
    deploymentUrl: 'सार्वजनिक प्रोटोटाइप URL',
    openUrl: 'URL खोलें',
    protoModalDesc: 'यह डेमो स्थानीय स्तर पर चल रहा है। सार्वजनिक रूप से साझा करने के लिए होस्टिंग पर तैनात करें।',
    msgPublished: 'उत्पाद सफलतापूर्वक प्रकाशित किया गया! अब ग्राहक इसे देख सकते हैं।',
    confirmDeleteListing: 'क्या आप वाकई इस उत्पाद लिस्टिंग को हटाना चाहते हैं?',
    msgAddedToCart: 'उत्पाद कार्ट में जोड़ा गया!',
    msgCartEmpty: 'आपकी कार्ट खाली है। कृपया खेत से ताज़ा उत्पाद जोड़ें।',
    msgProfileUpdated: 'किसान प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!',
    msgCustomerProfileUpdated: 'ग्राहक प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!',
    showAll: 'सभी उत्पाद दिखाएं',
    noProduceFound: 'इस फ़िल्टर से कोई उत्पाद नहीं मिला।',
    noOrdersReceived: 'अभी तक कोई ऑर्डर नहीं मिला।',
    noProductsListed: 'अभी तक कोई उत्पाद सूचीबद्ध नहीं है। अपनी पहली ताज़ा फ़सल जोड़ें!',
    reactivate: 'पुनः सक्रिय करें',
    soldOutBtn: 'बिक गया',
    deleteBtn: 'हटाएं',
    viewBtn: 'देखें',
    addBtn: 'जोड़ें',
    navHome: 'होम',
    navProducts: 'उत्पाद',
    navOrders: 'ऑर्डर',
    navProfile: 'प्रोफ़ाइल',
    navCart: 'कार्ट',
    navCategories: 'श्रेणियाँ',
    step1Placed: 'ऑर्डर दिया गया',
    step2Accepted: 'किसान ने स्वीकार किया',
    step3Preparing: 'पैकिंग की जा रही है',
    step4Ready: 'पिकअप के लिए तैयार',
    step5Out: 'डिलीवरी के लिए निकला',
    step6Delivered: 'डिलीवर हो गया',
    step1Sub: 'ग्राहक ने सीधा खेत ऑर्डर दिया',
    step2Sub: 'किसान ने फ़सल उपलब्धता की पुष्टि की',
    step3Sub: 'ताज़ी उपज साफ़ करके पैक की गई',
    step4Sub: 'स्थानीय डिलीवरी राइडर की प्रतीक्षा',
    step5Sub: 'राइडर रास्ते में है',
    step6Sub: 'ताज़ा फ़सल आपके दरवाज़े पर पहुँची',
    customerSetupTitle: 'ग्राहक प्रोफ़ाइल सेटअप',
    customerSetupSub: 'सीधे खेत की ताज़ा उपज देखने और ऑर्डर करने के लिए अपना डिलीवरी विवरण दर्ज करें।',
    deliveryAddressHouse: 'डिलीवरी का पता / मकान नंबर (आवश्यक)',
    areaTownLabel: 'गाँव / कस्बा / क्षेत्र (आवश्यक)',
    pincodeLabel: 'पिन कोड (आवश्यक)',
    errValidPincode: 'कृपया एक मान्य 6 अंकों का पिन कोड दर्ज करें।',
    errFillRequiredCust: 'कृपया सभी आवश्यक ग्राहक विवरण भरें।',
    confirmDeliveryLocation: 'डिलीवरी स्थान की पुष्टि करें',
    confirmDeliveryLocationMsg: 'मैं पुष्टि करता हूँ कि यह डिलीवरी पता सही है',
    deliveryInstructions: 'डिलीवरी निर्देश (वैकल्पिक)',
    saveAddress: 'पता अपडेट करें',
    errAddressMissing: 'ऑर्डर देने से पहले कृपया अपना डिलीवरी पता दर्ज करें और पुष्टि करें।',
    errConfirmAddress: 'आगे बढ़ने से पहले कृपया डिलीवरी स्थान चेकबॉक्स की पुष्टि करें।',
    simBadge: 'सिमुलेशन प्रोटोटाइप',
    blueprintTitle: 'AgriNex 22-स्क्रीन ब्लूप्रिंट',
    jumpToScreen: 'स्क्रीन पर जाएं (1–22)',
    screenIndexTitle: 'AgriNex 22-स्क्रीन अनुक्रमणिका',
    shortcutsTitle: 'शॉर्टकट',
    manageListings: 'उत्पाद प्रबंधित करें',
    incomingOrder: '1 नया ऑर्डर',
    snapCropPic: 'फ़सल की तस्वीर लें',
    earningsMonth: 'इस महीने ₹42,500',
    aiDetectedTomato: 'AI पहचान: ताज़ा टमाटर (98% सटीकता)',
    tapToSpeak: 'बोलने के लिए माइक दबाएं',
    produceLabel: 'उत्पाद:',
    quantityLabel: 'मात्रा:',
    priceLabel: 'मूल्य:',
    selectDeliveryArea: 'डिलीवरी क्षेत्र चुनें',
    customerLabel: 'ग्राहक',
    itemLabel: 'उत्पाद',
    destinationLabel: 'गंतव्य',
    acceptOrder: 'ऑर्डर स्वीकारें',
    rejectOrder: 'अस्वीकार करें',
    startPacking: 'पैकिंग शुरू करें',
    markReadyPickup: 'पिकअप के लिए तैयार करें',
    rejectedStatus: 'अस्वीकृत',
    kmAway: 'किमी दूर',
    justNow: 'अभी-अभी',
    todayMorning: 'आज, सुबह 08:30',
    noNewNotifications: 'इस समय कोई नया नोटिफिकेशन नहीं है।',
    noUnreadNotifications: 'कोई अपठित नोटिफिकेशन नहीं है।',
    monthlyEarningsAlert: 'कुल मासिक आय: 28 पूर्ण किए गए सीधे ऑर्डरों से ₹42,500।',
    demoOtpAlert: 'डेमो OTP 1234 है। आपकी सुविधा के लिए भर दिया गया है।',
    orderStatusUpdated: 'ऑर्डर स्थिति अपडेट की गई:',
    stateTelangana: 'तेलंगाना',
    stateAP: 'आंध्र प्रदेश',
    stateKarnataka: 'कर्नाटक',
    stateTN: 'तमिलनाडु',
    stateKerala: 'केरल',
    itemsUnit: 'सामान',
    availableLabel: 'उपलब्ध',
    farmerLabelInfo: 'किसान',
    deliveryFree: 'मुफ़्त',
    deliveryNotesPlaceholder: 'उदा. दो बार घंटी बजाएं / गेट पर छोड़ दें',
    getStarted: 'शुरू करें',
    deliveryPartnerTitle: 'डिलीवरी पार्टनर होम',
    deliveryRequestTitle: 'डिलीवरी पार्टनर ऑर्डर सूचना',
    iamDeliveryPartner: 'मैं एक डिलीवरी पार्टनर हूँ',
    iamDeliveryPartnerSub: 'खेतों से ताज़ी फसल उठाएं और घरों तक पहुंचाएं',
    viewRequest: 'अनुरोध देखें',
    acceptDelivery: 'डिलीवरी स्वीकार करें',
    rejectDelivery: 'डिलीवरी अस्वीकार करें',
    onlineStatus: 'ऑनलाइन',
    offlineStatus: 'ऑफलाइन',
    todayDeliveries: 'आज की डिलीवरी',
    todayEarnings: 'आज की कमाई',
    activeDeliveries: 'सक्रिय डिलीवरी',
    newOrderNotifications: 'नई ऑर्डर सूचनाएं',
    markDelivered: 'डिलीवर किया गया चिह्नित करें',
    recentActivity: 'हाल की डिलीवरी गतिविधि',
    newDeliveryRequest: '⚡ त्वरित फसल डिलीवरी अनुरोध',
    deliveryRoute: 'डिलीवरी मार्ग',
    pickupFarm: 'पिकअप: खेत का स्थान',
    deliveryDestination: 'ड्रॉप-ऑफ: ग्राहक का पता',
    packagePayoutDetails: 'पैकेज और भुगतान विवरण',
    partnerEarnings: 'आपका डिलीवरी भुगतान:',
    switchToDelivery: 'डिलीवरी पार्टनर ऐप पर जाएं',
    backToDeliveryHome: 'डिलीवरी पार्टनर होम पर वापस',
    pendingBadge: 'लंबित',
    orderTotal: 'कुल ऑर्डर मूल्य:'
  },
  ta: {
    appName: 'AgriNex',
    tagline: 'விவசாயிகளை இணைத்து. புத்துணர்ச்சியை வழங்கி.',
    splashTagline: 'பண்ணையிலிருந்து உங்கள் வீட்டிற்கு',
    splashSub: 'விவசாயிகளை நேரடியாக நுகர்வோருடன் இணைக்கிறது',
    continueToLang: 'மொழித் தேர்வுக்கு தொடரவும்',
    continue: 'தொடரவும்',
    back: 'பின்னால்',
    close: 'மூடு',
    langSelectionTitle: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    langSelectionSub: 'உழவர் சந்தை அனுபவத்திற்காக உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.',
    directMarketplaceBadge: '100% நேரடி விவசாயி முதல் நுகர்வோர் வரை',
    iamFarmer: 'நான் ஒரு விவசாயி',
    iamFarmerSub: 'புதிய அறுவடையை பட்டியலிட்டு, விலையை நிர்ணயித்து விற்கவும்',
    iamCustomer: 'நான் ஒரு நுகர்வோர்',
    iamCustomerSub: 'உள்ளூர் விவசாயிகளிடமிருந்து புதிய காய்கறிகள், பழங்களை வாங்குங்கள்',
    exploreLiveProto: 'நேரலை மாதிரியைப் பார்க்கவும்',
    farmerRegTitle: 'விவசாயி பதிவு',
    step1Of3: 'படி 1 (மொத்தம் 3ல்)',
    step2Of3: 'படி 2 (மொத்தம் 3ல்)',
    step3Of3: 'படி 3 (மொத்தம் 3ல்)',
    mobileVerification: 'மொபைல் சரிபார்ப்பு',
    verifyPhone: 'போன் சரிபார்ப்பு',
    autoFillDemoOtp: 'டெமோ குறியீட்டை நிரப்புக (1234)',
    selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    mobileStepHeader: 'மொபைல் எண்ணை உள்ளிடவும்',
    mobileStepSub: 'தொடங்குவதற்கு உங்கள் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.',
    mobileInputLabel: 'மொபைல் எண்',
    sendCodeBtn: 'குறியீடு அனுப்புக',
    otpStepHeader: 'சரிபார்ப்புக் குறியீட்டை உள்ளிடவும்',
    otpStepSub: 'உங்கள் மொபைலுக்கு அனுப்பப்பட்ட 4 இலக்க குறியீட்டை உள்ளிடவும்.',
    otpSimulationNotice: 'மாதிரி செயல்முறை: டெமோ ஓடிபி 1234. எஸ்எம்எஸ் அனுப்பப்படாது.',
    verifyBtn: 'சரிபார்த்து தொடரவும்',
    resendCode: 'மீண்டும் குறியீடு அனுப்புக',
    profileSetupTitle: 'விவசாயி சுயவிவர அமைப்பு',
    profileSetupSub: 'வாடிக்கையாளர்கள் உங்கள் பயிர்களை அறிய விவரங்களை உள்ளிடவும்.',
    fullNameLabel: 'முழுப் பெயர் (தேவை)',
    farmNameLabel: 'பண்ணை பெயர் (விருப்பத்திற்குரியது)',
    villageLabel: 'கிராமம் / நகரம் (தேவை)',
    districtLabel: 'மாவட்டம் (தேவை)',
    stateLabel: 'மாநிலம் (தேவை)',
    cropsLabel: 'பயிர்கள் (தேவை)',
    farmLocationLabel: 'நிலப்பரப்பு (விருப்பத்திற்குரியது)',
    saveAndContinue: 'சேமித்து தொடரவும்',
    errValidPhone: 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.',
    errInvalidOtp: 'தவறான குறியீடு. டெமோ குறியீடு 1234 ஐ உள்ளிடவும்.',
    errFillRequired: 'தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.',
    speakToAddProduce: 'குரல் மூலம் பயிரைச் சேர்க்கவும்',
    speakToAddSub: 'பயிர், எடை மற்றும் விலையைக் கூறவும்',
    myProducts: 'என் தயாரிப்புகள்',
    myOrders: 'என் ஆர்டர்கள்',
    addByPhoto: 'புகைப்படம் மூலம் சேர்க்கவும்',
    earnings: 'வருவாய்',
    mandiRates: 'இன்றைய சந்தை விலை',
    mandiRatesSub: 'தக்காளி: ₹20-22/கிலோ • பசலைக்கீரை: ₹15/கட்டு • தெளிவான வானிலை (31°C)',
    takePhotoOrGallery: 'புகைப்படம் எடுக்கவும் அல்லது கேலரியில் தேர்ந்தெடுக்கவும்',
    clickToSimulatePhoto: 'அறுவடை புகைப்படத்தை எடுக்க கிளிக் செய்யவும்',
    produceName: 'பொருள் பெயர்',
    quantityKg: 'அளவு (கிலோ)',
    pricePerKg: 'கிலோ விலை (₹)',
    previewListing: 'பட்டியலை முன்னோட்டமிடுங்கள்',
    voiceAddTitle: 'குரல் மூலம் பயிர் சேர்த்தல்',
    tapAndSpeak: 'தட்டிப் பேசவும்',
    voiceExampleHint: 'உதாரணமாகச் சொல்லுங்கள்:',
    voiceExampleText: '“என்னிடம் 50 கிலோ தக்காளி உள்ளது. கிலோ 20 ரூபாய்.”',
    parsedListing: 'அறியப்பட்ட விவரங்கள்:',
    confirmListing: 'பட்டியலை உறுதிப்படுத்தவும்',
    editDetails: 'விவரங்களைத் திருத்தவும்',
    publishToMarketplace: 'சந்தையில் வெளியிடவும்',
    productPreviewPublish: 'பொருள் முன்னோட்டம் / வெளியீடு',
    stockLabel: 'இருப்பு:',
    farmerLabel: 'விவசாயி:',
    availableStock: 'கிடைக்கிறது',
    deliveringTo: 'டெலிவரி இடம்',
    searchPlaceholder: 'புதிய பண்ணை விளைபொருட்களைத் தேடுங்கள்...',
    freshToday: 'இன்றைய புதிய அறுவடை',
    directFarmRates: 'நேரடி பண்ணை விலைகள்',
    categories: 'வகைகள்',
    catAll: 'அனைத்தும்',
    catVeg: 'காய்கறிகள்',
    catLeafy: 'கீரைகள்',
    catFruits: 'பழங்கள்',
    catGrains: 'தானியங்கள்',
    voiceSearchTitle: 'குரல் தேடல்',
    voiceSearchProduce: 'குரல் மூலம் பொருள் தேடல்',
    voiceSearchSub: 'காய்கறி, கீரை அல்லது பழத்தின் பெயரைக் கூறவும்.',
    trySaying: 'இவற்றில் ஒன்றைச் சொல்லிப் பாருங்கள்:',
    chipSpinach: 'பசலைக்கீரை',
    chipAmaranth: 'தண்டுக் கீரை',
    chipCoriander: 'கொத்தமல்லி',
    chipTomato: 'தக்காளி',
    listeningSpeakProduce: 'கேட்கிறது... பயிர் பெயரைக் கூறவும்',
    recognizedSearchQuery: 'கண்டறியப்பட்ட சொல்',
    searchBtn: 'தேடுக',
    cancelBtn: 'ரத்து',
    productListingTitle: 'பொருட்கள் பட்டியல் / தேடல்',
    nearbyFilter: 'அருகிலுள்ளவை (< 25 கி.மீ)',
    priceLowHigh: 'விலை: குறைவு முதல் அதிகம்',
    availableNow: 'இப்போது இருப்பவை',
    filteredNearby: 'அருகிலுள்ள பண்ணைகள் (25 கி.மீக்குள்)',
    filteredPriceLow: 'குறைந்த விலை முதலில்',
    filteredInStock: 'இருப்பில் உள்ளவை மட்டும்',
    productDetailsTitle: 'பொருள் விவரங்கள்',
    quantityUnitLabel: 'அளவு (கிலோ/கட்டு):',
    adjustQuantity: 'அளவை மாற்றவும்',
    addToCart: 'கூடையில் சேர்க்கவும்',
    buyNow: 'இப்போதே வாங்கவும்',
    billBreakdown: 'கட்டண விவரம்',
    itemsSubtotal: 'பொருட்களின் மொத்தம்',
    deliveryFee: 'டெலிவரி கட்டணம்',
    totalToPay: 'செலுத்த வேண்டிய தொகை',
    proceedToCheckout: 'செக்அவுட்டுக்கு தொடரவும்',
    checkoutTitle: 'செக்அவுட்',
    deliveryAddress: 'டெலிவரி முகவரி',
    editAddress: 'முகவரி திருத்து',
    orderItems: 'ஆர்டர் பொருட்கள்',
    grandTotal: 'மொத்தத் தொகை',
    paymentMethod: 'பணம் செலுத்தும் முறை (டெமோ)',
    cashOnDelivery: 'கேஷ் ஆன் டெலிவரி',
    codSub: 'பொருட்கள் வந்தவுடன் பணம் செலுத்தவும்',
    upiDemo: 'யூபிஐ / கியூஆர் (டெமோ)',
    upiSub: 'கூகுள் பே, போன்பே, பேடிஎம்',
    placeOrder: 'ஆர்டர் செய்யவும்',
    backToCart: 'கூடைக்குத் திரும்புக',
    orderConfirmed: 'ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
    orderConfirmedSub: 'விவசாயிக்கு உங்கள் ஆர்டர் விவரங்கள் சென்று சேர்ந்தன.',
    orderIdLabel: 'ஆர்டர் எண்:',
    estDeliveryLabel: 'எதிர்பார்க்கப்படும் நேரம்:',
    paymentLabel: 'பணம்:',
    estDeliveryVal: 'இன்று 3 மணி நேரத்திற்குள்',
    trackOrder: 'ஆர்டரைக் கண்காணிக்கவும்',
    continueShopping: 'ஷாப்பிங்கைத் தொடரவும்',
    orderStatusTitle: 'ஆர்டர் நிலை',
    deliveryProgress: 'டெலிவரி நிலை',
    advanceDeliveryStatus: 'டெலிவரி நிலையை முன்னகர்த்துக (சோதனை)',
    farmerProfileTitle: 'விவசாயி சுயவிவரம்',
    customerProfileTitle: 'வாடிக்கையாளர் சுயவிவரம்',
    verifiedDirectFarmer: 'சரிபார்க்கப்பட்ட நேரடி விவசாயி',
    profileDetailsTitle: 'சுயவிவர விவரங்கள்',
    locationFarmDetails: 'இடம் / பண்ணை விவரங்கள்',
    bankAccountPayouts: 'வருமானத்திற்கான வங்கி கணக்கு',
    upcomingFeature: 'விரைவில் வரும் அம்சம்',
    demoBankAccount: 'டெமோ வங்கி கணக்கு: ஸ்டேட் பாங்க் ஆப் இந்தியா **** 4102',
    saveChanges: 'சேமிக்கவும்',
    switchToCustomer: 'வாடிக்கையாளர் பயன்பாட்டிற்கு மாறவும்',
    switchToFarmer: 'விவசாயி போர்ட்டலுக்கு மாறவும்',
    logout: 'வெளியேறு',
    verifiedCustomerBadge: 'அக்ரிநெக்ஸ் சரிபார்க்கப்பட்ட வாடிக்கையாளர்',
    personalDetails: 'தனிப்பட்ட விவரங்கள்',
    saveInfo: 'தகவலை சேமிக்கவும்',
    orderHistory: 'ஆர்டர் வரலாறு',
    deploymentUrl: 'இணையதள இணைப்பு',
    openUrl: 'இணைப்பைத் திறக்கவும்',
    protoModalDesc: 'நேரடி இணையதள இணைப்பிற்கான மாதிரி இடம்.',
    msgPublished: 'உங்கள் பயிர் சந்தையில் வெளியிடப்பட்டது!',
    confirmDeleteListing: 'இந்தப் பட்டியலை நீக்க விரும்புகிறீர்களா?',
    msgAddedToCart: 'கூடையில் சேர்க்கப்பட்டது!',
    msgCartEmpty: 'கூடை காலியாக உள்ளது. பொருட்களைச் சேர்க்கவும்.',
    msgProfileUpdated: 'சுயவிவரம் புதுப்பிக்கப்பட்டது!',
    msgCustomerProfileUpdated: 'வாடிக்கையாளர் சுயவிவரம் புதுப்பிக்கப்பட்டது!',
    showAll: 'அனைத்தையும் காட்டு',
    noProduceFound: 'பொருட்கள் எதுவும் கிடைக்கவில்லை.',
    noOrdersReceived: 'ஆர்டர்கள் எதுவும் வரவில்லை.',
    noProductsListed: 'பொருட்கள் எதுவும் பட்டியலிடப்படவில்லை.',
    reactivate: 'மீண்டும் செயல்படுத்து',
    soldOutBtn: 'விற்றுத் தீர்ந்தது',
    deleteBtn: 'நீக்கு',
    viewBtn: 'பார்வை',
    addBtn: '+ சேர்',
    navHome: 'முகப்பு',
    navProducts: 'தயாரிப்புகள்',
    navOrders: 'ஆர்டர்கள்',
    navProfile: 'சுயவிவரம்',
    navCart: 'கூடை',
    navCategories: 'வகைகள்',
    step1Placed: 'ஆர்டர் பதிவு செய்யப்பட்டது',
    step2Accepted: 'விவசாயி ஏற்றுக்கொண்டார்',
    step3Preparing: 'பேக்கிங் செய்யப்படுகிறது',
    step4Ready: 'பிக்கப்பிற்கு தயார்',
    step5Out: 'டெலிவரிக்கு புறப்பட்டது',
    step6Delivered: 'வழங்கப்பட்டது',
    step1Sub: 'வாடிக்கையாளர் நேரடி ஆர்டர் செய்தார்',
    step2Sub: 'விவசாயி அறுவடை இருப்பை உறுதி செய்தார்',
    step3Sub: 'பொருட்கள் சுத்தம் செய்யப்பட்டு பேக் செய்யப்பட்டுள்ளது',
    step4Sub: 'டெலிவரி ரைடருக்காக காத்திருக்கிறது',
    step5Sub: 'ரைடர் புறப்பட்டு விட்டார்',
    step6Sub: 'புதிய அறுவடை உங்கள் வீட்டு வாசலில்',
    customerSetupTitle: 'வாடிக்கையாளர் சுயவிவர அமைப்பு',
    customerSetupSub: 'விவசாயிகளிடமிருந்து நேரடியாக புதிய பொருட்களை ஆர்டர் செய்ய உங்கள் முகவரியை உள்ளிடவும்.',
    deliveryAddressHouse: 'டெலிவரி முகவரி / வீட்டு எண் (தேவை)',
    areaTownLabel: 'கிராமம் / நகரம் / பகுதி (தேவை)',
    pincodeLabel: 'அஞ்சல் குறியீடு (தேவை)',
    errValidPincode: 'சரியான 6 இலக்க அஞ்சல் குறியீட்டை உள்ளிடவும்.',
    errFillRequiredCust: 'தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.',
    confirmDeliveryLocation: 'டெலிவரி இருப்பிடத்தை உறுதிப்படுத்தவும்',
    confirmDeliveryLocationMsg: 'இந்த டெலிவரி முகவரி சரியானது என்பதை நான் உறுதிப்படுத்துகிறேன்',
    deliveryInstructions: 'டெலிவரி வழிமுறைகள் (விருப்பத்திற்குரியது)',
    saveAddress: 'முகவரியைப் புதுப்பிக்கவும்',
    errAddressMissing: 'ஆர்டர் செய்வதற்கு முன் உங்கள் டெலிவரி முகவரியை உள்ளிடவும்.',
    errConfirmAddress: 'தொடர்வதற்கு முன் டெலிவரி சரிபார்ப்புப் பெட்டியைத் தேர்ந்தெடுக்கவும்.',
    simBadge: 'மாதிரி செயல்முறை',
    blueprintTitle: 'AgriNex 22-திரை வரைபடம்',
    jumpToScreen: 'திரைக்குச் செல்லவும் (1–22)',
    screenIndexTitle: 'AgriNex 22-திரை அட்டவணை',
    shortcutsTitle: 'குறுக்குவழிகள்',
    manageListings: 'பட்டியல்களை நிர்வகிக்கவும்',
    incomingOrder: '1 புதிய ஆர்டர்',
    snapCropPic: 'பயிர் படம் எடுக்கவும்',
    earningsMonth: 'இந்த மாதம் ₹42,500',
    aiDetectedTomato: 'AI கண்டறிந்தது: புதிய தக்காளி (98% துல்லியம்)',
    tapToSpeak: 'பேச மைக்ரோஃபோனைத் தட்டவும்',
    produceLabel: 'பயிர்:',
    quantityLabel: 'அளவு:',
    priceLabel: 'விலை:',
    selectDeliveryArea: 'டெலிவரி பகுதியைத் தேர்ந்தெடுக்கவும்',
    customerLabel: 'வாடிக்கையாளர்',
    itemLabel: 'பொருள்',
    destinationLabel: 'சேருமிடம்',
    acceptOrder: 'ஆர்டரை ஏற்கவும்',
    rejectOrder: 'நிராகரிக்கவும்',
    startPacking: 'பேக்கிங் தொடங்கவும்',
    markReadyPickup: 'பிக்கப்பிற்கு தயார் எனக் குறிக்கவும்',
    rejectedStatus: 'நிராகரிக்கப்பட்டது',
    kmAway: 'கி.மீ தூரம்',
    justNow: 'இப்போது',
    todayMorning: 'இன்று, காலை 08:30',
    noNewNotifications: 'தற்போது புதிய அறிவிப்புகள் இல்லை.',
    noUnreadNotifications: 'படிக்காத அறிவிப்புகள் இல்லை.',
    monthlyEarningsAlert: 'மொத்த மாத வருமானம்: 28 நேரடி ஆர்டர்களில் இருந்து ₹42,500.',
    demoOtpAlert: 'டெமோ OTP 1234. உங்கள் வசதிக்காக நிரப்பப்பட்டது.',
    orderStatusUpdated: 'ஆர்டர் நிலை புதுப்பிக்கப்பட்டது:',
    stateTelangana: 'தெலுங்கானா',
    stateAP: 'ஆந்திரப் பிரதேசம்',
    stateKarnataka: 'கர்நாடகா',
    stateTN: 'தமிழ்நாடு',
    stateKerala: 'கேரளா',
    itemsUnit: 'பொருட்கள்',
    availableLabel: 'இருப்பில் உள்ளது',
    farmerLabelInfo: 'விவசாயி',
    deliveryFree: 'இலவசம்',
    deliveryNotesPlaceholder: 'எ.கா. மணியை இரண்டு முறை அடிக்கவும் / வாயிலில் வைக்கவும்',
    getStarted: 'தொடங்குங்கள்',
    deliveryPartnerTitle: 'டெலிவரி பார்ட்னர் முகப்பு',
    deliveryRequestTitle: 'டெலிவரி ஆர்டர் அறிவிப்பு',
    iamDeliveryPartner: 'நான் ஒரு டெலிவரி பார்ட்னர்',
    iamDeliveryPartnerSub: 'பண்ணைகளிலிருந்து புதிய விளைச்சலை எடுத்து வீடுகளுக்கு வழங்கவும்',
    viewRequest: 'கோரிக்கையைக் காண்க',
    acceptDelivery: 'டெலிவரியை ஏற்றுக்கொள்ளுங்கள்',
    rejectDelivery: 'டெலிவரியை நிராகரிக்கவும்',
    onlineStatus: 'ஆன்லைன்',
    offlineStatus: 'ஆஃப்லைன்',
    todayDeliveries: 'இன்றைய டெலிவரிகள்',
    todayEarnings: 'இன்றைய வருவாய்',
    activeDeliveries: 'செயலில் உள்ள டெலிவரிகள்',
    newOrderNotifications: 'புதிய ஆர்டர் அறிவிப்புகள்',
    markDelivered: 'டெலிவரி செய்யப்பட்டது என குறிக்கவும்',
    recentActivity: 'சமீபத்திய டெலிவரி செயல்பாடு',
    newDeliveryRequest: '⚡ அவசர விளைச்சல் டெலிவரி கோரிக்கை',
    deliveryRoute: 'டெலிவரி பாதை',
    pickupFarm: 'பிக்கப்: பண்ணை இடம்',
    deliveryDestination: 'டிராப்-ஆஃப்: வாடிக்கையாளர் முகவரி',
    packagePayoutDetails: 'பேக்கேஜ் மற்றும் பேஅவுட் விவரங்கள்',
    partnerEarnings: 'உங்கள் டெலிவரி பேஅவுட்:',
    switchToDelivery: 'டெலிவரி பார்ட்னர் பயன்பாட்டிற்கு மாறவும்',
    backToDeliveryHome: 'டெலிவரி பார்ட்னர் முகப்பிற்கு திரும்பவும்',
    pendingBadge: 'நிலுவையில் உள்ளது',
    orderTotal: 'மொத்த ஆர்டர் மதிப்பு:'
  },
  kn: {
    appName: 'AgriNex',
    tagline: 'ಹೊಲಗಳನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾ. ತಾಜಾತನವನ್ನು ತಲುಪಿಸುತ್ತಾ.',
    splashTagline: 'ಹೊಲದಿಂದ ನಿಮ್ಮ ಮನೆಗೆ',
    splashSub: 'ರೈತರನ್ನು ನೇರವಾಗಿ ಗ್ರಾಹಕರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ',
    continueToLang: 'ಭಾಷಾ ಆಯ್ಕೆಗೆ ಮುಂದುವರಿಯಿರಿ',
    continue: 'ಮುಂದುವರಿಯಿರಿ',
    back: 'ಹಿಂದೆ',
    close: 'ಮುಚ್ಚಿ',
    langSelectionTitle: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    langSelectionSub: 'ಸ್ಥಳೀಯ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಅನುಭವಕ್ಕಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    directMarketplaceBadge: '100% ನೇರ ರೈತರಿಂದ ಗ್ರಾಹಕರಿಗೆ ಮಾರುಕಟ್ಟೆ',
    iamFarmer: 'ನಾನು ರೈತ',
    iamFarmerSub: 'ತಾಜಾ ಬೆಳೆಯನ್ನು ಪಟ್ಟಿ ಮಾಡಿ, ಬೆಲೆ ನಿಗದಿಪಡಿಸಿ ನೇರವಾಗಿ ಮಾರಿ',
    iamCustomer: 'ನಾನು ಗ್ರಾಹಕ',
    iamCustomerSub: 'ಸ್ಥಳೀಯ ಬೆಳೆಗಾರರಿಂದ ತಾಜಾ ತರಕಾರಿಗಳು, ಹಣ್ಣುಗಳನ್ನು ಖರೀದಿಸಿ',
    exploreLiveProto: 'ಲೈವ್ ಮೂಲಮಾದರಿಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    farmerRegTitle: 'ರೈತರ ನೋಂದಣಿ',
    step1Of3: 'ಹಂತ 1 (ಒಟ್ಟು 3 ರಲ್ಲಿ)',
    step2Of3: 'ಹಂತ 2 (ಒಟ್ಟು 3 ರಲ್ಲಿ)',
    step3Of3: 'ಹಂತ 3 (ಒಟ್ಟು 3 ರಲ್ಲಿ)',
    mobileVerification: 'ಮೊಬೈಲ್ ಪರಿಶೀಲನೆ',
    verifyPhone: 'ಫೋನ್ ಪರಿಶೀಲನೆ',
    autoFillDemoOtp: 'ಡೆಮೊ ಕೋಡ್ ಭರ್ತಿ ಮಾಡಿ (1234)',
    selectState: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    mobileStepHeader: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    mobileStepSub: 'ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ 10 ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
    mobileInputLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    sendCodeBtn: 'ಕೋಡ್ ಕಳುಹಿಸಿ',
    otpStepHeader: 'ದೃಢೀಕರಣ ಕೋಡ್ ನಮೂದಿಸಿ',
    otpStepSub: 'ನಿಮ್ಮ ಮೊಬೈಲ್‌ಗೆ ಕಳುಹಿಸಲಾದ 4 ಅಂಕಿಗಳ ಕೋಡ್ ನಮೂದಿಸಿ.',
    otpSimulationNotice: 'ಪ್ರಾಯೋಗಿಕ ಮಾದರಿ: ಡೆಮೊ ಒಟಿಪಿ 1234. ಎಸ್‌ಎಂಎಸ್ ಕಳುಹಿಸುವುದಿಲ್ಲ.',
    verifyBtn: 'ಪರಿಶೀಲಿಸಿ ಮುಂದುವರಿಯಿರಿ',
    resendCode: 'ಕೋಡ್ ಮರುಕಳುಹಿಸಿ',
    profileSetupTitle: 'ರೈತರ ಪ್ರೊಫೈಲ್ ಸೆಟಪ್',
    profileSetupSub: 'ಗ್ರಾಹಕರಿಗೆ ನಿಮ್ಮ ಕೃಷಿ ಉತ್ಪನ್ನಗಳ ಮಾಹಿತಿ ನೀಡಲು ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.',
    fullNameLabel: 'ಪೂರ್ಣ ಹೆಸರು (ಅಗತ್ಯವಿದೆ)',
    farmNameLabel: 'ಕೃಷಿ ತೋಟದ ಹೆಸರು (ಐಚ್ಛಿಕ)',
    villageLabel: 'ಗ್ರಾಮ / ಪಟ್ಟಣ (ಅಗತ್ಯವಿದೆ)',
    districtLabel: 'ಜಿಲ್ಲೆ (ಅಗತ್ಯವಿದೆ)',
    stateLabel: 'ರಾಜ್ಯ (ಅಗತ್ಯವಿದೆ)',
    cropsLabel: 'ಬೆಳೆಯುವ ಬೆಳೆಗಳು (ಅಗತ್ಯವಿದೆ)',
    farmLocationLabel: 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಐಚ್ಛಿಕ)',
    saveAndContinue: 'ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ',
    errValidPhone: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10 ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
    errInvalidOtp: 'ತಪ್ಪಾದ ಪರಿಶೀಲನಾ ಕೋಡ್. ದಯವಿಟ್ಟು 1234 ನಮೂದಿಸಿ.',
    errFillRequired: 'ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
    speakToAddProduce: 'ಧ್ವನಿಯ ಮೂಲಕ ಬೆಳೆಯನ್ನು ಸೇರಿಸಿ',
    speakToAddSub: 'ಬೆಳೆ, ತೂಕ ಮತ್ತು ಬೆಲೆಯನ್ನು ಹೇಳಿ',
    myProducts: 'ನನ್ನ ಉತ್ಪನ್ನಗಳು',
    myOrders: 'ನನ್ನ ಆರ್ಡರ್‌ಗಳು',
    addByPhoto: 'ಫೋಟೋ ಮೂಲಕ ಸೇರಿಸಿ',
    earnings: 'ಆದಾಯ',
    mandiRates: 'ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರ',
    mandiRatesSub: 'ಟೊಮೆಟೊ: ₹20-22/ಕೆಜಿ • ಪಾಲಕ್: ₹15/ಕಟ್ಟು • ಸ್ವಚ್ಛ ಹವಾಮಾನ (31°C)',
    takePhotoOrGallery: 'ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ',
    clickToSimulatePhoto: 'ಬೆಳೆಯ ಫೋಟೋ ಸೆರೆಹಿಡಿಯಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    produceName: 'ಬೆಳೆಯ ಹೆಸರು',
    quantityKg: 'ಪ್ರಮಾಣ (ಕೆಜಿ)',
    pricePerKg: 'ಪ್ರತಿ ಕೆಜಿ ದರ (₹)',
    previewListing: 'ಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ',
    voiceAddTitle: 'ಧ್ವನಿ ಮೂಲಕ ಬೆಳೆ ಸೇರ್ಪಡೆ',
    tapAndSpeak: 'ಒತ್ತಿ ಮಾತನಾಡಿ',
    voiceExampleHint: 'ಉದಾಹರಣೆಗೆ ಹೇಳಿ:',
    voiceExampleText: '“ನನ್ನ ಬಳಿ 50 ಕಿಲೋ ಟೊಮ್ಯಾಟೊ ಇದೆ. ಕಿಲೋಗೆ 20 ರೂಪಾಯಿ.”',
    parsedListing: 'ಪತ್ತೆಯಾದ ವಿವರಗಳು:',
    confirmListing: 'ಪಟ್ಟಿಯನ್ನು ದೃಢೀಕರಿಸಿ',
    editDetails: 'ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ',
    publishToMarketplace: 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಪ್ರಕಟಿಸಿ',
    productPreviewPublish: 'ಉತ್ಪನ್ನ ಪರಿಶೀಲನೆ / ಪ್ರಕಟಣೆ',
    stockLabel: 'ದಾಸ್ತಾನು:',
    farmerLabel: 'ರೈತ:',
    availableStock: 'ಲಭ್ಯವಿದೆ',
    deliveringTo: 'ತಲುಪಿಸುವ ವಿಳಾಸ',
    searchPlaceholder: 'ತಾಜಾ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...',
    freshToday: 'ಇಂದಿನ ತಾಜಾ ಬೆಳೆ',
    directFarmRates: 'ನೇರ ಹೊಲದ ದರಗಳು',
    categories: 'ವರ್ಗಗಳು',
    catAll: 'ಎಲ್ಲವೂ',
    catVeg: 'ತರಕಾರಿಗಳು',
    catLeafy: 'ಸೊಪ್ಪುಗಳು',
    catFruits: 'ಹಣ್ಣುಗಳು',
    catGrains: 'ಧಾನ್ಯಗಳು',
    voiceSearchTitle: 'ಧ್ವನಿ ಹುಡುಕಾಟ',
    voiceSearchProduce: 'ಧ್ವನಿಯ ಮೂಲಕ ಬೆಳೆ ಹುಡುಕಾಟ',
    voiceSearchSub: 'ಯಾವುದೇ ತರಕಾರಿ, ಸೊಪ್ಪು ಅಥವಾ ಹಣ್ಣಿನ ಹೆಸರು ಹೇಳಿ.',
    trySaying: 'ಇವುಗಳಲ್ಲಿ ಒಂದನ್ನು ಹೇಳಿ ನೋಡಿ:',
    chipSpinach: 'ಪಾಲಕ್',
    chipAmaranth: 'ದಂಟು ಸೊಪ್ಪು',
    chipCoriander: 'ಕೊತ್ತಂಬರಿ',
    chipTomato: 'ಟೊಮೆಟೊ',
    listeningSpeakProduce: 'ಆಲಿಸುತ್ತಿದೆ... ಬೆಳೆಯ ಹೆಸರು ಹೇಳಿ',
    recognizedSearchQuery: 'ಗುರುತಿಸಲಾದ ಹುಡುಕಾಟ ಪದ',
    searchBtn: 'ಹುಡುಕಿ',
    cancelBtn: 'ರದ್ದು',
    productListingTitle: 'ಉತ್ಪನ್ನಗಳ ಪಟ್ಟಿ / ಹುಡುಕಾಟ',
    nearbyFilter: 'ಹತ್ತಿರದ ತೋಟಗಳು (< 25 ಕಿ.ಮೀ)',
    priceLowHigh: 'ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚಿಗೆ',
    availableNow: 'ಈಗ ಲಭ್ಯವಿರುವವು',
    filteredNearby: '25 ಕಿ.ಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿರುವ ಹೊಲಗಳು',
    filteredPriceLow: 'ಕಡಿಮೆ ಬೆಲೆ ಮೊದಲು',
    filteredInStock: 'ದಾಸ್ತಾನು ಇರುವವು ಮಾತ್ರ',
    productDetailsTitle: 'ಉತ್ಪನ್ನದ ವಿವರಗಳು',
    quantityUnitLabel: 'ಪ್ರಮಾಣ (ಕೆಜಿ/ಕಟ್ಟು):',
    adjustQuantity: 'ಪ್ರಮಾಣವನ್ನು ಬದಲಾಯಿಸಿ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    buyNow: 'ಈಗಲೇ ಖರೀದಿಸಿ',
    billBreakdown: 'ಬಿಲ್ ವಿವರಗಳು',
    itemsSubtotal: 'ಉತ್ಪನ್ನಗಳ ಒಟ್ಟು ಮೊತ್ತ',
    deliveryFee: 'ಡೆಲಿವರಿ ಶುಲ್ಕ',
    totalToPay: 'ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
    proceedToCheckout: 'ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ',
    checkoutTitle: 'ಚೆಕ್‌ಔಟ್',
    deliveryAddress: 'ತಲುಪಿಸುವ ವಿಳಾಸ',
    editAddress: 'ವಿಳಾಸ ಸಂಪಾದಿಸಿ',
    orderItems: 'ಆರ್ಡರ್ ಮಾಡಿದ ವಸ್ತುಗಳು',
    grandTotal: 'ಒಟ್ಟು ಮೊತ್ತ',
    paymentMethod: 'ಪಾವತಿ ವಿಧಾನ (ಡೆಮೊ)',
    cashOnDelivery: 'ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ',
    codSub: 'ವಸ್ತುಗಳು ತಲುಪಿದಾಗ ಹಣ ಪಾವತಿಸಿ',
    upiDemo: 'ಯುಪಿಐ / ಕ್ಯೂಆರ್ (ಡೆಮೊ)',
    upiSub: 'ಗೂಗಲ್ ಪೇ, ಫೋನ್‌ಪೇ, ಪೇಟಿಎಂ',
    placeOrder: 'ಆರ್ಡರ್ ಮಾಡಿ',
    backToCart: 'ಕಾರ್ಟ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    orderConfirmed: 'ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ನೀಡಲಾಗಿದೆ!',
    orderConfirmedSub: 'ರೈತರಿಗೆ ನಿಮ್ಮ ಆರ್ಡರ್ ವಿವರಗಳು ತಲುಪಿವೆ.',
    orderIdLabel: 'ಆರ್ಡರ್ ಸಂಖ್ಯೆ:',
    estDeliveryLabel: 'ಅಂದಾಜು ಸಮಯ:',
    paymentLabel: 'ಪಾವತಿ:',
    estDeliveryVal: 'ಇಂದು 3 ಗಂಟೆಯೊಳಗೆ',
    trackOrder: 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    continueShopping: 'ಖರೀದಿ ಮುಂದುವರಿಸಿ',
    orderStatusTitle: 'ಆರ್ಡರ್ ಸ್ಥಿತಿ',
    deliveryProgress: 'ವಿತರಣೆಯ ಹಂತಗಳು',
    advanceDeliveryStatus: 'ವಿತರಣಾ ಸ್ಥಿತಿಯನ್ನು ಮುನ್ನಡೆಸಿ (ಪರೀಕ್ಷೆ)',
    farmerProfileTitle: 'ರೈತರ ಪ್ರೊಫೈಲ್',
    customerProfileTitle: 'ಗ್ರಾಹಕರ ಪ್ರೊಫೈಲ್',
    verifiedDirectFarmer: 'ಪರಿಶೀಲಿಸಿದ ನೇರ ರೈತ',
    profileDetailsTitle: 'ಪ್ರೊಫೈಲ್ ವಿವರಗಳು',
    locationFarmDetails: 'ಸ್ಥಳ / ಕೃಷಿ ವಿವರಗಳು',
    bankAccountPayouts: 'ಆದಾಯಕ್ಕಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆ',
    upcomingFeature: 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿರುವ ವೈಶಿಷ್ಟ್ಯ',
    demoBankAccount: 'ಡೆಮೊ ಬ್ಯಾಂಕ್ ಖಾತೆ: ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ **** 4102',
    saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
    switchToCustomer: 'ಗ್ರಾಹಕರ ಆ್ಯಪ್‌ಗೆ ಬದಲಾಯಿಸಿ',
    switchToFarmer: 'ರೈತರ ಪೋರ್ಟಲ್‌ಗೆ ಬದಲಾಯಿಸಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    verifiedCustomerBadge: 'ಅಗ್ರಿನೆಕ್ಸ್ ಪರಿಶೀಲಿಸಿದ ಗ್ರಾಹಕ',
    personalDetails: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳು',
    saveInfo: 'ಮಾಹಿತಿ ಉಳಿಸಿ',
    orderHistory: 'ಆರ್ಡರ್ ಇತಿಹಾಸ',
    deploymentUrl: 'ವೆಬ್‌ಸೈಟ್ ಲಿಂಕ್',
    openUrl: 'ಲಿಂಕ್ ತೆರೆಯಿರಿ',
    protoModalDesc: 'ಲೈವ್ ವೆಬ್‌ಸೈಟ್ ಲಿಂಕ್‌ಗಾಗಿ ಸ್ಥಳ.',
    msgPublished: 'ನಿಮ್ಮ ಬೆಳೆ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಪ್ರಕಟವಾಯಿತು!',
    confirmDeleteListing: 'ಈ ಪಟ್ಟಿಯನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?',
    msgAddedToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ!',
    msgCartEmpty: 'ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ. ಉತ್ಪನ್ನಗಳನ್ನು ಸೇರಿಸಿ.',
    msgProfileUpdated: 'ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಲಾಗಿದೆ!',
    msgCustomerProfileUpdated: 'ಗ್ರಾಹಕರ ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಲಾಗಿದೆ!',
    showAll: 'ಎಲ್ಲವನ್ನೂ ತೋರಿಸಿ',
    noProduceFound: 'ಯಾವುದೇ ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ.',
    noOrdersReceived: 'ಯಾವುದೇ ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಿಲ್ಲ.',
    noProductsListed: 'ಯಾವುದೇ ಉತ್ಪನ್ನಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.',
    reactivate: 'ಮತ್ತೆ ಸಕ್ರಿಯಗೊಳಿಸಿ',
    soldOutBtn: 'ಮಾರಾಟವಾಗಿದೆ',
    deleteBtn: 'ಅಳಿಸಿ',
    viewBtn: 'ನೋಡಿ',
    addBtn: '+ ಸೇರಿಸಿ',
    navHome: 'ಮುಖಪುಟ',
    navProducts: 'ಉತ್ಪನ್ನಗಳು',
    navOrders: 'ಆರ್ಡರ್‌ಗಳು',
    navProfile: 'ಪ್ರೊಫೈಲ್',
    navCart: 'ಕಾರ್ಟ್',
    navCategories: 'ವರ್ಗಗಳು',
    step1Placed: 'ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    step2Accepted: 'ರೈತರು ಒಪ್ಪಿದ್ದಾರೆ',
    step3Preparing: 'ಪ್ಯಾಕಿಂಗ್ ನಡೆಯುತ್ತಿದೆ',
    step4Ready: 'ಪಿಕಪ್‌ಗೆ ಸಿದ್ಧವಾಗಿದೆ',
    step5Out: 'ವಿತರಣೆಗೆ ಹೊರಟಿದೆ',
    step6Delivered: 'ತಲುಪಿಸಲಾಗಿದೆ',
    step1Sub: 'ಗ್ರಾಹಕರು ನೇರ ಆರ್ಡರ್ ನೀಡಿದ್ದಾರೆ',
    step2Sub: 'ರೈತರು ಲಭ್ಯತೆಯನ್ನು ದೃಢಪಡಿಸಿದ್ದಾರೆ',
    step3Sub: 'ತಾಜಾ ಬೆಳೆ ಸ್ವಚ್ಛಗೊಳಿಸಿ ಪ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ',
    step4Sub: 'ಡೆಲಿವರಿ ರೈಡರ್‌ಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ',
    step5Sub: 'ರೈಡರ್ ಬರುತ್ತಿದ್ದಾರೆ',
    step6Sub: 'ತಾಜಾ ಬೆಳೆ ನಿಮ್ಮ ಮನೆ ತಲುಪಿದೆ',
    customerSetupTitle: 'ಗ್ರಾಹಕರ ಪ್ರೊಫೈಲ್ ಸೆಟಪ್',
    customerSetupSub: 'ರೈತರಿಂದ ನೇರವಾಗಿ ತಾಜಾ ಬೆಳೆಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಲು ನಿಮ್ಮ ವಿಳಾಸದ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.',
    deliveryAddressHouse: 'ವಿತರಣಾ ವಿಳಾಸ / ಮನೆ ಸಂಖ್ಯೆ (ಅಗತ್ಯವಿದೆ)',
    areaTownLabel: 'ಗ್ರಾಮ / ಪಟ್ಟಣ / ಪ್ರದೇಶ (ಅಗತ್ಯವಿದೆ)',
    pincodeLabel: 'ಪಿನ್ ಕೋಡ್ (ಅಗತ್ಯವಿದೆ)',
    errValidPincode: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 6 ಅಂಕಿಗಳ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ.',
    errFillRequiredCust: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಗ್ರಾಹಕ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
    confirmDeliveryLocation: 'ವಿತರಣಾ ಸ್ಥಳವನ್ನು ದೃಢೀಕರಿಸಿ',
    confirmDeliveryLocationMsg: 'ಈ ವಿತರಣಾ ವಿಳಾಸ ನಿಖರವಾಗಿದೆ ಎಂದು ನಾನು ದೃಢೀಕರಿಸುತ್ತೇನೆ',
    deliveryInstructions: 'ವಿತರಣಾ ಸೂಚನೆಗಳು (ಐಚ್ಛಿಕ)',
    saveAddress: 'ವಿಳಾಸವನ್ನು ನವೀಕರಿಸಿ',
    errAddressMissing: 'ಆರ್ಡರ್ ಮಾಡುವ ಮೊದಲು ದಯವಿಟ್ಟು ವಿತರಣಾ ವಿಳಾಸವನ್ನು ಒದಗಿಸಿ.',
    errConfirmAddress: 'ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ವಿಳಾಸ ದೃಢೀಕರಣ ಚೆಕ್‌ಬಾಕ್ಸ್ ಆಯ್ಕೆಮಾಡಿ.',
    simBadge: 'ಪ್ರಾಯೋಗಿಕ ಮಾದರಿ',
    blueprintTitle: 'AgriNex 22-ಪರದೆ ನೀಲನಕ್ಷೆ',
    jumpToScreen: 'ಪರದೆಗೆ ಹೋಗಿ (1–22)',
    screenIndexTitle: 'AgriNex 22-ಪರದೆ ಸೂಚ್ಯಂಕ',
    shortcutsTitle: 'ಶಾರ್ಟ್‌ಕಟ್‌ಗಳು',
    manageListings: 'ಪಟ್ಟಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
    incomingOrder: '1 ಹೊಸ ಆರ್ಡರ್',
    snapCropPic: 'ಬೆಳೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    earningsMonth: 'ಈ ತಿಂಗಳು ₹42,500',
    aiDetectedTomato: 'AI ಪತ್ತೆಹಚ್ಚಿದೆ: ತಾಜಾ ಟೊಮೆಟೊ (98% ನಿಖರತೆ)',
    tapToSpeak: 'ಮಾತನಾಡಲು ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿರಿ',
    produceLabel: 'ಬೆಳೆ:',
    quantityLabel: 'ಪ್ರಮಾಣ:',
    priceLabel: 'ಬೆಲೆ:',
    selectDeliveryArea: 'ವಿತರಣಾ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    customerLabel: 'ಗ್ರಾಹಕರು',
    itemLabel: 'ವಸ್ತು',
    destinationLabel: 'ತಲುಪುವ ಸ್ಥಳ',
    acceptOrder: 'ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಿ',
    rejectOrder: 'ತಿರಸ್ಕರಿಸಿ',
    startPacking: 'ಪ್ಯಾಕಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    markReadyPickup: 'ಪಿಕಪ್‌ಗೆ ಸಿದ್ಧವೆಂದು ಗುರುತಿಸಿ',
    rejectedStatus: 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ',
    kmAway: 'ಕಿ.ಮೀ ದೂರ',
    justNow: 'ಈಗಷ್ಟೇ',
    todayMorning: 'ಇಂದು, ಬೆಳಿಗ್ಗೆ 08:30',
    noNewNotifications: 'ಪ್ರಸ್ತುತ ಯಾವುದೇ ಹೊಸ ಸೂಚನೆಗಳಿಲ್ಲ.',
    noUnreadNotifications: 'ಓದದ ಯಾವುದೇ ಸೂಚನೆಗಳಿಲ್ಲ.',
    monthlyEarningsAlert: 'ಒಟ್ಟು ಮಾಸಿಕ ಆದಾಯ: 28 ಪೂರ್ಣಗೊಂಡ ನೇರ ಆರ್ಡರ್‌ಗಳಿಂದ ₹42,500.',
    demoOtpAlert: 'ಡೆಮೊ OTP 1234 ಆಗಿದೆ. ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕಾಗಿ ನಮೂದಿಸಲಾಗಿದೆ.',
    orderStatusUpdated: 'ಆರ್ಡರ್ ಸ್ಥಿತಿ ನವೀಕರಿಸಲಾಗಿದೆ:',
    stateTelangana: 'ತೆಲಂಗಾಣ',
    stateAP: 'ಆಂಧ್ರಪ್ರದೇಶ',
    stateKarnataka: 'ಕರ್ನಾಟಕ',
    stateTN: 'ತಮಿಳುನಾಡು',
    stateKerala: 'ಕೇರಳ',
    itemsUnit: 'ವಸ್ತುಗಳು',
    availableLabel: 'ಲಭ್ಯವಿದೆ',
    farmerLabelInfo: 'ರೈತ',
    deliveryFree: 'ಉಚಿತ',
    deliveryNotesPlaceholder: 'ಉದಾ. ಗಂಟೆ ಎರಡು ಬಾರಿ ಬಾರಿಸಿ / ಗೇಟ್ ಬಳಿ ಇರಿಸಿ',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    deliveryPartnerTitle: 'ಡೆಲಿವರಿ ಪಾಲುದಾರರ ಮುಖಪುಟ',
    deliveryRequestTitle: 'ಡೆಲಿವರಿ ಆದೇಶ ಅಧಿಸೂಚನೆ',
    iamDeliveryPartner: 'ನಾನು ಡೆಲಿವರಿ ಪಾಲುದಾರ',
    iamDeliveryPartnerSub: 'ಹೊಲಗಳಿಂದ ತಾಜಾ ಬೆಳೆಯನ್ನು ಪಡೆದು ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪಿಸಿ',
    viewRequest: 'ವಿನಂತಿಯನ್ನು ವೀಕ್ಷಿಸಿ',
    acceptDelivery: 'ಡೆಲಿವರಿಯನ್ನು ಸ್ವೀಕರಿಸಿ',
    rejectDelivery: 'ಡೆಲಿವರಿಯನ್ನು ತಿರಸ್ಕರಿಸಿ',
    onlineStatus: 'ಆನ್‌ಲೈನ್',
    offlineStatus: 'ಆಫ್‌ಲೈನ್',
    todayDeliveries: 'ಇಂದಿನ ಡೆಲಿವರಿಗಳು',
    todayEarnings: 'ಇಂದಿನ ಗಳಿಕೆ',
    activeDeliveries: 'ಸಕ್ರಿಯ ಡೆಲಿವರಿಗಳು',
    newOrderNotifications: 'ಹೊಸ ಆದೇಶ ಅಧಿಸೂಚನೆಗಳು',
    markDelivered: 'ತಲುಪಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    recentActivity: 'ಇತ್ತೀಚಿನ ಡೆಲಿವರಿ ಚಟುವಟಿಕೆ',
    newDeliveryRequest: '⚡ ತುರ್ತು ಬೆಳೆ ಡೆಲಿವರಿ ವಿನಂತಿ',
    deliveryRoute: 'ಡೆಲಿವರಿ ಮಾರ್ಗ',
    pickupFarm: 'ಪಿಕಪ್: ಕೃಷಿ ಸ್ಥಳ',
    deliveryDestination: 'ಡ್ರಾಪ್-ಆಫ್: ಗ್ರಾಹಕರ ವಿಳಾಸ',
    packagePayoutDetails: 'ಪ್ಯಾಕೇಜ್ ಮತ್ತು ಪಾವತಿ ವಿವರಗಳು',
    partnerEarnings: 'ನಿಮ್ಮ ಡೆಲಿವರಿ ಪಾವತಿ:',
    switchToDelivery: 'ಡೆಲಿವರಿ ಪಾಲುದಾರ ಅಪ್ಲಿಕೇಶನ್‌ಗೆ ಬದಲಿಸಿ',
    backToDeliveryHome: 'ಡೆಲಿವರಿ ಪಾಲುದಾರ ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    pendingBadge: 'ಬಾಕಿ ಇದೆ',
    orderTotal: 'ಒಟ್ಟು ಆದೇಶ ಮೌಲ್ಯ:'
  },
  ml: {
    appName: 'AgriNex',
    tagline: 'പാടങ്ങളെ ബന്ധിപ്പിച്ച്. പുതുമ എത്തിക്കുന്നു.',
    splashTagline: 'പാടത്തുനിന്ന് നിങ്ങളുടെ വീട്ടിലേക്ക്',
    splashSub: 'കർഷകരെ നേരിട്ട് ഉപഭോക്താക്കളുമായി ബന്ധിപ്പിക്കുന്നു',
    continueToLang: 'ഭാഷ തിരഞ്ഞെടുക്കലിലേക്ക് തുടരുക',
    continue: 'തുടരുക',
    back: 'പിന്നിലേക്ക്',
    close: 'അടയ്ക്കുക',
    langSelectionTitle: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    langSelectionSub: 'പ്രാദേശിക കർഷക വിപണി അനുഭവത്തിനായി നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക.',
    directMarketplaceBadge: '100% നേരിട്ടുള്ള കർഷക-ഉപഭോക്തൃ വിപണി',
    iamFarmer: 'ഞാൻ ഒരു കർഷകനാണ്',
    iamFarmerSub: 'പുതിയ വിളവുകൾ ചേർക്കൂ, വില നിശ്ചയിച്ച് നേരിട്ട് വിൽക്കൂ',
    iamCustomer: 'ഞാൻ ഒരു ഉപഭോക്താവാണ്',
    iamCustomerSub: 'പ്രാദേശിക കർഷകരിൽ നിന്ന് പുതിയ പച്ചക്കറികളും പഴങ്ങളും വാങ്ങൂ',
    exploreLiveProto: 'തത്സമയ പ്രോട്ടോടൈപ്പ് കാണുക',
    farmerRegTitle: 'കർഷക രജിസ്ട്രേഷൻ',
    step1Of3: 'ഘട്ടം 1 (ആകെ 3ൽ)',
    step2Of3: 'ഘട്ടം 2 (ആകെ 3ൽ)',
    step3Of3: 'ഘട്ടം 3 (ആകെ 3ൽ)',
    mobileVerification: 'മൊബൈൽ പരിശോധന',
    verifyPhone: 'ഫോൺ പരിശോധന',
    autoFillDemoOtp: 'ഡെമോ കോഡ് നൽകുക (1234)',
    selectState: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
    mobileStepHeader: 'മൊബൈൽ നമ്പർ നൽകുക',
    mobileStepSub: 'തുടങ്ങുന്നതിനായി നിങ്ങളുടെ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.',
    mobileInputLabel: 'മൊബൈൽ നമ്പർ',
    sendCodeBtn: 'കോഡ് അയക്കുക',
    otpStepHeader: 'പരിശോധനാ കോഡ് നൽകുക',
    otpStepSub: 'നിങ്ങളുടെ മൊബൈലിലേക്ക് അയച്ച 4 അക്ക കോഡ് നൽകുക.',
    otpSimulationNotice: 'പ്രോട്ടോടൈപ്പ് ഡെമോ: ഡെമോ ഒടിപി 1234. എസ്എംഎസ് അയക്കില്ല.',
    verifyBtn: 'പരിശോധിച്ച് തുടരുക',
    resendCode: 'കോഡ് വീണ്ടും അയക്കുക',
    profileSetupTitle: 'കർഷക പ്രൊഫൈൽ സെറ്റപ്പ്',
    profileSetupSub: 'ഉപഭോക്താക്കൾക്ക് നിങ്ങളുടെ വിളവുകൾ അറിയാൻ വിവരങ്ങൾ നൽകുക.',
    fullNameLabel: 'മുഴുവൻ പേര് (ആവശ്യമാണ്)',
    farmNameLabel: 'ഫാം പേര് (ഐച്ഛികം)',
    villageLabel: 'ഗ്രാമം / നഗരം (ആവശ്യമാണ്)',
    districtLabel: 'ജില്ല (ആവശ്യമാണ്)',
    stateLabel: 'സംസ്ഥാനം (ആവശ്യമാണ്)',
    cropsLabel: 'കൃഷി ചെയ്യുന്ന വിളകൾ (ആവശ്യമാണ്)',
    farmLocationLabel: 'സ്ഥലവിസ്തൃതി (ഐച്ഛികം)',
    saveAndContinue: 'സേവ് ചെയ്ത് തുടരുക',
    errValidPhone: 'സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.',
    errInvalidOtp: 'തെറ്റായ കോഡ്. ഡെമോ കോഡ് 1234 നൽകുക.',
    errFillRequired: 'ആവശ്യമായ എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക.',
    speakToAddProduce: 'ശബ്ദം വഴി വിള ചേർക്കുക',
    speakToAddSub: 'വിളവ്, അളവ്, വില പറയുക',
    myProducts: 'എന്റെ ഉൽപ്പന്നങ്ങൾ',
    myOrders: 'എന്റെ ഓർഡറുകൾ',
    addByPhoto: 'ഫോട്ടോ വഴി ചേർക്കുക',
    earnings: 'വരുമാനം',
    mandiRates: 'ഇന്നത്തെ മാർക്കറ്റ് നിരക്ക്',
    mandiRatesSub: 'തക്കാളി: ₹20-22/കിലോ • ചീര: ₹15/കെട്ട് • തെളിഞ്ഞ കാലാവസ്ഥ (31°C)',
    takePhotoOrGallery: 'ഫോട്ടോ എടുക്കുക അല്ലെങ്കിൽ ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക',
    clickToSimulatePhoto: 'വിളവിന്റെ ഫോട്ടോ പകർത്താൻ ക്ലിക്ക് ചെയ്യുക',
    produceName: 'ഉൽപ്പന്നത്തിന്റെ പേര്',
    quantityKg: 'അളവ് (കിലോ)',
    pricePerKg: 'കിലോ നിരക്ക് (₹)',
    previewListing: 'ലിസ്റ്റിംഗ് കാണുക',
    voiceAddTitle: 'ശബ്ദത്തിലൂടെ വിള ചേർക്കൽ',
    tapAndSpeak: 'ടാപ്പ് ചെയ്ത് സംസാരിക്കുക',
    voiceExampleHint: 'ഉദാഹരണത്തിന് പറയുക:',
    voiceExampleText: '“എന്റെ പക്കൽ 50 കിലോ തക്കാളിയുണ്ട്. കിലോയ്ക്ക് 20 രൂപ.”',
    parsedListing: 'കണ്ടെത്തിയ വിവരങ്ങൾ:',
    confirmListing: 'ലിസ്റ്റിംഗ് സ്ഥിരീകരിക്കുക',
    editDetails: 'വിവരങ്ങൾ തിരുത്തുക',
    publishToMarketplace: 'വിപണിയിൽ പ്രസിദ്ധീകരിക്കുക',
    productPreviewPublish: 'ഉൽപ്പന്ന പ്രിവ്യൂ / പ്രസിദ്ധീകരണം',
    stockLabel: 'സ്റ്റോക്ക്:',
    farmerLabel: 'കർഷകൻ:',
    availableStock: 'ലഭ്യമാണ്',
    deliveringTo: 'ഡെലിവറി സ്ഥലം',
    searchPlaceholder: 'പുതിയ ഫാം ഉൽപ്പന്നങ്ങൾ തിരയുക...',
    freshToday: 'ഇന്നത്തെ പുതിയ വിളവ്',
    directFarmRates: 'നേരിട്ടുള്ള ഫാം നിരക്കുകൾ',
    categories: 'വിഭാഗങ്ങൾ',
    catAll: 'എല്ലാം',
    catVeg: 'പച്ചക്കറികൾ',
    catLeafy: 'ഇലക്കറികൾ',
    catFruits: 'പഴങ്ങൾ',
    catGrains: 'ധാന്യങ്ങൾ',
    voiceSearchTitle: 'ശബ്ദ തിരയൽ',
    voiceSearchProduce: 'ശബ്ദത്തിലൂടെ വിള തിരയൽ',
    voiceSearchSub: 'പച്ചക്കറി, ഇലക്കറി അല്ലെങ്കിൽ പഴത്തിന്റെ പേര് പറയുക.',
    trySaying: 'ഇവയിലൊന്ന് പറഞ്ഞുനോക്കൂ:',
    chipSpinach: 'ചീര',
    chipAmaranth: 'തണ്ട് ചീര',
    chipCoriander: 'മല്ലിയില',
    chipTomato: 'തക്കാളി',
    listeningSpeakProduce: 'കേൾക്കുന്നു... പേര് പറയുക',
    recognizedSearchQuery: 'തിരിച്ചറിഞ്ഞ വാക്ക്',
    searchBtn: 'തിരയുക',
    cancelBtn: 'റദ്ദാക്കുക',
    productListingTitle: 'ഉൽപ്പന്ന പട്ടിക / തിരയൽ',
    nearbyFilter: 'അടുത്തുള്ള തോട്ടങ്ങൾ (< 25 കി.മീ)',
    priceLowHigh: 'വില: കുറഞ്ഞത് മുതൽ കൂടിയത്',
    availableNow: 'ഇപ്പോൾ ലഭ്യമായവ',
    filteredNearby: 'അടുത്തുള്ള ഫാമുകൾ (25 കി.മീറ്ററിനുള്ളിൽ)',
    filteredPriceLow: 'കുറഞ്ഞ വില ആദ്യം',
    filteredInStock: 'സ്റ്റോക്കുള്ളവ മാത്രം',
    productDetailsTitle: 'ഉൽപ്പന്ന വിവരങ്ങൾ',
    quantityUnitLabel: 'അളവ് (കിലോ/കെട്ട്):',
    adjustQuantity: 'അളവ് മാറ്റുക',
    addToCart: 'കാർട്ടിലേക്ക് ചേർക്കുക',
    buyNow: 'ഇപ്പോൾ വാങ്ങുക',
    billBreakdown: 'ബിൽ വിവരങ്ങൾ',
    itemsSubtotal: 'ഉൽപ്പന്നങ്ങളുടെ ആകെത്തുക',
    deliveryFee: 'ഡെലിവറി നിരക്ക്',
    totalToPay: 'നൽകേണ്ട തുക',
    proceedToCheckout: 'ചെക്ക്ഔട്ടിലേക്ക് തുടരുക',
    checkoutTitle: 'ചെക്ക്ഔട്ട്',
    deliveryAddress: 'ഡെലിവറി വിലാസം',
    editAddress: 'വിലാസം മാറ്റുക',
    orderItems: 'ഓർഡർ ചെയ്തവ',
    grandTotal: 'ആകെ തുക',
    paymentMethod: 'പേയ്‌മെന്റ് രീതി (ഡെമോ)',
    cashOnDelivery: 'ക്യാഷ് ഓൺ ഡെലിവറി',
    codSub: 'സാധനങ്ങൾ ലഭിക്കുമ്പോൾ പണം നൽകുക',
    upiDemo: 'യുപിഐ / ക്യുആർ (ഡെമോ)',
    upiSub: 'ഗൂഗിൾ പേ, ഫോൺപേ, പേടിഎം',
    placeOrder: 'ഓർഡർ ചെയ്യുക',
    backToCart: 'കാർട്ടിലേക്ക് തിരികെ',
    orderConfirmed: 'ഓർഡർ വിജയകരമായി നൽകി!',
    orderConfirmedSub: 'കർഷകന് നിങ്ങളുടെ ഓർഡർ വിവരങ്ങൾ ലഭിച്ചു.',
    orderIdLabel: 'ഓർഡർ നമ്പർ:',
    estDeliveryLabel: 'പ്രതീക്ഷിക്കുന്ന സമയം:',
    paymentLabel: 'പേയ്‌മെന്റ്:',
    estDeliveryVal: 'ഇന്ന് 3 മണിക്കൂറിനുള്ളിൽ',
    trackOrder: 'ഓർഡർ ട്രാക്ക് ചെയ്യുക',
    continueShopping: 'ഷോപ്പിംഗ് തുടരുക',
    orderStatusTitle: 'ഓർഡർ നില',
    deliveryProgress: 'ഡെലിവറി പുരോഗതി',
    advanceDeliveryStatus: 'ഡെലിവറി നില മാറ്റുക (പരീക്ഷണം)',
    farmerProfileTitle: 'കർഷക പ്രൊഫൈൽ',
    customerProfileTitle: 'ഉപഭോക്തൃ പ്രൊഫൈൽ',
    verifiedDirectFarmer: 'പരിശോധിച്ചുറപ്പിച്ച കർഷകൻ',
    profileDetailsTitle: 'പ്രൊഫൈൽ വിവരങ്ങൾ',
    locationFarmDetails: 'സ്ഥലം / ഫാം വിവരങ്ങൾ',
    bankAccountPayouts: 'വരുമാനത്തിനായുള്ള ബാങ്ക് അക്കൗണ്ട്',
    upcomingFeature: 'ഉടൻ വരുന്ന ഫീച്ചർ',
    demoBankAccount: 'ഡെമോ ബാങ്ക് അക്കൗണ്ട്: സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ഇന്ത്യ **** 4102',
    saveChanges: 'മാറ്റങ്ങൾ സേവ് ചെയ്യുക',
    switchToCustomer: 'കസ്റ്റമർ ആപ്പിലേക്ക് മാറുക',
    switchToFarmer: 'കർഷക പോർട്ടലിലേക്ക് മാറുക',
    logout: 'ലോഗ് ഔട്ട്',
    verifiedCustomerBadge: 'അഗ്രിനെക്സ് ഉപഭോക്താവ്',
    personalDetails: 'വ്യക്തിഗത വിവരങ്ങൾ',
    saveInfo: 'വിവരങ്ങൾ സേവ് ചെയ്യുക',
    orderHistory: 'ഓർഡർ ചരിത്രം',
    deploymentUrl: 'വെബ്‌സൈറ്റ് ലിങ്ക്',
    openUrl: 'ലിങ്ക് തുറക്കുക',
    protoModalDesc: 'തത്സമയ വെബ്‌സൈറ്റ് ലിങ്കിനായുള്ള സ്ഥലം.',
    msgPublished: 'നിങ്ങളുടെ വിള വിപണിയിൽ പ്രസിദ്ധീകരിച്ചു!',
    confirmDeleteListing: 'ഈ ലിസ്റ്റിംഗ് ഇല്ലാതാക്കണോ?',
    msgAddedToCart: 'കാർട്ടിലേക്ക് ചേർത്തു!',
    msgCartEmpty: 'കാർട്ട് ശൂന്യമാണ്. ഉൽപ്പന്നങ്ങൾ ചേർക്കുക.',
    msgProfileUpdated: 'പ്രൊഫൈൽ പുതുക്കി!',
    msgCustomerProfileUpdated: 'ഉപഭോക്തൃ പ്രൊഫൈൽ പുതുക്കി!',
    showAll: 'എല്ലാം കാണിക്കുക',
    noProduceFound: 'വിളവുകൾ ഒന്നും കണ്ടെത്തിയില്ല.',
    noOrdersReceived: 'ഓർഡറുകൾ ഒന്നും ലഭിച്ചിട്ടില്ല.',
    noProductsListed: 'ഉൽപ്പന്നങ്ങൾ ഒന്നും ചേർത്തിട്ടില്ല.',
    reactivate: 'വീണ്ടും സജീവമാക്കുക',
    soldOutBtn: 'തീർന്നുപോയി',
    deleteBtn: 'നീക്കം ചെയ്യുക',
    viewBtn: 'കാണുക',
    addBtn: '+ ചേർക്കുക',
    navHome: 'ഹോം',
    navProducts: 'ഉൽപ്പന്നങ്ങൾ',
    navOrders: 'ഓർഡറുകൾ',
    navProfile: 'പ്രൊഫൈൽ',
    navCart: 'കാർട്ട്',
    navCategories: 'വിഭാഗങ്ങൾ',
    step1Placed: 'ഓർഡർ നൽകി',
    step2Accepted: 'കർഷകൻ സ്വീകരിച്ചു',
    step3Preparing: 'പാക്കിംഗ് നടക്കുന്നു',
    step4Ready: 'പിക്കപ്പിന് തയ്യാറാണ്',
    step5Out: 'ഡെലിവറിക്ക് പുറപ്പെട്ടു',
    step6Delivered: 'ഡെലിവറി ചെയ്തു',
    step1Sub: 'ഉപഭോക്താവ് നേരിട്ട് ഓർഡർ നൽകി',
    step2Sub: 'കർഷകൻ വിള ലഭ്യത സ്ഥിരീകരിച്ചു',
    step3Sub: 'വിളവുകൾ വൃത്തിയാക്കി പായ്ക്ക് ചെയ്തു',
    step4Sub: 'ഡെലിവറി റൈഡർക്കായി കാത്തിരിക്കുന്നു',
    step5Sub: 'റൈഡർ വഴിയിലാണ്',
    step6Sub: 'പുതിയ വിളവ് നിങ്ങളുടെ പടിക്കൽ എത്തി',
    customerSetupTitle: 'ഉപഭോക്തൃ പ്രൊഫൈൽ ക്രമീകരണം',
    customerSetupSub: 'കർഷകരിൽ നിന്ന് നേരിട്ട് പുതിയ വിളവുകൾ വാങ്ങാൻ നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക.',
    deliveryAddressHouse: 'ഡെലിവറി വിലാസം / വീട്ടുനമ്പർ (ആവശ്യമാണ്)',
    areaTownLabel: 'ഗ്രാമം / നഗരം / പ്രദേശം (ആവശ്യമാണ്)',
    pincodeLabel: 'പിൻ കോഡ് (ആവശ്യമാണ്)',
    errValidPincode: 'സാധുവായ 6 അക്ക പിൻ കോഡ് നൽകുക.',
    errFillRequiredCust: 'ആവശ്യമായ എല്ലാ വിവരങ്ങളും നൽകുക.',
    confirmDeliveryLocation: 'ഡെലിവറി സ്ഥലം സ്ഥിരീകരിക്കുക',
    confirmDeliveryLocationMsg: 'ഈ ഡെലിവറി വിലാസം കൃത്യമാണെന്ന് ഞാൻ സ്ഥിരീകരിക്കുന്നു',
    deliveryInstructions: 'ഡെലിവറി നിർദ്ദേശങ്ങൾ (ഐച്ഛികം)',
    saveAddress: 'വിലാസം പുതുക്കുക',
    errAddressMissing: 'ഓർഡർ നൽകുന്നതിന് മുൻപ് ഡെലിവറി വിലാസം നൽകുക.',
    errConfirmAddress: 'തുടരുന്നതിന് മുൻപ് ഡെലിവറി സ്ഥിരീകരണ ചെക്ക്ബോക്സ് തിരഞ്ഞെടുക്കുക.',
    simBadge: 'പ്രോട്ടോടൈപ്പ് ഡെമോ',
    blueprintTitle: 'AgriNex 22-സ്ക്രീൻ ബ്ലൂപ്രിന്റ്',
    jumpToScreen: 'സ്ക്രീനിലേക്ക് പോകുക (1–22)',
    screenIndexTitle: 'AgriNex 22-സ്ക്രീൻ ഇൻഡക്സ്',
    shortcutsTitle: 'ഷോർട്ട്കട്ടുകൾ',
    manageListings: 'ലിസ്റ്റിംഗുകൾ നിയന്ത്രിക്കുക',
    incomingOrder: '1 പുതിയ ഓർഡർ',
    snapCropPic: 'വിളയുടെ ചിത്രം എടുക്കുക',
    earningsMonth: 'ഈ മാസം ₹42,500',
    aiDetectedTomato: 'AI തിരിച്ചറിഞ്ഞു: പുതിയ തക്കാളി (98% കൃത്യത)',
    tapToSpeak: 'സംസാരിക്കാൻ മൈക്രോഫോൺ അമർത്തുക',
    produceLabel: 'ഉൽപ്പന്നം:',
    quantityLabel: 'അളവ്:',
    priceLabel: 'വില:',
    selectDeliveryArea: 'ഡെലിവറി പ്രദേശം തിരഞ്ഞെടുക്കുക',
    customerLabel: 'ഉപഭോക്താവ്',
    itemLabel: 'ഇനം',
    destinationLabel: 'ലക്ഷ്യസ്ഥാനം',
    acceptOrder: 'ഓർഡർ സ്വീകരിക്കുക',
    rejectOrder: 'നിരസിക്കുക',
    startPacking: 'പാക്കിംഗ് ആരംഭിക്കുക',
    markReadyPickup: 'പിക്കപ്പിന് തയ്യാറെന്ന് രേഖപ്പെടുത്തുക',
    rejectedStatus: 'നിരസിച്ചു',
    kmAway: 'കി.മീ അകലെ',
    justNow: 'ഇപ്പോൾ',
    todayMorning: 'ഇന്ന്, രാവിലെ 08:30',
    noNewNotifications: 'നിലവിൽ പുതിയ അറിയിപ്പുകൾ ഒന്നുമില്ല.',
    noUnreadNotifications: 'വായിക്കാത്ത അറിയിപ്പുകൾ ഇല്ല.',
    monthlyEarningsAlert: 'ആകെ പ്രതിമാസ വരുമാനം: പൂർത്തിയായ 28 നേരിട്ടുള്ള ഓർഡറുകളിൽ നിന്ന് ₹42,500.',
    demoOtpAlert: 'ഡെമോ ഒടിപി 1234 ആണ്. നിങ്ങളുടെ സൗകര്യത്തിനായി നൽകിയിരിക്കുന്നു.',
    orderStatusUpdated: 'ഓർഡർ നില പുതുക്കി:',
    stateTelangana: 'തെലങ്കാന',
    stateAP: 'ആന്ധ്രാപ്രദേശ്',
    stateKarnataka: 'ಕರ್ನಾಟಕ',
    stateTN: 'തമിഴ്നാട്',
    stateKerala: 'കേരളം',
    itemsUnit: 'ഇനങ്ങൾ',
    availableLabel: 'ലഭ്യമാണ്',
    farmerLabelInfo: 'കർഷകൻ',
    deliveryFree: 'സൗജന്യം',
    deliveryNotesPlaceholder: 'ഉദാ. ബെൽ രണ്ട് തവണ അടിക്കുക / ഗേറ്റിൽ വെയ്ക്കുക',
    getStarted: 'ആരംഭിക്കുക',
    deliveryPartnerTitle: 'ഡെലിവറി പാർട്ണർ ഹോം',
    deliveryRequestTitle: 'ഡെലിവറി ഓർഡർ അറിയിപ്പ്',
    iamDeliveryPartner: 'ഞാൻ ഒരു ഡെലിവറി പാർട്ണർ ആണ്',
    iamDeliveryPartnerSub: 'പാടങ്ങളിൽ നിന്ന് പുതിയ വിളവുകൾ ശേഖരിച്ച് വീട്ടുപടിക്കൽ എത്തിക്കുക',
    viewRequest: 'അഭ്യർത്ഥന കാണുക',
    acceptDelivery: 'ഡെലിവറി സ്വീകരിക്കുക',
    rejectDelivery: 'ഡെലിവറി നിരസിക്കുക',
    onlineStatus: 'ഓൺലൈൻ',
    offlineStatus: 'ഓഫ്‌ലൈൻ',
    todayDeliveries: 'ഇന്നത്തെ ഡെലിവറികൾ',
    todayEarnings: 'ഇന്നത്തെ വരുമാനം',
    activeDeliveries: 'സജീവ ഡെലിവറികൾ',
    newOrderNotifications: 'പുതിയ ഓർഡർ അറിയിപ്പുകൾ',
    markDelivered: 'ഡെലിവർ ചെയ്തു എന്ന് അടയാളപ്പെടുത്തുക',
    recentActivity: 'സമീപകാല ഡെലിവറി പ്രവർത്തനം',
    newDeliveryRequest: '⚡ അടിയന്തര വിളവ് ഡെലിവറി അഭ്യർത്ഥന',
    deliveryRoute: 'ഡെലിവറി റൂട്ട്',
    pickupFarm: 'പിക്കപ്പ്: ഫാം ലൊക്കേഷൻ',
    deliveryDestination: 'ഡ്രോപ്പ്-ഓഫ്: ഉപഭോക്തൃ വിലാസം',
    packagePayoutDetails: 'പാക്കേജ്, പേഔട്ട് വിശദാംശങ്ങൾ',
    partnerEarnings: 'നിങ്ങളുടെ ഡെലിവറി പേഔട്ട്:',
    switchToDelivery: 'ഡെലിവറി പാർട്ണർ ആപ്പിലേക്ക് മാറുക',
    backToDeliveryHome: 'ഡെലിവറി പാർട്ണർ ഹോമിലേക്ക് മടങ്ങുക',
    pendingBadge: 'തീർപ്പാക്കാത്തത്',
    orderTotal: 'ഓർഡർ ആകെ തുക:'
  }
};

// Helper: Translate Key
function t(key) {
  const currentLang = state.language || 'en';
  if (i18n[currentLang] && i18n[currentLang][key]) {
    return i18n[currentLang][key];
  }
  if (i18n['en'] && i18n['en'][key]) {
    return i18n['en'][key];
  }
  return key;
}


// Helper: Localized Crop Name (supports crop object or order item string)
function getLocalizedCropName(itemOrCrop) {
  if (!itemOrCrop) return '';
  const lang = state.language || 'en';
  if (typeof itemOrCrop === 'object') {
    if (itemOrCrop.names && itemOrCrop.names[lang]) {
      return itemOrCrop.names[lang];
    }
    return itemOrCrop.name || itemOrCrop.names?.en || 'Produce';
  }
  if (typeof itemOrCrop === 'string') {
    const trimmed = itemOrCrop.trim().toLowerCase();
    const prod = state.products.find(p => 
      p.names && Object.values(p.names).some(n => n.toLowerCase() === trimmed)
    );
    if (prod && prod.names && prod.names[lang]) {
      return prod.names[lang];
    }
    return itemOrCrop;
  }
  return itemOrCrop;
}

// Helper: Localized Order Item String (handles comma-separated item names)
function getLocalizedOrderItem(itemStr) {
  if (!itemStr) return '';
  return itemStr.split(',').map(s => getLocalizedCropName(s.trim())).join(', ');
}

// Helper: Localized Unit (e.g. kg, bunch, items)
function getLocalizedUnit(unit) {
  if (!unit) return '';
  const lang = state.language || 'en';
  const units = {
    kg: { en: 'kg', te: 'కిలో', hi: 'किग्रा', ta: 'கிலோ', kn: 'ಕೆಜಿ', ml: 'കിലോ' },
    bunch: { en: 'bunch', te: 'కట్ట', hi: 'गुच्छा', ta: 'கட்டு', kn: 'ಕಟ್ಟು', ml: 'കെട്ട്' },
    items: { en: 'items', te: 'వస్తువులు', hi: 'सामान', ta: 'பொருட்கள்', kn: 'ವಸ್ತುಗಳು', ml: 'இനങ്ങൾ' },
    item: { en: 'item', te: 'వస్తువు', hi: 'सामान', ta: 'பொருள்', kn: 'ವಸ್ತು', ml: 'ഇനം' }
  };
  const u = unit.toLowerCase().trim();
  return (units[u] && units[u][lang]) ? units[u][lang] : unit;
}

// Helper: Localized Quantity (e.g. '2 kg' -> '2 కిలోలు' / '2 किलो')
function getLocalizedQuantity(qtyStr) {
  if (!qtyStr) return '';
  const lang = state.language || 'en';
  const unitMap = {
    kg: { en: 'kg', te: 'కిలోలు', hi: 'किलो', ta: 'கிலோ', kn: 'ಕೆಜಿ', ml: 'കിലോ' },
    bunch: { en: 'bunch', te: 'కట్ట', hi: 'गुच्छा', ta: 'கட்டு', kn: 'ಕಟ್ಟು', ml: 'കെട്ട്' },
    items: { en: 'items', te: 'వస్తువులు', hi: 'सामान', ta: 'பொருட்கள்', kn: 'ವಸ್ತುಗಳು', ml: 'இനങ്ങൾ' },
    item: { en: 'item', te: 'వస్తువు', hi: 'सामान', ta: 'பொருள்', kn: 'ವಸ್ತು', ml: 'ഇനം' }
  };
  return qtyStr.replace(/(\d+)\s*(kg|bunch|items|item)/gi, (match, num, unit) => {
    const u = unit.toLowerCase();
    if (unitMap[u] && unitMap[u][lang]) {
      return `${num} ${unitMap[u][lang]}`;
    }
    return match;
  });
}

// Helper: Localized Crop Category
function getLocalizedCategory(cat) {
  switch ((cat || '').toLowerCase()) {
    case 'vegetables': return t('catVeg');
    case 'leafy': return t('catLeafy');
    case 'fruits': return t('catFruits');
    case 'grains': return t('catGrains');
    default: return cat;
  }
}

// Helper: Localized Crop Badge
function getLocalizedBadge(crop) {
  const lang = state.language || 'en';
  if (crop && crop.badge && typeof crop.badge === 'object' && crop.badge[lang]) {
    return crop.badge[lang];
  }
  return typeof crop.badge === 'string' ? crop.badge : t('freshToday');
}

// Helper: Localized Order Status
function getLocalizedOrderStatus(status) {
  switch (status) {
    case 'Order Placed': return t('step1Placed');
    case 'Farmer Accepted': return t('step2Accepted');
    case 'Preparing': return t('step3Preparing');
    case 'Ready for Pickup': return t('step4Ready');
    case 'Out for Delivery': return t('step5Out');
    case 'Delivered': return t('step6Delivered');
    case 'Rejected': return t('rejectedStatus');
    default: return status;
  }
}

// Helper: Localized Distance string
function getLocalizedDistance(distStr) {
  if (!distStr) return '';
  const num = distStr.replace(/[^0-9]/g, '');
  return `${num} ${t('kmAway')}`;
}



// Apply selected language across all UI elements
function applyLanguage(lang) {
  state.language = lang;

  // Persist selected language across navigation and page reloads
  try {
    localStorage.setItem('agrinex_lang', lang);
  } catch (e) {}

  // Update HTML document language attribute
  document.documentElement.lang = lang;

  // Update all [data-i18n] DOM elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) {
      el.textContent = text;
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = t(key);
    if (text) {
      el.placeholder = text;
    }
  });

  // Update dropdown options with data-i18n
  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) {
      el.textContent = text;
    }
  });

  // Highlight selected card on Screen 2
  document.querySelectorAll('.lang-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.lang === lang);
  });

  // Update top bar screen label
  const labelEl = document.getElementById('current-screen-label');
  if (labelEl) {
    const item = screenCatalog.find(s => s.id === state.currentScreen);
    labelEl.innerText = `Screen ${state.currentScreen}: ${item ? item.name : ''}`;
  }

  // Refresh dynamic personalized greetings, orders, catalog and views
  updateGreetings();
  renderAllViews();
}

// Master Navigation Router
function navigateTo(screenId) {
  state.currentScreen = parseInt(screenId, 10);
  
  // Deactivate all screens
  document.querySelectorAll('.screen').forEach(scr => {
    scr.classList.remove('active');
  });

  // Activate target screen
  const target = document.getElementById(`screen-${state.currentScreen}`);
  if (target) {
    target.classList.add('active');
    const scrollable = target.querySelector('.screen-scrollable');
    if (scrollable) {
      scrollable.scrollTop = 0;
    }
  }

  // Update drawer active item and top bar label
  const labelEl = document.getElementById('current-screen-label');
  if (labelEl) {
    const item = screenCatalog.find(s => s.id === state.currentScreen);
    labelEl.innerText = `Screen ${state.currentScreen}: ${item ? item.name : ''}`;
  }

  document.querySelectorAll('.drawer-item').forEach(item => {
    item.classList.toggle('active-item', parseInt(item.dataset.screen, 10) === state.currentScreen);
  });

  closeDrawer();
  syncBottomNav(state.currentScreen);
  onScreenEntered(state.currentScreen);
}
window.navigateTo = navigateTo;

// Synchronize Bottom Navigation highlights across all screens
function syncBottomNav(screenId) {
  // Farmer Bottom Nav
  document.querySelectorAll('.farmer-nav').forEach(nav => {
    const items = nav.querySelectorAll('.nav-item');
    items.forEach(it => it.classList.remove('active'));
    if (screenId === 5 && items[0]) items[0].classList.add('active');
    else if (screenId === 9 && items[1]) items[1].classList.add('active');
    else if (screenId === 10 && items[2]) items[2].classList.add('active');
    else if (screenId === 19 && items[3]) items[3].classList.add('active');
  });

  // Customer Bottom Nav
  document.querySelectorAll('.customer-nav').forEach(nav => {
    const items = nav.querySelectorAll('.nav-item');
    items.forEach(it => it.classList.remove('active'));
    if (screenId === 11 && items[0]) items[0].classList.add('active');
    else if (screenId === 13 && items[1]) items[1].classList.add('active');
    else if (screenId === 15 && items[2]) items[2].classList.add('active');
    else if (screenId === 18 && items[3]) items[3].classList.add('active');
    else if (screenId === 20 && items[4]) items[4].classList.add('active');
  });
}

function onScreenEntered(screenId) {
  if (screenId === 3) {
    showWelcomeRoles();
  }
  if (screenId === 4) {
    // Reset to step A on entering Screen 4
    showFarmerRegStep('mobile');
  }
  if (screenId === 5 || screenId === 19) {
    updateGreetings();
  }
  if (screenId === 8) {
    populatePublishPreview();
  }
  if (screenId === 9) {
    renderMyProducts();
  }
  if (screenId === 10) {
    renderFarmerOrders();
  }
  if (screenId === 11) {
    renderCustomerHome();
  }
  if (screenId === 13) {
    renderProductListing();
  }
  if (screenId === 14) {
    renderProductDetails(state.currentProductDetailId);
  }
  if (screenId === 15) {
    renderCart();
  }
  if (screenId === 16) {
    renderCheckout();
  }
  if (screenId === 18) {
    renderTrackOrder();
  }
  if (screenId === 20) {
    renderCustomerProfile();
  }
  if (screenId === 21) {
    renderDeliveryRequestDetail();
  }
  if (screenId === 22) {
    renderDeliveryPartnerHome();
  }
}

// ----------------------------------------------------
// Screen 3: Customer Registration Flow (Screen 3 -> Screen 11)
// ----------------------------------------------------

function startCustomerRegistration() {
  const roleView = document.getElementById('welcome-role-view');
  const regView = document.getElementById('welcome-customer-setup-view');
  if (roleView) roleView.style.display = 'none';
  if (regView) {
    regView.style.display = 'flex';
    const firstInp = document.getElementById('cust-setup-name');
    if (firstInp && !firstInp.value) firstInp.focus();
  }
  hideError('cust-setup-error');
}

function showWelcomeRoles() {
  const roleView = document.getElementById('welcome-role-view');
  const regView = document.getElementById('welcome-customer-setup-view');
  if (regView) regView.style.display = 'none';
  if (roleView) roleView.style.display = 'flex';
  hideError('cust-setup-error');
}

function saveCustomerRegistration() {
  const nameInput = document.getElementById('cust-setup-name');
  const phoneInput = document.getElementById('cust-setup-phone');
  const addressInput = document.getElementById('cust-setup-address');
  const areaInput = document.getElementById('cust-setup-area');
  const districtInput = document.getElementById('cust-setup-district');
  const stateInput = document.getElementById('cust-setup-state');
  const pincodeInput = document.getElementById('cust-setup-pincode');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const area = areaInput ? areaInput.value.trim() : '';
  const district = districtInput ? districtInput.value.trim() : '';
  const stateVal = stateInput ? stateInput.value.trim() : '';
  const pincode = pincodeInput ? pincodeInput.value.trim() : '';

  // Validate required inputs
  let hasError = false;
  [nameInput, addressInput, areaInput, districtInput, stateInput].forEach(inp => {
    if (inp) {
      if (!inp.value.trim()) {
        inp.classList.add('has-error');
        hasError = true;
      } else {
        inp.classList.remove('has-error');
      }
    }
  });

  // Mobile number format (10 digits)
  if (!/^\d{10}$/.test(phone)) {
    if (phoneInput) phoneInput.classList.add('has-error');
    showError('cust-setup-error', t('errValidPhone'));
    return;
  } else if (phoneInput) {
    phoneInput.classList.remove('has-error');
  }

  // PIN code format (6 digits)
  if (!/^\d{6}$/.test(pincode)) {
    if (pincodeInput) pincodeInput.classList.add('has-error');
    showError('cust-setup-error', t('errValidPincode'));
    return;
  } else if (pincodeInput) {
    pincodeInput.classList.remove('has-error');
  }

  if (hasError) {
    showError('cust-setup-error', t('errFillRequiredCust'));
    return;
  }

  hideError('cust-setup-error');

  // Save into application state
  state.customer.name = name;
  state.customer.phone = `+91 ${phone}`;
  state.customer.addressLine = address;
  state.customer.area = area;
  state.customer.district = district;
  state.customer.state = stateVal;
  state.customer.pincode = pincode;
  state.customer.address = `${address}, ${area}, ${district}, ${stateVal} - ${pincode}`;
  state.customer.registered = true;

  // Refresh greetings and location header
  updateGreetings();

  // Reset Screen 3 view back to role selection
  showWelcomeRoles();

  // Advance to Screen 11: Customer Home
  navigateTo(11);
}

// ----------------------------------------------------
// Screen 4: Multi-Step Farmer Registration Flow
// ----------------------------------------------------

function showFarmerRegStep(step) {
  state.farmerRegStep = step;
  
  const stepMobile = document.getElementById('farmer-step-mobile');
  const stepOtp = document.getElementById('farmer-step-otp');
  const stepDetails = document.getElementById('farmer-step-details');
  const backBtn = document.getElementById('farmer-reg-back-btn');

  if (stepMobile) stepMobile.classList.toggle('active-step', step === 'mobile');
  if (stepOtp) stepOtp.classList.toggle('active-step', step === 'otp');
  if (stepDetails) stepDetails.classList.toggle('active-step', step === 'details');

  // Configure back button behavior per step
  if (backBtn) {
    if (step === 'mobile') {
      backBtn.onclick = () => navigateTo(3); // Back to Welcome
    } else if (step === 'otp') {
      backBtn.onclick = () => showFarmerRegStep('mobile');
    } else if (step === 'details') {
      backBtn.onclick = () => showFarmerRegStep('otp');
    }
  }

  // Clear errors on step change
  hideError('farmer-phone-error');
  hideError('farmer-otp-error');
  hideError('setup-farmer-error');
}

// Step 4A: Mobile validation & Send Code
function farmerSendCode() {
  const phoneInput = document.getElementById('farmer-reg-phone');
  const phoneVal = phoneInput ? phoneInput.value.trim() : '';

  // Validate 10-digit mobile number
  if (!/^\d{10}$/.test(phoneVal)) {
    showError('farmer-phone-error', t('errValidPhone'));
    if (phoneInput) phoneInput.classList.add('has-error');
    return;
  }

  if (phoneInput) phoneInput.classList.remove('has-error');
  hideError('farmer-phone-error');
  state.tempPhone = phoneVal;

  // Clear previous OTP boxes
  for (let i = 1; i <= 4; i++) {
    const box = document.getElementById(`otp-${i}`);
    if (box) box.value = '';
  }

  // Advance to Step 4B: OTP Verification
  showFarmerRegStep('otp');
  const firstBox = document.getElementById('otp-1');
  if (firstBox) firstBox.focus();
}

// Step 4B: Verify OTP
function farmerVerifyOtp() {
  const o1 = (document.getElementById('otp-1')?.value || '').trim();
  const o2 = (document.getElementById('otp-2')?.value || '').trim();
  const o3 = (document.getElementById('otp-3')?.value || '').trim();
  const o4 = (document.getElementById('otp-4')?.value || '').trim();
  const enteredOtp = `${o1}${o2}${o3}${o4}`;

  // Prototype demo OTP check
  if (enteredOtp !== '1234') {
    showError('farmer-otp-error', t('errInvalidOtp'));
    return;
  }

  hideError('farmer-otp-error');
  
  // Advance to Step 4C: Farmer Profile Setup (starts blank, not prefilled)
  showFarmerRegStep('details');
  const nameInput = document.getElementById('setup-farmer-name');
  if (nameInput) {
    nameInput.value = ''; // Clean start as requested
    nameInput.focus();
  }
}

function farmerAutoFillOtp() {
  const code = '1234';
  for (let i = 1; i <= 4; i++) {
    const box = document.getElementById(`otp-${i}`);
    if (box) box.value = code[i - 1];
  }
  hideError('farmer-otp-error');
}

function farmerResendOtp() {
  farmerAutoFillOtp();
  alert(t('demoOtpAlert'));
}

// Step 4C: Save Farmer Details & Advance to Screen 5
function saveFarmerProfileSetup() {
  const nameInput = document.getElementById('setup-farmer-name');
  const farmNameInput = document.getElementById('setup-farm-name');
  const villageInput = document.getElementById('setup-farmer-village');
  const districtInput = document.getElementById('setup-farmer-district');
  const stateInput = document.getElementById('setup-farmer-state');
  const cropsInput = document.getElementById('setup-farmer-crops');
  const locationInput = document.getElementById('setup-farm-location');

  const name = nameInput ? nameInput.value.trim() : '';
  const farmName = farmNameInput ? farmNameInput.value.trim() : '';
  const village = villageInput ? villageInput.value.trim() : '';
  const district = districtInput ? districtInput.value.trim() : '';
  const stateVal = stateInput ? stateInput.value.trim() : '';
  const crops = cropsInput ? cropsInput.value.trim() : '';
  const location = locationInput ? locationInput.value.trim() : '';

  // Strict Validation: Required fields cannot be empty
  let hasError = false;
  [nameInput, villageInput, districtInput, stateInput, cropsInput].forEach(inp => {
    if (inp) {
      if (!inp.value.trim()) {
        inp.classList.add('has-error');
        hasError = true;
      } else {
        inp.classList.remove('has-error');
      }
    }
  });

  if (hasError) {
    showError('setup-farmer-error', t('errFillRequired'));
    return;
  }

  hideError('setup-farmer-error');

  // Save into persistent state
  state.farmer.name = name;
  state.farmer.farmName = farmName || `${name}'s Farm`;
  state.farmer.village = village;
  state.farmer.district = district;
  state.farmer.state = stateVal;
  state.farmer.crops = crops;
  state.farmer.location = `${village}, ${district}, ${stateVal}` + (location ? ` (${location})` : '');
  state.farmer.phone = `+91 ${state.tempPhone || '98765 43210'}`;

  // Update personalized greetings
  updateGreetings();

  // Navigate to Screen 5: Farmer Dashboard
  navigateTo(5);
}

function showError(elId, msg) {
  const el = document.getElementById(elId);
  if (el) {
    el.innerText = msg;
    el.style.display = 'block';
  }
}

function hideError(elId) {
  const el = document.getElementById(elId);
  if (el) {
    el.style.display = 'none';
  }
}

// Dynamic Personalized Greetings
function updateGreetings() {
  const farmerGreetDash = document.getElementById('farmer-greeting-dashboard');
  const farmerGreetProfile = document.getElementById('farmer-greeting-profile');
  const currentLang = state.language || 'en';
  const farmerName = state.farmer.name || 'Farmer';

  let greetingText = '';
  if (currentLang === 'te') {
    greetingText = `నమస్కారం, ${farmerName}!`;
  } else if (currentLang === 'hi') {
    greetingText = `नमस्ते, ${farmerName}!`;
  } else if (currentLang === 'en') {
    greetingText = `Welcome, ${farmerName}!`;
  } else if (currentLang === 'ta') {
    greetingText = `வணக்கம், ${farmerName}!`;
  } else if (currentLang === 'kn') {
    greetingText = `ನಮಸ್ಕಾರ, ${farmerName}!`;
  } else if (currentLang === 'ml') {
    greetingText = `നമസ്കാരം, ${farmerName}!`;
  } else {
    greetingText = `Welcome, ${farmerName}!`;
  }

  if (farmerGreetDash) farmerGreetDash.innerText = greetingText;
  if (farmerGreetProfile) farmerGreetProfile.innerText = greetingText;

  // Farmer location badge on dashboard
  const locEl = document.getElementById('farmer-dashboard-location');
  if (locEl) locEl.innerText = `${state.farmer.village || 'Guntur'}, ${state.farmer.district || 'Andhra Pradesh'}`;

  // Customer Personalized Greetings
  const custGreetHome = document.getElementById('customer-greeting-home');
  const custGreetProfile = document.getElementById('customer-greeting-profile');
  const custHeaderLoc = document.getElementById('customer-header-location');
  const custNameSuffix = state.customer.name ? `, ${state.customer.name}` : '';

  let custGreeting = `Welcome${custNameSuffix}!`;
  if (currentLang === 'te') {
    custGreeting = `నమస్కారం${custNameSuffix}!`;
  } else if (currentLang === 'hi') {
    custGreeting = `नमस्ते${custNameSuffix}!`;
  } else if (currentLang === 'ta') {
    custGreeting = `வரவேற்பு${custNameSuffix}!`;
  } else if (currentLang === 'kn') {
    custGreeting = `ಸ್ವಾಗತ${custNameSuffix}!`;
  } else if (currentLang === 'ml') {
    custGreeting = `സ്വാഗതം${custNameSuffix}!`;
  } else {
    custGreeting = `Welcome${custNameSuffix}!`;
  }

  if (custGreetHome) custGreetHome.innerText = custGreeting;
  if (custGreetProfile) custGreetProfile.innerText = custGreeting;

  if (custHeaderLoc) {
    if (state.customer.area || state.customer.district) {
      custHeaderLoc.innerText = `${state.customer.area || ''}${state.customer.area && state.customer.district ? ', ' : ''}${state.customer.district || ''}`;
    } else {
      custHeaderLoc.innerText = t('selectDeliveryArea');
    }
  }

  // Bind values in Screen 19 & 20 profile forms
  const fNameInput = document.getElementById('farmer-name-input');
  if (fNameInput) fNameInput.value = state.farmer.name || '';
  const fPhoneInput = document.getElementById('farmer-phone-input');
  if (fPhoneInput) fPhoneInput.value = state.farmer.phone || '';
  const fLocInput = document.getElementById('farmer-location-input');
  if (fLocInput) fLocInput.value = state.farmer.location || '';

  const cNameInput = document.getElementById('cust-name-input');
  if (cNameInput) cNameInput.value = state.customer.name || '';
  const cPhoneInput = document.getElementById('cust-phone-input');
  if (cPhoneInput) cPhoneInput.value = state.customer.phone || '';
  const cAddrInput = document.getElementById('cust-address-input');
  if (cAddrInput) cAddrInput.value = state.customer.address || '';
}

// ----------------------------------------------------
// Product Catalog & Interactions
// ----------------------------------------------------

function getLocalizedCropName(crop) {
  const lang = state.language || 'en';
  if (crop && crop.names && crop.names[lang]) {
    return crop.names[lang];
  }
  return crop.name || crop.names?.en || 'Produce';
}

function getLocalizedBadge(crop) {
  const lang = state.language || 'en';
  if (crop && crop.badge && typeof crop.badge === 'object' && crop.badge[lang]) {
    return crop.badge[lang];
  }
  return typeof crop.badge === 'string' ? crop.badge : t('freshToday');
}

// Photo Upload Simulation (Screen 6)
function simulatePhotoUpload(type) {
  const previewBox = document.getElementById('photo-preview-box');
  const aiBadge = document.getElementById('ai-photo-badge');
  const nameInput = document.getElementById('photo-prod-name');
  const qtyInput = document.getElementById('photo-prod-qty');
  const priceInput = document.getElementById('photo-prod-price');

  if (previewBox) {
    previewBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80')";
  }
  if (aiBadge) aiBadge.style.display = 'inline-flex';
  
  const currentLang = state.language || 'en';
    const cropNames = {
    en: 'Fresh Country Tomatoes',
    te: 'à°¤à°¾à°œà°¾ à°¦à±‡à°¶à±€ à°Ÿà°®à±‹à°Ÿà°¾à°²à±',
    hi: 'à¤¤à¤¾à¤œà¤¼à¤¾ à¤¦à¥‡à¤¸à¥€ à¤Ÿà¤®à¤¾à¤Ÿà¤°',
    ta: 'à®ªà¯à®¤à®¿à®¯ à®¨à®¾à®Ÿà¯à®Ÿà¯ à®¤à®•à¯à®•à®¾à®³à®¿',
    kn: 'à²¤à²¾à²œà²¾ à²¨à²¾à²¡à³ à²Ÿà³Šà²®à³à²¯à²¾à²Ÿà³Šà²—à²³à³',
    ml: 'à´ªàµà´¤à´¿à´¯ à´¨à´¾à´Ÿàµ» à´¤à´•àµà´•à´¾à´³à´¿'
  };
  const cropTitle = cropNames[currentLang] || cropNames.en;
  if (nameInput) nameInput.value = cropTitle;
  if (qtyInput) qtyInput.value = '50';
  if (priceInput) priceInput.value = '20';

      state.pendingProduct = {
      names: {
        en: 'Fresh Country Tomatoes',
        te: 'à°¤à°¾à°œà°¾ à°¦à±‡à°¶à±€ à°Ÿà°®à±‹à°Ÿà°¾à°²à±',
        hi: 'à¤¤à¤¾à¤œà¤¼à¤¾ à¤¦à¥‡à¤¸à¥€ à¤Ÿà¤®à¤¾à¤Ÿà¤°',
        ta: 'à®ªà¯à®¤à®¿à®¯ à®¨à®¾à®Ÿà¯à®Ÿà¯ à®¤à®•à¯à®•à®¾à®³à®¿',
        kn: 'à²¤à²¾à²œà²¾ à²¨à²¾à²¡à³ à²Ÿà³Šà²®à³à²¯à²¾à²Ÿà³Šà²—à²³à³',
        ml: 'à´ªàµà´¤à´¿à´¯ à´¨à´¾à´Ÿàµ» à´¤à´•àµà´•à´¾à´³à´¿'
      },
      category: 'vegetables',
      quantity: 50,
      price: 20,
      unit: 'kg',
      farmer: state.farmer.name,
    location: state.farmer.location,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
  };
}

function previewPhotoListing() {
  populatePublishPreview();
  navigateTo(8);
}

// Voice Add Produce Simulation (Screen 7)
function simulateVoiceRecording() {
  const resultBox = document.getElementById('voice-result-box');
  const statusEl = document.getElementById('voice-status-text');
  
  const listeningTexts = {
    en: 'Listening to speech...',
    te: 'వినబడుతోంది...',
    hi: 'आवाज़ सुनी जा रही है...',
    ta: 'குரல் கேட்கிறது...',
    kn: 'ಆಲಿಸಲಾಗುತ್ತಿದೆ...',
    ml: 'ശബ്ദം കേൾക്കുന്നു...'
  };
  const recognizedTexts = {
    en: 'Recognized & Structured!',
    te: 'విజయవంతంగా గుర్తించబడింది!',
    hi: 'सफलतापूर्वक पहचाना गया!',
    ta: 'வெற்றிகரமாக அடையாளம் காணப்பட்டது!',
    kn: 'ಯಶಸ್ವಿಯಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ!',
    ml: 'വിജയകരമായി തിരിച്ചറിഞ്ഞു!'
  };
  
  if (statusEl) statusEl.innerText = listeningTexts[state.language] || listeningTexts.en;
  
  setTimeout(() => {
    if (statusEl) statusEl.innerText = recognizedTexts[state.language] || recognizedTexts.en;
    if (resultBox) resultBox.style.display = 'block';
    
        state.pendingProduct = {
      names: {
        en: 'Fresh Country Tomatoes',
        te: 'à°¤à°¾à°œà°¾ à°¦à±‡à°¶à±€ à°Ÿà°®à±‹à°Ÿà°¾à°²à±',
        hi: 'à¤¤à¤¾à¤œà¤¼à¤¾ à¤¦à¥‡à¤¸à¥€ à¤Ÿà¤®à¤¾à¤Ÿà¤°',
        ta: 'à®ªà¯à®¤à®¿à®¯ à®¨à®¾à®Ÿà¯à®Ÿà¯ à®¤à®•à¯à®•à®¾à®³à®¿',
        kn: 'à²¤à²¾à²œà²¾ à²¨à²¾à²¡à³ à²Ÿà³Šà²®à³à²¯à²¾à²Ÿà³Šà²—à²³à³',
        ml: 'à´ªàµà´¤à´¿à´¯ à´¨à´¾à´Ÿàµ» à´¤à´•àµà´•à´¾à´³à´¿'
      },
      category: 'vegetables',
      quantity: 50,
      price: 20,
      unit: 'kg',
      farmer: state.farmer.name,
      location: state.farmer.location,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
    };

    // Update parsed output label
    const parsedCropName = document.getElementById('parsed-crop-name');
    if (parsedCropName) parsedCropName.innerText = getLocalizedCropName(state.pendingProduct);
  }, 600);
}

function confirmVoiceListing() {
  populatePublishPreview();
  navigateTo(8);
}

// Screen 8: Preview & Publish
function populatePublishPreview() {
  const imgEl = document.getElementById('preview-image');
  const titleEl = document.getElementById('preview-title');
  const priceEl = document.getElementById('preview-price');
  const qtyEl = document.getElementById('preview-qty');
  const farmerEl = document.getElementById('preview-farmer');

  if (imgEl) imgEl.src = state.pendingProduct.image;
  if (titleEl) titleEl.innerText = getLocalizedCropName(state.pendingProduct);
  if (priceEl) priceEl.innerText = `₹${state.pendingProduct.price} / ${getLocalizedUnit(state.pendingProduct.unit || 'kg')}`;
  if (qtyEl) qtyEl.innerText = `${state.pendingProduct.quantity} ${getLocalizedUnit(state.pendingProduct.unit || 'kg')}`;
  if (farmerEl) farmerEl.innerText = `${state.farmer.name} • ${state.farmer.village}, ${state.farmer.district}`;
}

function publishPendingProduct() {
  const newId = Date.now();
  const newProduct = {
    id: newId,
    names: state.pendingProduct.names,
    category: state.pendingProduct.category || 'vegetables',
    price: state.pendingProduct.price,
    unit: state.pendingProduct.unit,
    stock: state.pendingProduct.quantity,
    farmer: state.farmer.name,
    location: state.farmer.location,
    distance: '15 km away',
    image: state.pendingProduct.image,
    badge: {
      en: 'Direct Farm Harvest',
      te: 'తాజా పంట',
      hi: 'सीधे खेत की ताज़ा फ़सल',
      ta: 'புதிய அறுவடை',
      kn: 'ತಾಜಾ ಸುಗ್ಗಿ',
      ml: 'പുതിയ വിളവെടുപ്പ്'
    },
    soldOut: false
  };

  state.products.unshift(newProduct);
  alert(t('msgPublished'));
  navigateTo(9); // My Products
}

// Screen 9: My Products
function renderMyProducts() {
  const container = document.getElementById('my-products-list');
  if (!container) return;

  const farmerProducts = state.products.filter(p => p.farmer === state.farmer.name);

  if (farmerProducts.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 28px 16px;">
        <p>${t('noProductsListed')}</p>
        <button class="btn btn-primary btn-sm" onclick="navigateTo(6)" style="margin-top:10px;">+ ${t('addByPhoto')}</button>
      </div>
    `;
    return;
  }

  container.innerHTML = farmerProducts.map(p => `
    <div class="card" style="padding:10px; display:flex; gap:10px; align-items:center;">
      <img src="${p.image}" alt="${getLocalizedCropName(p)}" style="width:64px; height:64px; border-radius:8px; object-fit:cover; flex-shrink:0;">
      <div style="flex:1;">
        <div style="font-weight:700; font-size:13.5px; color:var(--text-main);">${getLocalizedCropName(p)}</div>
        <div style="font-size:12.5px; color:var(--primary-dark); font-weight:700; margin:2px 0;">₹${p.price}/${getLocalizedUnit(p.unit)}</div>
        <div style="font-size:11px; color:${p.soldOut ? 'var(--danger)' : 'var(--text-muted)'}; font-weight:600;">
          ${p.soldOut ? `● ${t('soldOutBtn')}` : `● ${p.stock} ${getLocalizedUnit(p.unit)}`}
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:5px;">
        <button class="btn btn-outline btn-sm" style="font-size:10.5px; padding:3px 8px;" onclick="toggleSoldOut(${p.id})">
          ${p.soldOut ? t('reactivate') : t('soldOutBtn')}
        </button>
        <button class="btn btn-outline-danger btn-sm" style="font-size:10.5px; padding:3px 8px;" onclick="deleteFarmerProduct(${p.id})">
          ${t('deleteBtn')}
        </button>
      </div>
    </div>
  `).join('');
}

function toggleSoldOut(id) {
  const prod = state.products.find(p => p.id === id);
  if (prod) {
    prod.soldOut = !prod.soldOut;
    renderMyProducts();
  }
}

function deleteFarmerProduct(id) {
  if (confirm(t('confirmDeleteListing'))) {
    state.products = state.products.filter(p => p.id !== id);
    renderMyProducts();
  }
}

// Screen 10: Farmer Orders
function renderFarmerOrders() {
  const container = document.getElementById('farmer-orders-list');
  if (!container) return;

  if (state.orders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 28px 16px;">
        <p>${t('noOrdersReceived')}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.orders.map(o => `
    <div class="order-card">
      <div class="order-header">
        <span class="order-id">#${o.id}</span>
        <span class="order-status-badge ${getStatusBadgeClass(o.status)}">${getLocalizedOrderStatus(o.status)}</span>
      </div>
      <div style="font-size:13px; margin-bottom:5px;">
        <strong>${t('customerLabel')}:</strong> ${o.customerName} (${o.customerPhone})
      </div>
      <div style="font-size:12.5px; color:var(--text-muted); margin-bottom:5px;">
        <strong>${t('itemLabel')}:</strong> ${getLocalizedOrderItem(o.item)} • ${getLocalizedQuantity(o.quantity)}
      </div>
      <div style="font-size:12.5px; margin-bottom:6px;">
        <strong>${t('grandTotal')}:</strong> ₹${o.total}
      </div>
      <div style="font-size:11.5px; color:var(--text-muted); margin-bottom:10px;">
        <strong>${t('destinationLabel')}:</strong> ${o.address}
      </div>
      <div style="display:flex; gap:6px;">
        ${o.status === 'Order Placed' ? `
          <button class="btn btn-fresh btn-sm" onclick="updateOrderStatus('${o.id}', 'Farmer Accepted')">${t('acceptOrder')}</button>
          <button class="btn btn-outline-danger btn-sm" onclick="updateOrderStatus('${o.id}', 'Rejected')">${t('rejectOrder')}</button>
        ` : o.status === 'Farmer Accepted' ? `
          <button class="btn btn-fresh btn-sm" onclick="updateOrderStatus('${o.id}', 'Preparing')">${t('startPacking')}</button>
          <button class="btn btn-primary btn-sm" onclick="updateOrderStatus('${o.id}', 'Ready for Pickup')">${t('markReadyPickup')}</button>
        ` : o.status === 'Preparing' ? `
          <button class="btn btn-primary btn-sm" onclick="updateOrderStatus('${o.id}', 'Ready for Pickup')">${t('markReadyPickup')}</button>
        ` : `
          <span style="font-size:12px; color:var(--primary-dark); font-weight:700;">${t('orderStatusTitle')}: ${getLocalizedOrderStatus(o.status)}</span>
        `}
      </div>
    </div>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const ord = state.orders.find(o => o.id === orderId);
  if (ord) {
    ord.status = newStatus;
    renderFarmerOrders();
    alert(`#${orderId} ${t('orderStatusUpdated')} ${getLocalizedOrderStatus(newStatus)}`);
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Order Placed': return 'status-pending';
    case 'Farmer Accepted': return 'status-accepted';
    case 'Preparing':
    case 'Ready for Pickup': return 'status-ready';
    case 'Out for Delivery':
    case 'Delivered': return 'status-delivered';
    default: return 'status-pending';
  }
}

// Screen 11: Customer Home
function renderCustomerHome() {
  const container = document.getElementById('fresh-today-grid');
  if (!container) return;

  const freshList = state.products.slice(0, 4);
  container.innerHTML = freshList.map(p => `
    <div class="produce-card" onclick="viewProductDetail(${p.id})">
      <img src="${p.image}" alt="${getLocalizedCropName(p)}" class="produce-img">
      <div class="produce-body">
        <div>
          <div class="sim-badge" style="margin-bottom:3px; font-size:9.5px;">${getLocalizedBadge(p)}</div>
          <div class="produce-title">${getLocalizedCropName(p)}</div>
          <div class="produce-farmer">👨‍🌾 ${p.farmer} • ${getLocalizedDistance(p.distance)}</div>
        </div>
        <div>
          <div class="produce-price">₹${p.price} <span style="font-size:10.5px; font-weight:normal; color:#666;">/${getLocalizedUnit(p.unit)}</span></div>
          <div class="produce-actions">
            <button class="btn btn-fresh btn-sm" style="flex:1;" onclick="event.stopPropagation(); quickAddToCart(${p.id})">+ ${t('navCart')}</button>
            <button class="btn btn-outline btn-sm" style="padding:3px 7px;" onclick="event.stopPropagation(); viewProductDetail(${p.id})">${t('viewBtn')}</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  updateCartNavBadge();
}

function filterCategory(cat, el) {
  state.activeFilter = cat;
  document.querySelectorAll('#cat-chips .filter-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  navigateTo(13);
}

// Voice Search Simulation (Screen 12)
function simulateVoiceSearch(term) {
  const inputEl = document.getElementById('voice-search-result-display');
  if (inputEl) {
    inputEl.value = term;
  }
  setTimeout(() => {
    state.activeFilter = term;
    navigateTo(13);
  }, 400);
}

// Screen 13: Product Listing / Search
function renderProductListing() {
  const container = document.getElementById('search-products-grid');
  const countEl = document.getElementById('listing-count');
  if (!container) return;

  let filtered = state.products.filter(p => !p.soldOut);

  if (state.activeFilter && state.activeFilter !== 'all') {
    const fLower = state.activeFilter.toLowerCase();
    filtered = filtered.filter(p => {
      const matchCat = p.category && p.category.toLowerCase().includes(fLower);
      const matchName = Object.values(p.names || {}).some(n => n.toLowerCase().includes(fLower));
      return matchCat || matchName;
    });
  }

  if (countEl) countEl.innerText = `${filtered.length} ${t('navProducts')}`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:28px 16px;">
        <p>${t('noProduceFound')}</p>
        <button class="btn btn-outline btn-sm" style="margin-top:10px;" onclick="state.activeFilter='all'; renderProductListing();">${t('showAll')}</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="produce-card" onclick="viewProductDetail(${p.id})">
      <img src="${p.image}" alt="${getLocalizedCropName(p)}" class="produce-img">
      <div class="produce-body">
        <div>
          <div class="produce-title">${getLocalizedCropName(p)}</div>
          <div class="produce-farmer">👨‍🌾 ${p.farmer} • ${getLocalizedDistance(p.distance)}</div>
        </div>
        <div>
          <div class="produce-price">₹${p.price} <span style="font-size:10.5px; font-weight:normal; color:#666;">/${getLocalizedUnit(p.unit)}</span></div>
          <div class="produce-actions">
            <button class="btn btn-fresh btn-sm" style="flex:1;" onclick="event.stopPropagation(); quickAddToCart(${p.id})">+ ${t('navCart')}</button>
            <button class="btn btn-outline btn-sm" style="padding:3px 7px;" onclick="event.stopPropagation(); viewProductDetail(${p.id})">${t('viewBtn')}</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Screen 14: Product Details
let detailQuantity = 1;
function viewProductDetail(productId) {
  state.currentProductDetailId = productId;
  detailQuantity = 1;
  navigateTo(14);
}

function renderProductDetails(productId) {
  const p = state.products.find(item => item.id === productId) || state.products[0];
  if (!p) return;

  const imgEl = document.getElementById('detail-img');
  const titleEl = document.getElementById('detail-title');
  const priceEl = document.getElementById('detail-price');
  const farmerEl = document.getElementById('detail-farmer-info');
  const stockEl = document.getElementById('detail-stock');
  const descEl = document.getElementById('detail-desc');
  const qtyEl = document.getElementById('detail-qty-display');

  if (imgEl) imgEl.src = p.image;
  if (titleEl) titleEl.innerText = getLocalizedCropName(p);
  if (priceEl) priceEl.innerText = `₹${p.price} / ${getLocalizedUnit(p.unit || 'kg')}`;
  if (farmerEl) farmerEl.innerHTML = `ðŸ‘¨â€ðŸŒ¾ <strong>${t('farmer')}:</strong> ${p.farmer} â€¢ ${p.location} (${p.distance})`;
  if (stockEl) stockEl.innerText = `${p.stock} ${getLocalizedUnit(p.unit || 'kg')}`;
  if (descEl && p.description) {
    const lang = state.language || 'en';
    descEl.innerText = p.description[lang] || p.description.en || '';
  }
  if (qtyEl) qtyEl.innerText = detailQuantity;
}

function changeDetailQty(delta) {
  detailQuantity = Math.max(1, detailQuantity + delta);
  const qtyEl = document.getElementById('detail-qty-display');
  if (qtyEl) qtyEl.innerText = detailQuantity;
}

function addToCartFromDetail() {
  const existing = state.cart.find(c => c.productId === state.currentProductDetailId);
  if (existing) {
    existing.quantity += detailQuantity;
  } else {
    state.cart.push({ productId: state.currentProductDetailId, quantity: detailQuantity });
  }
  updateCartNavBadge();
  alert(t('msgAddedToCart'));
}

function buyNowFromDetail() {
  addToCartFromDetail();
  navigateTo(15);
}

function quickAddToCart(productId) {
  const existing = state.cart.find(c => c.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ productId: productId, quantity: 1 });
  }
  updateCartNavBadge();
  alert(t('msgAddedToCart'));
}

function updateCartNavBadge() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge-count').forEach(el => {
    el.innerText = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

// Screen 15: Shopping Cart
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const feeEl = document.getElementById('cart-delivery-fee');
  const totalEl = document.getElementById('cart-total');

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 32px 16px;">
        <p>${t('msgCartEmpty')}</p>
        <button class="btn btn-fresh btn-sm" onclick="navigateTo(11)" style="margin-top:10px;">${t('freshToday')}</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = '₹0';
    if (totalEl) totalEl.innerText = '₹0';
    return;
  }

  let subtotal = 0;
  container.innerHTML = state.cart.map(c => {
    const prod = state.products.find(p => p.id === c.productId) || { names: { en: 'Produce' }, price: 20, unit: 'kg', farmer: 'Mahendra', image: '' };
    const itemTotal = prod.price * c.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-item-row">
        <img src="${prod.image}" class="cart-item-thumb" alt="${getLocalizedCropName(prod)}">
        <div style="flex:1;">
          <div style="font-weight:700; font-size:13px; color:var(--text-main);">${getLocalizedCropName(prod)}</div>
          <div style="font-size:11px; color:var(--text-muted);">👨‍🌾 ${prod.farmer}</div>
          <div style="font-size:12.5px; font-weight:700; color:var(--primary-dark); margin-top:2px;">
            ₹${prod.price}/${getLocalizedUnit(prod.unit)}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px;">
          <div class="stepper-control" style="transform:scale(0.82); transform-origin:right;">
            <button class="stepper-btn" onclick="updateCartItemQty(${c.productId}, -1)">-</button>
            <span class="stepper-val">${c.quantity}</span>
            <button class="stepper-btn" onclick="updateCartItemQty(${c.productId}, 1)">+</button>
          </div>
          <button style="border:none; background:none; color:var(--danger); font-size:10.5px; cursor:pointer;" onclick="removeCartItem(${c.productId})">${t('deleteBtn')}</button>
        </div>
      </div>
    `;
  }).join('');

  const deliveryFee = subtotal > 300 ? 0 : 30;
  const total = subtotal + deliveryFee;

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
  if (feeEl) feeEl.innerText = deliveryFee === 0 ? t('deliveryFree') :  `₹${deliveryFee}`;
  if (totalEl) totalEl.innerText = `₹${total}`;
}

function updateCartItemQty(prodId, delta) {
  const item = state.cart.find(c => c.productId === prodId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(c => c.productId !== prodId);
    }
    renderCart();
    updateCartNavBadge();
  }
}

function removeCartItem(prodId) {
  state.cart = state.cart.filter(c => c.productId !== prodId);
  renderCart();
  updateCartNavBadge();
}

// Screen 16: Checkout
function renderCheckout() {
  const addrEl = document.getElementById('checkout-address-display');
  const summaryEl = document.getElementById('checkout-summary-list');
  const totalEl = document.getElementById('checkout-total-val');
  const confirmChk = document.getElementById('checkout-confirm-addr-chk');
  const editBox = document.getElementById('checkout-address-edit-box');

  if (addrEl) {
    addrEl.innerText = state.customer.address || t('errAddressMissing');
  }
  if (confirmChk) confirmChk.checked = true;
  if (editBox) editBox.style.display = 'none';
  hideError('checkout-addr-error');

  let subtotal = 0;
  if (summaryEl) {
    summaryEl.innerHTML = state.cart.map(c => {
      const prod = state.products.find(p => p.id === c.productId) || { names: { en: 'Produce' }, price: 20, unit: 'kg' };
      const itemTotal = prod.price * c.quantity;
      subtotal += itemTotal;
      return `
        <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:5px;">
          <span>${getLocalizedCropName(prod)} × ${c.quantity} ${getLocalizedUnit(prod.unit)}</span>
          <strong>₹${itemTotal}</strong>
        </div>
      `;
    }).join('');
  }

  const deliveryFee = subtotal > 300 ? 0 : 30;
  const grandTotal = subtotal + deliveryFee;
  if (totalEl) totalEl.innerText = `₹${grandTotal}`;
}

function toggleCheckoutAddressEdit() {
  const box = document.getElementById('checkout-address-edit-box');
  const input = document.getElementById('checkout-edit-address-input');
  if (box) {
    const isVisible = box.style.display === 'block';
    box.style.display = isVisible ? 'none' : 'block';
    if (!isVisible && input) {
      input.value = state.customer.address || '';
      input.focus();
    }
  }
}

function saveCheckoutAddressEdit() {
  const input = document.getElementById('checkout-edit-address-input');
  const val = input ? input.value.trim() : '';
  if (!val) {
    showError('checkout-addr-error', t('errAddressMissing'));
    return;
  }
  hideError('checkout-addr-error');
  state.customer.address = val;
  const addrEl = document.getElementById('checkout-address-display');
  if (addrEl) addrEl.innerText = val;
  const box = document.getElementById('checkout-address-edit-box');
  if (box) box.style.display = 'none';
}

function placeDemoOrder() {
  if (state.cart.length === 0) {
    alert(t('msgCartEmpty'));
    navigateTo(11);
    return;
  }

  const addr = (state.customer.address || '').trim();
  if (!addr) {
    showError('checkout-addr-error', t('errAddressMissing'));
    return;
  }

  const confirmChk = document.getElementById('checkout-confirm-addr-chk');
  if (confirmChk && !confirmChk.checked) {
    showError('checkout-addr-error', t('errConfirmAddress'));
    return;
  }

  hideError('checkout-addr-error');

  const instructions = (document.getElementById('checkout-instructions-input')?.value || '').trim();
  const confirmedAddress = addr + (instructions ? ` (Note: ${instructions})` : '');

  const orderId = `RD${1000 + state.orders.length + 1}`;
  let subtotal = 0;
  const itemNames = state.cart.map(c => {
    const prod = state.products.find(p => p.id === c.productId) || { names: { en: 'Fresh Produce' }, price: 20 };
    subtotal += prod.price * c.quantity;
    return getLocalizedCropName(prod);
  }).join(', ');

  const deliveryFee = subtotal > 300 ? 0 : 30;
  const newOrder = {
    id: orderId,
    customerName: state.customer.name || 'Customer',
    customerPhone: state.customer.phone || '',
    address: confirmedAddress,
    item: itemNames,
    quantity: `${state.cart.reduce((s, c) => s + c.quantity, 0)} items`,
    price: subtotal,
    deliveryFee: deliveryFee,
    total: subtotal + deliveryFee,
    status: 'Order Placed',
    date: 'Just now'
  };

  state.orders.unshift(newOrder);
  // Connect to Delivery Partner: dispatch new order request
  state.deliveryPartner.pendingRequestId = newOrder.id;
  state.currentDeliveryDetailOrderId = newOrder.id;
  state.cart = [];
  updateCartNavBadge();

  const confId = document.getElementById('confirmation-order-id');
  if (confId) confId.innerText = `#${orderId}`;

  navigateTo(17);
}

// Screen 18: Track Order
function renderTrackOrder() {
  const activeOrder = state.orders[0];
  if (!activeOrder) return;

  const idEl = document.getElementById('track-order-id');
  const detailsEl = document.getElementById('track-order-details');
  if (idEl) idEl.innerText = `#${activeOrder.id}`;
  if (detailsEl) {
    detailsEl.innerHTML = `
      <strong>${t('produceName')}:</strong> ${getLocalizedOrderItem(activeOrder.item)} (${getLocalizedQuantity(activeOrder.quantity)})<br>
      <strong>${t('grandTotal')}:</strong> ₹${activeOrder.total} • ${t('cashOnDelivery')}<br>
      <strong>${t('deliveryAddress')}:</strong> ${activeOrder.address}
    `;
  }

  updateTimelineStatus(activeOrder.status);
}

function updateTimelineStatus(currentStatus) {
  const steps = [
    'Order Placed',
    'Farmer Accepted',
    'Preparing',
    'Ready for Pickup',
    'Out for Delivery',
    'Delivered'
  ];

  const currentIndex = steps.indexOf(currentStatus);

  for (let i = 1; i <= 6; i++) {
    const stepEl = document.getElementById(`timeline-step-${i}`);
    if (!stepEl) continue;

    stepEl.classList.remove('completed', 'active');
    const stepIndex = i - 1;

    if (stepIndex < currentIndex) {
      stepEl.classList.add('completed');
    } else if (stepIndex === currentIndex) {
      stepEl.classList.add('active');
    }
  }
}

function advanceSimulationStatus() {
  const activeOrder = state.orders[0];
  if (!activeOrder) return;

  const steps = [
    'Order Placed',
    'Farmer Accepted',
    'Preparing',
    'Ready for Pickup',
    'Out for Delivery',
    'Delivered'
  ];

  let nextIdx = steps.indexOf(activeOrder.status) + 1;
  if (nextIdx >= steps.length) nextIdx = 0;

  activeOrder.status = steps[nextIdx];
  renderTrackOrder();
}

// Screen 19: Farmer Profile
function saveFarmerProfile() {
  const name = document.getElementById('farmer-name-input').value;
  const phone = document.getElementById('farmer-phone-input').value;
  const loc = document.getElementById('farmer-location-input').value;

  if (name) state.farmer.name = name;
  if (phone) state.farmer.phone = phone;
  if (loc) state.farmer.location = loc;

  updateGreetings();
  alert(t('msgProfileUpdated'));
}

// Screen 20: Customer Profile
function renderCustomerProfile() {
  updateGreetings();
  const histEl = document.getElementById('cust-order-history');
  if (histEl) {
    histEl.innerHTML = state.orders.map(o => `
      <div style="border-bottom:1px solid #eee; padding:7px 0; font-size:12.5px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong>#${o.id}</strong> - ${getLocalizedOrderItem(o.item)}<br>
          <span style="font-size:11px; color:#666;">${o.date === 'Just now' ? t('justNow') : (o.date === 'Today, 08:30 AM' ? t('todayMorning') : o.date)} • ₹${o.total}</span>
        </div>
        <div>
          <span class="order-status-badge ${getStatusBadgeClass(o.status)}">${getLocalizedOrderStatus(o.status)}</span>
        </div>
      </div>
    `).join('');
  }
}

function saveCustomerProfile() {
  const name = document.getElementById('cust-name-input').value;
  const phone = document.getElementById('cust-phone-input').value;
  const addr = document.getElementById('cust-address-input').value;

  if (name) state.customer.name = name;
  if (phone) state.customer.phone = phone;
  if (addr) state.customer.address = addr;

  updateGreetings();
  alert(t('msgCustomerProfileUpdated'));
}

// Modal Prototype
function openPrototypeModal() {
  const modal = document.getElementById('prototype-modal');
  const urlInput = document.getElementById('prototype-url-field');
  if (urlInput) urlInput.value = state.livePrototypeUrl;
  if (modal) modal.classList.add('open');
}

function closePrototypeModal() {
  const modal = document.getElementById('prototype-modal');
  if (modal) modal.classList.remove('open');
}

function openLivePrototypeLink() {
  const urlInput = document.getElementById('prototype-url-field');
  const url = urlInput ? urlInput.value : state.livePrototypeUrl;
  window.open(url, '_blank');
}

// ==========================================
// DELIVERY PARTNER MODULE (Screens 21 & 22)
// ==========================================

function renderDeliveryPartnerHome() {
  const profileNameEl = document.getElementById('dp-profile-name');
  const profileVehicleEl = document.getElementById('dp-profile-vehicle');
  const statusBadgeEl = document.getElementById('dp-status-badge');
  const onlineLabelEl = document.getElementById('dp-online-label');
  const onlineSwitchEl = document.getElementById('dp-online-switch');
  const todayCountEl = document.getElementById('dp-today-count');
  const todayEarningsEl = document.getElementById('dp-today-earnings');
  const pendingBadgeEl = document.getElementById('dp-pending-badge');
  const notifContainer = document.getElementById('dp-notifications-container');
  const activeContainer = document.getElementById('dp-active-delivery-container');
  const recentContainer = document.getElementById('dp-recent-activity-container');

  if (profileNameEl) profileNameEl.innerText = state.deliveryPartner.name;
  if (profileVehicleEl) profileVehicleEl.innerText = state.deliveryPartner.vehicle;
  if (todayCountEl) todayCountEl.innerText = state.deliveryPartner.todayCompletedCount;
  if (todayEarningsEl) todayEarningsEl.innerText = `₹${state.deliveryPartner.todayEarnings}`;

  const isOnline = state.deliveryPartner.isOnline;
  if (onlineLabelEl) {
    onlineLabelEl.innerText = isOnline ? t('onlineStatus') : t('offlineStatus');
    onlineLabelEl.classList.toggle('active', isOnline);
  }
  if (onlineSwitchEl) {
    onlineSwitchEl.classList.toggle('active', isOnline);
  }
  if (statusBadgeEl) {
    statusBadgeEl.innerText = isOnline ? '● Ready to Deliver' : '○ Offline';
    statusBadgeEl.style.color = isOnline ? '#4ade80' : '#94a3b8';
    statusBadgeEl.style.borderColor = isOnline ? 'rgba(34, 197, 94, 0.4)' : '#475569';
  }

  // 1. Pending Notifications
  let pendingOrder = null;
  if (state.deliveryPartner.pendingRequestId) {
    pendingOrder = state.orders.find(o => o.id === state.deliveryPartner.pendingRequestId);
  }
  if (!pendingOrder) {
    pendingOrder = state.orders.find(o => 
      o.id !== state.deliveryPartner.activeDeliveryId && 
      !state.deliveryPartner.rejectedRequestIds.includes(o.id) &&
      (o.status === 'Order Placed' || o.status === 'Farmer Accepted' || o.status === 'Ready for Pickup')
    );
  }

  if (pendingBadgeEl) {
    if (pendingOrder && isOnline) {
      pendingBadgeEl.style.display = 'inline-block';
      pendingBadgeEl.innerText = '1';
    } else {
      pendingBadgeEl.style.display = 'none';
      pendingBadgeEl.innerText = '0';
    }
  }

  if (notifContainer) {
    if (!isOnline) {
      notifContainer.innerHTML = `
        <div class="delivery-card" style="text-align:center; padding:18px 12px; color:#94a3b8;">
          <div style="font-size:24px; margin-bottom:4px;">⏸️</div>
          <div style="font-size:12.5px; font-weight:600;">You are currently Offline</div>
          <div style="font-size:11px; margin-top:2px;">Turn on availability toggle to receive delivery requests.</div>
        </div>
      `;
    } else if (pendingOrder) {
      const farmPickup = `${state.farmer.farmName || 'Mahendra Farms'}, ${state.farmer.village || 'Tenali'}, ${state.farmer.district || 'Guntur'}`;
      notifContainer.innerHTML = `
        <div class="delivery-card pulse-glow">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:15px; font-weight:800; color:#22d3ee;">#${pendingOrder.id}</span>
              <span class="notification-badge" style="background:#06b6d4; color:#0b1120;">${t('pendingBadge')}</span>
            </div>
            <span style="font-size:13.5px; font-weight:800; color:#22d3ee;">₹45 Est.</span>
          </div>

          <div style="font-size:12px; color:#cbd5e1; margin-bottom:4px;">
            <strong style="color:#94a3b8;">Pickup:</strong> 👨‍🌾 ${farmPickup}
          </div>
          <div style="font-size:12px; color:#cbd5e1; margin-bottom:4px;">
            <strong style="color:#94a3b8;">Drop-off:</strong> 🏠 ${pendingOrder.address}
          </div>
          <div style="font-size:11.5px; color:#94a3b8; margin-bottom:10px;">
            <strong>Items:</strong> ${getLocalizedOrderItem(pendingOrder.item)} • ${getLocalizedQuantity(pendingOrder.quantity)}
          </div>

          <button class="btn delivery-btn-accept" style="min-height:38px; font-size:13px;" onclick="openDeliveryRequest('${pendingOrder.id}')">
            <span>${t('viewRequest')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    } else {
      notifContainer.innerHTML = `
        <div class="delivery-card" style="text-align:center; padding:18px 12px; color:#94a3b8;">
          <div style="font-size:24px; margin-bottom:4px;">✅</div>
          <div style="font-size:12.5px; font-weight:600;">No pending delivery requests</div>
          <div style="font-size:11px; margin-top:2px;">New customer orders will appear here automatically.</div>
        </div>
      `;
    }
  }

  // 2. Active Deliveries
  if (activeContainer) {
    if (state.deliveryPartner.activeDeliveryId) {
      const activeOrder = state.orders.find(o => o.id === state.deliveryPartner.activeDeliveryId);
      if (activeOrder) {
        activeContainer.innerHTML = `
          <div class="delivery-card" style="border-color:#10b981; background:linear-gradient(145deg, #1e293b 0%, rgba(16, 185, 129, 0.08) 100%);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:14px; font-weight:800; color:#4ade80;">#${activeOrder.id}</span>
              <span class="dp-status-pill">🚚 Out for Delivery</span>
            </div>
            <div style="font-size:12px; color:#cbd5e1; margin-bottom:3px;">
              <strong>Destination:</strong> ${activeOrder.address}
            </div>
            <div style="font-size:11.5px; color:#94a3b8; margin-bottom:8px;">
              <strong>Customer:</strong> ${activeOrder.customerName} (${activeOrder.customerPhone || '+91 91234 56789'})
            </div>
            <button class="btn delivery-btn-complete" style="min-height:36px; font-size:12.5px;" onclick="completeDelivery('${activeOrder.id}')">
              ✓ ${t('markDelivered')}
            </button>
          </div>
        `;
      } else {
        activeContainer.innerHTML = `<div class="delivery-card" style="text-align:center; color:#94a3b8; font-size:12px; padding:12px;">No active deliveries in transit.</div>`;
      }
    } else {
      activeContainer.innerHTML = `<div class="delivery-card" style="text-align:center; color:#94a3b8; font-size:12px; padding:12px;">No active deliveries in transit.</div>`;
    }
  }

  // 3. Recent Delivery Activity
  if (recentContainer) {
    const list = state.deliveryPartner.recentActivity || [];
    if (list.length === 0) {
      recentContainer.innerHTML = `<div class="delivery-card" style="text-align:center; color:#94a3b8; font-size:12px; padding:12px;">No recent delivery activity.</div>`;
    } else {
      recentContainer.innerHTML = list.map(item => `
        <div class="delivery-card" style="padding:10px 12px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:12.5px; font-weight:700; color:#f8fafc;">#${item.id} • ${item.destination}</div>
            <div style="font-size:11px; color:#94a3b8;">${item.items} • ${item.time}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12.5px; font-weight:800; color:#4ade80;">+₹${item.earnings}</div>
            <div style="font-size:10px; color:#94a3b8;">${item.status}</div>
          </div>
        </div>
      `).join('');
    }
  }
}

function toggleDeliveryOnlineStatus() {
  state.deliveryPartner.isOnline = !state.deliveryPartner.isOnline;
  renderDeliveryPartnerHome();
}

function openDeliveryRequest(orderId) {
  state.currentDeliveryDetailOrderId = orderId;
  navigateTo(21);
}

function renderDeliveryRequestDetail() {
  const orderId = state.currentDeliveryDetailOrderId || state.deliveryPartner.pendingRequestId || (state.orders[0] ? state.orders[0].id : null);
  const ord = state.orders.find(o => o.id === orderId) || state.orders[0];
  if (!ord) return;

  const idEl = document.getElementById('delivery-req-order-id');
  const detailIdEl = document.getElementById('delivery-req-detail-id');
  const itemsEl = document.getElementById('delivery-req-items');
  const totalEl = document.getElementById('delivery-req-order-total');
  const farmNameEl = document.getElementById('delivery-req-farm-name');
  const farmLocEl = document.getElementById('delivery-req-farm-loc');
  const farmPhoneEl = document.getElementById('delivery-req-farmer-phone');
  const custNameEl = document.getElementById('delivery-req-cust-name');
  const custAddrEl = document.getElementById('delivery-req-cust-addr');
  const custPhoneEl = document.getElementById('delivery-req-cust-phone');
  const payoutEl = document.getElementById('delivery-req-payout');

  if (idEl) idEl.innerText = `#${ord.id}`;
  if (detailIdEl) detailIdEl.innerText = `#${ord.id}`;
  if (itemsEl) itemsEl.innerText = `${getLocalizedOrderItem(ord.item)} (${getLocalizedQuantity(ord.quantity)})`;
  if (totalEl) totalEl.innerText = `₹${ord.total} (${t('cashOnDelivery')})`;
  if (farmNameEl) farmNameEl.innerText = state.farmer.farmName || 'Mahendra Organic Farms';
  if (farmLocEl) farmLocEl.innerText = `${state.farmer.village || 'Tenali'}, ${state.farmer.district || 'Guntur'}, ${state.farmer.state || 'Andhra Pradesh'}`;
  if (farmPhoneEl) farmPhoneEl.innerText = `📞 ${state.farmer.phone || '+91 98765 43210'}`;
  if (custNameEl) custNameEl.innerText = ord.customerName || 'Customer';
  if (custAddrEl) custAddrEl.innerText = ord.address;
  if (custPhoneEl) custPhoneEl.innerText = `📞 ${ord.customerPhone || '+91 91234 56789'}`;
  if (payoutEl) payoutEl.innerText = `₹45.00`;
}

function acceptDeliveryRequest() {
  const orderId = state.currentDeliveryDetailOrderId || state.deliveryPartner.pendingRequestId || (state.orders[0] ? state.orders[0].id : null);
  const ord = state.orders.find(o => o.id === orderId) || state.orders[0];
  if (ord) {
    ord.status = 'Out for Delivery';
    state.deliveryPartner.activeDeliveryId = ord.id;
    if (state.deliveryPartner.pendingRequestId === ord.id) {
      state.deliveryPartner.pendingRequestId = null;
    }
    // Synchronize Customer Tracking (Screen 18) and Farmer Orders (Screen 10)
    renderTrackOrder();
    renderFarmerOrders();
    alert(`Delivery accepted for Order #${ord.id}! You are assigned to deliver fresh produce to ${ord.customerName}.`);
  }
  navigateTo(22);
}

function rejectDeliveryRequest() {
  const orderId = state.currentDeliveryDetailOrderId || state.deliveryPartner.pendingRequestId || (state.orders[0] ? state.orders[0].id : null);
  if (orderId) {
    if (!state.deliveryPartner.rejectedRequestIds.includes(orderId)) {
      state.deliveryPartner.rejectedRequestIds.push(orderId);
    }
    if (state.deliveryPartner.pendingRequestId === orderId) {
      state.deliveryPartner.pendingRequestId = null;
    }
    alert(`Delivery request for Order #${orderId} declined. Simulating reassignment to next nearby rider.`);
  }
  navigateTo(22);
}

function completeDelivery(orderId) {
  const ord = state.orders.find(o => o.id === orderId);
  if (ord) {
    ord.status = 'Delivered';
    state.deliveryPartner.activeDeliveryId = null;
    state.deliveryPartner.todayCompletedCount += 1;
    state.deliveryPartner.todayEarnings += 45;
    
    // Unshift to recent activity
    state.deliveryPartner.recentActivity.unshift({
      id: ord.id,
      destination: ord.address.split(',')[0],
      items: ord.quantity,
      earnings: 45,
      time: 'Just now',
      status: 'Delivered'
    });

    // Synchronize Customer Tracking (Screen 18) and Farmer Orders (Screen 10)
    renderTrackOrder();
    renderFarmerOrders();
    renderDeliveryPartnerHome();
    alert(`Order #${ord.id} successfully delivered! ₹45 credited to your earnings.`);
  }
}

// Global View Render
function renderAllViews() {
  renderMyProducts();
  renderFarmerOrders();
  renderCustomerHome();
  renderProductListing();
  renderCart();
  updateCartNavBadge();
  renderDeliveryPartnerHome();
}

// 22-Screen Quick Drawer Builder
function setupScreenDrawer() {
  const drawerGrid = document.getElementById('drawer-grid');
  if (!drawerGrid) return;

  drawerGrid.innerHTML = '';
  screenCatalog.forEach(screen => {
    const div = document.createElement('div');
    div.className = `drawer-item ${screen.id === 1 ? 'active-item' : ''}`;
    div.dataset.screen = screen.id;
    div.innerHTML = `
      <span class="screen-badge">${screen.id}</span>
      <div>
        <div style="font-weight:700;">${screen.name}</div>
        <div style="font-size:10.5px; color:#666;">${screen.flow}</div>
      </div>
    `;
    div.addEventListener('click', () => {
      navigateTo(screen.id);
    });
    drawerGrid.appendChild(div);
  });
}

function toggleDrawer() {
  const drawer = document.getElementById('screen-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

function closeDrawer() {
  const drawer = document.getElementById('screen-drawer');
  if (drawer) {
    drawer.classList.remove('open');
  }
}

function updateClock() {
  const clockEl = document.getElementById('phone-clock');
  if (clockEl) {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Always initialize navigation to Screen 1 on every fresh page load/reload
  try {
    sessionStorage.removeItem('agrinex_current_screen');
    localStorage.removeItem('agrinex_current_screen');
  } catch (e) {}
  state.currentScreen = 1;

  setupScreenDrawer();
  const validLangs = ['en', 'te', 'hi', 'ta', 'kn', 'ml'];
  let savedLang = null;
  try { savedLang = localStorage.getItem('agrinex_lang'); } catch(e){}
  if (!savedLang || !validLangs.includes(savedLang)) { savedLang = 'en'; }
  applyLanguage(savedLang); // Apply default language cleanly

  // Ensure application strictly starts on Screen 1 (Splash) on every fresh load
  navigateTo(1);

  updateClock();
  setInterval(updateClock, 30000);
});
