const now = new Date();
const yesterDay = new Date(now);
const lastWeek = new Date(now);
const lastMonth = new Date(now);
const lastYear = new Date(now);

export const dateHelper = {
    today: () => now,
    yesterday: () => yesterDay.setDate(yesterDay.getDate() - 1),
    thisWeek: () => now.getDay(),
    lastWeek: () => lastWeek.setDate(lastWeek.getDate() - 7),
    thisMonth: () => now.getMonth(),
    lastMonth: () => lastMonth.setMonth(lastMonth.getMonth() - 1),
    thisYear: () => now.getFullYear(),
    lastYear: () => lastYear.setFullYear(lastYear.getFullYear() - 1),
    hours: () => (now.getHours())
}