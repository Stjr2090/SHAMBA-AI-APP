export interface LanguageStrings {
  welcome: string;
  selectLanguage: string;
  mainMenu: string;
  askDirect: string;
  changeLanguage: string;
  backToMenu: string;
  processing: string;
  invalidSelection: string;
  faqs: { id: string; question: string; answer: string }[];
}

export const LANGUAGE_DATA: Record<string, LanguageStrings> = {
  'English': {
    welcome: "Welcome to Shamba AI. I am your agricultural advisor.",
    selectLanguage: "Please select your language by replying with a number:",
    mainMenu: "Main Menu (English):",
    askDirect: "Please type your question directly.",
    changeLanguage: "Change Language",
    backToMenu: "Reply '0' for Main Menu or ask another question.",
    processing: "Thinking...",
    invalidSelection: "Invalid selection. Please reply with a number.",
    faqs: [
      { id: '1', question: 'What is the weather forecast?', answer: 'Fetching current weather for your location...' },
      { id: '2', question: 'When should I plant maize?', answer: 'Plant maize when rains are steady for 3 days. Use 25kg/acre. Space 75x25cm. Prepare seedbed today.' },
      { id: '3', question: 'How to control armyworms?', answer: 'Check maize daily. Look for holes in leaves. Use wood ash or neem spray early. Report outbreaks to district office.' },
      { id: '4', question: 'What to do during a dry spell?', answer: 'Mulch crops heavily with grass. Water early morning or late evening. Prioritize young plants today.' },
      { id: '5', question: 'How to prevent soil erosion?', answer: 'Dig contour trenches across slopes. Plant grass strips or trees. Cover bare soil with mulch today.' },
    ]
  },
  'Swahili': {
    welcome: "Karibu Shamba AI. Mimi ni mshauri wako wa kilimo.",
    selectLanguage: "Tafadhali chagua lugha yako kwa kujibu na namba:",
    mainMenu: "Menu Kuu (Kiswahili):",
    askDirect: "Tafadhali andika swali lako moja kwa moja.",
    changeLanguage: "Badilisha Lugha",
    backToMenu: "Jibu '0' kwa Menu Kuu au uliza swali lingine.",
    processing: "Ninafikiri...",
    invalidSelection: "Chaguo si sahihi. Tafadhali jibu kwa namba.",
    faqs: [
      { id: '1', question: 'Utabiri wa hali ya hewa ni upi?', answer: 'Natafuta hali ya hewa ya sasa kwa eneo lako...' },
      { id: '2', question: 'Nipande lini mahindi?', answer: 'Panda mahindi mvua ikinyesha mfululizo siku 3. Tumia kilo 25 kwa ekari. Nafasi 75x25cm. Tayarisha shamba leo.' },
      { id: '3', question: 'Viwavi jeshi wadhibitiwe vipi?', answer: 'Kagua mahindi kila siku. Angalia matundu kwenye majani. Tumia jivu au dawa ya mwarobaini mapema. Toa taarifa ofisi ya wilaya.' },
      { id: '4', question: 'Nifanye nini kukiwa na ukame?', answer: 'Weka matandazo ya nyasi shambani. Mwagia maji asubuhi au jioni. Pa kipaumbele mimea michanga leo.' },
      { id: '5', question: 'Nizuie vipi mmomonyoko wa udongo?', answer: 'Chimba mitaro ya kuzuia maji kwenye miteremko. Panda nyasi au miti. Funika udongo kwa matandazo leo.' },
    ]
  },
  'Luganda': {
    welcome: "Kulaba Shamba AI. Nze mubi wa kulima wo.",
    selectLanguage: "Londa olulimi lwo nga oddamu n'ennamba:",
    mainMenu: "Menu Enkulu (Luganda):",
    askDirect: "Wandiika ekibuuzo kyo wano.",
    changeLanguage: "Kyusa Olulimi",
    backToMenu: "Ddamu '0' okudda ku Menu Enkulu oba buuza ekibuuzo ekirala.",
    processing: "Nlowooza...",
    invalidSelection: "Ennamba gy'olonze si ntuufu. Ddamu n'ennamba entuufu.",
    faqs: [
      { id: '1', question: 'Hali y\'obudde eri etya?', answer: 'Nnoonya hali y\'obudde mu kitundu kyo...' },
      { id: '2', question: 'Nnyinza ddi okusimba kasooli?', answer: 'Simba kasooli ng\'enkuba efuddemu ennaku 3. Kozesa kilo 25 ku eka. Gaba 75x25cm. Tegeka ennimiro leero.' },
      { id: '3', question: 'Nnyinza ntya okulwanyisa ebiwuka?', answer: 'Kebera kasooli buli lunaku. Kebera ebituli mu bikoola. Kozesa evvu oba eddagala lya neem. Tegeeza ofiisi y\'essaza.' },
      { id: '4', question: 'Nkole ki nga waliwo amayengo?', answer: 'Bikka ebirime n\'ebisubi. Fukirira ku makya oba akawungeezi. Sosowaza ebirime ebitandika leero.' },
      { id: '5', question: 'Nnyinza ntya okuziyiza ettaka okutwalibwa amazzi?', answer: 'Sima emikutu gy\'amazzi mu nnimiro. Simba ebisubi oba emiti. Bikka ettaka n\'ebisubi leero.' },
    ]
  },
  // Adding placeholders for other languages to be filled by AI or expanded later
  // For the sake of this task, I will provide the structure for all.
  'Runyankole': {
    welcome: "Muryeho Shamba AI. Ndi omuhabuzi wawe w'eby'obuhingi.",
    selectLanguage: "Toorana orulimi rwawe omu kugarukamu n'enamba:",
    mainMenu: "Menu Enkuru (Runyankole):",
    askDirect: "Handiika ekibuuzo kyawe aha.",
    changeLanguage: "Hingisa Orulimi",
    backToMenu: "Garukamu '0' okugaruka aha Menu Enkuru.",
    processing: "Ninteekateeka...",
    invalidSelection: "Enamba eyo teryo. Garukamu n'enamba ehikire.",
    faqs: [
      { id: '1', question: 'Nnyinza ddi okubyara ebihimba?', answer: 'Byara ebihimba enkuba yaaba egwire ebiro 3. Kozesa kilo 25 aha eka. Tegeka ennimiro yawe hati.' },
      { id: '2', question: 'Nnyinza ntya okurwanisa ebiwuka?', answer: 'Kebera ebirime byawe buri izooba. Kozesa iju oba eddagala rya neem. Gambira ofiisi y\'egomborora.' },
      { id: '3', question: 'Nkole ki haaba hariho ekyanda?', answer: 'Bikka ebirime n\'ebisubi. Fukirira omu kasheeshe oba akabaire. Sosowaza ebirime ebyo hati.' },
      { id: '4', question: 'Nnyinza ntya okuziyiza eitaka okutwarwa amaizi?', answer: 'Sima emikutu y\'amaizi omu nnimiro. Byara ebisubi oba emiti. Bikka eitaka n\'ebisubi hati.' },
      { id: '5', question: 'Hariho okurabura kw\'amaizi amangi?', answer: 'Kebera amaizi omu migga. Twala ebisigo omu bifo ebigulumivu. Longoosa emikutu y\'amaizi hati.' },
    ]
  },
  'Rukiga': {
    welcome: "Muryeho Shamba AI. Ndi omuhabuzi wawe w'eby'obuhingi.",
    selectLanguage: "Toorana orulimi rwawe omu kugarukamu n'enamba:",
    mainMenu: "Menu Enkuru (Rukiga):",
    askDirect: "Handiika ekibuuzo kyawe aha.",
    changeLanguage: "Hingisa Orulimi",
    backToMenu: "Garukamu '0' okugaruka aha Menu Enkuru.",
    processing: "Ninteekateeka...",
    invalidSelection: "Enamba eyo teryo. Garukamu n'enamba ehikire.",
    faqs: [
      { id: '1', question: 'Nnyinza ddi okubyara ebihimba?', answer: 'Byara ebihimba enkuba yaaba egwire ebiro 3. Kozesa kilo 25 aha eka. Tegeka ennimiro yawe hati.' },
      { id: '2', question: 'Nnyinza ntya okurwanisa ebiwuka?', answer: 'Kebera ebirime byawe buri izooba. Kozesa iju oba eddagala rya neem. Gambira ofiisi y\'egomborora.' },
      { id: '3', question: 'Nkole ki haaba hariho ekyanda?', answer: 'Bikka ebirime n\'ebisubi. Fukirira omu kasheeshe oba akabaire. Sosowaza ebirime ebyo hati.' },
      { id: '4', question: 'Nnyinza ntya okuziyiza eitaka okutwarwa amaizi?', answer: 'Sima emikutu y\'amaizi omu nnimiro. Byara ebisubi oba emiti. Bikka eitaka n\'ebisubi hati.' },
      { id: '5', question: 'Hariho okurabura kw\'amaizi amangi?', answer: 'Kebera amaizi omu migga. Twala ebisigo omu bifo ebigulumivu. Longoosa emikutu y\'amaizi hati.' },
    ]
  },
  'Ateso': {
    welcome: "Yoga Shamba AI. Arau akai k'aswam kon.",
    selectLanguage: "Koseu akituk kon ko kigir namba:",
    mainMenu: "Menu Na Apolon (Ateso):",
    askDirect: "Kigir aingiset kon ne.",
    changeLanguage: "Jul Akituk",
    backToMenu: "Kigir '0' ko kigir menu na apolon.",
    processing: "Aomoomo...",
    invalidSelection: "Namba ngin mam ejok. Kigir namba na ejok.",
    faqs: [
      { id: '1', question: 'Aunoi akidup emanyi?', answer: 'Kidup emanyi ne ebunere akiru kwaras iuni. Koseu kilo 25 ko eka. Itub akit kon lolo.' },
      { id: '2', question: 'Aunoi akidup ikur?', answer: 'Koseu akit kon kwaras. Koseu ekuron ko kigir neem. Tolimok ofiisi na distrikt.' },
      { id: '3', question: 'Anyoibo aswam ne ejai akolong?', answer: 'Kiwap akit kon ko kinyet. Kiwap akit kon kwaras. Itub akit kon lolo.' },
      { id: '4', question: 'Aunoi akidup akit kon?', answer: 'Koseu akit kon ko kigir. Koseu ekuron ko kigir neem. Tolimok ofiisi na distrikt.' },
      { id: '5', question: 'Ejai aingiset na akiru?', answer: 'Koseu akit kon ko kigir. Koseu ekuron ko kigir neem. Tolimok ofiisi na distrikt.' },
    ]
  },
  'Luo/Acholi': {
    welcome: "Itye Shamba AI. An aye latic piri me pur.",
    selectLanguage: "Yer leb ma imito ki namba:",
    mainMenu: "Menu Madit (Luo/Acholi):",
    askDirect: "Coo lapeny ni kany.",
    changeLanguage: "Lok Leb",
    backToMenu: "Dwok '0' me dok i menu madit.",
    processing: "Atamo...",
    invalidSelection: "Namba meno pe atir. Dwok namba ma atir.",
    faqs: [
      { id: '1', question: 'Apuro anyig ddi?', answer: 'Puro anyig ka kot ocwe pi nino 3. Tic ki kilo 25 i eka. Yub poto ni tin.' },
      { id: '2', question: 'Agero kudi nining?', answer: 'Nen poto ni nino ducu. Tic ki buru ki yat neem. Tit ki ofis me distrikt.' },
      { id: '3', question: 'Atimo ningo ka piny otoo?', answer: 'Um poto ni ki lum. It piny odiko nyo otyeno. Nen nyig yat ni tin.' },
      { id: '4', question: 'Agero ngom nining?', answer: 'Tic ki buru ki yat neem. Tit ki ofis me distrikt.' },
      { id: '5', question: 'Tye lanyut me pii?', answer: 'Nen pii i kulu. Ter lee ni i kabedo ma malo. Yub yoo pii tin.' },
    ]
  },
  'Kinyarwanda': {
    welcome: "Murakaza neza kuri Shamba AI. Ndi umujyanama wawe mu buhinzi.",
    selectLanguage: "Hitamo ururimi rwawe ukoresheje nimero:",
    mainMenu: "Menu Nkuru (Kinyarwanda):",
    askDirect: "Andika ikibazo cyawe hano.",
    changeLanguage: "Hindura Ururimi",
    backToMenu: "Subiza '0' usubire kuri Menu Nkuru.",
    processing: "Ndatekereza...",
    invalidSelection: "Nimero wahisemo si yo. Hitamo nimero ikwiriye.",
    faqs: [
      { id: '1', question: 'Natera ryari ibigori?', answer: 'Tera ibigori iyo imvura yaguye iminsi 3. Koresha kilo 25 kuri hegitari. Tegura umurima wawe uyu munsi.' },
      { id: '2', question: 'Nabarwanya nte inyaryenge?', answer: 'Sura umurima wawe buri munsi. Koresha ibishyuze cyangwa umuti wa neem. Menyesha ibiro by\'akarere.' },
      { id: '3', question: 'Nakora iki mu gihe cy\'amapfa?', answer: 'Sasira umurima wawe n\'ibyatsi. Vubira mu gitondo cyangwa nimunsi. Tegura umurima wawe uyu munsi.' },
      { id: '4', question: 'Nazitira nte isuri?', answer: 'Andika ikibazo cyawe hano.' },
      { id: '5', question: 'Hari integuza y\'imyuzure?', answer: 'Reba amazzi mu migezi. Jyana amatungo ahantu hahanamye. Tegura umurima wawe uyu munsi.' },
    ]
  },
  'Kikuyu': {
    welcome: "Wimwega Shamba AI. Ndi mutaarani waku wa urimi.",
    selectLanguage: "Thuura ruthiomi rwaku na namba:",
    mainMenu: "Menu nene (Kikuyu):",
    askDirect: "Andika kiuria giaku haha.",
    changeLanguage: "Garura Ruthiomi",
    backToMenu: "Icokia '0' ucooke menu nene.",
    processing: "Nindatua...",
    invalidSelection: "Namba iyo tiyo. Icokia namba iria yagiriire.",
    faqs: [
      { id: '1', question: 'Nihande ri mbembe?', answer: 'Handa mbembe mbura yaura mithenya itatu. Tumia kilo 25 kuri eka. Thaitira mugunda waku umuthi.' },
      { id: '2', question: 'Nihote nja nining?', answer: 'Andika kiuria giaku haha.' },
      { id: '3', question: 'Nite ningo ka piny otoo?', answer: 'Andika kiuria giaku haha.' },
      { id: '4', question: 'Nihote nja nining?', answer: 'Andika kiuria giaku haha.' },
      { id: '5', question: 'Tye lanyut me pii?', answer: 'Andika kiuria giaku haha.' },
    ]
  },
  'Somali': {
    welcome: "Ku soo dhawaada Shamba AI. Waxaan ahay la-taliyahaaga beeraha.",
    selectLanguage: "Fadlan dooro luqaddaada adoo isticmaalaya lambar:",
    mainMenu: "Menu-ka Weyn (Somali):",
    askDirect: "Fadlan halkan ku qor su'aashaada.",
    changeLanguage: "Bedel Luqadda",
    backToMenu: "Ku jawaab '0' si aad ugu noqoto Menu-ka Weyn.",
    processing: "Waan fekerayaa...",
    invalidSelection: "Lambarka aad dooratay ma saxna. Fadlan dooro lambar sax ah.",
    faqs: [
      { id: '1', question: 'Goormaan beeran karaa galleyda?', answer: "Beero galleyda marka roobku da'o 3 maalmood. Isticmaal 25kg halkii hektar. Diyaari beertaada maanta." },
      { id: '2', question: 'Sidee loo xakameeyaa cayayaanka?', answer: "Fadlan halkan ku qor su'aashaada." },
      { id: '3', question: 'Maxaan sameeyaa xilliga abaarta?', answer: "Fadlan halkan ku qor su'aashaada." },
      { id: '4', question: 'Sidee looga hortagaa nabaad-guurka?', answer: "Fadlan halkan ku qor su'aashaada." },
      { id: '5', question: 'Ma jiraan digniino fatahaad ah?', answer: "Fadlan halkan ku qor su'aashaada." },
    ]
  }
};
