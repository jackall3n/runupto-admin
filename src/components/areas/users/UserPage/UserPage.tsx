import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import UserEventsTable from "./components/UserEventsTable/UserEventsTable";
import Page from "../../../Page/Page";
import UserTeamsTable from "./components/UserTeamsTable/UserTeamsTable";
import { connect } from "react-redux";
import { User } from "src/types/UserTypes";
import { Event } from "src/types/EventTypes";
import { AppState } from "src/types/StoreTypes";
import { getUserEventsSelector, getUserSelector } from "src/selectors/userSelectors";
import { RouteComponentProps } from 'react-router-dom';
import { fetchUserIfNeeded } from "src/actions/userActions";
import { fetchIfNeeded } from "src/actions/eventActions";

interface UserPageParams {
  id: string;
}

interface Props extends RouteComponentProps<UserPageParams> {
  user?: User;
  events: Event[];
  actions: {
    events: {
      fetchEventsIfNeeded(): void;
    };
    users: {
      fetchUserIfNeeded(id: string): void;
    };
  }
}

function UserPage({ user, actions, match, events }: Props) {

  useEffect(() => {
    actions.events.fetchEventsIfNeeded();
    actions.users.fetchUserIfNeeded(match.params.id);
    // eslint-disable-next-line
  }, []);

  const name = user ? `${user.name.first} ${user.name.last}` : '...';

  return (
    <Page title={`Users / ${name}`}>
      {!user && <div>Loading</div>}
      {user && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <UserEventsTable events={events} />
            </Grid>
            <Grid item xs={12} md={6}>
              <UserTeamsTable />
            </Grid>
          </Grid>
        </>
      )}
    </Page>
  )
}

const mapStateToProps = (state: AppState, { match }: Props) => {
  const { id } = match.params;

  return {
    user: getUserSelector(state, id),
    events: getUserEventsSelector(state, id),
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: {
    users: {
      fetchUserIfNeeded: (id: string) => dispatch(fetchUserIfNeeded(id))
    },
    events: {
      fetchEventsIfNeeded: () => dispatch(fetchIfNeeded())
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
