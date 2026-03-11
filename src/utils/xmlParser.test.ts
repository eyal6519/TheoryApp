import { describe, it, expect } from 'vitest';
import { parseQuestions } from './xmlParser';

describe('xmlParser', () => {
  const sampleXml = `
    <rss version="2.0">
      <channel>
        <item>
          <title>1073. מה פירוש התמרור?</title>
          <category>תמרורים</category>
          <description><![CDATA[
            <div dir="rtl">
              <ul>
                <li><span>המרחק עד הכביש הקרוב (בק"מ).</span></li>
                <li><span id="correctAnswer1073">מספרה של דרך ראשית.</span></li>
                <li><span>מספרה של דרך מהירה.</span></li>
                <li><span>המרחק עד לצומת הקרוב (בק"מ). </span></li>
              </ul>
              <img src="http://tqpic.mot.gov.il/31073.jpg" />
            </div>
          ]]></description>
        </item>
        <item>
          <title>0037. איזה רכב הוא "רכב ביטחון"?</title>
          <category>חוקי התנועה</category>
          <description><![CDATA[
            <div dir="rtl">
              <ul>
                <li><span>Option 1</span></li>
                <li><span>Option 2</span></li>
                <li><span id="correctAnswer0037">Correct Option</span></li>
                <li><span>Option 4</span></li>
              </ul>
            </div>
          ]]></description>
        </item>
      </channel>
    </rss>
  `;

  it('should parse questions correctly from XML string', () => {
    const questions = parseQuestions(sampleXml);
    
    expect(questions).toHaveLength(2);
    
    const q1 = questions[0];
    expect(q1.id).toBe('1073');
    expect(q1.title).toBe('מה פירוש התמרור?');
    expect(q1.category).toBe('תמרורים');
    expect(q1.imageUrl).toBe('http://tqpic.mot.gov.il/31073.jpg');
    expect(q1.answers).toHaveLength(4);
    expect(q1.answers[1].isCorrect).toBe(true);
    expect(q1.answers[1].text).toBe('מספרה של דרך ראשית.');
    expect(q1.answers[0].isCorrect).toBe(false);

    const q2 = questions[1];
    expect(q2.id).toBe('0037');
    expect(q2.answers[2].isCorrect).toBe(true);
    expect(q2.imageUrl).toBeUndefined();
  });
});
