import { withAuthorizationCheck } from '../../utils/authorizedPage';

function Forum() {
  return <h1>Страница форума</h1>
}

export default withAuthorizationCheck(Forum);
