import { FC, useEffect, useState } from "react";
import { UserType } from "../../types/user";
import { getUsers } from "../../services/user";
import { toast } from "react-toastify";
import style from "./UsersList.module.scss";

const UsersList: FC = () => {
  const [users, setUsers] = useState<UserType[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  console.log("users:", users);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const { data } = await getUsers();

        if (data?.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error((error as Error).message);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (users?.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className={style["users-list"]}>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default UsersList;
