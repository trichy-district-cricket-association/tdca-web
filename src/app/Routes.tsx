import { Route, Switch } from 'react-router-dom';
import LandingPage from './features/landing_page/LandingPage';

import GroundsOverview from './role_content/admin_panel/features/grounds/grounds_overview/GroundsOverview';
import { PageRoutes } from '../enums/pageRoutes';
import ProtectedRoute from './ProtectedRoute';
import { UserRoles } from '../enums/auth';
import GroundsMenOverview from './role_content/admin_panel/features/groundsMen/groundsMen_overview/GroundsMenOverview';
import UmpiresOverview from './role_content/admin_panel/features/umpires/umpires_overview/UmpiresOverview';
import ScorersOverview from './role_content/admin_panel/features/scorers/scorers_overview/ScorersOverview';
import TeamsOverview from './role_content/admin_panel/features/teams/teams_overview/TeamsOverview';
import MatchesOverview from './role_content/admin_panel/features/matches/matches_overview/MatchesOverview';
import PlayersOverview from './role_content/admin_panel/features/players/players_overview/PlayersOverview';
import MatchesPage from './features/matches_page/MatchesPage';
import TeamsPage from './features/teams_page/TeamsPage';
import TeamPlayersOverview from './role_content/team_panel/team_players/team_players_overview/TeamPlayersOverview';
import AboutUsPage from './features/about_us_page/AboutUsPage';
import ForgetPassword from './features/authentication/login/forget_password/ForgetPassword';
import OldMatchesOverview from './role_content/admin_panel/features/matches/old_matches/old_matches_overview/OldMatchesOverview';
import AdminActivities from './role_content/admin_panel/features/activities/Activities';
import Umpires from './features/governance/umpires/Umpires';
import Scorers from './features/governance/scorers/Scorers';
import Activities from './features/activities/Activities';
import Login from './features/authentication/login/Login';
import SignUp from './features/authentication/sign_up/SignUp';

const Routes = () => (
    <Switch>
        {/* Main Routes */}
        <Route exact path={PageRoutes.home} component={LandingPage} />
        <Route exact path={PageRoutes.teams} component={TeamsPage} />
        <Route exact path={PageRoutes.matches} component={MatchesPage} />
        <Route exact path={PageRoutes.aboutUs} component={AboutUsPage} />
        <Route exact path={PageRoutes.activities} component={Activities} />
        <Route exact path={PageRoutes.umpires} component={Umpires} />
        <Route exact path={PageRoutes.scorers} component={Scorers} />
        <Route exact path={PageRoutes.login} component={Login} />
        <Route exact path={PageRoutes.signup} component={SignUp} />

        {/* Admin Panel Route */}
        {/* <ProtectedRoute exact path={PageRoutes.adminPanel} userRole={UserRoles.admin} component={AdminPanel} /> */}
        <ProtectedRoute exact path={PageRoutes.adminScorers} userRole={UserRoles.admin} component={ScorersOverview} />
        <ProtectedRoute exact path={PageRoutes.adminUmpires} userRole={UserRoles.admin} component={UmpiresOverview} />
        <ProtectedRoute exact path={PageRoutes.adminGrounds} userRole={UserRoles.admin} component={GroundsOverview} />
        <ProtectedRoute
            exact
            path={PageRoutes.adminGroundsMen}
            userRole={UserRoles.admin}
            component={GroundsMenOverview}
        />
        <ProtectedRoute exact path={PageRoutes.adminPlayers} userRole={UserRoles.admin} component={PlayersOverview} />
        <ProtectedRoute exact path={PageRoutes.adminTeams} userRole={UserRoles.admin} component={TeamsOverview} />
        <ProtectedRoute exact path={PageRoutes.adminMatches} userRole={UserRoles.admin} component={MatchesOverview} />
        <ProtectedRoute
            exact
            path={PageRoutes.adminOldMatches}
            userRole={UserRoles.admin}
            component={OldMatchesOverview}
        />
        <ProtectedRoute
            exact
            path={PageRoutes.adminActivities}
            userRole={UserRoles.admin}
            component={AdminActivities}
        />
        {/* <ProtectedRoute exact path={PageRoutes.adminScorecards} userRole={UserRoles.admin} component={AdminPanel} /> */}

        {/*  Team panel Route */}
        <ProtectedRoute exact path={PageRoutes.teamPanel} userRole={UserRoles.team} component={TeamPlayersOverview} />

        {/* Forget Password Route */}
        <Route exact path={PageRoutes.forgetPassword} component={ForgetPassword} />
    </Switch>
);

export default Routes;
