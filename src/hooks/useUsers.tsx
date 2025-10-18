import axios from "axios";
import { useEffect, useRef, useState } from "react";
import type { ReqResUserListResponse, User } from "../interfaces";

const loadUsers = async (page: number = 1): Promise<User[]> => {
  try {
    const { data } = await axios.get<ReqResUserListResponse>(
      "https://reqres.in/api/users",
      {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
        params: {
          page: page,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const currentPageRef = useRef(1);

  useEffect(() => {
    loadUsers(currentPageRef.current).then(setUsers);
  }, []);

  const nexPage = async () => {
    currentPageRef.current++;
    const users = await loadUsers(currentPageRef.current);

    if (users.length > 0) {
      setUsers(users);
    } else {
      currentPageRef.current--;
    }
  };

  const prevPage = async () => {
    if (currentPageRef.current <= 1) return;

    currentPageRef.current--;
    const users = await loadUsers(currentPageRef.current);
    setUsers(users);
  };

  return {
    // Properties
    users,

    // Method
    nexPage,
    prevPage,
  };
};
