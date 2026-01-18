// Predefined romantic messages for each occasion and gender
const messages = {
  valentine: {
    female: [
      "You are my greatest blessing and my daily inspiration. Happy Valentine's Day to the woman who makes my heart skip a beat.",
      "Every moment with you feels like a beautiful dream. Thank you for being my forever Valentine.",
      "Your smile brightens my darkest days and your love completes my soul. I love you endlessly.",
      "With you, I found my soulmate and my best friend. Happy Valentine's Day, my love.",
      "You are the reason I believe in forever. Forever yours, always.",
      "In a world full of chaos, you are my peace and my paradise.",
      "My heart is yours, today and always. Happy Valentine's Day to my everything.",
      "You make every ordinary day feel extraordinary. I'm so grateful for you.",
      "Love wasn't complete until you came into my life. Thank you for everything.",
      "You are my greatest love story and my favorite adventure."
    ],
    male: [
      "You mean the world to me, and I'm grateful every day for your love and support.",
      "With you by my side, I can conquer anything. Happy Valentine's Day, my love.",
      "You are my rock, my strength, and my greatest blessing.",
      "Every day with you is a gift I never take for granted. I love you deeply.",
      "You make me want to be a better man. Thank you for your endless love.",
      "In your eyes, I found home. Forever grateful for you.",
      "My heart chose you long ago and hasn't looked back since.",
      "You are the best thing that ever happened to me. Happy Valentine's Day.",
      "I fall in love with you more every single day.",
      "You complete me in ways I never thought possible. I love you."
    ]
  },
  birthday: {
    female: [
      "Wishing the most beautiful woman in the world a birthday filled with joy and laughter.",
      "On your special day, I celebrate everything that makes you amazing. Happy Birthday!",
      "You deserve a day as wonderful as you are. Enjoy every moment!",
      "Another year older, but even more beautiful and incredible. Happy Birthday, gorgeous!",
      "Thank you for being born and blessing our lives with your presence.",
      "Your birthday is a reminder of how lucky I am to have you in my life.",
      "Wishing you endless happiness, love, and beautiful memories this year.",
      "You are a gift to everyone who knows you. Happy Birthday!",
      "May this year bring you everything your heart desires and more.",
      "Celebrating the most wonderful person I know. Happy Birthday, beautiful!"
    ],
    male: [
      "Wishing a fantastic birthday to an amazing man. You're incredible!",
      "Happy Birthday to someone who makes every day better just by being in it.",
      "Another year of greatness starts today. Make it unforgettable!",
      "You deserve all the happiness in the world on your special day.",
      "Thank you for being the wonderful person you are. Happy Birthday!",
      "Cheers to you on your birthday and to all the adventures ahead.",
      "You are stronger, wiser, and more amazing with each passing year.",
      "May your birthday be as awesome as you are. Happy Birthday!",
      "Celebrating the best man I know today and every day.",
      "Here's to another year of being extraordinary. Happy Birthday!"
    ]
  },
  anniversary: {
    female: [
      "Happy Anniversary to my love, my partner, and my forever. Here's to us!",
      "Every moment with you is a treasure. Happy Anniversary to my beautiful wife!",
      "I love you more today than yesterday, and I'll love you even more tomorrow.",
      "Thank you for being my greatest adventure. Happy Anniversary, my love.",
      "With you, I found forever. Happy Anniversary to my soulmate.",
      "Our love story is my favorite. Here's to many more chapters together.",
      "You are my greatest blessing and my answered prayer. Happy Anniversary!",
      "Through every season, you remain my constant joy. Happy Anniversary!",
      "I choose you every single day. Happy Anniversary to my everything.",
      "Our love grows stronger with each passing year. Happy Anniversary!"
    ],
    male: [
      "Happy Anniversary to the woman who stole my heart and never gave it back.",
      "Every day with you is a blessing I'm grateful for. Happy Anniversary!",
      "You are my greatest love and my life's greatest adventure.",
      "Thank you for standing by me and loving me unconditionally.",
      "Our journey together is the best decision I've ever made. Happy Anniversary!",
      "Here's to the love that keeps growing stronger. Happy Anniversary, my love.",
      "You are my forever person. Happy Anniversary to my beautiful wife.",
      "I'm so grateful for you and for every moment we share together.",
      "Our love is my greatest treasure. Happy Anniversary!",
      "With you, I found my home and my happiness. Happy Anniversary!"
    ]
  }
};

// Get random message for occasion and gender
function getRandomMessage(occasion, gender) {
  if (!messages[occasion] || !messages[occasion][gender]) {
    return "With all my love and warmest wishes for you.";
  }
  
  const phraseList = messages[occasion][gender];
  const randomIndex = Math.floor(Math.random() * phraseList.length);
  return phraseList[randomIndex];
}

module.exports = {
  messages,
  getRandomMessage
};
