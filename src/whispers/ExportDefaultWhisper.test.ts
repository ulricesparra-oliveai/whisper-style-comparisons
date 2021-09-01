import { whisper } from '@oliveai/ldk';
import ExportDefaultWhisper, { onClose } from './ExportDefaultWhisper';

jest.mock('@oliveai/ldk');

const mockWhisperClose = jest.fn();

describe('Export Default Whisper', () => {
  beforeEach(() => {
    whisper.create = jest.fn().mockResolvedValueOnce({ close: mockWhisperClose });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates a whisper and closes it gracefully', async () => {
    const newWhisper = await ExportDefaultWhisper.show();
    newWhisper.close(() => null);

    expect(whisper.create).toBeCalledWith(
      expect.objectContaining({
        label: 'Export Default Whisper',
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
    onClose(error);

    if (error) {
      expect(console.error).toBeCalledWith(
        'There was an error closing Export Default whisper',
        error
      );
    }
    expect(console.log).toBeCalledWith('Export Default whisper closed');
  });
});
