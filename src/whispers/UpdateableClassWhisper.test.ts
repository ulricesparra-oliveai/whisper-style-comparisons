import { whisper } from '@oliveai/ldk';
import UpdateableClassWhisper from './UpdateableClassWhisper';

jest.mock('@oliveai/ldk');

const mockWhisperClose = jest.fn();
const mockWhisperUpdate = jest.fn();

describe('Updateable Class Whisper', () => {
  beforeEach(() => {
    whisper.create = jest
      .fn()
      .mockResolvedValueOnce({ close: mockWhisperClose, update: mockWhisperUpdate });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates components as expected', () => {
    const newWhisper = new UpdateableClassWhisper();
    const actual = newWhisper.createComponents();

    // Check that we're getting expected component types in the expected order
    const expected = [
      expect.objectContaining({
        type: whisper.WhisperComponentType.TextInput,
      }),
    ];

    expect(actual).toEqual(expected);
  });

  it('creates components with functional handlers', async () => {
    const newWhisper = new UpdateableClassWhisper();
    await newWhisper.show();
    const components = newWhisper.createComponents();

    // Check updatableLabelInput's onSelect
    const updatableLabelInput = components[0] as whisper.TextInput;
    updatableLabelInput.onChange(undefined, 'test label', {} as whisper.Whisper);
    expect(console.log).toBeCalledWith('Updating whisper label: ', 'test label');
    expect(mockWhisperUpdate).toBeCalled();
    expect(newWhisper.props.label).toEqual('test label');
  });

  it('uses default values for updatable components', async () => {
    const newWhisper = new UpdateableClassWhisper();
    await newWhisper.show();
    newWhisper.update({});

    expect(mockWhisperUpdate).toBeCalledWith({
      label: 'Updateable Class Whisper',
      components: expect.anything(),
    });
  });

  it('updates as expected for passed in params', async () => {
    const newWhisper = new UpdateableClassWhisper();
    await newWhisper.show();
    newWhisper.update({ label: 'test label' });

    expect(mockWhisperUpdate).toBeCalledWith({
      label: 'test label',
      components: expect.anything(),
    });
  });

  it('creates a whisper and closes it gracefully', async () => {
    const newWhisper = new UpdateableClassWhisper();
    await newWhisper.show();
    newWhisper.close();

    expect(whisper.create).toBeCalledWith(
      expect.objectContaining({
        label: 'Updateable Class Whisper',
        onClose: UpdateableClassWhisper.onClose,
      })
    );
    expect(mockWhisperClose).toBeCalled();
  });

  it('quietly ignores close if a whisper was not created first', () => {
    const newWhisper = new UpdateableClassWhisper();
    newWhisper.close();

    expect(mockWhisperClose).not.toBeCalled();
  });

  it('quietly ignores update if a whisper was not created first', () => {
    const newWhisper = new UpdateableClassWhisper();
    newWhisper.update({});

    expect(mockWhisperUpdate).not.toBeCalled();
  });

  it.each`
    scenario              | error
    ${'without an error'} | ${undefined}
    ${'with an error'}    | ${new Error('error')}
  `('should close properly $scenario', ({ error }) => {
    UpdateableClassWhisper.onClose(error);

    if (error) {
      expect(console.error).toBeCalledWith(
        'There was an error closing Updateable Class whisper',
        error
      );
    }
    expect(console.log).toBeCalledWith('Updateable Class whisper closed');
  });
});
