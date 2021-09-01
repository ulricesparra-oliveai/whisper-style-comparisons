import { whisper } from '@oliveai/ldk';
import { InterfaceWhisper } from './InterfaceWhisper';

jest.mock('@oliveai/ldk');

const mockWhisperClose = jest.fn();

describe('Interface Whisper', () => {
  beforeEach(() => {
    whisper.create = jest.fn().mockResolvedValueOnce({ close: mockWhisperClose });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates a whisper and closes it gracefully', async () => {
    const newWhisper = await InterfaceWhisper.show();
    newWhisper.close(() => null);

    expect(whisper.create).toBeCalledWith(
      expect.objectContaining({
        label: 'Interface Whisper',
        components: [expect.objectContaining({ type: whisper.WhisperComponentType.Markdown })],
        onClose: expect.any(Function),
      })
    );
    expect(mockWhisperClose).toBeCalled();
  });

  it.each`
    scenario              | error
    ${'without an error'} | ${undefined}
    ${'with an error'}    | ${new Error('error')}
  `('should close properly $scenario', async ({ error }) => {
    InterfaceWhisper.onClose(error);

    if (error) {
      expect(console.error).toBeCalledWith('There was an error closing Interface whisper', error);
    }
    expect(console.log).toBeCalledWith('Interface whisper closed');
  });
});
