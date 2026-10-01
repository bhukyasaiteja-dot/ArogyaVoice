const emergencyPatterns = [
  /\b(chest pain|chest pressure|heart attack|can't breathe|cannot breathe|trouble breathing|difficulty breathing|shortness of breath|severe bleeding|unconscious|stroke|face drooping|sudden weakness|seizure|overdose|poisoning|anaphylaxis|severe allergic reaction|suicidal|want to kill myself)\b/i,
  /(ఛాతి నొప్పి|గుండెపోటు|గుండె నొప్పి|ఊపిరి తీసుకోలేక|శ్వాస తీసుకోలేక|శ్వాస ఆడక|తీవ్ర రక్తస్రావం|స్పృహ కోల్పోయ|పక్షవాతం|మూర్ఛ|విషం తాగ|అధిక మోతాదు|ఆత్మహత్య)/,
  /(सीने में दर्द|दिल का दौरा|हार्ट अटैक|सांस नहीं आ रही|साँस नहीं आ रही|सांस लेने में कठिनाई|साँस लेने में कठिनाई|सांस फूल रही|साँस फूल रही|बहुत खून बह|बेहोश|लकवा|दौरा पड़|ज़हर|जहर|दवा की अधिक मात्रा|आत्महत्या)/,
];

const emergencyAnswers = {
  en: 'Your symptoms could be serious. Please contact emergency services now or go to the nearest emergency department. If you are in India, call 112. Do not drive yourself if you feel faint or unsafe. I cannot diagnose this here.',
  te: 'మీ లక్షణాలు తీవ్రమైనవి కావచ్చు. వెంటనే అత్యవసర సేవలను సంప్రదించండి లేదా సమీపంలోని అత్యవసర విభాగానికి వెళ్లండి. మీరు భారతదేశంలో ఉంటే 112కు కాల్ చేయండి. మైకం లేదా అసురక్షితంగా అనిపిస్తే మీరే వాహనం నడపకండి. ఇక్కడ నేను రోగ నిర్ధారణ చేయలేను.',
  hi: 'आपके लक्षण गंभीर हो सकते हैं। कृपया अभी आपातकालीन सेवा से संपर्क करें या नज़दीकी इमरजेंसी विभाग जाएँ। भारत में 112 पर कॉल करें। चक्कर या असुरक्षित महसूस हो तो खुद गाड़ी न चलाएँ। मैं यहाँ निदान नहीं कर सकता।',
};

const guidance = {
  en: {
    fever: 'For a mild fever, rest, drink fluids, and check your temperature. A pharmacist or clinician can advise whether an over-the-counter fever medicine is appropriate for you. Seek medical advice if the fever is high, lasts more than a few days, or you feel much worse.',
    headache: 'For a mild headache, try water, rest in a quiet room, and a break from screens. A pharmacist can help you choose an appropriate pain reliever. Get medical advice if it is new and severe, keeps returning, or comes with other concerning symptoms.',
    cold: 'For common cold symptoms, rest, drink fluids, and consider a saline spray or warm drinks for comfort. Antibiotics do not treat viral colds. Speak with a clinician if symptoms worsen, breathing becomes difficult, or you have a high-risk health condition.',
    cough: 'For a mild cough, drink fluids and try warm drinks or honey if it is safe for you. Avoid smoke and other irritants. Seek medical advice if it lasts more than a few weeks, worsens, or comes with fever; get urgent help for breathing difficulty or chest pain.',
    dehydration: 'Possible dehydration can cause thirst, a dry mouth, dark urine, or urinating less. Sip water or an oral rehydration solution. Seek medical care for fainting, confusion, inability to keep fluids down, or very little/no urine. These signs can have other causes, so I can’t diagnose you here.',
    sleep: 'A consistent sleep and wake time, a quiet dark room, and less caffeine late in the day can help. If sleep problems continue for several weeks or affect daily life, discuss them with a healthcare professional.',
    stress: 'A slow breathing exercise, a short walk, or talking with someone you trust may help in the moment. If stress feels overwhelming or keeps affecting daily life, a mental health professional can support you. If you may harm yourself, contact emergency services or a crisis line now.',
    stomach: 'For mild stomach discomfort, sip water and choose simple foods while you rest. The cause can vary, so avoid starting new medicines without checking with a pharmacist or clinician. Seek care if pain is severe, persistent, or comes with vomiting, fever, or blood.',
    general: 'I can share general health information, but I can’t diagnose a condition or replace a healthcare professional. Tell me a little more about what you’re experiencing, how long it has been happening, and your age range, and I’ll suggest safe next steps.',
  },
  te: {
    fever: 'తేలికపాటి జ్వరం ఉంటే విశ్రాంతి తీసుకోండి, ద్రవాలు తాగండి, ఉష్ణోగ్రతను గమనించండి. జ్వరం మందు మీకు సరిపోతుందో ఫార్మసిస్ట్ లేదా వైద్యుడిని అడగండి. జ్వరం ఎక్కువగా ఉంటే, కొన్ని రోజులకు మించి కొనసాగితే లేదా పరిస్థితి క్షీణిస్తే వైద్య సహాయం పొందండి.',
    headache: 'తేలికపాటి తలనొప్పికి నీరు తాగడం, ప్రశాంతమైన గదిలో విశ్రాంతి తీసుకోవడం, స్క్రీన్‌లకు విరామం ఇవ్వడం ప్రయత్నించండి. నొప్పి నివారణ మందు ఎంపికకు ఫార్మసిస్ట్‌ను అడగండి. నొప్పి కొత్తగా తీవ్రంగా ఉంటే, పదే పదే వస్తే లేదా ఇతర ఆందోళనకర లక్షణాలుంటే వైద్య సలహా పొందండి.',
    cold: 'జలుబు లక్షణాలకు విశ్రాంతి తీసుకోండి, ద్రవాలు తాగండి. సలైన్ స్ప్రే లేదా గోరువెచ్చని పానీయాలు ఉపశమనం ఇవ్వవచ్చు. వైరల్ జలుబుకు యాంటీబయాటిక్స్ పనిచేయవు. లక్షణాలు తీవ్రమైతే, శ్వాస కష్టమైతే లేదా మీకు ఇతర ఆరోగ్య సమస్యలుంటే వైద్యుడిని సంప్రదించండి.',
    cough: 'తేలికపాటి దగ్గుకు ద్రవాలు, గోరువెచ్చని పానీయాలు తీసుకోండి; మీకు సురక్షితమైతే తేనె ప్రయత్నించవచ్చు. పొగ, చికాకు కలిగించే వాటికి దూరంగా ఉండండి. దగ్గు కొన్ని వారాలకు మించి ఉంటే లేదా తీవ్రమైతే వైద్యుడిని సంప్రదించండి; శ్వాస కష్టం లేదా ఛాతి నొప్పి ఉంటే అత్యవసర సహాయం పొందండి.',
    dehydration: 'శరీరంలో నీరు తగ్గితే దాహం, నోరు ఎండడం, ముదురు మూత్రం లేదా మూత్రం తక్కువగా రావడం ఉండవచ్చు. నీరు లేదా ఓఆర్ఎస్‌ను కొద్దికొద్దిగా తాగండి. మూర్ఛ, గందరగోళం, ద్రవాలు నిలవకపోవడం లేదా మూత్రం చాలా తక్కువగా రావడం ఉంటే వెంటనే వైద్య సహాయం పొందండి. ఇవి ఇతర కారణాల వల్ల కూడా రావచ్చు; నేను నిర్ధారణ చేయలేను.',
    sleep: 'ప్రతిరోజూ ఒకే సమయానికి నిద్రపోవడం, చీకటిగా ప్రశాంతమైన గది, సాయంత్రం కెఫీన్ తగ్గించడం సహాయపడవచ్చు. కొన్ని వారాలుగా నిద్ర సమస్యలు కొనసాగితే లేదా రోజువారీ పనులకు ఆటంకమైతే వైద్య నిపుణులతో మాట్లాడండి.',
    stress: 'నెమ్మదిగా శ్వాస తీసుకోవడం, కొద్దిసేపు నడవడం లేదా నమ్మకమైన వ్యక్తితో మాట్లాడడం ఆ క్షణంలో సహాయపడవచ్చు. ఒత్తిడి ఎక్కువగా అనిపిస్తే మానసిక ఆరోగ్య నిపుణుడిని సంప్రదించండి. మీకు మీరే హాని చేసుకునే ప్రమాదం ఉంటే వెంటనే అత్యవసర సేవలను సంప్రదించండి.',
    stomach: 'తేలికపాటి కడుపు అసౌకర్యానికి కొద్దికొద్దిగా నీరు తాగుతూ విశ్రాంతి తీసుకోండి; సులభంగా జీర్ణమయ్యే ఆహారం తీసుకోండి. కారణాలు వేరుగా ఉండవచ్చు, కాబట్టి కొత్త మందు మొదలుపెట్టే ముందు ఫార్మసిస్ట్ లేదా వైద్యుడిని అడగండి. నొప్పి తీవ్రంగా లేదా ఎక్కువసేపు ఉంటే, వాంతులు, జ్వరం లేదా రక్తం ఉంటే వైద్య సహాయం పొందండి.',
    general: 'నేను సాధారణ ఆరోగ్య సమాచారాన్ని అందించగలను, కానీ రోగ నిర్ధారణ చేయలేను లేదా వైద్య నిపుణుడికి ప్రత్యామ్నాయం కాదు. మీకు ఏమి ఇబ్బందిగా ఉంది, ఎంతకాలంగా ఉంది, మీ వయస్సు ఎంత అని చెబితే సురక్షితమైన తదుపరి చర్యలను సూచిస్తాను.',
  },
  hi: {
    fever: 'हल्का बुखार हो तो आराम करें, तरल पदार्थ पिएँ और तापमान देखते रहें। बुखार की दवा आपके लिए सही है या नहीं, यह फार्मासिस्ट या डॉक्टर से पूछें। बुखार तेज़ हो, कुछ दिनों से अधिक रहे या हालत बिगड़े तो चिकित्सकीय सलाह लें।',
    headache: 'हल्के सिरदर्द में पानी पिएँ, शांत कमरे में आराम करें और स्क्रीन से थोड़ा विराम लें। दर्द की दवा चुनने के लिए फार्मासिस्ट से पूछें। सिरदर्द नया और तेज़ हो, बार-बार लौटे या अन्य चिंताजनक लक्षण हों तो डॉक्टर से सलाह लें।',
    cold: 'सर्दी-जुकाम में आराम करें और तरल पदार्थ लें। नमक-पानी का स्प्रे या गर्म पेय से आराम मिल सकता है। वायरल सर्दी में एंटीबायोटिक काम नहीं करते। लक्षण बिगड़ें, साँस लेने में परेशानी हो या कोई गंभीर स्वास्थ्य समस्या हो तो डॉक्टर से संपर्क करें।',
    cough: 'हल्की खाँसी में तरल और गर्म पेय लें; आपके लिए सुरक्षित हो तो शहद आज़मा सकते हैं। धुएँ और जलन पैदा करने वाली चीज़ों से बचें। खाँसी कुछ हफ़्तों से अधिक रहे या बिगड़े तो डॉक्टर से सलाह लें; साँस की परेशानी या सीने में दर्द हो तो तुरंत मदद लें।',
    dehydration: 'पानी की कमी में प्यास, मुँह सूखना, गहरे रंग का पेशाब या कम पेशाब हो सकता है। पानी या ओआरएस के छोटे घूँट लें। बेहोशी, भ्रम, तरल न रुकना या बहुत कम/बिल्कुल पेशाब न होना हो तो तुरंत चिकित्सा सहायता लें। इनके अन्य कारण भी हो सकते हैं; मैं निदान नहीं कर सकता।',
    sleep: 'रोज़ एक ही समय पर सोना-जागना, शांत अँधेरा कमरा और देर शाम कैफ़ीन कम करना मदद कर सकता है। नींद की परेशानी कई हफ़्तों तक रहे या रोज़मर्रा के काम प्रभावित करे तो स्वास्थ्य विशेषज्ञ से बात करें।',
    stress: 'धीमी साँसें लेना, थोड़ी देर टहलना या भरोसेमंद व्यक्ति से बात करना उस समय मदद कर सकता है। तनाव असहनीय लगे या रोज़मर्रा की ज़िंदगी पर असर डाले तो मानसिक स्वास्थ्य विशेषज्ञ से मिलें। खुद को नुकसान पहुँचने का खतरा हो तो तुरंत आपातकालीन सेवा से संपर्क करें।',
    stomach: 'पेट की हल्की तकलीफ़ में आराम करें, थोड़ा-थोड़ा पानी पिएँ और सादा खाना लें। कारण अलग-अलग हो सकते हैं, इसलिए नई दवा शुरू करने से पहले फार्मासिस्ट या डॉक्टर से पूछें। दर्द तेज़ या लगातार हो, उल्टी, बुखार या खून आए तो चिकित्सकीय मदद लें।',
    general: 'मैं सामान्य स्वास्थ्य जानकारी दे सकता हूँ, लेकिन बीमारी का निदान नहीं कर सकता और डॉक्टर का विकल्प नहीं हूँ। क्या परेशानी है, कब से है और आपकी उम्र क्या है, यह बताएँ तो मैं सुरक्षित अगले कदम सुझाऊँगा।',
  },
};

const topicPatterns = {
  fever: /(?:\b(?:fever|temperature)\b|ज्वर|बुखार|జ్వరం|ఉష్ణోగ్రత)/i,
  headache: /(?:\b(?:headache|head pain)\b|सिरदर्द|सिर दर्द|తలనొప్పి)/i,
  cold: /(?:\b(?:cold|sore throat|runny nose)\b|जुकाम|सर्दी|జలుబు)/i,
  cough: /(?:\b(?:cough|coughing)\b|खांसी|खाँसी|దగ్గు)/i,
  dehydration: /(?:\bdehydrat(?:ion|ed|ing)\b|पानी की कमी|निर्जलीकरण|డీహైడ్రేషన్|నిర్జలీకరణం|శరీరంలో నీరు తగ్గ)/i,
  sleep: /(?:\b(?:sleep|insomnia)\b|नींद|నిద్ర)/i,
  stress: /(?:\b(?:stress|anxious|anxiety|overwhelmed)\b|तनाव|चिंता|ఒత్తిడి|ఆందోళన)/i,
  stomach: /(?:\b(?:stomach|belly|nausea)\b|पेट|కడుపు|వాంతి)/i,
};

export function assessQuestion(question, language) {
  const normalizedLanguage = ['en', 'te', 'hi'].includes(language) ? language : 'en';
  if (emergencyPatterns.some((pattern) => pattern.test(question))) {
    return { answer: emergencyAnswers[normalizedLanguage], emergency: true, source: 'safety' };
  }
  if (process.env.OPENAI_API_KEY) return null;
  const topic = Object.entries(topicPatterns).find(([, pattern]) => pattern.test(question))?.[0] ?? 'general';
  return { answer: guidance[normalizedLanguage][topic], emergency: false, source: 'local' };
}

export async function generateAnswer(question, language) {
  const localAnswer = assessQuestion(question, language);
  if (localAnswer) return localAnswer;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are ArogyaVoice, a cautious health information assistant. Reply in the user's language (${language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'}). Address the specific question and symptoms the user described; avoid generic boilerplate when the question is specific. Give general, evidence-informed, non-diagnostic guidance, a few practical low-risk steps, and when to consult a clinician. Never prescribe or change medication doses. Do not claim to replace a doctor. If symptoms could be urgent, direct the user to emergency care. Keep the answer brief and compassionate.`,
          },
          { role: 'user', content: question },
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    });
    if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error('AI provider returned an empty answer');
    return { answer, emergency: false, source: 'ai' };
  } catch {
    const topic = Object.entries(topicPatterns).find(([, pattern]) => pattern.test(question))?.[0] ?? 'general';
    return { answer: guidance[language][topic], emergency: false, source: 'local' };
  }
}