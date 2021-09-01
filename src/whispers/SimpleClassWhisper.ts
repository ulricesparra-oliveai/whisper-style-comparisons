import { whisper } from '@oliveai/ldk';
import { stripIndent } from 'common-tags';

/**
 * Decided to be overkill for simple whispers
 * + Testing feels easier but for such a simple whisper there's not as much value add
 * - The whisper doesn't update so storing the created whisper is unnecessary
 * - No state management, all methods end up being static anyway
 * @see ExportDefaultWhisper for simple whispers
 * @see UpdateableClassWhisper for updateable whispers
 * @deprecated
 */
export default class SimpleClassWhisper {
  whisper: whisper.Whisper | undefined;

  label = 'Simple Class Whisper';

  static onClose(err?: Error) {
    if (err) {
      console.error('There was an error closing Simple Class whisper', err);
    }
    console.log('Simple Class whisper closed');
  }

  static createComponents() {
    const markdown: whisper.Markdown = {
      type: whisper.WhisperComponentType.Markdown,
      body: stripIndent`
        This is a simple whisper
      `,
    };

    return [markdown];
  }

  async show() {
    this.whisper = await whisper.create({
      components: SimpleClassWhisper.createComponents(),
      label: this.label,
      onClose: SimpleClassWhisper.onClose,
    });
  }

  close() {
    this.whisper?.close(SimpleClassWhisper.onClose);
  }
}
