jest.mock('@oliveai/ldk');

const mockExportDefaultShow = jest.fn();
const mockInterfaceShow = jest.fn();
const mockSimpleClassShow = jest.fn();
const mockUpdateableClassShow = jest.fn();
jest.mock('./whispers', () => {
  return {
    ExportDefaultWhisper: { show: mockExportDefaultShow },
    InterfaceWhisper: { show: mockInterfaceShow },
    SimpleClassWhisper: jest.fn().mockReturnValue({ show: mockSimpleClassShow }),
    UpdateableClassWhisper: jest.fn().mockReturnValue({ show: mockUpdateableClassShow }),
  };
});

describe('Project Startup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start all whispers on startup', async () => {
    // eslint-disable-next-line global-require
    require('.');

    expect(mockExportDefaultShow).toBeCalled();
    expect(mockInterfaceShow).toBeCalled();
    expect(mockSimpleClassShow).toBeCalled();
    expect(mockUpdateableClassShow).toBeCalled();
  });
});
