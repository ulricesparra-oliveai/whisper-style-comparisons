import { whisper } from '@oliveai/ldk';
import { stripIndent } from 'common-tags';

interface InterfaceWhisper {
  show: () => Promise<whisper.Whisper>;
  onClose: (err?: Error) => void;
}

const onClose = (err?: Error) => {
  if (err) {
    console.error('There was an error closing Interface whisper', err);
  }
  console.log('Interface whisper closed');
};

const show = async () => {
  const markdown: whisper.Markdown = {
    type: whisper.WhisperComponentType.Markdown,
    body: stripIndent`
      This is a simple whisper
    `,
  };
  return whisper.create({
    components: [markdown],
    label: 'Interface Whisper',
    onClose,
  });
};

/**
 * Decided to be less desired Typescript style
 * - Extra interface definition is unnecessary, inference works just fine
 * - Interfaces are more for type aliasing, especially for complex structures
 * @see ExportDefaultWhisper for simple whispers
 * @see UpdateableClassWhisper for updateable whispers
 * @deprecated
 */
export const InterfaceWhisper: InterfaceWhisper = {
  show,
  onClose,
};
