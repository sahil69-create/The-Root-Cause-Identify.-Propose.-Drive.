// --- State Management ---
let state = {
    currentUser: JSON.parse(localStorage.getItem('trc_user')) || {
        username: 'citizen_zero',
        displayName: 'Guest User',
        state: 'Delhi',
        city: 'New Delhi',
        persona: 'Thinker',
        points: 1250,
        posts: 12,
        upvotes: 450,
        joinDate: 'May 2026',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    isDarkMode: localStorage.getItem('trc_theme') === 'dark' ? true : false,
    posts: [],
    users: [],
    quests: [],
    arenas: [],
    comments: []
};

// --- Indian Cities Data ---
const indianCities = [
    "Aalo", "Abhayapuri", "Abhanpur", "Aboi", "Abohar", "Abu Road", "Achampet", "Adibadri", "Adilabad", "Adityapur", "Adoor", "Afzalpur", "Agar Malwa", "Aghunato", "Agonda", "Agra", "Ahmedabad", "Ahmedgarh", "Ahmednagar", "Aizawl", "Ajmer", "Akaltara", "Akbarpur", "Akola", "Akkalkot", "Akuhaito", "Aland", "Alappuzha", "Alibag", "Aligarh", "Alipurduar", "Alirajpur", "Aluva", "Alwal", "Alwar", "Ambala", "Ambala Cantt", "Amb", "Ambassa", "Ambernath", "Ambikapur", "Ambur", "Amguri", "Amla", "Amaravati", "Amarpur", "Amravati", "Amreli", "Amroha", "Amritsar", "Anand", "Anandapur", "Anandpur Sahib", "Anantapur", "Andal", "Andaman and Nicobar Islands", "Andra", "Andro", "Anekal", "Angamaly", "Angul", "Anini", "Anjar", "Anjuna", "Anuppur", "Anupgarh", "Arambagh", "Arang", "Araria", "Arakkonam", "Arari", "Arki", "Armur", "Arpora", "Arrah", "Arsikere", "Aruppukkottai", "Arvi", "Asansol", "Asifabad", "Aska", "Ashoknagar", "Assagao", "Assam Lingzey", "Athagarh", "Athibung", "Attingal", "Attur", "Augustmuni", "Aurangabad", "Avadi", "Ayodhya", "Azamgarh", "Bacheli", "Badami", "Badarpur", "Baddi", "Badlapur", "Badnawar", "Badrinath", "Bageshwar", "Bagaha", "Bagalkote", "Baghmara", "Bagnan", "Bahadurgarh", "Bahadurganj", "Baheri", "Bahraich", "Baihata Chariali", "Baihar", "Baikhora", "Baikunthpur", "Baijnath", "Bairabi", "Bakhtiyarpur", "Balaghat", "Balasinor", "Baleshwar", "Balod", "Baloda Bazar", "Balotra", "Balrampur", "Balurghat", "Banda", "Bandikui", "Bangalore", "Bangaon", "Bangarapet", "Bani", "Banjara Hills", "Banjar", "Banka", "Banki", "Bankura", "Bantwal", "Banur", "Barabanki", "Barahiya", "Barama", "Baramati", "Baran", "Baranagar", "Barara", "Barasat", "Barat", "Barbigha", "Bardoli", "Bardhaman", "Bareilly", "Bargarh", "Barh", "Barharwa", "Baripada", "Barmer", "Barnala", "Barpeta", "Barrackpore", "Barwani", "Basanti", "Basar", "Basavana Bagewadi", "Basirhat", "Basna", "Bassi Pathana", "Basudevpur", "Basukinath", "Batala", "Bathinda", "Bayad", "Bayana", "Beawar", "Beed", "Begowal", "Begusarai", "Behiang", "Beldanga", "Bellaguntha", "Bellampalli", "Belonia", "Belpahar", "Belur", "Bemetara", "Benaulim", "Bengaluru", "Beohari", "Berhampore", "Berhampur", "Berinag", "Bermo", "Bethlehem Vengthlang", "Bettiah", "Betul", "Bhabua", "Bhadra", "Bhadrak", "Bhadravati", "Bhadreswar", "Bhagak", "Bhagalpur", "Bhainsa", "Bhairamgarh", "Bhalukpong", "Bhanjanagar", "Bhanupratappur", "Bharatpur", "Bharuch", "Bhatapara", "Bhatkal", "Bhavani", "Bhavnagar", "Bhawanipatna", "Bhilai", "Bhikhiwind", "Bhilwara", "Bhimtal", "Bhimavaram", "Bhind", "Bhiwandi", "Bhiwani", "Bhoj", "Bhopal", "Bhongir", "Bhota", "Bhowali", "Bhowrah", "Bhuban", "Bhubaneswar", "Bhucho Mandi", "Bhuj", "Bhuntar", "Bhupalpally", "Bhusawar", "Bhusawal", "Biaora", "Biate", "Bicholim", "Bidar", "Bidhannagar", "Bihar Sharif", "Bihpuria", "Bikaner", "Bikramganj", "Bilari", "Bilasipara", "Bilaspur", "Bilkhawthlir", "Bilimora", "Binjharpur", "Biramitrapur", "Birchandranagar", "Bishalgarh", "Bishrampur", "Bishnupur", "Bisalpur", "Bodhan", "Bodh Gaya", "Boduppal", "Bokajan", "Bokakhat", "Bokaro Steel City", "Bolpur", "Bomdila", "Bongaigaon", "Bordumsa", "Botad", "Boxanagar", "Brahmapuri", "Brajrajnagar", "Budaun", "Budhlada", "Buguda", "Buldhana", "Bundi", "Bundu", "Bungtlang", "Burhanpur", "Burla", "Burtuk", "Buxar", "Calangute", "Canacona", "Candolim", "Canning", "Cavelossim", "Chaibasa", "Chail", "Chakpikarong", "Chakradharpur", "Chaksu", "Chalakudy", "Chalisgaon", "Chaltlang", "Chamarajanagar", "Chamba", "Chambai", "Chamoli", "Chamoli Town", "Champa", "Champawat", "Champhai", "Champua", "Chandel", "Chandannagar", "Chandbali", "Chandigarh", "Chandipur", "Chandrapur", "Chandrapura", "Changanassery", "Changlang", "Changtongya", "Channapatna", "Chapar", "Charoda", "Charkhi Dadri", "Chatra", "Chaukhutia", "Chaupal", "Chavakkad", "Chawngte", "Cheeka", "Chengalpattu", "Chennai", "Chengannur", "Cherrapunji", "Cherthala", "Chessore", "Chevella", "Chhabra", "Chhinnamasta", "Chhindwara", "Chicalim", "Chidambaram", "Chikhli", "Chintamani", "Chiplun", "Chirkunda", "Chirmiri", "Chitradurga", "Chitrakoot", "Chittoor", "Chittur", "Chopal", "Chozuba", "Choutuppal", "Chuari Khas", "Chumoukedima", "Chungthang", "Churachandpur", "Churu", "Coimbatore", "Colachel", "Colva", "Contai", "Coonoor", "Corlim", "Cuddalore", "Cuncolim", "Curchorem", "Cuttack", "Dabhoi", "Dabolim", "Dabwali", "Dadenggre", "Dadra and Nagar Haveli and Daman and Diu", "Dadri", "Dalli-Rajhara", "Dalhousie", "Dalsinghsarai", "Daltonganj", "Dalu", "Damoh", "Danapur", "Dandeli", "Dantewada", "Daporijo", "Dapoli", "Darap", "Darbhanga", "Darjeeling", "Darlawn", "Dasuya", "Datia", "Daudnagar", "Daulatpur Chowk", "Dausa", "Davanagere", "Dawki", "Dawrpui", "Deeg", "Deesa", "Dehradun", "Dehri", "Delhi", "Dentam", "Deoband", "Deogarh", "Deoli", "Deomali", "Deoria", "Dera Bassi", "Dergaon", "Devakottai", "Devanahalli", "Devarakonda", "Devprayag", "Dewas", "Dhalai", "Dhamtari", "Dhanbad", "Dhar", "Dharambandora", "Dharamgarh", "Dharamjaigarh", "Dharamshala", "Dharapuram", "Dharmanagar", "Dharmapuri", "Dharmavaram", "Dharwad", "Dharchula", "Dhariwal", "Dhekiajuli", "Dhemaji", "Dhenkanal", "Dhing", "Dholka", "Dhoraji", "Dhrol", "Dhubri", "Dhule", "Dhupguri", "Dhuri", "Diamond Harbour", "Dibrugarh", "Didchu", "Didwana", "Digapahandi", "Digboi", "Digha", "Dighwara", "Dina Nagar", "Dindigul", "Dindori", "Diphu", "Dipka", "Dirang", "Doddaballapura", "Doiwala", "Dombivli", "Domchanch", "Donkamokam", "Doom Dooma", "Doraha", "Dornakal", "Dubbaka", "Dubrajpur", "Dukli", "Duliajan", "Dum Dum", "Dumka", "Dungarpur", "Durg", "Durgapur", "Dwarahat", "Dzongu", "East Lungdar", "Electric Veng", "Ellenabad", "Eluru", "English Bazar", "Erattupetta", "Erode", "Etah", "Etawah", "Ettumanoor", "Falakata", "Falna", "Faridabad", "Farrukhabad", "Fatehabad", "Fatehpur", "Fatikroy", "Feroke", "Ferozepur", "Ferozepur Jhirka", "Firozabad", "Forbesganj", "Gadarwara", "Gadag", "Gadarpur", "Gadwal", "Gairsain", "Gajwel", "Ganaur", "Gandacherra", "Gandhinagar", "Ganganagar", "Gangarampur", "Gangoh", "Gangolihat", "Gangotri", "Gangapur City", "Gangavati", "Gangtok", "Gariaband", "Gariadhar", "Garoth", "Garhwa", "Garhshankar", "Garu", "Gauripur", "Gawlior", "Gaya", "Geedam", "Gharaunda", "Ghatal", "Ghatshila", "Ghaziabad", "Ghumarwin", "Giridih", "Goa", "Gobichettipalayam", "Gobindgarh", "Godda", "Godavarikhani", "Godhra", "Gohana", "Gokarna", "Golaghat", "Gomia", "Gonda", "Gondal", "Gondia", "Gooty", "Gopalpur", "Gopeshwar", "Gossaigaon", "Greater Noida", "Gudivada", "Gudur", "Gudiyatham", "Gujrat", "Gulbarga", "Gumla", "Gundlupet", "Gunupur", "Guntakal", "Guntur", "Guptkashi", "Gurgaon", "Gurugram", "Guru Har Sahai", "Guruvayur", "Guwahati", "Gwalior", "Gyalshing", "Haflong", "Hailakandi", "Hajipur", "Haldia", "Haldwani", "Halol", "Hamirpur", "Hamren", "Hansi", "Hanumangarh", "Hapur", "Harda", "Harihar", "Haridwar", "Haripad", "Haroli", "Haryana", "Hassan", "Hathras", "Haveri", "Hawai", "Hayuliang", "Hazaribagh", "Hee Bermiok", "Heirok", "Henglep", "Herbertpur", "Hezamara", "Himachal Pradesh", "Himmatnagar", "Hindaun", "Hindupur", "Hinganghat", "Hingoli", "Hinjilicut", "Hisar", "Hisua", "Hnahlan", "Hnahthial", "Hodal", "Hojai", "Honnavar", "Hoshangabad", "Hoshiarpur", "Hospet", "Hosur", "Howraghat", "Howrah", "Hrishyamukh", "Hubballi", "Hubli-Dharwad", "Hunsur", "Hussainabad", "Huzurnagar", "Hyderabad", "Ibrahimpatnam", "Ichalkaranji", "Idukki", "Igatpuri", "Ilkal", "Imphal", "Indi", "Indore", "Indranagar", "Indri", "Irinjalakuda", "Iritty", "Islampur", "Itanagar", "Itarsi", "Jabalpur", "Jadcherla", "Jagadhri", "Jagatsinghpur", "Jagdial", "Jageshwar", "Jagiroad", "Jaipur", "Jairampur", "Jaito", "Jajpur", "Jakhama", "Jalandhar", "Jalalabad", "Jalalpore", "Jalalpur", "Jalaun", "Jalgaon", "Jalna", "Jalpally", "Jalpaiguri", "Jalukie", "Jamakhandi", "Jamalpur", "Jamjodhpur", "Jamkhandi", "Jammu and Kashmir", "Jamnagar", "Jamshedpur", "Jamtara", "Jamui", "Jamul", "Jamuria", "Jangaon", "Jangipur", "Janjgir", "Jaora", "Jaspur", "Jashpur Nagar", "Jatani", "Jataran", "Jaunpur", "Jawalamukhi", "Zawlnuam", "Jehanabad", "Jessami", "Jetpur", "Jewargi", "Jeypore", "Jhabua", "Jhajjar", "Jhansi", "Jhargram", "Jharkhand", "Jharia", "Jhunjhunu", "Jhumri Telaiya", "Jiaganj", "Jind", "Jirania", "Jiribam", "Joda", "Jogbani", "Jogindernagar", "Jodhpur", "Jonai", "Jorethang", "Jorhat", "Joshimath", "Joynagar", "Jubbal", "Junagadh", "Junagarh", "Jwalamukhi", "Kabi", "Kachchh", "Kadapa", "Kadamtala", "Kadi", "Kadur", "Kagaznagar", "Kailasahar", "Kaithal", "Kakinada", "Kakching", "Kakdwip", "Kalaburagi", "Kaladhungi", "Kalamassery", "Kalanaur", "Kalavad", "Kalacherra", "Kalimpong", "Kallakurichi", "Kalol", "Kalpa", "Kalpetta", "Kaluk", "Kalwakurthy", "Kalna", "Kaman", "Kamareddy", "Kamarhati", "Kamakhyanagar", "Kamjong", "Kamalpur", "Kamptee", "Kampur", "Kanakapura", "Kanchanpur", "Kanchipuram", "Kandi", "Kangla", "Kanglatongbi", "Kangra", "Kangpokpi", "Kanhangad", "Kanker", "Kankavli", "Kannauj", "Kannur", "Kanpur", "Kantabanji", "Kanyakumari", "Kapurthala", "Karad", "Karaikal", "Karaikudi", "Karauli", "Karbook", "Kargil", "Karimganj", "Karimnagar", "Karjan", "Karjat", "Karkala", "Karnal", "Karnaprayag", "Karnataka", "Karur", "Karwar", "Kasaragod", "Kasganj", "Kashipur", "Kasom Khullen", "Katghora", "Kathalia", "Katihar", "Katni", "Katras", "Kattakada", "Katwa", "Kausani", "Kavali", "Kawardha", "Kawnpui", "Kawrthah", "Kayamkulam", "Kaza", "Kedarnath", "Keifang", "Keishampat", "Kekri", "Kendujhar", "Kendrapara", "Kerala", "Kesinga", "Khagaria", "Khajuraho", "Khambhat", "Khamgaon", "Khammam", "Khanchandpur", "Khandwa", "Khanna", "Khargone", "Khariar", "Khariar Road", "Kharagpur", "Kharar", "Khardah", "Kharupetia", "Khawbung", "Khawzawl", "Khem Karan", "Khed", "Khezhakeno", "Khliehriat", "Khongjom", "Khongsa", "Khonsa", "Khordha", "Khowai", "Khunti", "Khurai", "Khurja", "Khuzama", "Kichha", "Kigwema", "Kiphire", "Kirandul", "Kishanganj", "Kishangarh", "Kochi", "Kodad", "Kodinar", "Kodungallur", "Koderma", "Kohima", "Koilwar", "Kolar", "Kolasib", "Kolebira", "Kolhapur", "Kolkata", "Kollegala", "Koloriang", "Kompally", "Konark", "Kondagaon", "Kondotty", "Konnagar", "Kopargaon", "Koppal", "Koraput", "Koratla", "Korba", "Kosli", "Kota", "Kotagiri", "Kotdwara", "Kotkapura", "Kotkhai", "Kotma", "Kottakkal", "Kottayam", "Koyilandy", "Kozhikode", "Krishnagiri", "Krishnanagar", "Krishnarajanagara", "Kuchaman City", "Kuchinda", "Kufri", "Kuju", "Kukatpally", "Kullu", "Kulithalai", "Kumbi", "Kumhari", "Kumta", "Kumbakonam", "Kumarghat", "Kundapura", "Kunigal", "Kunnamkulam", "Kupup", "Kupwad", "Kurnool", "Kurseong", "Kurukshetra", "Kurud", "Kushtagi", "Kushinagar", "Kuthuparamba", "Kuzhithurai", "LB Nagar", "Lachen", "Lachung", "Ladakh", "Ladnun", "Ladwa", "Laitumkhrah", "Lakshadweep", "Lakhibazar", "Lakhipur", "Laksar", "Lakhimpur", "Lakhimpur Kheri", "Lakhisarai", "Lalai", "Lamlai", "Lamphelpat", "Lamsang", "Landour", "Langting", "Lanji", "Lanka", "Lathi", "Latehar", "Latur", "Lawngtlai", "Lefunga", "Legship", "Lehragaga", "Lengpui", "Likabali", "Lilong", "Lingdok", "Lingmoo", "Lingasugur", "Lohardaga", "Lohaghat", "Longding", "Longkhim", "Longleng", "Longwa", "Lucknow", "Ludhiana", "Lumding", "Lunawada", "Lundra", "Lunglei", "Luxettipet", "Machhiwara", "Machilipatnam", "Madanapalle", "Madanrting", "Madgaon", "Madhavpur", "Madhepura", "Madhugiri", "Madhupur", "Madikeri", "Madurai", "Magadi", "Mahabubabad", "Mahabubnagar", "Mahad", "Mahagama", "Maharajganj", "Maharajpur", "Mahasamund", "Maharashtra", "Mahendraganj", "Maheswar", "Mahnar Bazar", "Mahuva", "Mahua Kheraganj", "Maibong", "Maihar", "Mainaguri", "Mainpuri", "Mairang", "Majitar", "Makrana", "Malappuram", "Malda", "Malegaon", "Malerkotla", "Malkajgiri", "Malkangiri", "Malkapur", "Malout", "Malpura", "Malur", "Mamit", "Manali", "Mananthavady", "Manawar", "Mancherial", "Mandamarri", "Mandawa", "Mandia", "Mandla", "Mandi", "Mandi Dabwali", "Mandrem", "Mandvi", "Mangan", "Mangalagiri", "Mangaldoi", "Mangala", "Mangaluru", "Mangalwedha", "Manglaur", "Mangkolemba", "Manihari", "Manipur", "Manjeri", "Manmad", "Manoharpur", "Manthani", "Manu", "Manughat", "Mao", "Mapusa", "Maram", "Margao", "Margherita", "Marhaura", "Masaurhi", "Mathura", "Mattannur", "Mau", "Mavelikkara", "Mawana", "Mawlai", "Mawkyrwat", "Mawphlang", "Mawryngkneng", "Mawshynrut", "Mawsynram", "Mayang Imphal", "Mayiladuthurai", "Medak", "Medchal", "Medininagar", "Medziphema", "Meghalaya", "Meghahatuburu", "Mehkar", "Mehatpur", "Mehsana", "Melaghar", "Melli", "Meluri", "Memari", "Mendipathar", "Merapani", "Meerut", "Merta City", "Metpally", "Mettur", "Mettupalayam", "Mhow", "Miao", "Midnapore", "Mihijam", "Miraj", "Mirik", "Miryalaguda", "Mirzapur", "Mission Veng", "Mizoram", "Modasa", "Modinagar", "Moga", "Mohali", "Mohana", "Mohanpur", "Moirang", "Mokama", "Mokokchung", "Mon", "Moodbidri", "Moradabad", "Morbi", "Mori", "Morinda", "Morigaon", "Morjim", "Moreh", "Morena", "Motbung", "Motihari", "Mount Abu", "Muddebihal", "Mudigere", "Mudhol", "Mukkam", "Mukerian", "Mukteshwar", "Muktsar", "Mulbagal", "Mulugu", "Multai", "Mumbai", "Mundra", "Munger", "Mungeli", "Munsiyari", "Murliganj", "Murshidabad", "Musabani", "Mushalpur", "Mussoorie", "Muvattupuzha", "Mysore", "Mysuru", "Nabagram", "Nabarangpur", "Nabha", "Nabadwip", "Nadbai", "Nadaun", "Nadiad", "Nagaon", "Nagaland", "Nagda", "Nagina", "Naginimora", "Nagpur", "Nagri", "Nagrota Bagwan", "Naharkatia", "Naharlagun", "Nahan", "Naila Janjgir", "Nainital", "Najibabad", "Nakodar", "Nalagarh", "Nalbari", "Nalgonda", "Nalhati", "Nambol", "Namchi", "Namakkal", "Namsai", "Namthang", "Nandaprayag", "Nanded", "Nandurbar", "Nandyal", "Nangal", "Nandgaon", "Nangercoil", "Nanjangud", "Nanpara", "Narayanpet", "Narayanpur", "Naraingarh", "Narasaraopet", "Narendra Nagar", "Narkanda", "Narkatiaganj", "Narnaul", "Narirbazar", "Nartiang", "Narwana", "Nashik", "Nasirabad", "Naugachhia", "Nautanwa", "Navelim", "Navi Mumbai", "Navsari", "Nawalgarh", "Nawada", "Nawanshahr", "Nayabazar", "Nayagarh", "Nazira", "Nedumangad", "Neemuch", "Neem Ka Thana", "Nelamangala", "Nellore", "Netarhat", "New Checkon", "New Town", "New Tehri", "Neyyattinkara", "Neyveli", "Niali", "Nigahi", "Nilambur", "Nilokheri", "Nilgiri", "Ningthoukhong", "Niphad", "Nirmal", "Nirsa", "Nizamabad", "Niwari", "Noamundi", "Noida", "Nohar", "Nokha", "Noklak", "Noksen", "Noney", "Nongpoh", "Nongstoin", "Nongmynsong", "North Dum Dum", "North Lakhimpur", "North Paravur", "North Vanlaiphai", "Nuh", "Nuapada", "Nurpur", "Nutan Bazar", "Odisha", "Oddanchatram", "Okhrey", "Old Goa", "Omkareshwar", "Ongole", "Orai", "Orchha", "Ormanjhi", "Osian", "Osmanabad", "Ottapalam", "Pachora", "Pachore", "Padmanabhapuram", "Padra", "Padrauna", "Pakyong", "Pakhanjur", "Pakur", "Pala", "Palakkad", "Palampur", "Palani", "Palanpur", "Palghar", "Palia Kalan", "Palin", "Palitana", "Pali", "Pallavaram", "Palolem", "Palwancha", "Palwal", "Panaji", "Panagarh", "Panchkula", "Pandalam", "Pandavapura", "Pandharpur", "Pandua", "Pangin", "Panihati", "Panipat", "Panisagar", "Panna", "Panruti", "Panvel", "Parappanangadi", "Parassala", "Paradip", "Paralakhemundi", "Paramakudi", "Parbhani", "Parbung", "Pardi", "Parwanoo", "Pasighat", "Patan", "Patancheru", "Pathalgaon", "Pathardi", "Patharkhmah", "Pathargama", "Pathsala", "Pathia", "Patiala", "Patna", "Patnagarh", "Patratu", "Pattambi", "Patti", "Pauri", "Payal", "Payyanur", "Pecharthal", "Peddapalli", "Pehowa", "Pelling", "Pen", "Perambalur", "Peren Town", "Peren", "Perinthalmanna", "Pernem", "Perundurai", "Perumbavoor", "Petlad", "Pfutsero", "Phagwara", "Phaltan", "Phalodi", "Phek", "Phodong", "Phulbari", "Phulbani", "Phulwari Sharif", "Phungyar", "Phusro", "Pilibhit", "Pimpri-Chinchwad", "Pinjore", "Pipali", "Pipar City", "Pipalkoti", "Pipariya", "Pipili", "Pithora", "Pithoragarh", "Pokaran", "Pokhari", "Polasara", "Pollachi", "Ponda", "Ponnani", "Pooh", "Porbandar", "Porompat", "Porvorim", "Powayan", "Prantij", "Pratapgarh", "Pratappur", "Prayagraj", "Proddatur", "Puducherry", "Pudukkottai", "Pughoboto", "Pune", "Pundri", "Punjab", "Purulia", "Purnia", "Purola", "Pushkar", "Pusad", "Puttur", "Pynthorumkhrah", "Pynursla", "Qadian", "Quepem", "Quthbullapur", "Rabong", "Radhakishorepur", "Rae Bareli", "Rafiganj", "Raga", "Rahatgarh", "Rahata", "Rahuri", "Raichur", "Raiganj", "Raigarh", "Raipur", "Raisinghnagar", "Rajamahendravaram", "Rajapalayam", "Rajarhat", "Rajahmundry", "Rajasthan", "Rajgangpur", "Rajgarh", "Rajkot", "Rajmahal", "Rajmahendravaram", "Rajnandgaon", "Rajpura", "Rajula", "Raliang", "Ramanagara", "Ramanattukara", "Ramanujganj", "Ramanathapuram", "Ramagundam", "Ramgarh", "Ramhlun", "Ramnagar", "Ramnagara", "Ramirbazar", "Rampura Phul", "Rampur Bushahr", "Rampurhat", "Ranchi", "Ranebennuru", "Rangia", "Rangpo", "Rania", "Raniganj", "Ranikhet", "Ranikor", "Ranipet", "Ranipool", "Ranirbazar", "Panruti", "Rapar", "Rasipuram", "Ratlam", "Ratnagiri", "Ratia", "Ravangla", "Rawatsar", "Raxaul", "Rayagada", "Reckong Peo", "Redhakhol", "Reiek", "Republic Veng", "Reshi", "Resubelpara", "Revelganj", "Rewari", "Rewa", "Rhenock", "Rishikesh", "Rishra", "Rivona", "Robertsganj", "Robertsonpet", "Roha", "Rohtas", "Rohtak", "Roing", "Rohru", "Rongli", "Rongram", "Rongjeng", "Ropar", "Roorkee", "Rosera", "Rourkela", "Rudauli", "Rudraprayag", "Rudrapur", "Sabroom", "Safidon", "Sagar", "Sagalee", "Saharsa", "Sahibganj", "Saiha", "Saikul", "Sairang", "Saitual", "Sajong", "Sakleshpur", "Sakti", "Salegao", "Salem", "Salepur", "Saligao", "Samalkha", "Samana", "Samastipur", "Samdruptse", "Samrala", "Sambalpur", "Sambhal", "Sanand", "Sanawad", "Sangamner", "Sangareddy", "Sangli", "Sangla", "Sangrur", "Sankarankovil", "Sanquelim", "Santokhgarh", "Sant Kabir Nagar", "Santirbazar", "Sapatgram", "Saraikela", "Saraipali", "Sarangpur", "Sardarshahar", "Sardhana", "Sarkaghat", "Sarupathar", "Sasaram", "Satakha", "Satana", "Satara", "Sathupalli", "Sathyamangalam", "Satna", "Savarkundla", "Sawai Madhopur", "Sawantwadi", "Secunderabad", "Sechü-Zubza", "Sedam", "Sehore", "Selsella", "Senapati", "Seohara", "Seoni", "Seppa", "Serampore", "Serchhip", "Seyochung", "Shadnagar", "Shahabad", "Shahdol", "Shahkot", "Shahpura", "Shajapur", "Shamgarh", "Shamli", "Shamshabad", "Shangpung", "Shantipur", "Sheikhpura", "Shegaon", "Shella", "Sherghati", "Shevgaon", "Shikohabad", "Shillong", "Shimla", "Shirdi", "Shirpur", "Shivamogga", "Shivpuri", "Shoranur", "Shravasti", "Shrirampur", "Sialsuk", "Siddharthnagar", "Siddhpur", "Siddipet", "Sidhi", "Sikar", "Sikkim", "Sikandrabad", "Silapathar", "Silchar", "Siliguri", "Simdega", "Simri Bakhtiarpur", "Sindhanur", "Sindri", "Singjamei", "Singrauli", "Singtam", "Sinnar", "Siolim", "Sircilla", "Sirhind", "Sirkazhi", "Sirohi", "Sirsa", "Sirsaganj", "Sirsi", "Sitamarhi", "Sitapur", "Sivasagar", "Sivaganga", "Sivakasi", "Siwan", "Sohna", "Sohra", "Solan", "Solapur", "Sombaria", "Somwarpet", "Sonamura", "Sonari", "Sonbhadra", "Sonepur", "Songadh", "Songsak", "Sonipat", "Soreng", "Soro", "South Dum Dum", "Srikakulam", "Srinagar", "Srinivaspur", "Srirangapatna", "Srivilliputhur", "Suangpuilawn", "Sugnu", "Sujanpur Tira", "Sukma", "Sulthan Bathery", "Sultanganj", "Sumerpur", "Sunam", "Sundargarh", "Sundarnagar", "Supaul", "Surajpur", "Surat", "Suratgarh", "Suri", "Susner", "Sutnga", "Tabo", "Tadepalligudem", "Tadipatri", "Tadong", "Tadubi", "Talai", "Talala", "Talcher", "Taleigao", "Taliparamba", "Talivandla Sabo", "Talwara", "Tamar", "Tambaram", "Tamei", "Tamenglong", "Tamil Nadu", "Tamluk", "Tamlu", "Tamulpur", "Tanakpur", "Tanda", "Tandur", "Tangla", "Tankara", "Taranagar", "Taraori", "Tarakeswar", "Tarikere", "Tarn Taran", "Tasgaon", "Tawang", "Teghra", "Tehatta", "Tehri", "Telangana", "Teliamura", "Temi", "Tenali", "Tenkasi", "Tengnoupal", "Tenughat", "Tezu", "Tezpur", "Thakurganj", "Thalassery", "Thane", "Thanesar", "Thanjavur", "Thanlon", "Tharad", "Thane", "Theog", "Thenzawl", "Thingsulthliah", "Thiruvalla", "Thiruvananthapuram", "Thrippunithura", "Thane", "Thoubal", "Tikamgarh", "Tikrikilla", "Tilhar", "Tilda Newra", "Tinsukia", "Tipaimukh", "Tiptur", "Tripura", "Tirora", "Tiruchirappalli", "Tiruchendur", "Tiruchengode", "Tirunelveli", "Tirupathur", "Tirupati", "Tiruppur", "Tirur", "Tirurangadi", "Tiruvannamalai", "Tizit", "Tlabung", "Tobu", "Todabhim", "Tonk", "Topchanchi", "Torpa", "Tosham", "Tripura", "Triveniganj", "Tsiesema", "Tuensang", "Tuipang", "Tuli", "Tumakuru", "Tumsar", "Tundla", "Tundi", "Tura", "Tuting", "Uchana", "Udala", "Udalguri", "Udaipur", "Udaipurwati", "Udhagamandalam", "Udupi", "Ujjain", "Ujhani", "Ukhimath", "Ukhrul", "Ulhasnagar", "Umbergaon", "Umaria", "Umerkote", "Umreth", "Umsawli", "Umsning", "Una", "Unjha", "Uniara", "Unnao", "Upleta", "Uppal", "Uttar Pradesh", "Uttar Champamura", "Uttarakhand", "Uttarkashi", "Vadakara", "Vadnagar", "Vadodara", "Vaivakawn", "Vaikom", "Valanchery", "Valpoi", "Valsad", "Vapi", "Varanasi", "Varca", "Varkala", "Vasco da Gama", "Vedasandur", "Vellore", "Vemulawada", "Vengurla", "Verna", "Veraval", "Vikarabad", "Vidisha", "Vijayapura", "Vijayawada", "Vikramganj", "Viluppuram", "Viramgam", "Viratnagar", "Virajpet", "Virudhunagar", "Visakhapatnam", "Visnagar", "Viswema", "Vita", "Vizianagaram", "Vriddhachalam", "Vrindavan", "Vyara", "Wabagai", "Wadakkanchery", "Wadrafnagar", "Waidhan", "Wai", "Walajapet", "Wangjing", "Wani", "Wankaner", "Warangal", "Wardha", "Waraseoni", "Warisaliganj", "Warora", "Washim", "Wayand", "West Bengal", "Williamnagar", "Wokha", "Wyra", "Yachuli", "Yadgir", "Yairipok", "Yamunanagar", "Yamunotri", "Yangang", "Yavatmal", "Yemmiganur", "Yisemyong", "Yingkiong", "Yol", "Yuksom", "Zaheerabad", "Zaidpur", "Zemabawk", "Zira", "Zirakpur", "Ziro", "Zuluk", "Zunheboto"
];

// --- Personas Definition ---
const personas = {
    Critic: { icon: 'zap', color: 'red', desc: 'Points out flaws & systemic failures' },
    Thinker: { icon: 'brain', color: 'blue', desc: 'Proposes policy & long-term solutions' },
    Jester: { icon: 'laugh', color: 'yellow', desc: 'Uses satire & memes to drive awareness' },
    Executor: { icon: 'hammer', color: 'green', desc: 'Organizes protests & ground action' },
    Verifier: { icon: 'shield-check', color: 'purple', desc: 'Fact-checks & validates claims' }
};

// --- Data Generation ---
const generateData = () => {
    // Mock Users
    state.users = [
        { id: 1, name: 'Arjun Mehta', username: 'arjun_infra', persona: 'Critic', points: 4200, location: 'Mumbai, MH', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' },
        { id: 2, name: 'Priya Sharma', username: 'priya_policy', persona: 'Thinker', points: 3850, location: 'Delhi, DL', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
        { id: 3, name: 'Rahul Varma', username: 'rahul_satire', persona: 'Jester', points: 2900, location: 'Bangalore, KA', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
        { id: 4, name: 'Ananya Iyer', username: 'ananya_ground', persona: 'Executor', points: 5100, location: 'Chennai, TN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
        { id: 5, name: 'Vikram Singh', username: 'vikram_facts', persona: 'Verifier', points: 4500, location: 'Chandigarh, CH', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
        { id: 6, name: 'Sanya Gupta', username: 'sanya_med', persona: 'Thinker', points: 3200, location: 'Pune, MH', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanya' },
        { id: 7, name: 'Karan Johar', username: 'karan_civic', persona: 'Executor', points: 2100, location: 'Lucknow, UP', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karan' },
        { id: 8, name: 'Neha Reddy', username: 'neha_eco', persona: 'Critic', points: 3400, location: 'Hyderabad, TS', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha' },
        { id: 9, name: 'Amit Shah', username: 'amit_vibe', persona: 'Jester', points: 1500, location: 'Ahmedabad, GJ', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit' },
        { id: 10, name: 'Deepika K', username: 'deep_verifier', persona: 'Verifier', points: 4800, location: 'Kochi, KL', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepika' }
    ];

    // Mock Posts
    state.posts = [
        { 
            id: 1, userId: 1, type: 'Root Cause Report', category: 'Public Infrastructure', 
            title: 'The Pothole Paradox: Why Mumbai Roads Fail Every Monsoon', 
            desc: 'Despite a ₹2,500 Cr budget, the bitumen quality used is substandard. Research shows 40% of material is diverted...', 
            votes: 1240, comments: 85, verified: true, time: '2h ago'
        },
        { 
            id: 2, userId: 2, type: 'Policy Proposal', category: 'Education', 
            title: 'Rethinking Board Exams: A Shift to Skill-Based Evaluation', 
            desc: 'The current rote-learning model is creating "educated unemployables". We propose a modular system...', 
            votes: 890, comments: 42, verified: true, time: '5h ago'
        },
        { 
            id: 3, userId: 3, type: 'Satire', category: 'Corruption', 
            title: 'Local Politician Discovers "Invisible Bridge" Built for ₹50 Cr', 
            desc: 'It is so advanced that even the residents cannot see it. Truly a marvel of modern engineering and accounting.', 
            votes: 2100, comments: 156, verified: false, time: '1h ago'
        },
        { 
            id: 4, userId: 4, type: 'Civic Campaign', category: 'Transport', 
            title: 'Mass Protest: Restore Local Train Services in Suburban Areas', 
            desc: 'Join us this Sunday at 10 AM. We need 5,000 signatures to file the PIL. Your commute matters.', 
            votes: 3400, comments: 210, verified: true, time: '12h ago'
        },
        { 
            id: 5, userId: 5, type: 'News Analysis', category: 'Healthcare', 
            title: 'The Reality of Generic Medicines in Local Clinics', 
            desc: 'Our investigation found that 30% of "essential" medicines are out of stock. Here is the data breakdown...', 
            votes: 560, comments: 28, verified: true, time: '8h ago'
        }
    ];

    // Add more mock posts
    for(let i=6; i<=20; i++) {
        const u = state.users[Math.floor(Math.random() * state.users.length)];
        state.posts.push({
            id: i, userId: u.id,
            type: ['Root Cause Report', 'Policy Proposal', 'News Analysis', 'Satire', 'Civic Campaign'][Math.floor(Math.random() * 5)],
            category: ['Public Infrastructure', 'Education', 'Corruption', 'Transport', 'Healthcare'][Math.floor(Math.random() * 5)],
            title: `Civic Issue Discussion #${i}`,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            votes: Math.floor(Math.random() * 1000), comments: Math.floor(Math.random() * 100), verified: Math.random() > 0.5,
            time: `${Math.floor(Math.random() * 24)}h ago`
        });
    }

    state.quests = [
        { id: 1, title: 'Report Local Issue', reward: 500, progress: 60, status: 'Active', desc: 'Identify and photograph a public utility failure in your area.' },
        { id: 2, title: 'Fact-check a Debate', reward: 300, progress: 100, status: 'Completed', desc: 'Verify 3 claims from the recent Tax Reform debate.' },
        { id: 3, title: 'Create Policy Proposal', reward: 1000, progress: 20, status: 'Active', desc: 'Draft a solution for waste management in your ward.' },
        { id: 4, title: 'Organize Local Meet', reward: 800, progress: 0, status: 'Active', desc: 'Host a discussion on neighborhood safety.' },
        { id: 5, title: 'Daily Civic Quiz', reward: 100, progress: 0, status: 'Active', desc: 'Answer 5 questions about your local municipality.' }
    ];

    state.arenas = [
        { id: 1, title: 'Tax Debate: GST vs Direct Tax', host: 'Vikram Singh', listeners: 1204, speakers: 5 },
        { id: 2, title: 'NEET Paper Leak: Discussion', host: 'Ananya Iyer', listeners: 5400, speakers: 12 },
        { id: 3, title: 'Local Governance Reform', host: 'Priya Sharma', listeners: 450, speakers: 3 },
        { id: 4, title: 'Public Transport: The Future', host: 'Arjun Mehta', listeners: 890, speakers: 6 },
        { id: 5, title: 'Healthcare Access in Rural Areas', host: 'Sanya Gupta', listeners: 320, speakers: 4 }
    ];

    state.comments = Array.from({ length: 40 }).map((_, i) => ({
        id: i, postId: Math.floor(Math.random() * 20) + 1, userId: Math.floor(Math.random() * 10) + 1,
        text: 'Great point! We need to focus on systemic change rather than just temporary fixes.',
        votes: Math.floor(Math.random() * 10), replies: []
    }));
};

// --- Helper for Navigation Paths ---
const getNavPath = (page) => {
    const path = window.location.pathname;
    const isSubfolder = path.includes('/dashboard/') || path.includes('/arenas/') || 
                        path.includes('/quests/') || path.includes('/leaderboard/') || 
                        path.includes('/profile/') || path.includes('/error/');
    
    if (page === 'index') return isSubfolder ? '../' : './';
    return isSubfolder ? `../${page}/` : `${page}/`;
};

// --- Common UI Components ---
const components = {
    navbar: () => `
        <nav class="sticky top-0 z-50 glass border-b border-white/10 px-4 md:px-8 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2 cursor-pointer" onclick="window.location.href='${getNavPath('dashboard')}'">
                <div class="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                    <i data-lucide="root" class="text-white w-6 h-6"></i>
                </div>
                <span class="font-bold text-xl hidden md:block">The Root Cause</span>
            </div>
            <div class="flex-1 max-w-xl mx-8 hidden md:block">
                <div class="relative">
                    <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
                    <input type="text" placeholder="Search for reforms, issues, or users..." class="w-full bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-brand outline-none">
                </div>
            </div>
            <div class="flex items-center gap-4">
                <button onclick="toggleDarkMode()" class="p-2 rounded-xl hover:bg-white/10 transition-colors">
                    <i data-lucide="${state.isDarkMode ? 'moon' : 'sun'}" id="theme-icon" class="w-5 h-5"></i>
                </button>
                <div class="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-brand" onclick="window.location.href='${getNavPath('profile')}'">
                    <img id="nav-avatar" src="${state.currentUser.avatar}" alt="Avatar">
                </div>
            </div>
        </nav>
    `,
    sidebarLeft: (activePage) => `
        <aside class="hidden lg:flex flex-col gap-2 w-64 sticky top-24 self-start">
            <a href="${getNavPath('dashboard')}" class="nav-link flex items-center gap-3 p-3 rounded-xl hover:bg-brand/10 hover:text-brand transition-all font-medium ${activePage === 'dashboard' ? 'active-nav' : ''}">
                <i data-lucide="home" class="w-5 h-5"></i> Dashboard
            </a>
            <a href="${getNavPath('arenas')}" class="nav-link flex items-center gap-3 p-3 rounded-xl hover:bg-brand/10 hover:text-brand transition-all font-medium ${activePage === 'arenas' ? 'active-nav' : ''}">
                <i data-lucide="mic-2" class="w-5 h-5"></i> Live Arenas
            </a>
            <a href="${getNavPath('quests')}" class="nav-link flex items-center gap-3 p-3 rounded-xl hover:bg-brand/10 hover:text-brand transition-all font-medium ${activePage === 'quests' ? 'active-nav' : ''}">
                <i data-lucide="sword" class="w-5 h-5"></i> Civic Quests
            </a>
            <a href="${getNavPath('leaderboard')}" class="nav-link flex items-center gap-3 p-3 rounded-xl hover:bg-brand/10 hover:text-brand transition-all font-medium ${activePage === 'leaderboard' ? 'active-nav' : ''}">
                <i data-lucide="trophy" class="w-5 h-5"></i> Leaderboard
            </a>
            <button onclick="logout()" class="nav-link flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all font-medium mt-auto">
                <i data-lucide="log-out" class="w-5 h-5"></i> Logout
            </button>
            <div class="my-4 border-t border-white/5"></div>
            <p class="text-xs font-bold text-slate-500 px-3 mb-2 uppercase tracking-wider">My Subscriptions</p>
            <div class="space-y-1">
                <a href="#" class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-sm">#Infrastructure</a>
                <a href="#" class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-sm">#HealthcareReform</a>
                <a href="#" class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-sm">#EducationPolicy</a>
            </div>
        </aside>
    `,
    sidebarRight: () => `
        <aside class="hidden xl:flex flex-col gap-6 w-80 sticky top-24 self-start">
            <div class="glass p-5 rounded-3xl">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                    <i data-lucide="trending-up" class="w-5 h-5 text-brand"></i> Trending Causes
                </h3>
                <div class="space-y-4" id="trending-list"></div>
            </div>
            <div class="glass p-5 rounded-3xl">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                    <i data-lucide="users" class="w-5 h-5 text-brand"></i> Active Voices
                </h3>
                <div class="space-y-4" id="active-voices"></div>
            </div>
        </aside>
    `,
    mobileNav: (activePage) => `
        <nav class="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 flex justify-around items-center p-3 z-50">
            <a href="${getNavPath('dashboard')}" class="flex flex-col items-center gap-1 ${activePage === 'dashboard' ? 'text-brand' : 'text-slate-400'}">
                <i data-lucide="home" class="w-6 h-6"></i>
                <span class="text-[10px]">Home</span>
            </a>
            <a href="${getNavPath('arenas')}" class="flex flex-col items-center gap-1 ${activePage === 'arenas' ? 'text-brand' : 'text-slate-400'}">
                <i data-lucide="mic-2" class="w-6 h-6"></i>
                <span class="text-[10px]">Arenas</span>
            </a>
            <a href="${getNavPath('quests')}" class="flex flex-col items-center gap-1 ${activePage === 'quests' ? 'text-brand' : 'text-slate-400'}">
                <i data-lucide="sword" class="w-10 h-10 text-brand"></i>
            </a>
            <a href="${getNavPath('leaderboard')}" class="flex flex-col items-center gap-1 ${activePage === 'leaderboard' ? 'text-brand' : 'text-slate-400'}">
                <i data-lucide="trophy" class="w-6 h-6"></i>
                <span class="text-[10px]">Board</span>
            </a>
            <a href="${getNavPath('profile')}" class="flex flex-col items-center gap-1 ${activePage === 'profile' ? 'text-brand' : 'text-slate-400'}">
                <i data-lucide="user" class="w-6 h-6"></i>
                <span class="text-[10px]">Profile</span>
            </a>
        </nav>
    `
};

// --- Core Actions ---
const toggleDarkMode = () => {
    state.isDarkMode = !state.isDarkMode;
    localStorage.setItem('trc_theme', state.isDarkMode ? 'dark' : 'light');
    applyTheme();
};

const applyTheme = () => {
    if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', state.isDarkMode ? 'moon' : 'sun');
        lucide.createIcons();
    }
};

const logout = () => {
    localStorage.removeItem('trc_user');
    showToast('Logging out...');
    setTimeout(() => {
        window.location.href = getNavPath('index');
    }, 1000);
};

const showToast = (msg) => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-24 md:bottom-8 right-8 z-[110] flex flex-col gap-2';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'glass px-6 py-3 rounded-2xl border-l-4 border-brand animate-slide-up flex items-center gap-3 shadow-xl';
    toast.innerHTML = `<i data-lucide="info" class="w-5 h-5 text-brand"></i> <span class="text-sm font-medium">${msg}</span>`;
    container.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
};

// --- Initialization for Pages ---
const initPage = (pageName) => {
    generateData();
    applyTheme();
    
    const app = document.getElementById('app');
    if (app) {
        const layout = `
            ${components.navbar()}
            <div class="flex-1 flex max-w-[1440px] mx-auto w-full p-4 md:p-6 gap-6">
                ${components.sidebarLeft(pageName)}
                <main class="flex-1 max-w-2xl w-full mx-auto pb-20 md:pb-0" id="page-content"></main>
                ${components.sidebarRight()}
            </div>
            ${components.mobileNav(pageName)}
            <div id="post-modal" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="closeModal()"></div>
                <div class="glass max-w-3xl w-full max-h-[90vh] rounded-3xl relative z-10 flex flex-col overflow-hidden animate-slide-up">
                    <div class="p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 class="font-bold">Discussion</h3>
                        <button onclick="closeModal()" class="p-2 hover:bg-white/10 rounded-full transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>
                    </div>
                    <div id="modal-body" class="overflow-y-auto p-6 scrollbar-hide"></div>
                </div>
            </div>
            
            <!-- New Submission Modal -->
            <div id="submission-modal" class="fixed inset-0 z-[120] hidden flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeModal()"></div>
                <div class="glass max-w-2xl w-full p-8 rounded-3xl relative z-10 animate-slide-up">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center">
                            <i data-lucide="pen-tool" class="text-brand w-6 h-6"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">New Submission</h2>
                            <p class="text-sm text-slate-500 dark:text-slate-400">Identify problems, cite evidence, propose solutions.</p>
                        </div>
                        <button onclick="closeModal()" class="ml-auto p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Headline</label>
                            <input type="text" placeholder="E.g., Proof of rigged contracts in Ward 4..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl p-4 focus:ring-2 focus:ring-brand outline-none text-slate-900 dark:text-white">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Detailed Breakdown</label>
                            <textarea placeholder="Describe the root cause, attach evidence links, or detail a reform blueprint..." class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl p-4 focus:ring-2 focus:ring-brand outline-none text-slate-900 dark:text-white resize-none" rows="4"></textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Topic Category</label>
                                <select class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl p-4 focus:ring-2 focus:ring-brand outline-none text-slate-900 dark:text-white cursor-pointer transition-all duration-300">
                                    <option>Public Infrastructure</option>
                                    <option>Education</option>
                                    <option>Corruption</option>
                                    <option>Transport</option>
                                    <option>Healthcare</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Format Type</label>
                                <select class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl p-4 focus:ring-2 focus:ring-brand outline-none text-slate-900 dark:text-white cursor-pointer transition-all duration-300">
                                    <option>Root Cause Report</option>
                                    <option>Policy Proposal</option>
                                    <option>News Analysis</option>
                                    <option>Satire</option>
                                    <option>Civic Campaign</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between pt-4">
                            <button class="flex items-center gap-2 text-slate-500 hover:text-brand transition-colors font-medium">
                                <i data-lucide="image" class="w-5 h-5"></i> Add Evidence
                            </button>
                            <button onclick="showToast('Submission published!'); closeModal();" class="bg-brand hover:bg-brand-hover text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                                Publish <i data-lucide="send" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        app.innerHTML = layout;
        renderRightSidebar();
    }
    lucide.createIcons();
};

const renderRightSidebar = () => {
    const trending = document.getElementById('trending-list');
    if (trending) {
        const topics = [
            { tag: '#NEETPaperScam', count: '45.2K posts' },
            { tag: '#MiddleClassSqueeze', count: '32.1K posts' },
            { tag: '#PotholeTaxWhen', count: '12.8K posts' }
        ];
        trending.innerHTML = topics.map(t => `
            <div class="cursor-pointer group">
                <div class="text-xs text-slate-500">${t.count}</div>
                <div class="font-bold group-hover:text-brand transition-colors">${t.tag}</div>
            </div>
        `).join('');
    }

    const voices = document.getElementById('active-voices');
    if (voices) {
        voices.innerHTML = state.users.slice(0, 5).map(u => `
            <div class="flex items-center gap-3 cursor-pointer group">
                <img src="${u.avatar}" class="w-8 h-8 rounded-full group-hover:ring-2 ring-brand transition-all">
                <div>
                    <div class="text-sm font-bold">${u.name}</div>
                    <div class="text-[10px] text-slate-500">@${u.username}</div>
                </div>
            </div>
        `).join('');
    }
};

const closeModal = () => {
    const postModal = document.getElementById('post-modal');
    const profileModal = document.getElementById('edit-profile-modal');
    const submissionModal = document.getElementById('submission-modal');
    if (postModal) postModal.classList.add('hidden');
    if (profileModal) profileModal.classList.add('hidden');
    if (submissionModal) submissionModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.openSubmissionModal = () => {
    const modal = document.getElementById('submission-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.openEditProfile = () => {
    const modal = document.getElementById('edit-profile-modal');
    if (!modal) return;
    
    const u = state.currentUser;
    document.getElementById('edit-displayname').value = u.displayName;
    document.getElementById('edit-state').value = u.state;
    document.getElementById('edit-city').value = u.city;
    document.getElementById('edit-persona').value = u.persona;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.saveProfile = () => {
    const u = state.currentUser;
    u.displayName = document.getElementById('edit-displayname').value;
    u.state = document.getElementById('edit-state').value;
    u.city = document.getElementById('edit-city').value;
    u.persona = document.getElementById('edit-persona').value;
    
    localStorage.setItem('trc_user', JSON.stringify(u));
    showToast('Profile updated successfully!');
    closeModal();
    if (typeof renderProfile === 'function') renderProfile();
};

const openPost = (id) => {
    const post = state.posts.find(p => p.id === id);
    if (!post) return;
    const user = state.users.find(u => u.id === post.userId) || state.currentUser;
    const modal = document.getElementById('post-modal');
    const modalBody = document.getElementById('modal-body');
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    modalBody.innerHTML = `
        <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
                <img src="${user.avatar}" class="w-12 h-12 rounded-full border-2 border-brand/20">
                <div>
                    <div class="font-bold text-lg text-slate-900 dark:text-white">${user.name} <span class="text-brand ml-2 text-sm font-normal">@${user.username}</span></div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">${user.location || state.currentUser.city} • ${post.time}</div>
                </div>
            </div>
            <div class="text-xs font-bold text-brand uppercase mb-2">${post.type} • ${post.category}</div>
            <h2 class="text-3xl font-black mb-4 leading-tight text-slate-900 dark:text-white">${post.title}</h2>
            <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">${post.desc}</p>
            <div class="flex items-center gap-4 p-4 glass rounded-2xl">
                <button onclick="upvote(${post.id})" class="flex items-center gap-2 hover:text-brand transition-colors text-slate-600 dark:text-slate-400">
                    <i data-lucide="arrow-big-up" class="w-6 h-6"></i> <span class="font-bold text-slate-900 dark:text-white">${post.votes}</span>
                </button>
                <button onclick="downvote(${post.id})" class="hover:text-red-500 transition-colors text-slate-600 dark:text-slate-400">
                    <i data-lucide="arrow-big-down" class="w-6 h-6"></i>
                </button>
                <div class="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>
                <button class="flex items-center gap-2 hover:text-blue-500 transition-colors text-slate-600 dark:text-slate-400">
                    <i data-lucide="share-2" class="w-5 h-5"></i> Share
                </button>
            </div>
        </div>

        <div class="space-y-6">
            <h4 class="font-bold text-xl text-slate-900 dark:text-white">Comments (${post.comments})</h4>
            <div class="glass p-4 rounded-2xl mb-8">
                <textarea id="comment-input" placeholder="Add a comment..." class="w-full bg-transparent border-none outline-none resize-none mb-2 text-slate-900 dark:text-white" rows="2"></textarea>
                <div class="flex justify-end">
                    <button onclick="addComment(${post.id})" class="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">Post Comment</button>
                </div>
            </div>
            
            <div id="modal-comments" class="space-y-6">
                ${state.comments.filter(c => c.postId === id).map(comment => {
                    const cUser = state.users.find(u => u.id === comment.userId) || state.currentUser;
                    return `
                        <div class="flex gap-4">
                            <img src="${cUser.avatar}" class="w-8 h-8 rounded-full flex-shrink-0">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-bold text-sm text-slate-900 dark:text-white">${cUser.name}</span>
                                    <span class="text-[10px] text-slate-500">${comment.time || '2h ago'}</span>
                                </div>
                                <p class="text-slate-600 dark:text-slate-300 text-sm mb-2">${comment.text}</p>
                                <div class="flex items-center gap-4 text-xs font-bold text-slate-500">
                                    <button class="hover:text-brand transition-colors">Upvote (${comment.votes})</button>
                                    <button class="hover:text-brand transition-colors">Reply</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    lucide.createIcons();
};

window.upvote = (id) => {
    const post = state.posts.find(p => p.id === id);
    if (post) {
        post.votes++;
        if (typeof renderFeed === 'function') renderFeed(state.currentFilter || 'trending');
        showToast('Upvoted!');
    }
};

window.downvote = (id) => {
    const post = state.posts.find(p => p.id === id);
    if (post) {
        post.votes--;
        if (typeof renderFeed === 'function') renderFeed(state.currentFilter || 'trending');
        showToast('Downvoted');
    }
};

window.addComment = (postId) => {
    const textarea = document.getElementById('comment-input');
    if (!textarea || !textarea.value.trim()) return;
    
    const newComment = {
        id: state.comments.length + 1,
        postId: postId,
        userId: 1, // Current user as Arjun for demo
        text: textarea.value.trim(),
        votes: 0,
        replies: [],
        time: 'Just now'
    };
    
    state.comments.unshift(newComment);
    const post = state.posts.find(p => p.id === postId);
    if (post) post.comments++;
    
    textarea.value = '';
    openPost(postId); // Refresh modal
    if (typeof renderFeed === 'function') renderFeed(state.currentFilter || 'trending');
    showToast('Comment posted!');
};
