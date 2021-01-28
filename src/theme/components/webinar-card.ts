const _default = {
  baseStyle: ({ colorMode }: { colorMode: 'dark' | 'light' }) => ({
    height: '200px',
    rounded: 8,
    p: 4,
    boxShadow: 'md',
    border: '1px',
    borderColor: colorMode === 'dark' ? 'gray.600' : 'gray.200'
  })
};

export default _default;
