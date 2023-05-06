import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";

import { onLoadUsers, onLoadingUsers, onLoadInvites, onUpdatingInvites, onLoadProfile, onLoadProfileComplete, onLoadingProfile, onUpdateProfile, onUpdatingComplete, onUpdatingProfile } from '../store/slice/usersSlice';
import { onLoadChats } from "../store/slice/socketSlice";
import { onLoadFriends, onLoadMsgs, onLoginUser } from "../store/slice/authSlice";

import { fetchLoadInvites, fetchLoadProfiles } from "../helpers/fetchData";
import { setLocal, setLocalChats, setLocalFriends, setLocalInvites, setLocalMsgs, setLocalProfiles } from "../helpers/localStorage";
import { fetchDataChats, fetchDataFriends, fetchDataMsgs, fetchUpdateProfile } from "../pages/user/helpers/fetchDataUser";
import { fetchGetUsers } from "../pages/admin/helpers/fetchDataAdmin";

import { SocketContext } from "../contexts/SocketContext";
import { useSocketStore } from "./useSocketStore";


export const useUserStore = () => {

  const { status, user, isChecking } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);


  const loadProfiles = async () => {

    dispatch(onLoadingProfile());

    const response = await fetchLoadProfiles();

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };

    dispatch(onLoadProfile(response.profiles));
    setLocalProfiles(response.profiles);

    dispatch(onLoadProfileComplete());

    return { ok: true };

  };


  const loadInvites = async () => {

    dispatch(onUpdatingInvites());

    const response = await fetchLoadInvites();

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };


    dispatch(onLoadInvites(response.invites));
    setLocalInvites(response.invites)

    return { ok: true };

  };


  const updateUserProfile = async (formData) => {

    dispatch(onUpdatingProfile());

    const response = await fetchUpdateProfile(formData);

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };

    dispatch(onLoginUser(response.user));
    setLocal(response.user);

    const newProfile = profiles.filter(profile => profile._id != response.user._id);
    newProfile.push({
      _id: response.user._id,
      name: response.user.name,
      email: response.user.email,
      profileOrder: response.user.profileOrder,
      profile: response.user.profile
    });

    dispatch(onUpdateProfile(newProfile));
    setLocalProfiles(newProfile);

    dispatch(onUpdatingComplete());

    return {
      ok: true,
      user: response.user
    };

  };



  const loadChats = async (_id) => {

    const chats = await fetchDataChats(_id);

    if (!chats.ok)
      return {
        ok: false,
        response: chats.msg
      };


    dispatch(onLoadChats(chats.chats));
    setLocalChats(chats.chats)
    socket.emit('whoAmI', { userID: _id });

    return {
      ok: true
    };

  };



  const loadFriends = async (_id) => {

    const friends = await fetchDataFriends(_id);

    if (!friends.ok)
      return {
        ok: false,
        response: friends.msg
      };


    dispatch(onLoadFriends(friends.friends));
    setLocalFriends(friends.friends)

    return {
      ok: true
    };

  };


  const loadMsgs = async (_id) => {

    console.log('_id', _id)
    const msgs = await fetchDataMsgs(_id);
    console.log('msgs response', msgs)
    if (!msgs.ok)
      return {
        ok: false,
        response: msgs.msg
      };


    dispatch(onLoadMsgs(msgs.msgs));
    setLocalMsgs(msgs.msgs)

    return {
      ok: true
    };

  };



  const getUsers = async () => {

    dispatch(onLoadingUsers());

    const users = await fetchGetUsers();
    console.log('users', users)

    if (!users.ok)
      return {
        ok: false,
        response: users.msg
      };


    dispatch(onLoadUsers(users.users));

    return {
      ok: true
    };

  };


  return {
    getUsers,
    loadChats,
    loadMsgs,
    loadFriends,
    loadProfiles,
    loadInvites,
    updateUserProfile
  };
};
