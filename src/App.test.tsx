import Header from './features/component/header/header';
import Footer from './features/component/footer/footer';
import Home from './features/pages/home/home';

describe('renders app component', () => {

  it('should have header component', () => {
    expect(Header).toBeTruthy();
    expect(Header).toBeDefined();
  });

  it('should have footer component', () => {
    expect(Footer).toBeTruthy();
    expect(Footer).toBeDefined();
  });

  it('should have Home component', () => {
    expect(Home).toBeTruthy();
    expect(Home).toBeDefined();
  })
});

