import type { Question, Answer } from '../types';

export function parseJsonQuestions(jsonString: string): Question[] {
  const data = JSON.parse(jsonString);
  const records = data.result?.records || [];
  const questions: Question[] = [];
  const parser = new DOMParser();

  for (const record of records) {
    const fullTitle = record.title2 || '';
    const category = record.category || '';
    const descriptionHtml = record.description4 || '';

    // Split "1073. מה פירוש התמרור?" into ID and Title
    const titleMatch = fullTitle.match(/^(\d+)\.\s*(.*)/);
    const id = titleMatch ? titleMatch[1] : '';
    const title = titleMatch ? titleMatch[2] : fullTitle;

    // Parse the inner description HTML
    const descDoc = parser.parseFromString(descriptionHtml, 'text/html');
    const listItems = descDoc.getElementsByTagName('li');
    const answers: Answer[] = [];

    for (let j = 0; j < listItems.length; j++) {
      const li = listItems[j];
      const span = li.getElementsByTagName('span')[0];
      const text = span?.textContent?.trim() || '';
      const isCorrect = span?.id?.startsWith('correctAnswer') || false;
      
      if (text) {
        answers.push({ text, isCorrect });
      }
    }

    const img = descDoc.getElementsByTagName('img')[0];
    const imageUrl = img?.getAttribute('src') || undefined;

    // Filter for license type B (represented as «В» in the source data)
    const isLicenseB = descriptionHtml.includes('«В»');

    if (id && title && answers.length > 0 && isLicenseB) {
      questions.push({
        id,
        title,
        category,
        answers,
        imageUrl,
      });
    }
  }

  return questions;
}
