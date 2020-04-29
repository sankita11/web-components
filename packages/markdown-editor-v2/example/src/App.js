import React, { useState, useCallback } from 'react';

import { SlateTransformer } from '@accordproject/markdown-slate';
import { MarkdownEditor } from '@accordproject/markdown-editor';

const slateTransformer = new SlateTransformer();
console.log(slateTransformer);

const defaultMarkdown = `# My Heading

This is text. This is *italic* text. This is **bold** text. This is a [link](https://clause.io). This is \`inline code\`.

This is ***bold and italic*** text.

## Breaks
This is a  
hard break.

This is a
softbreak.

---

This ^^^^ is a thematic break

![ap_logo](https://docs.accordproject.org/docs/assets/020/template.png "AP triangle")

> This is a quote.
## Heading Two
This is more text.

Below is a code block:

\`\`\` javascript
this is my great
code
\`\`\`

Ordered lists:

1. one
1. two
1. three

Or:

* apples
* pears
* peaches

### Sub heading

This is more text.

<custom>
This is an html block.
</custom>

And this is <variable>an HTML inline</variable>.

# H1
## H2
### H3
#### H4
#### H5
##### H6

Fin.
`;

const propsObj = {
  WIDTH: '600px',
};


/**
 * ContractEditor demo
 */
const App = () => {

  /**
   * Current Slate Value
   */
  const [slateValue, setSlateValue] = useState(() => {
    const slate = slateTransformer.fromMarkdown(defaultMarkdown);
    return slate.document.children;
  });
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  /**
   * Called when the Slate Value changes
   */
  const onSlateValueChange = useCallback((slateChildren) => {
    localStorage.setItem('slate-editor-value', JSON.stringify(slateChildren));
    const slateValue = {
      document: {
        children: slateChildren
      }
    };
    const markdown = slateTransformer.toMarkdown(slateValue);
    setSlateValue(slateValue.document.children);
    setMarkdown(markdown);
  }, []);

  return (
    <div>
      <MarkdownEditor
        readOnly={false}
        value={slateValue}
        onChange={onSlateValueChange}
        editorProps={propsObj}
      />
    </div>
  );
}

export default App;