import { whisper } from '@oliveai/ldk';
import SimpleClassWhisper from './SimpleClassWhisper';

jest.mock('@oliveai/ldk');

const mockWhisperClose = jest.fn();

describe('Simple Class Whisper', () => {
  beforeEach(() => {
    whisper.create = jest.fn().mockResolvedValueOnce({ close: mockWhisperClose });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates components as expected', () => {
    const actual = SimpleClassWhisper.createComponents();

    // Check that we're getting expected component types in the expected order
    const expected = [
      expect.objectContaining({
        type: whisper.WhisperComponentType.Markdown,
      }),
    ];

    expect(actual).toEqual(expected);
  });

  it('creates a whisper and closes it gracefully', async () => {
    const newWhisper = new SimpleClassWhisper();
    await newWhisper.show();
    newWhisper.close();

    expect(whisper.create).toBeCalledWith(
      expect.objectContaining({
        label: 'Simple Class Whisper',
        onClose: SimpleClassWhisper.onClose,
      })
    );
    expect(mockWhisperClose).toBeCalled();
  });

  it('quietly ignores close if a whisper was not created first', () => {
    const newWhisper = new SimpleClassWhisper();
    newWhisper.close();

    expect(mockWhisperClose).not.toBeCalled();
  });

  it.each`
    scenario              | error
    ${'without an error'} | ${undefined}
    ${'with an error'}    | ${new Error('error')}
  `('should close properly $scenario', ({ error }) => {
    SimpleClassWhisper.onClose(error);

    if (error) {
      expect(console.error).toBeCalledWith(
        'There was an error closing Simple Class whisper',
        error
      );
    }
    expect(console.log).toBeCalledWith('Simple Class whisper closed');
  });
});
