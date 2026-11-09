/* DYFI Tamil Nadu leadership data — the ONLY place to edit names, photos and phone numbers.
   Person: { name, role, phone, photo }  ·  phone: show exactly as written (spaces/hyphens allowed); leave "" if not available (call + WhatsApp icons are then hidden)
   photo: image path; leave "" to use assets/images/profile.png
   Districts: { name, president:{name,phone,photo}, secretary:{name,phone,photo} } — leave name "" to show "விவரம் விரைவில் புதுப்பிக்கப்படும்" */
window.DYFI_DATA = {
  stateLeadership: [
    { name: "செல்வராஜ்", role: "மாநில தலைவர்", phone: "82205 54826", photo: "assets/images/Map/selva.webp" },
    { name: "எஸ்.கார்த்திக்", role: "மாநில செயலாளர்", phone: "95976 12301", photo: "assets/images/Map/karthi.webp" },
    { name: "தீ.சந்துரு", role: "மாநில பொருளாளர்", phone: "9884512215", photo: "assets/images/Map/chandru.webp" },
    { name: "ஆர்.அபிராமி", role: "மாநில துணைத்தலைவர்", phone: "94444 48030", photo: "" }
  ],
  stateExecutive: [
    { name: "கோ. அரவிந்தசாமி", role: "மாநில செயற்குழு உறுப்பினர்", phone: "97514 13188", photo: "" }
  ],
  districts: [
    { name: "திருவள்ளூர்", president: { name: "மதன் குமார்", phone: "", photo: "" }, secretary: { name: "விநாயகமூர்த்தி", phone: "", photo: "" } },
    { name: "வடசென்னை", president: { name: "விஜயகுமார்", phone: "", photo: "" }, secretary: { name: "நித்யராஜ்", phone: "", photo: "" } },
    { name: "மத்தியசென்னை", president: { name: "அருண்குமார்", phone: "", photo: "" }, secretary: { name: "பார்த்திபன்", phone: "", photo: "" } },
    { name: "தென்சென்னை", president: { name: "குமரன்", phone: "", photo: "" }, secretary: { name: "சந்துரு", phone: "", photo: "" } },
    { name: "காஞ்சிபுரம்", president: { name: "சூர்யபாரதி", phone: "", photo: "" }, secretary: { name: "கோகுலபாரதி", phone: "", photo: "" } },
    { name: "செங்கல்பட்டு", president: { name: "ஜீவானந்தம்", phone: "", photo: "" }, secretary: { name: "சதீஷ்குமார்", phone: "", photo: "" } },
    { name: "ராணிப்பேட்டை", president: { name: "கலைவாணன்", phone: "", photo: "" }, secretary: { name: "சிவராமகிருஷ்ணன்", phone: "", photo: "" } },
    { name: "வேலூர்-திருப்பத்தூர்", president: { name: "சூர்யா", phone: "", photo: "" }, secretary: { name: "வெங்கடேசன்", phone: "", photo: "" } },
    { name: "விழுப்புரம்", president: { name: "பிரகாஷ்", phone: "", photo: "" }, secretary: { name: "அறிவழகன்", phone: "", photo: "" } },
    { name: "கள்ளக்குறிச்சி", president: { name: "சதீஷ்", phone: "", photo: "" }, secretary: { name: "சிவகுமார்", phone: "", photo: "" } },
    { name: "திருவண்ணாமலை", president: { name: "தமிழ்செல்வன்", phone: "", photo: "" }, secretary: { name: "பிரகாஷ்", phone: "", photo: "" } },
    { name: "கடலூர்", president: { name: "வினோத்", phone: "", photo: "" }, secretary: { name: "சின்னதம்பி", phone: "", photo: "" } },
    { name: "அரியலூர்", president: { name: "", phone: "", photo: "" }, secretary: { name: "", phone: "", photo: "" } },
    { name: "பெரம்பலூர்", president: { name: "", phone: "", photo: "" }, secretary: { name: "", phone: "", photo: "" } },
    { name: "திருச்சி மாநகர்", president: { name: "", phone: "", photo: "" }, secretary: { name: "சேதுபதி", phone: "", photo: "" } },
    { name: "திருச்சி புறநகர்", president: { name: "சந்தோஷ்", phone: "", photo: "" }, secretary: { name: "பாலகுமார்", phone: "", photo: "" } },
    { name: "தஞ்சாவூர்", president: { name: "அர்ஜுன்", phone: "", photo: "" }, secretary: { name: "அருளரசன்", phone: "", photo: "" } },
    { name: "திருவாரூர்", president: { name: "ஆனந்த்", phone: "", photo: "" }, secretary: { name: "பாலா", phone: "", photo: "" } },
    { name: "மயிலாடுதுறை", president: { name: "கவியரசன்", phone: "", photo: "" }, secretary: { name: "ஐயப்பன்", phone: "", photo: "" } },
    { name: "நாகப்பட்டினம்", president: { name: "ஜோதிபாசு", phone: "", photo: "" }, secretary: { name: "அருள்தாஸ்", phone: "", photo: "" } },
    { name: "புதுக்கோட்டை", president: { name: "ஜனார்தனன்", phone: "", photo: "" }, secretary: { name: "மகாதீர்", phone: "", photo: "" } },
    { name: "சிவகங்கை", president: { name: "", phone: "", photo: "" }, secretary: { name: "சேவுகப்பெருமாள்", phone: "", photo: "" } },
    { name: "ராமநாதபுரம்", president: { name: "", phone: "", photo: "" }, secretary: { name: "மாரிக்குமார்", phone: "", photo: "" } },
    { name: "மதுரை மாநகர்", president: { name: "செல்வராஜ்", phone: "", photo: "" }, secretary: { name: "வேல்தேவா", phone: "", photo: "" } },
    { name: "மதுரை புறநகர்", president: { name: "கருப்பசாமி", phone: "", photo: "" }, secretary: { name: "தமிழரசன்", phone: "", photo: "" } },
    { name: "விருதுநகர்", president: { name: "", phone: "", photo: "" }, secretary: { name: "", phone: "", photo: "" } },
    { name: "திண்டுக்கல்", president: { name: "ரஞ்சித் சேகுவேரா", phone: "", photo: "" }, secretary: { name: "முகேஷ்", phone: "", photo: "" } },
    { name: "தேனி", president: { name: "", phone: "", photo: "" }, secretary: { name: "நாகராஜ்", phone: "", photo: "" } },
    { name: "தென்காசி", president: { name: "", phone: "", photo: "" }, secretary: { name: "", phone: "", photo: "" } },
    { name: "திருநெல்வேலி", president: { name: "", phone: "", photo: "" }, secretary: { name: "", phone: "", photo: "" } },
    { name: "தூத்துக்குடி", president: { name: "நேசமணி", phone: "", photo: "" }, secretary: { name: "தினேஷ்குமார்", phone: "", photo: "" } },
    { name: "கன்னியாகுமரி", president: { name: "ரெத்தீஷ்", phone: "", photo: "" }, secretary: { name: "விஷ்ணுகுமார்", phone: "", photo: "" } },
    { name: "கரூர்", president: { name: "", phone: "", photo: "" }, secretary: { name: "சிவா", phone: "", photo: "" } },
    { name: "சேலம்", president: { name: "", phone: "", photo: "" }, secretary: { name: "", phone: "", photo: "" } },
    { name: "நாமக்கல்", president: { name: "மௌலி", phone: "", photo: "" }, secretary: { name: "சரவணன்", phone: "", photo: "" } },
    { name: "ஈரோடு", president: { name: "", phone: "", photo: "" }, secretary: { name: "விஸ்வநாதன்", phone: "", photo: "" } },
    { name: "திருப்பூர்", president: { name: "நிருபன் சக்கரவர்த்தி", phone: "", photo: "" }, secretary: { name: "பாலமுரளி", phone: "", photo: "" } },
    { name: "கோயம்பத்தூர்", president: { name: "ராஜா", phone: "", photo: "" }, secretary: { name: "தினேஷ்குமார்", phone: "", photo: "" } },
    { name: "நீலகிரி", president: { name: "", phone: "", photo: "" }, secretary: { name: "ரவிக்குமார்", phone: "", photo: "" } },
    { name: "தர்மபுரி", president: { name: "குறளரசன்", phone: "", photo: "" }, secretary: { name: "கோவிந்தசாமி", phone: "", photo: "" } },
    { name: "கிருஷ்ணகிரி", president: { name: "", phone: "", photo: "" }, secretary: { name: "இளவரசன்", phone: "", photo: "" } }
  ]
};
