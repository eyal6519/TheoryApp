import { Question, Answer } from '../types';

export function parseQuestions(xmlString: string): Question[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const items = xmlDoc.getElementsByTagName('item');
  const questions: Question[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const fullTitle = item.getElementsByTagName('title')[0]?.textContent || '';
    const category = item.getElementsByTagName('category')[0]?.textContent || '';
    const descriptionXml = item.getElementsByTagName('description')[0]?.textContent || '';

    // Split "1073. מה פירוש התמרור?" into ID and Title
    const titleMatch = fullTitle.match(/^(\d+)\.\s*(.*)/);
    const id = titleMatch ? titleMatch[1] : '';
    const title = titleMatch ? titleMatch[2] : fullTitle;

    // Parse the inner description HTML
    const descDoc = parser.parseFromString(descriptionXml, 'text/html');
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

    if (id && title && answers.length > 0) {
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
