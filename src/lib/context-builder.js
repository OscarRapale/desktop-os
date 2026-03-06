import fs from "fs";
import path from "path";

/**
 * Helper function to load JSON files from the data directory
 * @param {string} filename - Name of JSON file without extension
 * @returns {object} Parsed JSON data
 */
function loadDataFile(filename) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      `${filename}.json`,
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading ${filename}.json:`, error);
    return null;
  }
}

/**
 * Analyze the conversation to determine what context is needed
 * @param {Array} messages - Chat message history
 * @returns {Object} Flags for what data to include
 */
function analyzeQueryIntent(messages) {
  // Get the last user message (most recent question)
  const lastUserMessage = messages.filter((m) => m.role === "user").pop();

  if (!lastUserMessage) return { includeEverything: true };

  const query = lastUserMessage.content.toLowerCase();

  return {
    includeProjects:
      query.includes("project") ||
      query.includes("work") ||
      query.includes("built") ||
      query.includes("portfolio") ||
      query.includes("the line") ||
      query.includes("shell") ||
      query.includes("jan cuts"),

    includeSkills:
      query.includes("skill") ||
      query.includes("tech") ||
      query.includes("tool") ||
      query.includes("know") ||
      query.includes("can you") ||
      query.includes("react") ||
      query.includes("javascript") ||
      query.includes("python"),

    includeEducation:
      query.includes("education") ||
      query.includes("school") ||
      query.includes("learn") ||
      query.includes("holberton") ||
      query.includes("study") ||
      query.includes("certificate"),

    includeFAQ:
      query.includes("available") ||
      query.includes("hire") ||
      query.includes("freelance") ||
      query.includes("contact") ||
      query.includes("unique") ||
      query.includes("experience"),
  };
}

/**
 * Format JSON data into readable text for the AI
 * @param {object} data - JSON data
 * @param {string} title - Section title
 * @returns {string} Formatted text
 */
function formatDataForContext(data, title) {
  return `\n\n## ${title}\n${JSON.stringify(data, null, 2)}`;
}

/**
 * Main function: Build context string from JSON files based on query
 * @param {Array} messages - Chat message history
 * @returns {string} Formatted context for AI
 */
export function buildContext(messages) {
  let context = "";

  // Load core data (always included)
  const profile = loadDataFile("oscar-profile");
  const personality = loadDataFile("personality");

  if (profile) {
    context += formatDataForContext(profile, "Oscar's Profile");
  }

  if (personality) {
    context += formatDataForContext(
      personality,
      "Personality & Communication Style",
    );
  }

  // Analyze what else to include based on the query
  const intent = analyzeQueryIntent(messages);

  // Load conditional data based on query intent
  if (intent.includeProjects) {
    const projects = loadDataFile("projects");
    if (projects) {
      context += formatDataForContext(projects, "Oscar's Projects");
    }
  }

  if (intent.includeSkills) {
    const skills = loadDataFile("skills");
    if (skills) {
      context += formatDataForContext(skills, "Oscar's Skills & Technologies");
    }
  }

  if (intent.includeEducation) {
    const education = loadDataFile("education");
    if (education) {
      context += formatDataForContext(education, "Oscar's Education");
    }
  }

  if (intent.includeFAQ) {
    const faq = loadDataFile("faq");
    if (faq) {
      context += formatDataForContext(faq, "Frequently Asked Questions");
    }
  }

  return context;
}

/**
 * Get a quick summary of available data files (for debugging)
 */
export function getAvailableData() {
  const dataFiles = [
    "oscar-profile",
    "projects",
    "skills",
    "education",
    "personality",
    "faq",
  ];
  return dataFiles.map((file) => {
    const data = loadDataFile(file);
    return {
      file,
      loaded: !!data,
      size: data ? JSON.stringify(data).length : 0,
    };
  });
}
