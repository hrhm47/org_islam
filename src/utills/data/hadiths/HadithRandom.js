



const hadiths = [
    {
      id: 1,
      text: "نیکی کی باتوں کو لوگ پسند کریں گے۔",
      translationUrdu: "Log neki ki batoon ko pasand karenge.",
      translationEnglish: "People will appreciate good words.",
      translationArabic: "سيقدر الناس الكلمات الطيبة.",
      reference: "Sahih al-Bukhari 6025"
    },
    {
      id: 2,
      text: "صبر واقعی خوبصورتی کا نشان ہے۔",
      translationUrdu: "Sabr waqai khoobsurati ka nishan hai.",
      translationEnglish: "Patience is truly a sign of beauty.",
      translationArabic: "الصبر هو بالفعل علامة جمال.",
      reference: "Sahih Muslim  patience, Book 91, Hadith 91"
    },
    {
      id: 3,
      text: "تبسم، چہرے کی خوبصورتی کو بڑھاتا ہے۔",
      translationUrdu: "Tabassum, chehre ki khoobsurati ko barhata hai.",
      translationEnglish: "Smiling enhances the beauty of the face.",
      translationArabic: "الابتسامة تعزز جمال الوجه.",
      reference: "Jami` at-Tirmidhi 3641"
    },
    {
      id: 4,
      text: "اپنے مسلمان بھائی کی بخوشی اس کے جواب میں ہے۔",
      translationUrdu: "Apne musalman bhai ki khushi uske jawab mein hai.",
      translationEnglish: "The happiness of your Muslim brother is in his response.",
      translationArabic: "سعادة أخيك المسلم في رده.",
      reference: "Sahih Muslim 2586 a"
    },
    {
      id: 5,
      text: "عفو اور معافیت کو ظاہر کرنے میں قدرتی خوبیاں ہیں۔",
      translationUrdu: "Afwo aur muaafi ko zahir karne mein qudrati khoobiyan hain.",
      translationEnglish: "Forgiveness and pardon are natural virtues.",
      translationArabic: "المغفرة والعفو فضائل طبيعية.",
      reference: "Sunan Ibn Majah 4217"
    },
    {
      id: 6,
      text: "امین اللہ کے لئے وہ مالیت سب سے زیادہ ہے جو عبادت کی گئی ہو۔",
      translationUrdu: "Ameen Allah ke liye woh maal yat sab se zyada hai jo ibadat ki gayi ho.",
      translationEnglish: "The most valuable wealth for Allah is the one spent in worship.",
      translationArabic: "أثمن ثروة عند الله هي تلك التي أنفقت في العبادة.",
      reference: "Sunan Ibn Majah 2540"
    },
    {
      id: 7,
      text: "صدقہ ستر کرتا ہے اور غمزدہ جنات میں بنایا جاتا ہے۔",
      translationUrdu: "Sadqa satar karta hai aur ghamzada jannat mein banaya jata hai.",
      translationEnglish: "Charity shields against calamities and is a means of building gardens in Paradise.",
      translationArabic: "الصدقة تصرف الشر وتُبنى بها جنات.",
      reference: "Sunan Ibn Majah 2414"
    },
    {
      id: 8,
      text: "صدقہ دینے والا دُعا کرتے وقت دست کو اوپر نہیں اُٹھاتا ہے۔",
      translationUrdu: "Sadqa dene wala dua karte waqt dast ko upar nahi uthata hai.",
      translationEnglish: "The one who gives charity does not raise his hand high during supplication.",
      translationArabic: "الذي يعطي الصدقة لا يرفع يده عالياً عند الدعاء.",
      reference: "Sunan Abu Dawood 1631"
    },
    {
      id: 9,
      text: "جو شخص مسلمان بھائی کی دشمنی کرے وہ اسلام سے دور ہو جائے گا۔",
      translationUrdu: "Jo shakhs musalman bhai ki dushmani kare woh Islam se door ho jayega.",
      translationEnglish: "Whoever bears enmity towards a Muslim brother will distance themselves from Islam.",
      translationArabic: "من عادى لأخيه المسلم ستحال عنه الإسلام.",
      reference: "Sahih al-Bukhari 6065"
    },
    {
      id: 10,
      text: "مومن وہ ہے جو دوسروں کو زیادہ طاقت دے، مومن نہیں جو خود کو زیادہ طاقت دے۔",
      translationUrdu: "Momin woh hai jo doosron ko zyada taqat de, momin nahi jo khud ko zyada taqat de.",
      translationEnglish: "A believer is the one who empowers others, not the one who empowers themselves.",
      translationArabic: "المؤمن هو الذي يمنح القوة للآخرين، ليس الذي يمنح القوة لنفسه.",
      reference: "Al-Adab Al-Mufrad 43"
    },
    {
      id: 11,
      text: "اچھی سوچ، اچھی دنیا کی بنیاد ہے۔",
      translationUrdu: "Achi soch, achi dunya ki bunyad hai.",
      translationEnglish: "Good thoughts are the foundation of a good world.",
      translationArabic: "الأفكار الجيدة هي أساس عالم جيد.",
      reference: "Musnad Ahmad 8023"
    },
    {
      id: 12,
      text: "جو شخص اچھی سوچ رکھتا ہے، وہ خدا کی نیکیاں پاک کرتا ہے۔",
      translationUrdu: "Jo shakhs achi soch rakhta hai, woh Khuda ki nekiyan paak karta hai.",
      translationEnglish: "The one who maintains good thoughts purifies their deeds.",
      translationArabic: "الذي يحافظ على الأفكار الجيدة يطهّر أعماله.",
      reference: "Musnad Ahmad 7415"
    },
    {
      id: 13,
      text: "مسلمان وہ ہے جو دوسروں کو آسانی سے معاف کرتا ہے۔",
      translationUrdu: "Musalman woh hai jo doosron ko aasani se maaf karta hai.",
      translationEnglish: "A Muslim is the one who easily forgives others.",
      translationArabic: "المسلم هو الذي يسامح الآخرين بسهولة.",
      reference: "Sunan Ibn Majah 4468"
    },
    {
      id: 14,
      text: "عدل واحترام بنی آدم کے اصول ہیں۔",
      translationUrdu: "Adl wa ihtiram bani Adam ke usool hain.",
      translationEnglish: "Justice and respect are the principles of humanity.",
      translationArabic: "العدل والاحترام هما مبادئ الإنسانية.",
      reference: "Sunan Ibn Majah 2419"
    },
    {
      id: 15,
      text: "معاشرتی تعلقات میں اخلاقیت کا کردار بہت اہم ہے۔",
      translationUrdu: "Muaashrati taalluqat mein akhlaqiyat ka kirdar bohat ahem hai.",
      translationEnglish: "Ethics play a vital role in social relationships.",
      translationArabic: "الأخلاق تلعب دورًا حيويًا في العلاقات الاجتماعية.",
      reference: "Sunan Abu Dawood 4787"
    }
  ];
  

  

  export const happiness = ()=>{
   const randomValue=(Math.floor(Math.random() * 15))

    return hadiths[randomValue];
  }






