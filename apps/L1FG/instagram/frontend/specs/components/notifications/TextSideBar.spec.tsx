import { HeartSVG } from '@/components/Home/leftSideBar/Svg/HeartSvg';
import { TextSideBar } from '@/components/notifications/TextSideBar';
import { render } from '@testing-library/react';
describe('Profile', () => {
  it('Should render', () => {
    render(<TextSideBar icon={<HeartSVG />} text="Home" searchOpen={true} />);
  });
});
