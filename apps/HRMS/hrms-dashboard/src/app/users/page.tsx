import RoleTableFeature from "./_feature/UsersTableFeature";
const Users = () => {
    return (
      <div data-cy="users-page" className="w-full ">
        <RoleTableFeature/>
      </div>
    );
  };
  
  export default Users;