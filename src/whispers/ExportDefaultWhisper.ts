import { whisper } from '@oliveai/ldk';
import { stripIndent } from 'common-tags';

export const onClose = (err?: Error) => {
  if (err) {
    console.error('There was an error closing Export Default whisper', err);
  }
  console.log('Export Default whisper closed');
};

/**
 * Preferred method for simple whispers
 * + More desired Typescript style
 * + Allows for a consistent WhisperName.show() format
 * + Default export can be named however the developer wants
 * + Default export does not include test-only exports which can be explicitly imported separately
 * - Does not support updateable in a clean and easy-to-test way
 * @see UpdateableClassWhisper for updateable whispers
 */
export default {
  show: async () => {
    const markdown: whisper.Markdown = {
      type: whisper.WhisperComponentType.Markdown,
      body: stripIndent`
        This is a simple whisper
      `,
    };
    return whisper.create({
      components: [markdown],
      label: 'Export Default Whisper',
      onClose,
    });
  },
};
