// Maximum allowed message length (prevents token overflow and abuse)
export const MAX_MESSAGE_LENGTH = 500;

/**
 * Patterns that indicate off-topic queries
 * These are questions the chatbot should NOT answer
 */
const OFF_TOPIC_PATTERNS = [
  // General coding help
  /how (do|can) (i|you) (build|create|make|code|write)/i,
  /help me (with|build|create|debug|fix)/i,
  /what is (react|javascript|python|html|css)/i,
  /how to (use|install|setup)/i,

  // Debugging requests
  /debug (my|this)/i,
  /fix (my|this) (code|bug|error)/i,
  /why (doesn't|does) (my|this)/i,

  // Other people
  /tell me about (elon|mark|jeff|other)/i,
  /who is (the |a )?(?!oscar)/i,

  // Unrelated topics
  /what('s| is) (the )?(weather|news|president|politics)/i,
  /tell me (a )?joke/i,
];

/**
 * Patterns that indicate jailbreak attempts
 * These try to make the AI ignore its instructions
 */
const JAILBREAK_PATTERNS = [
  // Instruction Override
  /ignore (all |previous |above |prior )?(instructions?|prompts?|rules?)/i,
  /forget (everything|all|your)/i,
  /disregard (your|the|previous)/i,

  // Role Play Attacks
  /you are now (a |an )?(?!oscar)/i,
  /act as (a |an )?(?!oscar)/i,
  /pretend (you are|to be)/i,
  /simulate (a |an |being )/i,

  // Prompt Revelation
  /what (is|are) your (system )?prompt/i,
  /show me your (instructions|prompt|rules)/i,
  /reveal your/i,

  // Developer Mode
  /developer mode/i,
  /admin mode/i,
  /sudo/i,
];

/**
 * Check if a message appears to be off-topic
 * @param {string} message - User's message
 * @returns {boolean} True if off-topic detected
 */
export function isOffTopic(message) {
  const lowerMessage = message.toLowerCase();

  return OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(lowerMessage));
}

/**
 * Check if a message appears to be a jailbreak attempt
 * @param {string} message - User's message
 * @returns {boolean} True if jailbreak detected
 */
export function isJailbreakAttempt(message) {
  const lowerMessage = message.toLowerCase();

  return JAILBREAK_PATTERNS.some((pattern) => pattern.test(lowerMessage));
}

/**
 * Sanitize user input to prevent XSS and injection attacks
 * @param {string} message - User's message
 * @returns {string} Sanitized message
 */
export function sanitizeInput(message) {
  return message
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH) // Enforce length limit
    .replace(/</g, "&lt;") // Escape < to &lt;
    .replace(/>/g, "&gt;") // Escape > to &gt;
    .replace(/"/g, "&quot;") // Escape quotes
    .replace(/'/g, "&#x27;"); // Escape single quotes
}

/**
 * Validate that a message meets basic requirements
 * @param {string} message - User's message
 * @returns {Object} { valid: boolean, error: string|null }
 */
export function validateMessage(message) {
  // Check if message exists
  if (!message || typeof message !== "string") {
    return {
      valid: false,
      error: "Message is required",
    };
  }

  // Check if message is not just whitespace
  if (message.trim().length === 0) {
    return {
      valid: false,
      error: "Message cannot be empty",
    };
  }

  // Check length
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Get a polite redirect response for off-topic queries
 * @returns {string} Redirect message
 */
export function getRedirectResponse() {
  const responses = [
    "I'm here to talk about Oscar and his portfolio! Feel free to ask about his projects, skills, or background.",
    "That's outside my area of expertise! But I'd love to tell you about Oscar's work. What would you like to know?",
    "I specialize in discussing Oscar's projects and experience. Curious about any of his work?",
    "I'm Oscar's portfolio assistant! Ask me about his skills, projects, education, or how to get in touch with him.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Comprehensive input check before sending to AI
 * @param {string} message - User's message
 * @returns {Object} { allowed: boolean, reason: string|null, sanitized: string }
 */
export function checkInput(message) {
  // 1. Validate basic requirements
  const validation = validateMessage(message);
  if (!validation.valid) {
    return {
      allowed: false,
      reason: validation.error,
      sanitized: "",
    };
  }

  // 2. Sanitize the input
  const sanitized = sanitizeInput(message);

  // 3. Check for jailbreak attempts
  if (isJailbreakAttempt(sanitized)) {
    console.warn("Potential jailbreak attempt detected:", sanitized);
    // Still allow, but log it
  }

  // 4. Check for off-topic queries
  if (isOffTopic(sanitized)) {
    return {
      allowed: false,
      reason: "off_topic",
      sanitized,
      redirectMessage: getRedirectResponse(),
    };
  }

  // All checks passed!
  return {
    allowed: true,
    reason: null,
    sanitized,
  };
}
