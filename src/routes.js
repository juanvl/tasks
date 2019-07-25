import { createAppContainer } from 'react-navigation';
import Navigator from './Navigator';

console.disableYellowBox = true;

const Routes = createAppContainer(Navigator);

export default Routes;
