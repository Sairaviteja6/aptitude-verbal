import questionsData from '../data/questions.json';

const STORAGE_KEYS = {
  ATTEMPTS: 'aptitude_attempts_v1',
  STREAK: 'aptitude_streak_v1',
  DAILY_SET: 'aptitude_daily_set_v1',
  MOCK_TESTS: 'aptitude_mock_tests_v1',
  BOOKMARKS: 'aptitude_bookmarks_v1',
};

// Helper: Get today's date formatted as YYYY-MM-DD
export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Get all recorded attempt logs
export const getAttempts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to read attempts", e);
    return [];
  }
};

// Record a single question attempt
export const recordAttempt = (attempt) => {
  const attempts = getAttempts();
  const newAttempt = {
    id: 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    timestamp: new Date().toISOString(),
    date: getTodayDateString(),
    ...attempt
  };
  attempts.push(newAttempt);
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  updateStreak();
  return newAttempt;
};

// Update and calculate activity streak
export const updateStreak = () => {
  const attempts = getAttempts();
  const mockTests = getMockHistory();
  
  // Collect all unique activity dates (YYYY-MM-DD)
  const activeDates = new Set([
    ...attempts.map(a => a.date),
    ...mockTests.map(m => m.date)
  ]);
  
  if (activeDates.size === 0) {
    const defaultStreak = { current: 0, max: 0, lastDate: null };
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(defaultStreak));
    return defaultStreak;
  }

  const todayStr = getTodayDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let currentStreak = 0;
  let checkDate = new Date();

  // Check if active today or yesterday to maintain streak
  if (!activeDates.has(todayStr) && !activeDates.has(yesterdayStr)) {
    currentStreak = 0;
  } else {
    // Count consecutive active days backwards
    let tempDate = activeDates.has(todayStr) ? new Date() : yesterday;
    while (true) {
      const dStr = tempDate.toISOString().split('T')[0];
      if (activeDates.has(dStr)) {
        currentStreak++;
        tempDate.setDate(tempDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  const storedStreak = getStreak();
  const maxStreak = Math.max(currentStreak, storedStreak.max || 0);

  const streakData = {
    current: currentStreak,
    max: maxStreak,
    lastDate: todayStr,
    activeDates: Array.from(activeDates)
  };

  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streakData));
  return streakData;
};

export const getStreak = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STREAK);
    return data ? JSON.parse(data) : { current: 0, max: 0, lastDate: null, activeDates: [] };
  } catch (e) {
    return { current: 0, max: 0, lastDate: null, activeDates: [] };
  }
};

// Daily Question Assignment Logic
export const getDailyQuestions = () => {
  const today = getTodayDateString();
  try {
    const savedDaily = localStorage.getItem(STORAGE_KEYS.DAILY_SET);
    if (savedDaily) {
      const parsed = JSON.parse(savedDaily);
      if (parsed.date === today) {
        return parsed;
      }
    }
  } catch (e) {}

  // If no set exists for today, pick 5 targeted questions weighted by user's weak topics
  const attempts = getAttempts();
  const topicStats = getTopicAccuracyStats();
  
  // Sort topics by lowest accuracy
  const weakTopics = Object.entries(topicStats)
    .sort((a, b) => a[1].accuracy - b[1].accuracy)
    .map(entry => entry[0]);

  let selected = [];
  
  // First pick from weak topics if available
  if (weakTopics.length > 0) {
    weakTopics.forEach(topic => {
      const candidates = questionsData.filter(q => q.topic === topic);
      if (candidates.length > 0 && selected.length < 5) {
        const randomQ = candidates[Math.floor(Math.random() * candidates.length)];
        if (!selected.find(s => s.id === randomQ.id)) {
          selected.push(randomQ);
        }
      }
    });
  }

  // Fill remaining slots randomly from full pool
  const shuffledPool = [...questionsData].sort(() => 0.5 - Math.random());
  for (const q of shuffledPool) {
    if (selected.length >= 5) break;
    if (!selected.find(s => s.id === q.id)) {
      selected.push(q);
    }
  }

  const dailyPayload = {
    date: today,
    questions: selected,
    completed: false,
    results: []
  };

  localStorage.setItem(STORAGE_KEYS.DAILY_SET, JSON.stringify(dailyPayload));
  return dailyPayload;
};

export const markDailyCompleted = (results) => {
  const daily = getDailyQuestions();
  daily.completed = true;
  daily.results = results;
  localStorage.setItem(STORAGE_KEYS.DAILY_SET, JSON.stringify(daily));
  
  // Record individual attempts
  results.forEach(res => {
    recordAttempt(res);
  });
  
  return daily;
};

// Calculate Accuracy by Topic for Dashboard Charts
export const getTopicAccuracyStats = () => {
  const attempts = getAttempts();
  const stats = {};

  // Default topics
  const defaultTopics = ['aptitude', 'verbal', 'data-interpretation', 'logical-reasoning'];
  defaultTopics.forEach(t => {
    stats[t] = { total: 0, correct: 0, accuracy: 0 };
  });

  attempts.forEach(att => {
    const topic = att.topic || 'aptitude';
    if (!stats[topic]) {
      stats[topic] = { total: 0, correct: 0, accuracy: 0 };
    }
    stats[topic].total += 1;
    if (att.isCorrect) {
      stats[topic].correct += 1;
    }
  });

  Object.keys(stats).forEach(t => {
    if (stats[t].total > 0) {
      stats[t].accuracy = Math.round((stats[t].correct / stats[t].total) * 100);
    } else {
      stats[t].accuracy = 0;
    }
  });

  return stats;
};

// Mock Test History Management
export const getMockHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MOCK_TESTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const recordMockTest = (mockResult) => {
  const mockHistory = getMockHistory();
  const record = {
    id: 'mock_' + Date.now(),
    date: getTodayDateString(),
    timestamp: new Date().toISOString(),
    ...mockResult
  };
  mockHistory.push(record);
  localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(mockHistory));
  updateStreak();
  return record;
};

// Bookmarks toggle
export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const toggleBookmark = (questionId) => {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(questionId);
  let updated;
  if (index > -1) {
    updated = bookmarks.filter(id => id !== questionId);
  } else {
    updated = [...bookmarks, questionId];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
};
