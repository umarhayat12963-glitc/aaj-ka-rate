// AdSense ke liye original articles — Roman Urdu, asan lafz, text only.
// Ye articles pehle draft file me thay; ab site par live hain. Koi rate
// baghair tareekh aur source ke nahi likha gaya. Article 1 ki misaal
// site ke verified OGRA window se li gayi hai (31 Oct–2 Nov 2026).

export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  blocks: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: 'petrol-rate-kyun-badhta-ghatta-hai',
    title: 'Petrol ka rate kyun badhta ya ghatta hai?',
    description: 'Petrol aur diesel ka rate sirf ek wajah se nahi badalta. Crude oil, dollar, tax aur OGRA ka daily system samjhen.',
    blocks: [
      { kind: 'p', text: 'Petrol ka rate sirf ek wajah se nahi badalta. Is par kai cheezein asar dalti hain:' },
      { kind: 'list', ordered: false, items: [
        'International crude oil ki qeemat: Duniya me tail mehnga ho to Pakistan me bhi uska asar aata hai.',
        'Dollar aur rupee: Tail dollar me khareeda jata hai. Rupee kamzor ho to wohi tail rupee me mehnga par jata hai.',
        'Tax aur levy: Hukoomat ki taraf se lagaye gaye tax aur levy bhi final rate ka hissa hote hain.',
        'OGRA ka naya daily system: Ab OGRA rozana qeemtein nikalta hai, international market ki 7 din ki average ki bunyad par. Is liye weekend par Friday wali qeemtein chalti hain aur agle working day par nayi qeemat aa sakti hai.',
      ] },
      { kind: 'p', text: 'Aam aadmi ke liye matlab ye hai: rate roz badal sakta hai, is liye petrol dalwane se pehle aaj ka rate aur uski tareekh zaroor dekh len. Sirf kal ka rate yaad rakh kar tank full karwana ghalat andaza ho sakta hai.' },
      { kind: 'p', text: 'Misaal (tareekh ke sath, live rate nahi): 31 October se 2 November 2026 tak petrol Rs 377.91 per litre aur diesel Rs 402.96 per litre raha. Source: OGRA notification, 30 October 2026. Aaj ka rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
  {
    slug: 'dollar-mehnga-hone-ka-asar',
    title: 'Dollar mehnga ho to aam aadmi par kya asar parta hai?',
    description: 'Dollar ka rate sirf business walon ka masla nahi. Petrol, imported cheezein, sabzi aur ghar ke budget par uska asar samjhen.',
    blocks: [
      { kind: 'p', text: 'Dollar ka rate sirf un logon ko nahi chhoota jo bahar se cheezein mangwate hain. Uska asar rozmarra ki zindagi me is tarah aata hai:' },
      { kind: 'list', ordered: false, items: [
        'Petrol aur diesel: Tail ki qeemat dollar se judi hai, is liye dollar mehnga hone se transport mehnga ho sakta hai.',
        'Imported cheezein: Bahar se aane wali dawai, machine ya khane ki cheezein mehngi ho jati hain.',
        'Sabzi aur grocery: Transport mehnga ho to mandi se dukaan tak pohanchne wali cheez bhi mehngi ho sakti hai.',
        'Ghar ka budget: Mahine ka kharcha pehle se tay karna mushkil ho jata hai, is liye roz ka rate dekhna aadat bana len.',
      ] },
      { kind: 'p', text: 'Is liye dollar ka rate dekhna sirf business walon ka kaam nahi — har ghar ke budget se jura hua hai. Aaj Ka Rate par dollar ka rate bhi tareekh ke sath dikhaya jata hai, taake aap purane rate ko aaj ka rate na samjhen.' },
    ],
  },
  {
    slug: 'lahore-sabzi-phal-rate-guide',
    title: 'Lahore me sabzi aur phal ka rate samajhne ki guide',
    description: 'Sabzi aur phal ka rate har roz ek jaisa nahi rehta. Season, supply, mandi se dukaan tak ka safar aur tareekh samjhen.',
    blocks: [
      { kind: 'p', text: 'Sabzi aur phal ka rate har roz ek jaisa nahi rehta. Rate samajhne ke liye ye 4 baatein yaad rakhen:' },
      { kind: 'list', ordered: true, items: [
        'Season: Jis sabzi ka season ho, wo aam tor par sasti milti hai. November me sardi ki sabziyan aati hain, jabke garmi wale phal season khatam hone par list se hat jate hain.',
        'Supply: Barish, garmi ya transport ki rukawat se supply kam ho to rate barh jata hai.',
        'Mandi se dukaan tak ka safar: Mandi ka rate aur mohalle ki dukaan ka rate ek nahi hota — transport aur dukaan ka kharcha bhi judta hai.',
        'Tareekh: Kal ka rate aaj ka rate nahi hota. Hamesha aaj ki tareekh wala rate dekhen. Agar kisi cheez par “Rate aa raha hai…” likha ho to uska matlab hai uska taza sarkari rate abhi nahi mila, andaza nahi lagaya gaya.',
      ] },
      { kind: 'p', text: 'Aaj Ka Rate par Lahore ki sabzi aur phal ke rate roz update hote hain, tareekh ke sath, taake aap andaze se nahi, aaj ke rate se khareedari kar saken.' },
    ],
  },
  {
    slug: 'sona-khareedne-se-pehle',
    title: 'Sona khareedne se pehle kya dekhna chahiye?',
    description: 'Sona khareedna sirf rate dekh kar faisla karne ka kaam nahi hai. Purity, banwai, raseed aur source check karen.',
    blocks: [
      { kind: 'p', text: 'Sona khareedna sirf rate dekh kar faisla karne ka kaam nahi hai. Ye baatein pehle check kar len:' },
      { kind: 'list', ordered: false, items: [
        'Aaj ki tareekh aur source: Sone ka rate roz badalta hai, aur mukhtalif sources me thora farq bhi ho sakta hai. Hamesha aaj ki tareekh wala rate aur uska source dekhen, purani khabar par faisla na karen.',
        'Purity (khara sona ya milawat): 24K, 22K aur 18K me farq hota hai. Rate usi purity ke hisab se hota hai, is liye sirf “sona” likha dekh kar andaza na lagayen.',
        'Banwai aur dukaan ka kharcha: Zevar ka final rate sirf sone ke rate se nahi banta — banwai aur dukaan ka margin bhi judta hai. Pehle poori qeemat pooch len.',
        'Raseed aur wazan: Wazan, purity aur qeemat raseed par likhwa len, taake baad me koi ghalat fehmi na ho.',
      ] },
      { kind: 'p', text: 'Ye article sone ka live rate nahi deta — sirf ye batata hai ke rate dekhte waqt kya check karna chahiye. Live rate ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
  {
    slug: 'ogra-petrol-rate-kaise-tay-hota-hai',
    title: 'OGRA petrol ka rate kaise tay karta hai?',
    description: 'Petrol ki qeemat kaise banti hai: crude oil, dollar, tax aur levy, OGRA ki notification aur rozana tabdeeli ka poora tareeqa.',
    blocks: [
      { kind: 'p', text: 'Pakistan me petrol aur diesel ki qeemat OGRA (Oil and Gas Regulatory Authority) ki notification se tay hoti hai. Ye qeemat kisi ek shakhs ke faisle se nahi banti, is ke peeche poora hisaab hota hai. Is article me wo hisaab asan lafzon me samjhaya gaya hai.' },
      { kind: 'p', text: 'Pehla hissa: crude oil ki international qeemat. Pakistan apni zaroorat ka bara hissa tail bahar se mangwata hai, aur uski qeemat duniya ki mandi me dollar me tay hoti hai. Jab duniya me tail mehnga hota hai, to Pakistan me bhi uska asar aata hai, aur jab sasta hota hai to qeemat neeche bhi aa sakti hai.' },
      { kind: 'p', text: 'Doosra hissa: dollar aur rupee ka rate. Tail dollar me khareeda jata hai, lekin pump par qeemat rupee me hoti hai. Is liye dollar mehnga ho to wohi tail rupee me mehnga par jata hai, chahe duniya me tail ki qeemat wahi ki wahi ho. Yehi wajah hai ke dollar ka rate dekhna petrol ke rate se jura hua hai.' },
      { kind: 'p', text: 'Teesra hissa: tax aur levy. Hukoomat petrol par tax aur levy lagati hai, jo final qeemat ka hissa bante hain. Ye tax waqt ke sath badal sakte hain, is liye kabhi tail sasta hone ke bawajood pump ki qeemat utni neeche nahi aati jitni umeed hoti hai. Ye hissa hukoomat ke faisle se tay hota hai, OGRA ke nahi.' },
      { kind: 'p', text: 'Chautha hissa: OGRA ki notification. OGRA international market ki haaliya average, dollar ka rate aur tax ko mila kar nayi qeemat nikalta hai aur notification jari karta hai. Aam tor par ye notification shaam ko announce hoti hai aur agli subah se nayi qeemat lagoo hoti hai.' },
      { kind: 'p', text: 'Haal ke waqt me OGRA rozana qeemtein nikal raha hai, international market ki 7 din ki average ki bunyad par. Is ka matlab ye hai ke rate ab hafton tak ek jaisa nahi rehta, wo roz badal sakta hai. Weekend par Friday wali qeemtein chalti hain, aur agle working day par nayi qeemat aa sakti hai.' },
      { kind: 'p', text: 'Misaal (tareekh ke sath, live rate nahi): 13 November 2026 ko petrol Rs 332 per litre aur diesel Rs 360 per litre tha. Source: OGRA notification, 12 November 2026 ko announce hui, 13 November se effective. Is se pehle 11 November ko petrol Rs 338 aur diesel Rs 371 tha, aur 7 November ko petrol Rs 346 aur diesel Rs 378 tha. Aaj ka rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
      { kind: 'p', text: 'Aam aadmi ke liye is ka matlab ye hai: petrol dalwane se pehle hamesha aaj ka rate aur uski tareekh dekhen. Kal ka rate yaad rakh kar faisla karna ghalat ho sakta hai, kyunki rate roz badal sakta hai. Aaj Ka Rate par har rate ke samne uski date likhi hoti hai, taake aap ko pata rahe ke rate kis din ka hai.' },
    ],
  },
  {
    slug: 'petrol-bachat-tareeqa',
    title: 'Petrol bachane ke 10 asan tareeqe',
    description: 'Petrol mehnga hai to bachat zaroori hai. Gari chalane ki aadatain, tyre, AC aur route planning se petrol kaise bachayen.',
    blocks: [
      { kind: 'p', text: 'Petrol ka rate roz badalta hai, lekin aap ka kharcha sirf rate par nahi, aap ki aadatain par bhi depend karta hai. Choti choti aadatain badal kar mahine me petrol par achi bachat ho sakti hai. Ye 10 tareeqe aasan hain aur in ke liye koi kharcha nahi chahiye.' },
      { kind: 'list', ordered: true, items: [
        'Tyre ki hawa theek rakhen: Kam hawa wale tyre par gari ko zyada zor lagana parta hai, is se petrol zyada kharch hota hai. Hafte me ek dafa tyre ki hawa check karen.',
        'Aahista aur barabar speed se chalain: Baar baar tez aur phir brake lagane se petrol zyada kharch hota hai. Barabar speed par gari chalana sab se bachat wala tareeqa hai.',
        'Zaroorat se zyada wazan na rakhen: Gari me faltu samaan rakhna wazan barhata hai aur petrol kharch barhata hai. Sirf zaroori cheezein rakhen.',
        'AC samajhdaari se chalain: AC petrol kharch karta hai. Sheher me halki garmi ho to sheesha kholna kaafi ho sakta hai, lambi safar par AC theek hai.',
        'Engine ko waqt par service karwain: Ganda air filter, purana engine oil aur kharab spark plug petrol zyada kharch karwate hain. Service waqt par karwana bachat hai, kharcha nahi.',
        'Route pehle se tay karen: Bina soche nikle to rasta lamba ho sakta hai. Jane se pehle rasta dekh len, aur traffic wale waqt se bachne ki koshish karen.',
        'Khali gari ko start kar ke zyada der khara na rakhen: Gari start kar ke 10 minute khari rakhna petrol zaya karna hai. Agar rukna lamba hai to engine band kar den.',
        'Chhote kaam ke liye gari ki bajaye paidal ya cycle: Nazdeek ki dukaan ke liye gari nikalna petrol aur waqt dono zaya karta hai.',
        'Tank ko aadha se neeche na jane den: Tank khaali hone par gari chalana engine ke liye bhi acha nahi, aur achanak petrol khatam hone ka khatra rehta hai.',
        'Roz ka rate dekhen: Petrol dalwane se pehle aaj ka rate dekh len. Rate roz badal sakta hai, is liye tank full karwane ka faisla aaj ke rate par karen.',
      ] },
      { kind: 'p', text: 'In me se har aik tareeqa chota lagta hai, lekin sab mila kar mahine ke akhir me farq saaf nazar aata hai. Koshish karen ke in me se 2-3 aadatain is hafte se hi shuru karen, baaki aahista aahista apna len.' },
      { kind: 'p', text: 'Aaj ka petrol rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen, har rate ke samne uski tareekh likhi hoti hai.' },
    ],
  },
  {
    slug: 'diesel-vs-petrol-farq',
    title: 'Diesel aur petrol me kya farq hai?',
    description: 'Diesel aur petrol sirf rate me nahi, engine, mileage, kharcha aur istemal me bhi alag hain. Kaun sa kis ke liye behtar hai.',
    blocks: [
      { kind: 'p', text: 'Pakistan me petrol aur diesel dono roz istemal hote hain, lekin ye dono ek jaise nahi hain. In ka rate bhi alag hota hai, in ki gari bhi alag hoti hai, aur in ka kharcha bhi alag hota hai. Ye farq samajhna har driver ke liye zaroori hai.' },
      { kind: 'p', text: 'Pehla farq: engine. Petrol wali gari ka engine halka aur tez hota hai, jabke diesel wali gari ka engine bhari aur mazboot hota hai. Diesel engine ko zyada wazan uthane ke liye banaya jata hai, is liye truck, bus aur bari gariyan aam tor par diesel par chalti hain.' },
      { kind: 'p', text: 'Doosra farq: mileage. Diesel aam tor par petrol se zyada mileage deta hai, matlab ek litre diesel par gari zyada door ja sakti hai. Isi liye lambi safar aur rozana zyada chalne wale log diesel ko pasand karte hain, jabke kam chalne wale logon ke liye petrol kaafi hota hai.' },
      { kind: 'p', text: 'Teesra farq: qeemat aur kharcha. Diesel aur petrol ke rate alag hote hain aur kabhi diesel sasta hota hai, kabhi petrol. Lekin sirf rate dekh kar faisla na karen — diesel gari ki qeemat aur uski service ka kharcha aam tor par zyada hota hai, jabke petrol gari ki service sasti hoti hai.' },
      { kind: 'p', text: 'Chautha farq: awaaz aur dhuaan. Diesel engine aam tor par zyada awaaz karta hai aur uska dhuaan bhi zyada hota hai. Petrol engine halka aur kam awaaz wala hota hai, is liye sheher me chhoti gari ke liye petrol zyada pasand kiya jata hai.' },
      { kind: 'p', text: 'Aap ke liye kaun sa behtar hai? Agar aap roz lambi safar karte hain ya wazan uthate hain to diesel behtar ho sakta hai. Agar aap sheher me kam chalte hain aur halki gari chahte hain to petrol behtar hai. Faisla sirf rate par nahi, apne istemal par karen.' },
      { kind: 'p', text: 'Misaal (tareekh ke sath, live rate nahi): 13 November 2026 ko petrol Rs 332 per litre aur diesel Rs 360 per litre tha, matlab diesel petrol se Rs 28 mehnga tha. Source: OGRA notification, 12 November 2026. Aaj ke rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
  {
    slug: 'dollar-rate-kyun-badhta-hai',
    title: 'Dollar ka rate kyun badhta ya ghatta hai?',
    description: 'Dollar ka rate kisi ek wajah se nahi badalta. Supply aur demand, remittance, import-export aur State Bank ka kirdar samjhen.',
    blocks: [
      { kind: 'p', text: 'Dollar ka rate roz badalta hai, aur is ke peeche kai wajahain hoti hain. Ye article un wajahain ko asan lafzon me samjhata hai, taake aap khabar sun kar samajh saken ke rate kyun badla.' },
      { kind: 'p', text: 'Pehli wajah: supply aur demand. Jab Pakistan me dollar ki demand zyada hoti hai aur supply kam, to dollar mehnga ho jata hai. Jab supply zyada hoti hai, to rate neeche aa sakta hai. Ye wohi asool hai jo har cheez par lagoo hota hai — jo cheez kam ho aur chahne wale zyada hon, wo mehngi ho jati hai.' },
      { kind: 'p', text: 'Doosri wajah: bahar se aane wala paisa. Bahar mulk me kaam karne wale Pakistani jo paisa ghar bhejte hain (remittance), wo dollar ki supply barhata hai. Jab remittance zyada aati hai to dollar ka rate sambhal jata hai, aur jab kam aati hai to rate par dabao barhta hai.' },
      { kind: 'p', text: 'Teesri wajah: import aur export. Pakistan bahar se tail, dawai, machine aur khane ki cheezein mangwata hai, aur in ke liye dollar chahiye hota hai. Jab import zyada hoti hai to dollar ki demand barhti hai. Export zyada hone se dollar aata hai, jo rate ko sambhalta hai.' },
      { kind: 'p', text: 'Chauthi wajah: State Bank aur hukoomat ke faisle. State Bank dollar ke zakhair (reserves) aur interest rate ke zariye rate par asar dalta hai. Hukoomat ke qarz, IMF se muahide aur mulk ki siyasi halat bhi dollar ke rate par asar dalte hain.' },
      { kind: 'p', text: 'Paanchvi wajah: duniya ki halat. Agar duniya me dollar mazboot ho raha ho ya tail mehnga ho raha ho, to Pakistan me bhi dollar ka rate badh sakta hai, chahe mulk ke andar kuch na badla ho.' },
      { kind: 'p', text: 'Aam aadmi par is ka asar: Dollar mehnga ho to petrol, imported dawai, aur bahar se aane wali cheezein mehngi ho jati hain. Transport mehnga hota hai to sabzi aur grocery par bhi asar aata hai. Is liye dollar ka rate sirf business walon ka masla nahi, har ghar ke budget se jura hai.' },
      { kind: 'p', text: 'Misaal (tareekh ke sath, live rate nahi): 2 November 2026 ko dollar ka interbank closing rate Rs 276.72 tha. Source: State Bank of Pakistan. Aaj ka rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen, har rate ke samne uski tareekh likhi hoti hai.' },
    ],
  },
  {
    slug: 'grocery-bachat-tareeqa',
    title: 'Grocery par bachat ka aasan tareeqa',
    description: 'Grocery ka bill kam karne ke liye bara plan nahi chahiye. List, season wali sabzi, rate compare aur zaroorat ke mutabiq khareedari.',
    blocks: [
      { kind: 'p', text: 'Grocery ka bill kam karne ke liye bara plan nahi chahiye, bas 4 aadatain kaafi hain:' },
      { kind: 'list', ordered: true, items: [
        'List bana kar jayen: List ke baghair dukaan par extra cheezein aa jati hain.',
        'Season wali sabzi len: Season ki sabzi aam tor par sasti aur taza hoti hai.',
        'Rate compare karen: Aaj Ka Rate par aaj ke rate dekh kar faisla karen, kal ke rate par nahi.',
        'Zaroorat se zyada na len: Kharaab hone wali cheezein zyada lene se bachat nahi hoti, nuqsan hota hai.',
      ] },
      { kind: 'p', text: 'Ye choti aadatain mahine ke akhir me farq dikhati hain, aur in ke liye koi app ya mehnga tareeqa nahi chahiye.' },
    ],
  },
  {
    slug: 'sona-rate-kyun-badhta-hai',
    title: 'Sone ka rate kyun badhta ya ghatta hai?',
    description: 'Sone ki qeemat sirf Pakistan me nahi banti. International rate, dollar, shadi ka season aur purity ka poora asar samjhen.',
    blocks: [
      { kind: 'p', text: 'Sone ka rate roz badalta hai, aur kabhi ek hi din me bara farq aa jata hai. Ye article batata hai ke sone ki qeemat kaise banti hai aur khareedne se pehle kya dekhna chahiye.' },
      { kind: 'p', text: 'Pehli wajah: duniya me sone ki qeemat. Sona duniya bhar me dollar me khareeda aur becha jata hai. Jab duniya me sone ki qeemat barhti hai to Pakistan me bhi uska asar aata hai, aur jab girti hai to yahan bhi rate neeche aa sakta hai.' },
      { kind: 'p', text: 'Doosri wajah: dollar ka rate. Sona dollar me khareeda jata hai, lekin Pakistan me uski qeemat rupee me hoti hai. Dollar mehnga ho to wohi sona rupee me mehnga par jata hai, chahe duniya me sone ki qeemat wahi ki wahi ho.' },
      { kind: 'p', text: 'Teesri wajah: mang (demand). Shadi ke season me sone ki mang barh jati hai, is liye us waqt rate par dabao aa sakta hai. Jab log sona khareedna kam kar den to rate sambhal bhi sakta hai.' },
      { kind: 'p', text: 'Chauthi wajah: siyasi aur maashi halat. Jab duniya me ghair yaqeeni ho, jang ya maashi pareshani ho, to log sona khareedte hain kyunki us ko mehfooz samjha jata hai. Is se sone ki qeemat barh jati hai.' },
      { kind: 'p', text: 'Purity samajhna zaroori hai. Sona 24K, 22K aur 18K me milta hai. 24K pure sona hota hai, 22K me thori milawat hoti hai aur zevar aam tor par 22K ka banta hai, 18K me milawat zyada hoti hai. Rate usi purity ke hisab se hota hai, is liye sirf “sona” likha dekh kar andaza na lagayen — pehle pooch len ke rate kis purity ka hai.' },
      { kind: 'p', text: 'Tola aur masha bhi samajh len. Pakistan me sona tola ke hisab se becha jata hai, aur ek tola me 12 masha hote hain. Dukaan par ja kar pehle tola ka rate pooch len, phir apne wazan ke hisab se qeemat nikal len.' },
      { kind: 'p', text: 'Khareedne se pehle ye zaroor karen: aaj ki tareekh wala rate aur uska source dekhen, purity pooch len, banwai aur dukaan ka kharcha pehle se pooch len, aur wazan, purity aur qeemat raseed par likhwa len.' },
      { kind: 'p', text: 'Misaal (tareekh ke sath, live rate nahi): 2 November 2026 ko 24K sone ka rate Rs 412,136 per tola aur chandi ka rate Rs 5,488 per tola tha. Source: APSGJA Sarafa. Aaj ka rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
  {
    slug: 'karyana-budget-kaise-banayen',
    title: 'Ghar ka karyana budget kaise banayen?',
    description: 'Mahine ka karyana budget banane ka asan tareeqa: list, zaroori cheezein, rate dekhna aur bachat ki aadatain.',
    blocks: [
      { kind: 'p', text: 'Har ghar me karyana ka kharcha mahine ka sab se bara kharcha hota hai. Agar is ka budget pehle se bana liya jaye to mahine ke akhir me pareshani nahi hoti. Ye article ghar ka karyana budget banane ka asan tareeqa batata hai.' },
      { kind: 'p', text: 'Pehla qadam: mahine ki list banayen. Pehle likhen ke ghar me mahine bhar me kya kya chahiye hota hai — atta, cheeni, ghee, doodh, anday, daalein, chawal aur masale. List likhne se pata chal jata hai ke kya zaroori hai aur kya extra hai.' },
      { kind: 'p', text: 'Doosra qadam: cheezon ko do hisson me baant len. Pehla hissa: wo cheezein jo mahine me ek dafa leni hoti hain, jaise atta, cheeni, ghee aur chawal. Doosra hissa: wo cheezein jo hafte me leni hoti hain, jaise doodh, anday, sabzi aur phal. Is se khareedari asan ho jati hai.' },
      { kind: 'p', text: 'Teesra qadam: rate dekh kar khareeden. Khareedne se pehle aaj ke rate dekh len, taake pata rahe ke dukaan sahi rate de raha hai ya zyada le raha hai. Aaj Ka Rate par karyana ke rate tareekh ke sath dikhaye jate hain.' },
      { kind: 'p', text: 'Chautha qadam: bulk me lene aur thora lene ka farq samajhen. Jo cheez kharab nahi hoti, jaise chawal aur daalein, wo zyada lene se sasti par sakti hai. Lekin jo cheez kharab ho jati hai, jaise doodh aur sabzi, wo zaroorat ke mutabiq len, zyada lene se nuqsan hota hai.' },
      { kind: 'p', text: 'Paanchwa qadam: mahine ke akhir me hisaab karen. Mahina khatam hone par dekhen ke kitna kharcha hua aur kahan zyada hua. Agle mahine ki list usi hisaab se theek karen. Ye aadat 2-3 mahine me budget ko behtar bana deti hai.' },
      { kind: 'p', text: 'Misaal (tareekh ke sath, live rate nahi): 29 October 2026 wale haftay ke PBS SPI report ke mutabiq atta Rs 147.57 per kg, cheeni Rs 141.12 per kg, ghee Rs 618.19 per kg aur doodh Rs 219.98 per litre tha. Source: Pakistan Bureau of Statistics, SPI report, week ended 29 October 2026. Aaj ke rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
  {
    slug: 'sabzi-phal-seasonal-calendar',
    title: 'Saal bhar ki sabzi aur phal: seasonal calendar',
    description: 'Kis sabzi aur phal ka season kab aata hai? Sardi, garmi aur barsaat ka calendar samjhen aur season wali cheez sasti len.',
    blocks: [
      { kind: 'p', text: 'Sabzi aur phal ka rate us ke season par bohat depend karta hai. Jis cheez ka season ho, wo aam tor par sasti aur taza milti hai, aur jis ka season khatam ho jaye, wo mehngi ho jati hai ya bazaar se gayab ho jati hai. Ye calendar aap ko batata hai ke saal ke kis hisse me kya milega.' },
      { kind: 'p', text: 'Sardi ka mosam (November se February): Sardi me matar, gajar, shalgam, palak, kinnow aur malta aate hain. Ye sardi ki sab se achi cheezein hain, taza aur sasti milti hain. Strawberry December se aane lagti hai. Sardi me sabzi ka rate aam tor par sambhal jata hai kyunki supply zyada hoti hai.' },
      { kind: 'p', text: 'Garmi ka mosam (March se June): Garmi me aam, tarbooz, kharbooza aur angoor aate hain. Ye garmi ke mashhoor phal hain, lekin in ka season chhota hota hai, is liye season khatam hote hi ye bazaar se hat jate hain aur in ka rate dikhana band kar diya jata hai, taake purana rate aaj ka na lage.' },
      { kind: 'p', text: 'Barsaat ka mosam (July se September): Barsaat me sabzi ki supply par asar parta hai. Barish se faslon ko nuqsan ho sakta hai, is liye kuch sabziyan mehngi ho jati hain. Is mosam me rate roz check karna aur bhi zaroori ho jata hai.' },
      { kind: 'p', text: 'Saal bhar milne wali cheezein: Aloo, pyaz, tamatar aur kela saal bhar milte hain, lekin in ke rate bhi season aur supply ke hisab se badalte rehte hain. In ka rate roz dekhna chahiye, kyunki kal ka rate aaj ka rate nahi hota.' },
      { kind: 'p', text: 'Season wali cheez lene ke faide: Season ki sabzi sasti hoti hai, taza hoti hai aur us ka zaiqa bhi behtar hota hai. Is liye khareedari hamesha season dekh kar karen, aur Aaj Ka Rate par “Mosam ke Hisaab se Bazaar” wala hissa dekh len, jahan nayi aane wali cheezon par NAYA badge lagta hai aur khatam hone wali cheezon ka purana rate nahi dikhaya jata.' },
      { kind: 'p', text: 'Aaj ke sabzi aur phal ke rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen, har rate ke samne uski tareekh likhi hoti hai.' },
    ],
  },
  {
    slug: 'ghar-ka-monthly-budget',
    title: 'Ghar ka monthly budget banane ka mukammal tareeqa',
    description: 'Mahine ka budget kaise banayen: aamdani, zaroori kharche, bachat aur rate badalne par budget kaise adjust karen.',
    blocks: [
      { kind: 'p', text: 'Ghar ka budget banana koi mushkil kaam nahi hai, bas is ke liye 30 minute aur aik kagaz chahiye. Jo ghar budget bana kar chalte hain, un ko mahine ke akhir me pareshani nahi hoti. Ye article poora tareeqa asan lafzon me batata hai.' },
      { kind: 'p', text: 'Pehla qadam: aamdani likhen. Mahine me ghar me kitna paisa aata hai, wo pehle likhen. Ye tankhwa ho ya karobar ki aamdani, pehle ye pata hona chahiye ke haath me kitna hai.' },
      { kind: 'p', text: 'Doosra qadam: zaroori kharche likhen. Wo kharche jo har mahine karne hi hain: karyana, bijli aur gas ka bill, kiraya, petrol ya kiraya, bachon ki fees aur dawai. In ko pehle alag kar len, kyunki ye ruk nahi sakte.' },
      { kind: 'p', text: 'Teesra qadam: bachat pehle alag karen. Aksar log bachat akhir me karte hain, aur akhir me kuch bachta nahi. Behtar tareeqa ye hai ke aamdani aate hi bachat ka hissa pehle alag kar den, chahe wo chhota hi kyun na ho. Chhoti bachat bhi waqt ke sath bari ban jati hai.' },
      { kind: 'p', text: 'Chautha qadam: extra kharchon ke liye had muqarrar karen. Bahar khana, naye kapre aur tafreeh ke liye aik had tay kar len. Had se zyada kharcha karne se pehle sochen ke ye zaroori hai ya baad me bhi ho sakta hai.' },
      { kind: 'p', text: 'Paanchwa qadam: rate badalne par budget adjust karen. Petrol, dollar aur karyana ke rate badalte rehte hain, is liye budget bhi har mahine thora badal sakta hai. Aaj Ka Rate par roz ke rate dekh kar andaza lagayen ke is mahine kharcha kitna barhega, aur budget usi hisab se adjust karen.' },
      { kind: 'p', text: 'Chhatha qadam: mahine ke akhir me hisaab karen. Mahina khatam hone par dekhen ke kahan zyada kharcha hua aur kyun. Agle mahine ka budget usi hisaab se theek karen. Ye aadat 2-3 mahine me farq dikhati hai.' },
      { kind: 'p', text: 'Yaad rakhen: budget ka matlab kanjoosi nahi hai, budget ka matlab ye hai ke paisa soch samajh kar kharch ho, aur mahine ke akhir me pareshani na ho. Roz ke rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
