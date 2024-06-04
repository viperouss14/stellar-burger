import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getUserOrderSelector,
  userOrderThunk
} from '../../services/slices/userOrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrderSelector);

  useEffect(() => {
    dispatch(userOrderThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
