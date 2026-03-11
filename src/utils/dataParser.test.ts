import { describe, it, expect } from 'vitest';
import { parseJsonQuestions } from './dataParser';

describe('dataParser (JSON)', () => {
  const sampleJson = {
    result: {
      records: [
        {
          _id: 1,
          title2: "1759. Question for B and D",
          category: "חוקי התנועה",
          description4: `<div dir="rtl" style="text-align: right"><ul><li><span>Ans 1</span></li><li><span id="correctAnswer1759">Ans 2</span></li></ul><div style="padding-top: 4px;"><span style="float: left;">| «D» | «В» | </span></div></div>`
        },
        {
          _id: 3,
          title2: "1073. מה פירוש התמרור?",
          category: "תמרורים",
          description4: `<div dir="rtl" style="text-align: right"><ul><li><span>Ans 1</span></li><li><span id="correctAnswer1073">Ans 2</span></li></ul><img src="https://www.gov.il/image.jpg" /><div style="padding-top: 4px;"><span style="float: left;">| «C1» | «В» | </span></div></div>`
        },
        {
          _id: 4,
          title2: "0000. Question for Tractor only",
          category: "חוקי התנועה",
          description4: `<div dir="rtl" style="text-align: right"><ul><li><span>Ans 1</span></li></ul><div style="padding-top: 4px;"><span style="float: left;">| «1» | </span></div></div>`
        }
      ]
    }
  };

  it('should parse questions correctly from JSON and filter by license B', () => {
    const questions = parseJsonQuestions(JSON.stringify(sampleJson));
    
    expect(questions).toHaveLength(2); // Only IDs 1759 and 1073 have «В»
    
    const ids = questions.map(q => q.id);
    expect(ids).toContain('1759');
    expect(ids).toContain('1073');
    expect(ids).not.toContain('0000');

    const qWithImg = questions.find(q => q.id === '1073');
    expect(qWithImg?.imageUrl).toBe('https://www.gov.il/image.jpg');
  });
});
