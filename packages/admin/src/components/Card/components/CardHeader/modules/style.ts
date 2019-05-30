import { css } from 'styled-components';
import { lighten, darken, rgba } from 'polished';

const getGradient = (color: string) => {
  const light = lighten(.01, color);
  const dark = darken(.01, color);
  return `linear-gradient(60deg, ${light}, ${dark})`;
};

const style = css`
  padding: 15px;
  border-radius: 3px;
  color: #FFF;
  background: ${({ theme }) => getGradient(theme.colors.main)};
  box-shadow:
    0 4px 20px 0 rgba(0,0,0,.14),
    0 7px 10px -5px ${({ theme }) => rgba(lighten(.1, theme.colors.main), .4)};
`;

export default style;
