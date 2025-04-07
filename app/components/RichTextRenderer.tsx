import React from 'react';

type TextNode = {
  type: string;
  text: string;
};

type ListItemNode = {
  type: 'list-item';
  children: TextNode[];
};

type ListNode = {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItemNode[];
};

type ParagraphNode = {
  type: 'paragraph';
  children: TextNode[];
};

type ContentNode = ListNode | ParagraphNode;

interface RichTextRendererProps {
  content: ContentNode[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="rich-text">
      {content.map((block, blockIndex) => {
        if (block.type === 'list' && block.format === 'unordered') {
          return (
            <ul key={blockIndex} className="list-disc pl-5 space-y-2 mb-4">
              {block.children.map((listItem, itemIndex) => (
                <li key={itemIndex} className="text-gray-700 dark:text-gray-300">
                  {listItem.children.map((textNode, textIndex) => (
                    <span key={textIndex}>{textNode.text}</span>
                  ))}
                </li>
              ))}
            </ul>
          );
        } else if (block.type === 'list' && block.format === 'ordered') {
          return (
            <ol key={blockIndex} className="list-decimal pl-5 space-y-2 mb-4">
              {block.children.map((listItem, itemIndex) => (
                <li key={itemIndex} className="text-gray-700 dark:text-gray-300">
                  {listItem.children.map((textNode, textIndex) => (
                    <span key={textIndex}>{textNode.text}</span>
                  ))}
                </li>
              ))}
            </ol>
          );
        } else if (block.type === 'paragraph') {
          return (
            <p key={blockIndex} className="text-gray-700 dark:text-gray-300 mb-4">
              {block.children.map((textNode, textIndex) => (
                <span key={textIndex}>{textNode.text}</span>
              ))}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default RichTextRenderer;