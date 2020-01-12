import React, { useEffect } from 'react';
import Page from "../../../Page/Page";
import TeamsTable from "./components/TeamsTable/TeamsTable";
import { Team } from "../../../../types/TeamTypes";
import { connect } from "react-redux";
import { AppState } from "../../../../types/StoreTypes";
import { getTeamsSelector } from "../../../../selectors/teamSelectors";
import { fetchIfNeeded } from "../../../../actions/teamActions";

interface Props {
  teams: Team[];
  isFetching: boolean;
  actions: {
    teams: {
      fetchIfNeeded(): void;
    }
  }
}

function TeamsPage({ teams, isFetching, actions }: Props) {
  useEffect(() => {
    actions.teams.fetchIfNeeded();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="Teams">
      <TeamsTable teams={teams} isFetching={isFetching} />
    </Page>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    teams: getTeamsSelector(state),
    isFetching: state.teams.isFetching
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: {
    teams: {
      fetchIfNeeded: () => dispatch(fetchIfNeeded())
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
