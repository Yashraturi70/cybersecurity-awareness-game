export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is phishing?",
    options: [
      "A recreational activity",
      "A fraudulent attempt to obtain sensitive information by posing as a trustworthy entity",
      "A type of computer hardware",
      "A software update"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a cyber attack where criminals pose as legitimate institutions to steal sensitive information."
  },
  {
    id: 2,
    question: "What is a strong password practice?",
    options: [
      "Using the same password for all accounts",
      "Using your birth date as password",
      "Using a combination of letters, numbers, and special characters",
      "Sharing your password with trusted friends"
    ],
    correctAnswer: 2,
    explanation: "Strong passwords should contain a mix of characters and should be unique for each account."
  },
  {
    id: 3,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Having two passwords",
      "A security process requiring two different forms of identification",
      "Double-clicking the login button",
      "Logging in twice"
    ],
    correctAnswer: 1,
    explanation: "2FA adds an extra layer of security by requiring two different forms of verification."
  },
  {
    id: 4,
    question: "Which of these is a sign of a potential malware infection?",
    options: [
      "Computer running faster than usual",
      "All programs working normally",
      "Unexpected pop-ups and slow performance",
      "Regular system updates"
    ],
    correctAnswer: 2,
    explanation: "Unexpected pop-ups and slow performance are common signs of malware infection."
  },
  {
    id: 5,
    question: "What should you do if you receive an unexpected email with an attachment?",
    options: [
      "Open it immediately",
      "Forward it to colleagues",
      "Verify the sender and scan the attachment before opening",
      "Save it for later"
    ],
    correctAnswer: 2,
    explanation: "Always verify unexpected attachments and scan them for malware before opening."
  },
  {
    id: 6,
    question: "What is a VPN used for?",
    options: [
      "Increasing internet speed",
      "Storing passwords",
      "Encrypting internet traffic and protecting privacy",
      "Creating websites"
    ],
    correctAnswer: 2,
    explanation: "VPNs encrypt your internet traffic and help protect your privacy online."
  },
  {
    id: 7,
    question: "What is social engineering?",
    options: [
      "Building social media websites",
      "Manipulating people into giving up confidential information",
      "Creating social networks",
      "Managing social media accounts"
    ],
    correctAnswer: 1,
    explanation: "Social engineering involves psychological manipulation to trick people into revealing sensitive information."
  },
  {
    id: 8,
    question: "What is ransomware?",
    options: [
      "A type of antivirus",
      "A backup solution",
      "Malware that encrypts files and demands payment",
      "A password manager"
    ],
    correctAnswer: 2,
    explanation: "Ransomware is malicious software that encrypts files and demands payment for decryption."
  },
  {
    id: 9,
    question: "Which is a secure way to store passwords?",
    options: [
      "Writing them in a notebook",
      "Using a password manager",
      "Saving them in a text file",
      "Using the same password everywhere"
    ],
    correctAnswer: 1,
    explanation: "Password managers securely encrypt and store your passwords while making them easily accessible."
  },
  {
    id: 10,
    question: "What is a software patch?",
    options: [
      "A piece of software that slows down your computer",
      "A security update to fix vulnerabilities",
      "A type of computer virus",
      "A backup file"
    ],
    correctAnswer: 1,
    explanation: "Software patches are updates that fix security vulnerabilities and other bugs."
  },
  {
    id: 11,
    question: "What is a firewall?",
    options: [
      "A physical wall to protect servers",
      "A security system that monitors and controls network traffic",
      "A type of computer virus",
      "A backup system"
    ],
    correctAnswer: 1,
    explanation: "A firewall is a network security system that monitors and controls incoming and outgoing network traffic."
  },
  {
    id: 12,
    question: "What is the best practice for public Wi-Fi usage?",
    options: [
      "Connect to any available network",
      "Use it for online banking",
      "Use a VPN and avoid sensitive transactions",
      "Share the network with others"
    ],
    correctAnswer: 2,
    explanation: "Using a VPN on public Wi-Fi helps protect your data from potential eavesdroppers."
  },
  {
    id: 13,
    question: "What is a data breach?",
    options: [
      "A new type of data storage",
      "A security incident where sensitive data is exposed",
      "A data backup process",
      "A type of software"
    ],
    correctAnswer: 1,
    explanation: "A data breach occurs when sensitive or confidential data is exposed to unauthorized parties."
  },
  {
    id: 14,
    question: "What is encryption?",
    options: [
      "A way to delete files",
      "Converting data into a code to prevent unauthorized access",
      "A type of computer virus",
      "A backup method"
    ],
    correctAnswer: 1,
    explanation: "Encryption converts data into a coded form that can only be accessed with the correct key."
  },
  {
    id: 15,
    question: "What should you do if you suspect a security breach?",
    options: [
      "Ignore it",
      "Wait and see what happens",
      "Immediately report it to IT security",
      "Tell your friends about it"
    ],
    correctAnswer: 2,
    explanation: "Prompt reporting of security breaches helps minimize potential damage."
  },
  {
    id: 16,
    question: "What is a secure way to dispose of sensitive documents?",
    options: [
      "Throwing them in the trash",
      "Shredding or secure destruction",
      "Recycling them",
      "Keeping them forever"
    ],
    correctAnswer: 1,
    explanation: "Shredding or secure destruction prevents sensitive information from falling into wrong hands."
  },
  {
    id: 17,
    question: "What is shoulder surfing?",
    options: [
      "A type of water sport",
      "Looking over someone's shoulder to steal information",
      "A computer game",
      "A type of exercise"
    ],
    correctAnswer: 1,
    explanation: "Shoulder surfing is when someone watches over your shoulder to steal sensitive information."
  },
  {
    id: 18,
    question: "What is the purpose of an antivirus program?",
    options: [
      "To speed up the computer",
      "To detect and remove malicious software",
      "To improve internet connection",
      "To store files"
    ],
    correctAnswer: 1,
    explanation: "Antivirus software helps protect your computer by detecting and removing malicious programs."
  },
  {
    id: 19,
    question: "What is a secure way to back up data?",
    options: [
      "Saving everything on your desktop",
      "Using multiple backup methods including offline storage",
      "Emailing files to yourself",
      "Not backing up at all"
    ],
    correctAnswer: 1,
    explanation: "Using multiple backup methods, including offline storage, ensures data safety and availability."
  },
  {
    id: 20,
    question: "What is the best practice for mobile device security?",
    options: [
      "Never using a password",
      "Using biometric locks and keeping software updated",
      "Sharing your device with others",
      "Disabling all security features"
    ],
    correctAnswer: 1,
    explanation: "Using biometric locks and keeping software updated helps protect mobile devices from security threats."
  }
]; 