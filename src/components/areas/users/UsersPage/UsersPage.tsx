import React, { useEffect } from 'react';
import UsersTable from "./components/UsersTable/UsersTable";
import Page from "../../../Page/Page";
import { connect } from "react-redux";
import { AppState } from "../../../../types/StoreTypes";
import { User } from "../../../../types/UserTypes";
import { getUsersSelector } from "../../../../selectors/userSelectors";
import { fetchIfNeeded } from "../../../../actions/userActions";

interface Props {
  users: User[];
  isFetching: boolean;
  actions: {
    users: {
      fetchIfNeeded(): void
    }
  }
}

function UsersPage({ isFetching, users, actions }: Props) {
  useEffect(() => {
    actions.users.fetchIfNeeded();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="Users">
      <UsersTable users={users} isFetching={isFetching} />
    </Page>
  )
}

const mapStateToProps = (state: AppState) => {
  const users = getUsersSelector(state);

  return {
    users,
    isFetching: state.users.isFetching
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: {
    users: {
      fetchIfNeeded: () => dispatch(fetchIfNeeded())
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
