import { whisper } from '@oliveai/ldk';

interface Props {
  label: string;
}

/**
 * Preferred method for updateable whispers
 * + Class instances allow more control over updateable props
 * + Updating whispers requires storing the created whisper object
 * + Separation of concern for different methods
 * + Testing makes more sense without explicit exports solely for testing
 * - Considered overkill for any whispers that don't need updating
 * @see ExportDefaultWhisper for simple whispers
 */
export default class UpdateableClassWhisper {
  whisper: whisper.Whisper | undefined;

  label = 'Updateable Class Whisper';

  props: Props = {
    label: '',
  };

  static onClose(err?: Error) {
    if (err) {
      console.error('There was an error closing Updateable Class whisper', err);
    }
    console.log('Updateable Class whisper closed');
  }

  createComponents = () => {
    const updatableLabelInput: whisper.TextInput = {
      type: whisper.WhisperComponentType.TextInput,
      label: 'Change Whisper Label',
      onChange: (_error: Error | undefined, val: string) => {
        console.log('Updating whisper label: ', val);
        this.update({ label: val });
      },
    };

    return [updatableLabelInput];
  };

  async show() {
    this.whisper = await whisper.create({
      components: this.createComponents(),
      label: this.label,
      onClose: UpdateableClassWhisper.onClose,
    });
  }

  update(props: Partial<Props>) {
    this.props = { ...this.props, ...props };
    this.whisper?.update({
      label: this.props.label || this.label,
      components: this.createComponents(),
    });
  }

  close() {
    this.whisper?.close(UpdateableClassWhisper.onClose);
  }
}
